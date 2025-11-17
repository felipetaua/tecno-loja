// Carrega os detalhes do produto
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        showNotFound();
        return;
    }

    try {
        const response = await fetch('/produtos.json');
        const data = await response.json();
        
        const product = data.produtos.find(p => p.id === productId);

        if (!product) {
            showNotFound();
            return;
        }

        renderProduct(product);
        
        loadRelatedProducts(data.produtos, product.categoria, productId);
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('breadcrumb').style.display = 'flex';
        document.getElementById('product-container').style.display = 'block';

    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        showNotFound();
    }
}

function fixImagePath(imagePath) {
    // ajusta o caminho das imagens do produtos
    if (imagePath.startsWith('./src/')) {
        return imagePath.replace('./src/', '../src/');
    }
    if (imagePath.startsWith('/src/')) {
        return imagePath.replace('/src/', '../src/');
    }
    return imagePath;
}


function renderProduct(product) {
    document.getElementById('page-title').textContent = `${product.nome} - Tecno Loja`;

    document.getElementById('breadcrumb-category').textContent = product.categoria;
    document.getElementById('breadcrumb-product').textContent = product.nome;

    document.getElementById('product-image').src = fixImagePath(product.imagem);
    document.getElementById('product-image').alt = product.nome;

    if (product.emPromocao && product.tipoPromocao) {
        const badge = document.getElementById('product-badge');
        badge.textContent = product.tipoPromocao;
        badge.classList.add(product.tipoPromocao.includes('OFF') ? 'badge-off' : 'badge-sale');
        badge.style.display = 'block';
    }

    document.getElementById('product-category').textContent = product.categoria;

    const stockElement = document.getElementById('product-stock');
    if (product.estoque > 20) {
        stockElement.textContent = 'Em estoque';
        stockElement.classList.add('in-stock');
    } else if (product.estoque > 0) {
        stockElement.textContent = `Apenas ${product.estoque} em estoque`;
        stockElement.classList.add('low-stock');
    } else {
        stockElement.textContent = 'Fora de estoque';
        stockElement.classList.add('out-stock');
    }

    document.getElementById('product-title').textContent = product.nome;

    const ratingContainer = document.getElementById('product-rating');
    const starsDiv = ratingContainer.querySelector('.stars');
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="fa-regular fa-star"></i>';
    }
    
    starsDiv.innerHTML = starsHTML;
    ratingContainer.querySelector('.rating-value').textContent = `${product.rating} / 5.0`;

    document.getElementById('product-description').textContent = product.descricao;

    const tagsContainer = document.getElementById('product-tags');
    if (product.tags && product.tags.length > 0) {
        tagsContainer.innerHTML = product.tags.map(tag => 
            `<span class="product-tag">#${tag}</span>`
        ).join('');
    }

    document.getElementById('current-price').textContent = `R$ ${product.preco.toFixed(2).replace('.', ',')}`;
    
    const oldPriceElement = document.getElementById('old-price');
    if (product.precoAntigo && product.precoAntigo > product.preco) {
        oldPriceElement.textContent = `R$ ${product.precoAntigo.toFixed(2).replace('.', ',')}`;
        oldPriceElement.style.display = 'inline';
    } else {
        oldPriceElement.style.display = 'none';
    }

    // Badge de desconto
    const discountBadge = document.getElementById('discount-badge');
    if (product.desconto > 0) {
        discountBadge.textContent = `-${product.desconto}% OFF`;
        discountBadge.style.display = 'block';
    } else {
        discountBadge.style.display = 'none';
    }

    const btnAddCart = document.getElementById('btn-add-cart');
    const quantityInput = document.getElementById('quantity-input');
    
    if (product.estoque === 0) {
        btnAddCart.disabled = true;
        btnAddCart.textContent = 'Produto Esgotado';
        btnAddCart.style.opacity = '0.5';
        btnAddCart.style.cursor = 'not-allowed';
    } else {
        quantityInput.max = product.estoque;
        btnAddCart.onclick = () => {
            const quantity = parseInt(quantityInput.value);
            for (let i = 0; i < quantity; i++) {
                window.cartManager.addToCart({
                    id: product.id,
                    name: product.nome,
                    price: product.preco,
                    image: fixImagePath(product.imagem)
                });
            }
            // Feedback visual
            btnAddCart.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
            setTimeout(() => {
                btnAddCart.innerHTML = 'Adicionar ao Carrinho';
            }, 2000);
        };
    }
}

function loadRelatedProducts(allProducts, category, currentProductId) {
    const relatedProducts = allProducts
        .filter(p => p.categoria === category && p.id !== currentProductId)
        .slice(0, 4);

    const grid = document.getElementById('related-products-grid');
    
    if (relatedProducts.length === 0) {
        document.getElementById('related-products').style.display = 'none';
        return;
    }

    grid.innerHTML = relatedProducts.map(product => `
        <a href="/pages/produto-detalhes.html?id=${product.id}" class="related-product-card">
            <img src="${fixImagePath(product.imagem)}" alt="${product.nome}">
            <div class="related-product-info">
                <h3>${product.nome}</h3>
                <div class="related-product-price">
                    <span class="value">R$ ${product.preco.toFixed(2).replace('.', ',')}</span>
                    ${product.precoAntigo > product.preco ? 
                        `<span class="old">R$ ${product.precoAntigo.toFixed(2).replace('.', ',')}</span>` 
                        : ''}
                </div>
            </div>
        </a>
    `).join('');
}

function showNotFound() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('product-not-found').style.display = 'flex';
}

// Controle de quantidade
document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity-input');
    const btnMinus = document.getElementById('qty-minus');
    const btnPlus = document.getElementById('qty-plus');
    const btnFavorite = document.getElementById('btn-favorite');

    btnMinus.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    btnPlus.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        const maxValue = parseInt(quantityInput.max);
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
        }
    });

    btnFavorite.addEventListener('click', () => {
        btnFavorite.classList.toggle('favorited');
        const icon = btnFavorite.querySelector('i');
        
        if (btnFavorite.classList.contains('favorited')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });

    loadProductDetails();
});
