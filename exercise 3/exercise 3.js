const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");
const input = document.querySelector(".input");
const chat = document.querySelector(".chat");
const mapLink = document.querySelector('#map-link');
const urlEcho = 'wss://echo-ws-service.herokuapp.com';
let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    chat.appendChild(pre);
  };

  const error = () => {
    chat.textContent = 'Невозможно получить ваше местоположение';
  };
  
  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ссылка на карту';
    chat.appendChild(mapLink);

  }

btn.addEventListener('click', () => {
    let inputText = document.querySelector(".input").value;
    writeToScreen('вы: ' + inputText);
    websocket.send(inputText);
    websocket.onmessage = function(evt) {
        writeToScreen(
            '<span>ответ: ' + evt.data+'</span>'
        );}
        input.value = "";
});

btn2.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';
    
    if (!navigator.geolocation) {
        chat.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(urlEcho);
    
});
