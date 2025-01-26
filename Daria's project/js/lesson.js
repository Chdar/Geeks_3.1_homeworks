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

// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElements) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);

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
            }
        };
    };
};

converter(somInput, { usd: usdInput, eur: eurInput });
converter(usdInput, { som: somInput, eur: eurInput });
converter(eurInput, { som: somInput, usd: usdInput });


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


