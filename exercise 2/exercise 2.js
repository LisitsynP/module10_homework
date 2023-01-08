const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

btn.addEventListener('click', () => {
    let width = window.screen.width;
    let height = window.screen.height;
    alert (`Ширина: ${width}; Высота: ${height}`);
});