require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// Funciona como um .json(), reconhecendo o objeto de solicitação recebido como strings ou matrizes;
app.use(bodyParser.urlencoded({ extended: true }));

// A linha app.set('view engine', 'ejs'); configura o express para utilizar o EJS por padrão como template engine . Dessa forma, não preciso especificar a extensão do arquivo que quero utilizar.
app.set('view engine', 'ejs');

// A linha app.set('views', './views'); adiciona o diretório /views à lista de diretórios em que o expresss vai procurar um arquivo com o nome especificado pelo método render. Assim, não preciso especificar o caminho completo do arquivo em todos os momentos.
app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

const helper = require('./helpers/index');
const chatModel = require('./models/chatModels');

// Assim eu faço com que o express utilize as configurações do cors criada na linha 12;
// app.use(cors);

// Para entregar arquivos estáticos como imagens, arquivos CSS, e arquivos JavaScript, usamos a função de middleware express. static integrada no Express. O Express consulta os arquivos em relação ao diretório estático, para que o nome do diretório estático não faça parte da URL.
app.use(express.static(`${__dirname}/views`));

// Ref da função createNicknameRandom(): https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
const createNicknameRandom = (length) => {
    let newNickname = '';
    const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        newNickname += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }
    return newNickname;
};
// socket.on('randomNickname', ({ nickname }) => {
    //     theNickname = nickname;
    //     users.push(nickname);
    //     socket.emit('randomNickname', { mess: nickname });
    //     socket.broadcast.emit('randomNickname', nickname);
    // });
const users = [];
io.on('connection', async (socket) => {
    let nick = createNicknameRandom(16);
    users.push(nick);
    socket.emit('currentUser', nick);
    io.emit('randomNickname', users);
    socket.on('message', async ({ nickname, chatMessage }) => {
        await chatModel.saveMessage(chatMessage, nickname, helper.createDate());
        io.emit('message', `${helper.createDate()} - ${nickname}: ${chatMessage}`);
    });
    socket.on('changeNikname', ({ currentNickname, newNickname }) => {
        nick = newNickname;
        users.splice(users.indexOf(currentNickname), 1);
        users.splice(users.indexOf(currentNickname), 0, newNickname);
        io.emit('randomNickname', users);
    });
    socket.on('disconnect', () => {
        users.splice(users.indexOf(nick), 1);
        io.emit('randomNickname', users);
    });
});

// app.get('/', (req, res) => res.render(path.join(__dirname, 'views', 'chat.ejs')));

app.get('/', async (req, res) => {
    const messages = await chatModel.getMessages();
    console.log(messages);

    res.render('chat.ejs', { messages });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
