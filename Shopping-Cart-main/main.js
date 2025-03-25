const store = {
    shoppingCart: [],
    productList: [],
    appliedPromoCode: null,
    promoCodeDiscounts: {
        'ostad10': 0.10, // 10% discount
        'ostad5': 0.05   // 5% discount
    }
};

async function startWebsite() {
    try {
        const response = await fetch('https://fakestoreapi.in/api/products');
        const data = await response.json();
        store.productList = data.products;
        showProducts();
    } catch (error) {
        console.error('Oops! Could not load products:', error);
        showErrorMessage();
    }
}

function showErrorMessage() {
    const productArea = document.getElementById('productGrid');
    productArea.innerHTML = `
        <div class="col-12 text-center">
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle me-2"></i>
                Sorry! We couldn't load the products. Please try again later.
            </div>
        </div>
    `;
}

function showProducts() {
    const productArea = document.getElementById('productGrid');
    productArea.innerHTML = store.productList.map(product => {
        const safeTitle = product.title.replace(/['"]/g, '');
        
        return `
            <div class="col-lg-3 col-md-6">
                <div class="card product-card h-100">
                    <div class="card-badge">
                        <span class="badge bg-primary">New!</span>
                    </div>
                    <img src="${product.image}" class="card-img-top p-3" alt="${safeTitle}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${safeTitle}</h5>
                        <p class="card-text flex-grow-1">${product.description.slice(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="price-tag">$${product.price}</span>
                            <button class="btn btn-primary" 
                                onclick="addToCart(${product.id}, '${safeTitle}', ${product.price}, '${product.image}')">
                                <i class="fas fa-cart-plus me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function addToCart(productId, title, price, image) {
    const existingItem = store.shoppingCart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        store.shoppingCart.push({
            id: productId,
            title,
            price,
            image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showSuccessMessage();
}

function updateCartDisplay() {
    updateCartItems();
    updateCartSummary();
    updateCartBadge();
}

function updateCartItems() {
    const cartArea = document.getElementById('cartItems');
    
    if (store.shoppingCart.length === 0) {
        cartArea.innerHTML = `
            <div class="text-center p-4">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartArea.innerHTML = store.shoppingCart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="btn-quantity" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="btn-quantity">${item.quantity}</span>
                    <button class="btn-quantity" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="btn-remove" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateQuantity(productId, newQuantity) {
    const item = store.shoppingCart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeItem(productId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
        }
    }
}

function removeItem(productId) {
    store.shoppingCart = store.shoppingCart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartSummary() {
    const subtotal = store.shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.10;
    const discount = store.appliedPromoCode ? subtotal * store.promoCodeDiscounts[store.appliedPromoCode] : 0;
    const total = subtotal + tax - discount;

    document.getElementById('subtotalPrice').textContent = subtotal.toFixed(2);
    document.getElementById('vat').textContent = tax.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    document.querySelector('.discount-row').style.display = store.appliedPromoCode ? 'flex' : 'none';
}

function updateCartBadge() {
    const totalItems = store.shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = totalItems;
}

function applyPromoCode() {
    const promoCodeInput = document.getElementById('promoCodeInput');
    const promoCode = promoCodeInput.value.trim();
    const promoCodeMessage = document.getElementById('promoCodeMessage');

    if (store.appliedPromoCode) {
        promoCodeMessage.textContent = 'A promo code has already been applied.';
        promoCodeMessage.className = 'promo-code-message error';
        return;
    }

    if (store.promoCodeDiscounts[promoCode]) {
        store.appliedPromoCode = promoCode;
        promoCodeMessage.textContent = 'Promo code applied successfully!';
        promoCodeMessage.className = 'promo-code-message success';
        updateCartSummary();
    } else {
        promoCodeMessage.textContent = 'Invalid promo code.';
        promoCodeMessage.className = 'promo-code-message error';
    }
}

function checkout() {
    if (store.shoppingCart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    store.shoppingCart = [];
    store.appliedPromoCode = null;
    updateCartDisplay();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.remove('open');
}

function showSuccessMessage() {
    const toast = document.getElementById('toast');
    const toastInstance = new bootstrap.Toast(toast);
    toastInstance.show();
}

startWebsite();
