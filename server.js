require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer();
const bodyParser = require('body-parser');
const cors = require('cors');

// Funciona como um .json(), reconhecendo o objeto de solicitação recebido como strings ou matrizes;
app.use(bodyParser.urlencoded({ extended: true }));

// A linha app.set('view engine', 'ejs'); configura o express para utilizar o EJS por padrão como template engine . Dessa forma, não preciso especificar a extensão do arquivo que quero utilizar.
app.set('view engine', 'ejs');

// A linha app.set('views', './views'); adiciona o diretório /views à lista de diretórios em que o expresss vai procurar um arquivo com o nome especificado pelo método render. Assim, não preciso especificar o caminho completo do arquivo em todos os momentos.
app.set('views', '/.views');

const { PORT } = process.env || 3000;

const io = require('socket.io')(httpServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

// Assim eu faço com que o express utilize as configurações do cors criada na linha 12;
app.use(cors);

const addZero = (num) => {
    if (num <= 9) {
        return `0${num}`;
    }
    return num;
};

const createDate = () => {
    const d = new Date();
    const date = `${addZero(d.getDate())}-${addZero(d.getMonth())}-${d.getFullYear()}`;
    const time = `${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`;
    return `${date} ${time}`;
};

io.on('connection', (socket) => {
    socket.on('message', ({ nickname, chatMessage }) => {
        // const date = new Date();
        // const fullDate = `${addZero(date.getDate())}-${addZero(date.getMonth())}-${date.getFullYear()} `;
        // const fullTime = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
        const message = `${createDate()} - ${nickname}: ${chatMessage}`;
        io.emit('message', message);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
