const form = document.querySelector("form")
const inputName = document.querySelector("#input-name")
const inputPrice = document.querySelector("#input-price")
const inputQuantity =  document.querySelector("#input-quantity")

const ul = document.querySelector("ul")
let listProducts = []

form.addEventListener('submit',(event)=>{
    event.preventDefault() 

    let currentProduct ={
    name: inputName.value,
    price: inputPrice.value,
    quantity: inputQuantity.value,
    } 
    listProducts.push(currentProduct)
    ul.append(li)
})