const form = document.querySelector('form.main') 
const inputName = document.querySelector('#name') 
const inputPrice = document.querySelector('#price') 
const inputQuantity = document.querySelector('#quantity') 
const listHTML = document.querySelector('ul.list') 
const quantityHTML = document.querySelector('p.quantity')
let listProducts = [] 
let quantityOfProducts = 0

const itemAtributes = { 

    classOfItems:{
        counter: "counter",
        info: "info",
    },

    classOfDescription:{
        name: "name",
        price: "price",
    },

    classOfCounterIcons: {
        add: "add",
        minus: {
                singleItem: "delete",      // quantidade é 1
                multipleItems: "remove",    // quantidade é > 1
        },
    },
}

form.addEventListener('submit', (event) => { 
    event.preventDefault() 
    quantityOfProducts++
    quantityHTML.textContent = `${quantityOfProducts}`
    const placeholder = document.querySelector('ul.list>li.placeholder');
        if (placeholder) {
            placeholder.remove();
        }



    const currentProduct = {
        price: Number(inputPrice.value),
        name: inputName.value,
        quantity:Number(inputQuantity.value)
    }


    listProducts.push(currentProduct) 



    function createItem(quantity){
        const itemHTML = document.createElement('li') 
        itemHTML.classList.add('item') 
        itemHTML.dataset.productId = quantity.toString().padStart(3, '0');
        listHTML.append(itemHTML)
        return itemHTML;
    }

    function createDivsInItem(item, clas){

        const [counterArea, infoArea] = [
            clas.counter,
            clas.info,
        ].map(clas => {
            const el = document.createElement('div');
            el.classList.add(`${clas}-area`);
            return el;
        });
        item.append(infoArea, counterArea)
        return { counterArea, infoArea };
    }

    function createDescription(info, clas, prod) { 
        const [divPrice, divName] = [clas.price,clas.name].map(clas => {
            const el = document.createElement('div');
            el.classList.add(`${clas}`);
            return el;
        });
        const formattedPrice = prod.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
        });
        divName.textContent = `${prod.name}`
        divPrice.textContent = `${formattedPrice}`       
        info.append(divName,divPrice)
        return {divName,divPrice}
    } 

    function createCounter(counter,clas,quantity){ 

        const [btnMinus, btnAdd] = Array.from({ length: 2 }, () => {
            const el = document.createElement('button');
            el.classList.add('material-symbols-outlined','icon-counter','btn-counter');
            return el;
        });   

        if(quantity == 1){
            btnMinus.textContent = `${clas.minus.singleItem}`
            btnMinus.classList.add(clas.minus.singleItem)
        }
        if(quantity >= 2){
            btnMinus.textContent = `${clas.minus.multipleItems}`
            btnMinus.classList.add(clas.minus.multipleItems)
        }
        btnAdd.textContent = `${clas.add}`
        btnAdd.classList.add(clas.add)

        const textCount = document.createElement('p') 
        textCount.classList.add('quantity')
        textCount.textContent = quantity

        counter.append(btnMinus, textCount, btnAdd) 
        return{btnMinus, textCount, btnAdd}
    }
    
    function itemMaster(){
        const itemHTML = createItem(quantityOfProducts)
        const {counterArea, infoArea} = createDivsInItem(itemHTML,itemAtributes.classOfItems)
        createDescription(infoArea,itemAtributes.classOfDescription,currentProduct)
        createCounter(counterArea,itemAtributes.classOfCounterIcons,currentProduct.quantity)

    }

    itemMaster()
    form.reset()
});
listHTML.addEventListener('click',(event)=>{
    const btn = event.target.closest('.btn-counter')
    if(btn){
        const item = event.target.closest('li.item')
        const id = item.dataset.productId
        const index = Number(id) -1
        const classRemove = btn.classList.contains('remove')
        const classDelete = btn.classList.contains('delete')
        const classAdd = btn.classList.contains('add')
        const placeOfQuantity = btn.parentElement.querySelector('p')
        const btnOpposite= btn.parentElement.querySelector('.btn-counter')

        function updateQuantity(clas){
            if(classRemove){
                listProducts[index].quantity--
                placeOfQuantity.textContent = listProducts[index].quantity
                if(listProducts[index].quantity == 1){
                    btn.classList.replace(`${clas.multipleItems}`,`${clas.singleItem}`)
                    btn.textContent = `${clas.singleItem}`
                }

            }

            else if(classDelete){
                item.remove()
                quantityOfProducts--
            }

            else if(classAdd){
                listProducts[index].quantity++
                placeOfQuantity.textContent = listProducts[index].quantity}
                if(listProducts[index].quantity >= 2){
                    btnOpposite.classList.replace(`${clas.singleItem}`,`${clas.multipleItems}`)
                    btnOpposite.textContent = `${clas.multipleItems}`
                }
        }
        updateQuantity(itemAtributes.classOfCounterIcons.minus)
        quantityHTML.textContent = `${quantityOfProducts}`
        }
}) 
