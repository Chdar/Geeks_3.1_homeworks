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

const moveBlock = () => {
    if (positionX < maxWidth) {
        positionX++
        childBlock.style.left = `${positionX}px`
        requestAnimationFrame(moveBlock)
    }
} 

moveBlock();