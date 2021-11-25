const socket = window.io();

const form = document.querySelector('#formMessages');
const inputMessage = document.querySelector('#message');
const messages = document.querySelector('#messages');
const formNickname = document.querySelector('#formNickname');
const inputNickname = document.querySelector('#nickname');
const userList = document.querySelector('#userList');

function getUserFromStorage() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function saveUserOnStorage(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

form.addEventListener('click', () => {
    console.log('cliquei');
    socket.emit('message', { nickname: getUserFromStorage(), chatMessage: inputMessage.value });
});

formNickname.addEventListener('click', () => {
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
