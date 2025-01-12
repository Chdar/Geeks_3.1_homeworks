// MODAL

const modal = document.querySelector('.modal')
const openModalButton = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')


const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

openModalButton.onclick = openModal()
closeModalButton.onclick = closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        openModal();
        window.removeEventListener('scroll', handleScroll);
    }
};

window.addEventListener('scroll', handleScroll);
setTimeout(openModal, 10000);