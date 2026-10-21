const form = document.querySelector('form') 
const inputName = document.querySelector('#input-name') 
const inputPrice = document.querySelector('#input-price') 
const inputQuantity = document.querySelector('#input-quantity') 
const listaHTML = document.querySelector('ul') 
let listProducts = [] 

form.addEventListener('submit', (event) => { 
    event.preventDefault() 
    const currentProduct = { 
        info:[ 
            { data: Number(inputPrice.value), category: 'price' }, 
            { data: inputName.value, category: 'name' }, 
        ], 
        quantity: Number(inputQuantity.value) 
    } 
    listProducts.push(currentProduct) 

    let info, counter;

    function createItem(object) { 
        const itemHTML = document.createElement('li') 
        itemHTML.classList.toggle('item') 
        listaHTML.append(itemHTML) 
        
        info = document.createElement('div')
        counter = document.createElement('div')
        info.classList.add('information') 
        counter.classList.add('counter-area') 
        
        itemHTML.append(info, counter)

        const divPrice = document.createElement('div')
        divPrice.classList.add(object.info[0].category)
        divPrice.textContent = object.info[0].data

        const divName = document.createElement('div')
        divName.classList.add(object.info[1].category)
        divName.textContent = object.info[1].data

        info.append(divPrice, divName)
    } 

    function createCounter(object) { 
        createItem(currentProduct) 
        const [btnMinus, btnPlus] = ['button', 'button'].map(tag => document.createElement(tag))
        ;[btnMinus, btnPlus].forEach(btn => {
            btn.classList.toggle('btn')
            btn.classList.toggle('count')
        })
        const textCount = document.createElement('p') 
        btnMinus.textContent = '-' 
        btnPlus.textContent = '+' 
        textCount.textContent = object.quantity 
        counter.append(btnMinus, textCount, btnPlus) 
    } 

    createCounter(currentProduct) 
    form.reset() 
})
