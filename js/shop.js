// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Jacket',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Shoes',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Trousers',
        price: 9.99,
        type: 'clothes'
    }
]

var cart = [];
let totalCount = document.getElementById("count_product");
totalCount.innerHTML = 0;

// Exercise 1
function buy(id) {

let i = 0
let posicio = -1
const alreadyInCart = cart.find(item => item.id === id);
let productoEncontrado = 0;


if (alreadyInCart) {
    if(!alreadyInCart.quantity){
        alreadyInCart.quantity = 1;
    }else{
        alreadyInCart.quantity++; 
        updateTotalCount();
    }

applyPromotionsCart(cart, cart.indexOf(alreadyInCart));
return; 

}

do {
    let productoActual = products[i]; 
    let idProductoActual = productoActual.id;
    if(id == idProductoActual){
         posicio = i
        productoEncontrado = products[posicio];
        }
    i++;
    } while( i < products.length && posicio == -1)

    cart.push({...productoEncontrado, quantity: 1});
      
    applyPromotionsCart(cart);
    printCart(cart);
    updateTotalCount();

}

function updateTotalCount() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    totalCount.innerHTML = totalQuantity;
    printCart(cart);
}

// Exercise 2  

function cleanCart() {

if(cart.length == 0) return alert ("No hay productos en el carrito");

cart.length = 0;
alert("El carrito ha sido vaciado");

const cartList = document.getElementById("cart_list");
cartList.innerHTML = "";
calculateTotal();
updateTotalCount();
}

// Exercise 3
function calculateTotal() {
let totalPrice = document.getElementById("total_price");
let total = 0


if(cart.length === 0) return totalPrice.innerHTML= "0"; 

for(let i = 0; i < cart.length; i++){
    let productoActual = cart[i];
    let precioAplicable = productoActual.discountedPrice || productoActual.price;
    total += precioAplicable * productoActual.quantity;
    
}

totalPrice.innerHTML = total.toFixed(2);

}


// Exercise 4

function applyPromotionsCart(cart) {
for (let i = 0; i < cart.length; i++){
    let productoBuscado = cart[i];
    
    if(!productoBuscado.offer || productoBuscado.quantity < productoBuscado.offer.number) {
        productoBuscado.discountedPrice = productoBuscado.price;
        continue;
    }

    let discount = (productoBuscado.price * productoBuscado.offer.percent)/ 100;
    productoBuscado.discountedPrice = productoBuscado.price - discount;
        
    }  

    printCart(cart);
}    



// Exercise 5
function printCart(cart) {


    const cartList = document.getElementById("cart_list");
    cartList.innerHTML = "";
   

    for(let index = 0; index < cart.length; index++){
        const row = document.createElement("tr");
        const nameCell = document.createElement("th");
        nameCell.scope = "row";
        nameCell.textContent = cart[index].name;


        const priceCell = document.createElement ("td");
        priceCell.textContent = cart[index].price;

        const quantityCell = document.createElement ("td");
        quantityCell.textContent = cart[index].quantity;
        
        const iconsCell = document.createElement("td");
        const plusIcon = document.createElement("i");
        plusIcon.className = "fa-solid fa-plus";
        plusIcon.style.cursor = "pointer"; 
        plusIcon.onclick = () => buy(cart[index].id);

        const minusIcon = document.createElement("i");
        minusIcon.className = "fa-solid fa-minus";
        minusIcon.style.cursor = "pointer";
        minusIcon.onclick = () => removeFromCart(cart[index].id);


        const totalCell = document.createElement ("td");
        totalCell.textContent = `${(cart[index].price * cart[index].quantity).toFixed(2)}`;
        
        
        const totalCellWithDiscount = document.createElement ("td");
        totalCellWithDiscount.textContent = `$${(cart[index].discountedPrice * cart[index].quantity).toFixed(2)}`;
        
        
        iconsCell.appendChild(minusIcon);
        iconsCell.appendChild(document.createTextNode(" ")); 
        iconsCell.appendChild(plusIcon);


        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(totalCellWithDiscount);
        row.appendChild(iconsCell);
        cartList.appendChild(row);
    }
    calculateTotal();
    

}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
const productIndex = cart.findIndex(product => product.id === id);

if(productIndex === -1) return console.log("El producto no está en el carrito");
    
const product = cart[productIndex];
if(product.quantity >1){

product.quantity -= 1;

}else{
cart.splice(productIndex, 1);

}

applyPromotionsCart(cart);
printCart(cart);

}

function open_modal() {
    printCart(cart);
}