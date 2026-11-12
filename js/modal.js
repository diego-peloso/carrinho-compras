const modal = document.querySelector('.modal')
const btnOpenModal = document.querySelector('.btn-open-modal')
const btnCloseModal = document.querySelector('.btn-close-modal')

function openModal() {
    modal.showModal()
}

function closeModal() {
    modal.close()
}


export function iniciarModal() {
    if (modal && btnOpenModal && btnCloseModal) {
        btnOpenModal.addEventListener('click', openModal)
        btnCloseModal.addEventListener('click', closeModal)
    }
}

