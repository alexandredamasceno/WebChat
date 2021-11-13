require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');
// const cors = require('cors');
const path = require('path');

// Funciona como um .json(), reconhecendo o objeto de solicitação recebido como strings ou matrizes;
app.use(bodyParser.urlencoded({ extended: true }));

// A linha app.set('view engine', 'ejs'); configura o express para utilizar o EJS por padrão como template engine . Dessa forma, não preciso especificar a extensão do arquivo que quero utilizar.
// app.set('view engine', 'ejs');

// A linha app.set('views', './views'); adiciona o diretório /views à lista de diretórios em que o expresss vai procurar um arquivo com o nome especificado pelo método render. Assim, não preciso especificar o caminho completo do arquivo em todos os momentos.
// app.set('views', './views');

const { PORT } = process.env || 3000;

const io = require('socket.io')(httpServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

const helper = require('./helpers/index');

// Assim eu faço com que o express utilize as configurações do cors criada na linha 12;
// app.use(cors);

app.use(express.static(`${__dirname}/views`));

io.on('connection', (socket) => {
    let theNickname = '';
    socket.on('randomNickname', ({ nickname }) => {
        console.log(nickname);
        theNickname = nickname;
        io.emit('randomNickname', nickname);
    });

    socket.on('message', (chatMessage) => {
        console.log('message', chatMessage);
        const message = `${helper.createDate()} - ${theNickname}: ${chatMessage}`;
        console.log(message);
        io.emit('message', message);
    });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'chat.html')));

httpServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
