const socket = window.io();

// Ref da função createNicknameRandom(): https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
const createNicknameRandom = (length) => {
    let newNickname = '';
    const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        newNickname += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }
    return newNickname;
};

const form = document.querySelector('#formMessages');
const inputMessage = document.querySelector('#message');
const messages = document.querySelector('#messages');
const formNickname = document.querySelector('#formNickname');
const inputNickname = document.querySelector('#nickname');
const userList = document.querySelector('#userList');

window.onload = () => {
    socket.emit('randomNickname', { nickname: createNicknameRandom(16) });
};

const data = {
    nickname: createNicknameRandom(16),
    chatMessage: inputMessage.value,    
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(inputMessage.value, 'data', data);
    socket.emit('message', inputMessage.value);
});

formNickname.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(inputNickname.value);
    socket.emit('randomNickname', { nickname: inputNickname.value });
});

socket.on('message', (message) => {
    const li = document.createElement('li');
    li.innerText = message;
    li.setAttribute('data-testid', 'message');
    messages.appendChild(li);
    inputMessage.value = '';
});

socket.on('randomNickname', (message) => {
    console.log(message);
    const p = document.createElement('p');
    p.innerText = message;
    p.setAttribute('data-testid', 'online-user');
    userList.appendChild(p);
});
