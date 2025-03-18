let cart = {};
let totalPrice = 0;

function showMenu(shop) {
    // Hide all menus and the cart
    document.querySelectorAll('.menu-section').forEach(menu => menu.style.display = 'none');
    document.getElementById('cart').style.display = 'none';
    
    // Show the selected menu
    document.getElementById(`menu-${shop}`).style.display = 'block';
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const itemName = event.target.getAttribute('data-name');
        const itemPrice = parseInt(event.target.getAttribute('data-price'));

        // Add item to cart
        if (cart[itemName]) {
            cart[itemName].quantity += 1;
        } else {
            cart[itemName] = { price: itemPrice, quantity: 1 };
        }
        
        updateCart();
        alert(`${itemName} added to cart!`);
    }
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items
    totalPrice = 0;

    for (const item in cart) {
        const { price, quantity } = cart[item];
        totalPrice += price * quantity;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item} - Rs ${price} x 
            <button onclick="updateQuantity('${item}', -1)">-</button>
            <span>${quantity}</span>
            <button onclick="updateQuantity('${item}', 1)">+</button>
            <span class="price">Rs ${price * quantity}</span>
        `;
        cartItems.appendChild(li);
    }
    document.getElementById('cart-total').innerText = `Rs ${totalPrice}`;
}

function updateQuantity(item, change) {
    if (cart[item]) {
        cart[item].quantity += change;

        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        
        updateCart();
    }
}

function checkout() {
    alert('Proceeding to checkout...');
    // Implement the checkout logic here
}
