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
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];
let totalCount = document.getElementById("count_product");
totalCount.innerHTML = 0;

// Exercise 1
function buy(id) {
// 1. Loop for to the array products to get the item to add to cart
    let i = 0
    let posicio = -1
    const alreadyInCart = cart.find(item => item.id === id);
    let productoEncontrado = 0;
    let contador = 0;
    
    //validaciones
if (alreadyInCart) {
    if(!alreadyInCart.quantity){
        alreadyInCart.quantity = 1; // Si no existe la propiedad, inicializarla
    }else{
        alreadyInCart.quantity++; //Incrementar si ya existe
        updateTotalCount();
    }
    console.log("Cantidad actualizada en el carrito:", alreadyInCart.quantity);
    //calculateTotal();
    console.log(cart);

    applyPromotionsCart(cart, cart.indexOf(alreadyInCart));
    return; //Salir de la funcion para evitar duplicados
}

    do {
        let productoActual = products[i]; // devuele objeto
        let idProductoActual = productoActual.id;
        if(id == idProductoActual){
            posicio = i
            productoEncontrado = products[posicio];
        }
        i++;
    } while( i < products.length && posicio == -1)
        //contador = productoEncontrado.quantity; // cuando lo encuentra capturo la propiedad cantidad 
        //console.log(contador);
        //totalCount.innerHTML = contador;
           // 2. Add found product to the cart array
      cart.push({...productoEncontrado, quantity: 1});
      
      
      
      console.log(typeof cart);
      console.log(Array.isArray(cart));
      console.log(cart.length);
      
      
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

//array vacio
if(cart.length == 0) return alert ("No hay productos en el carrito");

// eliminar todos los elementos tras el indice 0
cart.length = 0;
alert("El carrito ha sido vaciado");

const cartList = document.getElementById("cart_list");
cartList.innerHTML = "";
console.log("Carrito despues de vaciar:", cart);
calculateTotal();
updateTotalCount();
}

// Exercise 3
function calculateTotal() {

let totalPrice = document.getElementById("total_price");
let total = 0


//Errores
if(cart.length === 0) return totalPrice.innerHTML= "0"; // verificar si el carrito está vacio

for(let i = 0; i < cart.length; i++){
    let productoActual = cart[i];
    let precioAplicable = productoActual.discountedPrice || productoActual.price;
    total += precioAplicable * productoActual.quantity;
    console.log(precioAplicable);
}

totalPrice.innerHTML = total.toFixed(2);

}


// Exercise 4
function applyPromotionsCart(cart) {
for (let i = 0; i < cart.length; i++){
    let productoBuscado = cart[i];
    
    if(!productoBuscado.offer || productoBuscado.quantity < productoBuscado.offer.number) {
        productoBuscado.discountedPrice = productoBuscado.price;
        //console.log(`Para aplicar la oferta necesitas al menos ${productoBuscado.offer.number} unidades. Actualmente tienes ${productoBuscado.quantity}.`);
        continue;
    }

    //if(productoBuscado.offer && productoBuscado.quantity >= productoBuscado.offer.number){
    let discount = (productoBuscado.price * productoBuscado.offer.percent)/ 100;
    productoBuscado.discountedPrice = productoBuscado.price - discount;
        
    console.log(`Promoción aplicada:${productoBuscado.name} Por comprar ${productoBuscado.quantity} unidades, el precio por unidad baja de $${productoBuscado.price} a $${productoBuscado.discountedPrice.toFixed(2)}.`);
    }  

    printCart(cart);
}    



// Exercise 5
function printCart(cart) {

    //console.log(typeof cart);
    // Fill the shopping cart modal manipulating the shopping cart dom
    const cartList = document.getElementById("cart_list");
    cartList.innerHTML = "";
    //let discount = applyPromotionsCart(cart);
    //console.log(discount);


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
        plusIcon.style.cursor = "pointer"; // Añade estilo de cursor para hacerlo interactivo
        plusIcon.onclick = () => buy(cart[index].id);

        const minusIcon = document.createElement("i");
        minusIcon.className = "fa-solid fa-minus";
        minusIcon.style.cursor = "pointer";
        minusIcon.onclick = () => removeFromCart(cart[index].id);


        const totalCell = document.createElement ("td");
        totalCell.textContent = `${(cart[index].price * cart[index].quantity).toFixed(2)}`;
        
        //with discount
        const totalCellWithDiscount = document.createElement ("td");
        totalCellWithDiscount.textContent = `$${(cart[index].discountedPrice * cart[index].quantity).toFixed(2)}`;
        
        
        iconsCell.appendChild(minusIcon);
        iconsCell.appendChild(document.createTextNode(" ")); // Espacio entre íconos
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
console.log(`Producto actualizado/eliminado: ${product.name}`);
console.log(cart);
applyPromotionsCart(cart);
printCart(cart);

}

function open_modal() {
    printCart(cart);
}