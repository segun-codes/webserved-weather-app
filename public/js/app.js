console.log("Client-side javascript file loading");

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const firstMessage = document.querySelector('#message-1');
const secMessage = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    firstMessage.textContent = 'Loading...';
    secMessage.textContent = '';
    
    fetch(`http://localhost:5500/weather?address=${searchInput.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                firstMessage.textContent = data.error;
            } else {
                firstMessage.textContent = data.location;
                secMessage.textContent = data.forecast;
            }
        })
    });
});
