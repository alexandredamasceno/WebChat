const socket = window.io();

// Ref da função createNicknameRandom(): https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
// const createNicknameRandom = (length) => {
//     let newNickname = '';
//     const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i += 1) {
//         newNickname += caracters.charAt(Math.floor(Math.random() * caracters.length));
//     }
//     return newNickname;
// };

const form = document.querySelector('#formMessages');
const inputMessage = document.querySelector('#message');
const messages = document.querySelector('#messages');
const formNickname = document.querySelector('#formNickname');
const inputNickname = document.querySelector('#nickname');
const userList = document.querySelector('#userList');
// window.onload = () => {
//     socket.emit('randomNickname', { nickname: createNicknameRandom(16) });
// };

function getUserFromStorage() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function saveUserOnStorage(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

form.addEventListener('click', () => {
    // e.preventDefault();
    console.log('cliquei');
    socket.emit('message', { nickname: getUserFromStorage(), chatMessage: inputMessage.value });
});

formNickname.addEventListener('click', () => {
    // e.preventDefault();
    console.log('entrei no nickname');
    saveUserOnStorage(inputNickname.value);
    socket.emit('changeNikname', {
        currentNickname: getUserFromStorage(), newNickname: inputNickname.value });
    inputNickname.value = '';
});

socket.on('message', (message) => {
    const li = document.createElement('li');
    li.innerText = message;
    li.setAttribute('data-testid', 'message');
    messages.appendChild(li);
    inputMessage.value = '';
});

socket.on('currentUser', (user) => {
    saveUserOnStorage(user);
});

socket.on('randomNickname', (users) => {
    const userFromStorage = getUserFromStorage();
    users.splice(users.indexOf(userFromStorage), 1);
    users.unshift(userFromStorage);
    userList.innerHTML = '';
    for (let i = 0; i < users.length; i += 1) {
        console.log(users[i]);
        const p = document.createElement('li');
        p.innerText = users[i];
        p.setAttribute('data-testid', 'online-user');
        userList.appendChild(p);
    }
});
