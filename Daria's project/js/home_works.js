// GMAIL BLOCK

const emailInput = document.querySelector('#gmail_input');
const emailButton = document.querySelector('#gmail_button');
const emailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/;

emailButton.onclick = () => {
    if (regExp.test(emailInput.value)) {
        emailResult.innerHTML = 'OK';
        emailResult.style.color = 'green';
    } else {
        emailResult.innerHTML = 'NOT OK';
        emailResult.style.color = 'red';
    }
}


// MOVE BLOCK
const parentBlock =  document.querySelector('.parent_block');
const childBlock =  document.querySelector('.child_block');

let positionX = 0
let positionY = 0

const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight

let direction = 0;

const moveBlock = () => {
    if (direction === 0) {
        if (positionX < maxWidth) {
            positionX++;
        } else {
            direction = 1; 
        }
    }
    
    else if (direction === 1) {
        if (positionY < maxHeight) {
            positionY++;
        } else {
            direction = 2;  
        }
    }
    
    else if (direction === 2) {
        if (positionX > 0) {
            positionX--;
        } else {
            direction = 3; 
        }
    }
    
    else if (direction === 3) {
        if (positionY > 0) {
            positionY--;
        } else {
            direction = 0; 
        }
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
};

moveBlock();

// STOPWATCH

const seconds = document.querySelector('#seconds')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

let interval
let countSeconds = 0

startButton.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            countSeconds++
            seconds.innerHTML = countSeconds
        }, 1000)
    }
}

stopButton.onclick = () => {
    clearInterval(interval)
    interval = null
}

resetButton.onclick = () => {
    clearInterval(interval)
    interval = null
    countSeconds = 0
    seconds.innerHTML = countSeconds
}

// CHARACTERS JSON
fetch('/data/characters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Данные персонажей:', data); // Вывод в консоль
    displayCharacters(data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });

function displayCharacters(characters) {
  const charactersList = document.querySelector('.characters-list');
  charactersList.innerHTML = '';

  characters.forEach((character) => {
    const card = document.createElement('div');
    card.className = 'character-card';

    card.innerHTML = `
      <div class="character-photo">
        <img src="${character.character_photo}" alt="${character.name}">
      </div>
      <h2>${character.name}</h2>
      <p>Age: ${character.age}</p>
    `;

    charactersList.appendChild(card);
  });
}

// ANY JSON

const xhr = new XMLHttpRequest();
xhr.open('GET', '/data/any.json', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error('Ошибка при загрузке данных: ' + xhr.status);
  }
};

xhr.send();
