import { iniciarModal, addInModal } from './modal.js';

const form = document.querySelector('form.main');
const inputName = document.querySelector('#name');
const inputPrice = document.querySelector('#price');
const inputQuantity = document.querySelector('#quantity');
const listHTML = document.querySelector('ul.list');
const quantityHTML = document.querySelector('p.quantity');

let listProducts = [];
let nextId = 1;

const itemAtributes = {
    classOfItems: { counter: 'counter', info: 'info' },
    classOfDescription: { name: 'name', price: 'price' },
    classOfCounterIcons: {
        add: 'add',
        minus: { singleItem: 'delete', multipleItems: 'remove' }
    }
};

// Inicia o modal passando o que fazer ao abrir e ao confirmar o pedido
iniciarModal(
    () => {
        addInModal(listProducts);
    },
    () => {
        alert('Pedido concluído com sucesso!');
        listProducts = [];
        listHTML.innerHTML = '';
        updateTotalCounter();
        togglePlaceholder();
    }
);

function updateTotalCounter() {
    quantityHTML.textContent = listProducts.length;
}

function togglePlaceholder() {
    let placeholder = document.querySelector('ul.list > li.placeholder');
    if (listProducts.length === 0 && !placeholder) {
        placeholder = document.createElement('li');
        placeholder.classList.add('placeholder');
        placeholder.textContent = 'Nenhum item adicionado ainda..';
        listHTML.append(placeholder);
    } else if (listProducts.length > 0 && placeholder) {
        placeholder.remove();
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentProduct = {
        id: nextId++,
        price: Number(inputPrice.value),
        name: inputName.value,
        quantity: Number(inputQuantity.value)
    };

    listProducts.push(currentProduct);
    updateTotalCounter();
    togglePlaceholder();

    renderItem(currentProduct);
    form.reset();
});

function renderItem(prod) {
    const itemHTML = document.createElement('li');
    itemHTML.classList.add('item');
    itemHTML.dataset.productId = prod.id;

    const infoArea = document.createElement('div');
    infoArea.classList.add(`${itemAtributes.classOfItems.info}-area`);

    const divName = document.createElement('div');
    divName.classList.add(itemAtributes.classOfDescription.name);
    divName.textContent = prod.name;

    const divPrice = document.createElement('div');
    divPrice.classList.add(itemAtributes.classOfDescription.price);
    divPrice.textContent = prod.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    infoArea.append(divName, divPrice);

    const counterArea = document.createElement('div');
    counterArea.classList.add(`${itemAtributes.classOfItems.counter}-area`);

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    btnMinus.classList.add('material-symbols-outlined', 'icon-counter', 'btn-counter');

    const minusType = prod.quantity === 1
        ? itemAtributes.classOfCounterIcons.minus.singleItem
        : itemAtributes.classOfCounterIcons.minus.multipleItems;

    btnMinus.textContent = minusType;
    btnMinus.classList.add(minusType);

    const textCount = document.createElement('p');
    textCount.classList.add('quantity');
    textCount.textContent = prod.quantity;

    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.classList.add('material-symbols-outlined', 'icon-counter', 'btn-counter', itemAtributes.classOfCounterIcons.add);
    btnAdd.textContent = itemAtributes.classOfCounterIcons.add;

    counterArea.append(btnMinus, textCount, btnAdd);
    itemHTML.append(infoArea, counterArea);
    listHTML.append(itemHTML);
}

listHTML.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-counter');
    if (!btn) return;

    const item = event.target.closest('li.item');
    const id = Number(item.dataset.productId);
    const index = listProducts.findIndex((p) => p.id === id);
    if (index === -1) return;

    const placeOfQuantity = btn.parentElement.querySelector('p.quantity');
    const btnMinus = btn.parentElement.querySelector('.delete, .remove');
    const { singleItem, multipleItems } = itemAtributes.classOfCounterIcons.minus;

    if (btn.classList.contains('remove')) {
        listProducts[index].quantity--;
        placeOfQuantity.textContent = listProducts[index].quantity;
        if (listProducts[index].quantity === 1) {
            btnMinus.classList.replace(multipleItems, singleItem);
            btnMinus.textContent = singleItem;
        }
    } else if (btn.classList.contains('delete')) {
        item.remove();
        listProducts.splice(index, 1);
        updateTotalCounter();
        togglePlaceholder();
    } else if (btn.classList.contains('add')) {
        listProducts[index].quantity++;
        placeOfQuantity.textContent = listProducts[index].quantity;
        if (listProducts[index].quantity >= 2) {
            btnMinus.classList.replace(singleItem, multipleItems);
            btnMinus.textContent = multipleItems;
        }
    }
});

const btnCalc = document.querySelector('.btn-calc')
btnCalc.addEventListener('click', (event) =>{
    const result = listProducts.reduce((acc, item) =>{
        acc+= item.price * item.quantity
        return acc
    },0)


})

iniciarModal()

