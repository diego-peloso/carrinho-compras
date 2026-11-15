const modal = document.querySelector('.order-modal'); // Corrigido de .modal para .order-modal
const btnOpenModal = document.querySelector('.btn-open-modal');
const btnCloseModal = document.querySelector('.btn-close-modal');
const btnConfirm = document.querySelector('.confirm');
const btnCancel = document.querySelector('.cancel');
const totalPrice = document.querySelector('.total-price');
const listModal = document.querySelector('.list-products');

export function openModal() {
    if (modal) modal.showModal();
}

export function closeModal() {
    if (modal) modal.close();
}

export function iniciarModal(onOpenCallback, onConfirmCallback) {
    if (modal && btnOpenModal && btnCloseModal) {
        btnOpenModal.addEventListener('click', () => {
            if (onOpenCallback) onOpenCallback();
            openModal();
        });

        btnCloseModal.addEventListener('click', closeModal);
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', closeModal);
    }

    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            if (onConfirmCallback) onConfirmCallback();
            closeModal();
        });
    }
}

export function addInModal(list) {
    if (!listModal || !totalPrice) return;
    listModal.innerHTML = '';

    list.forEach((item) => {
        // Multiplica o preço pela quantidade para mostrar o subtotal do item
        const subtotal = item.price * item.quantity;
        const formattedPrice = subtotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const itemProduct = document.createElement('li');
        itemProduct.classList.add('item');

        const textProd = document.createElement('span');
        textProd.classList.add('text-product');
        textProd.textContent = `${item.quantity}     ${item.name}`;

        const priceProd = document.createElement('span');
        priceProd.classList.add('price-product');
        priceProd.textContent = formattedPrice;

        itemProduct.append(textProd, priceProd);
        listModal.append(itemProduct);
    });

    const result = list
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    totalPrice.textContent = result;
}