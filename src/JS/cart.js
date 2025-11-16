// Cart functionality
(function(){
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const continueShopping = document.getElementById('continue-shopping');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPriceEl = document.querySelector('.total-price');

    // Cart data (em produção, usar localStorage ou API)
    let cart = [];

    // Open cart
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close cart
    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update cart display
    function updateCart() {
        // Update count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update total price
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        // Render items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Seu carrinho está vazio</p>
                    <small>Adicione produtos para começar suas compras</small>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        <div class="cart-item-controls">
                            <button onclick="window.cartManager.decreaseQuantity(${item.id})">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button onclick="window.cartManager.increaseQuantity(${item.id})">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="window.cartManager.removeItem(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    // Add item to cart
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        openCart();
    }

    // Increase quantity
    function increaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    }

    // Decrease quantity
    function decreaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            updateCart();
        } else if (item && item.quantity === 1) {
            removeItem(id);
        }
    }

    // Remove item
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    // Event listeners
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', closeCartSidebar);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }

    // Expose functions globally for demo (em produção, usar módulos)
    window.cartManager = {
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        openCart
    };

    // Initialize
    updateCart();

    // Demo: Adicionar produtos de exemplo (remover em produção)
    // Exemplo de uso: window.cartManager.addToCart({ id: 1, name: 'Produto Teste', price: 99.90, image: '/src/img/teste.webp' });
})();
