// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = 'none'
    })
    tabContentItems.forEach(item => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContentBlocks [i].style.display = 'block'
    tabContentItems[i].classList.add('tab_content_item_active');
}

hideTabContent()
showTabContent()

let currentIndex = 0;

const autoSwitchTabs = () => {
    currentIndex++;
    if (currentIndex >= tabContentBlocks.length) {
        currentIndex = 0;
    }
    hideTabContent();
    showTabContent(currentIndex);
};

setInterval(autoSwitchTabs, 3000);

// tabsParent.onclick = (event) => {
//     if (event.target.classList.contains('tab_content_item')) {
//         tabContentItems.forEach((item, i) => {
//             if (event.target === item) {
//                 hideTabContent()
//                 showTabContent(i)
//             }
//         })
//     }
// }

// CONVERTER NEW + fetch

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = async (element, targetElements) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            const data = await response.json();

            if (element.id === 'som') {
                targetElements.usd.value = (element.value / data.usd).toFixed(2);
                targetElements.eur.value = (element.value / data.eur).toFixed(2);
            }
            if (element.id === 'usd') {
                targetElements.som.value = (element.value * data.usd).toFixed(2);
                targetElements.eur.value = ((element.value * data.usd) / data.eur).toFixed(2);
            }
            if (element.id === 'eur') {
                targetElements.som.value = (element.value * data.eur).toFixed(2);
                targetElements.usd.value = ((element.value * data.eur) / data.usd).toFixed(2);
            }

            if (element.value === '') {
                targetElements.som.value = '';
                targetElements.usd.value = '';
                targetElements.eur.value = '';
            }
        } catch (error) {
            console.error('Ошибка при конвертации:', error);
        }
    };
};

converter(somInput, { usd: usdInput, eur: eurInput });
converter(usdInput, { som: somInput, eur: eurInput });
converter(eurInput, { som: somInput, usd: usdInput });


// CONVERTER

// const somInput = document.querySelector('#som');
// const usdInput = document.querySelector('#usd');
// const eurInput = document.querySelector('#eur');

// const converter = (element, targetElements) => {
//     element.oninput = () => {
//         const request = new XMLHttpRequest();
//         request.open('GET', '../data/converter.json');
//         request.setRequestHeader('Content-type', 'application/json');
//         request.send();

//         request.onload = () => {
//             if (request.status === 200) {
//                 const data = JSON.parse(request.response);

//                 if (element.id === 'som') {
//                     targetElements.usd.value = (element.value / data.usd).toFixed(2);
//                     targetElements.eur.value = (element.value / data.eur).toFixed(2);
//                 }
//                 if (element.id === 'usd') {
//                     targetElements.som.value = (element.value * data.usd).toFixed(2);
//                     targetElements.eur.value = ((element.value * data.usd) / data.eur).toFixed(2);
//                 }
//                 if (element.id === 'eur') {
//                     targetElements.som.value = (element.value * data.eur).toFixed(2);
//                     targetElements.usd.value = ((element.value * data.eur) / data.usd).toFixed(2);
//                 }

//                 if (element.value === '') {
//                     targetElements.som.value = '';
//                     targetElements.usd.value = '';
//                     targetElements.eur.value = '';
//                 }
//             }
//         };
//     };
// };

// converter(somInput, { usd: usdInput, eur: eurInput });
// converter(usdInput, { som: somInput, eur: eurInput });
// converter(eurInput, { som: somInput, usd: usdInput });


// не сокращенная версия:
// somInput.oninput = () => {
//     const request = new XMLHttpRequest
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader ('Content-type','application/json')
//     request.send ()

//     request.onload = () => {
//         const data = JSON.parse(request.response)
//         usdInput.value = (somInput.value / data.usd).toFixed(2)
//     }
// }

// CARD SWITCHER new + fetch

const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
const cardBlock = document.querySelector('.card')

let todoId = 1;

const updateCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>${data.completed ? 'Yes' : 'No'}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        cardBlock.innerHTML = `<p>Ошибка: ${error.message}</p>`;
        console.error(error);
    }
};

const changeCard = (direction) => {
    if (direction === 'next') {
        todoId = todoId === 200 ? 1 : todoId + 1;
    } else if (direction === 'prev') {
        todoId = todoId === 1 ? 200 : todoId - 1; 
    }
    updateCard(todoId);
};

btnNext.onclick = () => changeCard('next');
btnPrev.onclick = () => changeCard('prev');

updateCard(todoId);


// CARD SWITCHER

// const btnNext = document.querySelector('#btn-next')
// const btnPrev = document.querySelector('#btn-prev')
// const cardBlock = document.querySelector('.card')

// let todoId = 1;

// const updateCard = (id) => {
//     fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Ошибка: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             cardBlock.innerHTML = `
//                 <p>${data.title}</p>
//                 <p>${data.completed ? 'Yes' : 'No'}</p>
//                 <span>${data.id}</span>
//             `;
//         })
//         .catch(error => {
//             cardBlock.innerHTML = `<p>Ошибка: ${error.message}</p>`;
//         });
// };

// const changeCard = (direction) => {
//     if (direction === 'next') {
//         todoId = todoId === 200 ? 1 : todoId + 1;
//     } else if (direction === 'prev') {
//         todoId = todoId === 1 ? 200 : todoId - 1; 
//     }
//     updateCard(todoId);
// };

// btnNext.onclick = () => changeCard('next');
// btnPrev.onclick = () => changeCard('prev');

// updateCard(todoId);

// Дополнительный запрос для posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Posts data:', data);
    })
    .catch(error => {
        console.error('Ошибка при загрузке posts:', error.message);
    });


// WEATHER NEW + fetch

const searchButton = document.querySelector('#search')
const searchInput = document.querySelector('.cityName')
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

searchButton.onclick = async () => {
    if (searchInput.value === '') {
        city.innerHTML = 'Введите название города.' 
        city.style.color = 'red'
        return
    }

    try {
        const response = await fetch(`${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric&lang=ru`);
        if (!response.ok) {
            throw new Error('Город не найден');
        }
        const data = await response.json();
        city.innerHTML = data.name || `Город не найден...`
        temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : '' 
        city.style.color = 'white'
    } catch (error) {
        city.innerHTML = 'Ошибка при получении данных';
        city.style.color = 'red';
        console.error(error);
    }
    searchInput.value = ''
}


//     // WEATHER
// const searchButton = document.querySelector('#search')
// const searchInput = document.querySelector('.cityName')
// const temp = document.querySelector('.temp')
// const city = document.querySelector('.city')

// // searchButton.onclick = () => {
// //     fetch('http://api.openweathermap.org/data/2.5/weather?q=bishkek&appid=e417df62e04d3b1b111abeab19cea714')
// //         .then(response => response.json())
// //         .then(data => {
// //             console.log(data)
// //         })
// // }

// const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
// const API_KEY = 'e417df62e04d3b1b111abeab19cea714'


// searchButton.onclick = () => {
//     if (searchInput.value === '') {
//         city.innerHTML = 'Введите название города.' 
//         city.style.color = 'red'
//         return
//     }
//     fetch(`${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric&lang=ru`)
//         .then(response => response.json())
//         .then(data => {
//             city.innerHTML = data.name || `Город не найден...`
//             temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : '' 
//             city.style.color = 'white'
//         })
//         searchInput.value - ''
// }

// query params - параметры запроса = дополнения к end point в api

// API key - e417df62e04d3b1b111abeab19cea714 - всегда уникальные