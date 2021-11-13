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

module.exports = {
    createDate,
};
