const form = document.querySelector('form.main') 
const inputName = document.querySelector('#name') 
const inputPrice = document.querySelector('#price') 
const inputQuantity = document.querySelector('#quantity') 
const listHTML = document.querySelector('ul.list') 

let listProducts = [] 

let quantityOfProducts = 0

form.addEventListener('submit', (event) => { 
    const placeholder = document.querySelector('ul.list>li.placeholder');
        if (placeholder) {
            placeholder.remove();
        }
    event.preventDefault() 
    quantityOfProducts++

    const currentProduct = {
        price: Number(inputPrice.value),
        name: inputName.value,
        quantity:Number(inputQuantity.value)
    }
    listProducts.push(currentProduct) 
    itemAtributes = {

        classOfItems:{
            counter: "counter",
            info: "information",
        },

        classOfDescription:{
            name: "name",
            price: "price",
        },

        classOfCounterIcons: {
            add: "add",
            minus: {
                singleItem: "remove",      // quantidade é 1
                multipleItems: "minus",    // quantidade é > 1
            },
        },
    }


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
        divName.textContent = `${prod.name}`
        divPrice.textContent = `${prod.price}`
        info.append(divPrice, divName)
        return {divPrice, divName}
    } 

    function createCounter(counter,clas,quantity){ 

        const [btnMinus, btnAdd] = Array.from({ length: 2 }, () => {
            const el = document.createElement('button');
            el.classList.add('material-symbols-outlined');
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

        const textCount = document.createElement('p') 
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


    
