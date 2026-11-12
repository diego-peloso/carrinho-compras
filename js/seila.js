const btnCalc = document.querySelector('.btn-calc')
btnCalc.addEventListener('click', (event) =>{
    const result = listProducts.reduce((acc, item) =>{
        acc+= item.price * item.quantity
        return acc
    },0)


})
