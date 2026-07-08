// 장바구니 데이터 모델
let basketItems = [
    { id: 1, name: '시그니처 아메리카노', price: 4500, quantity: 2, icon: 'fa-mug-hot' },
    { id: 2, name: '리얼 딸기 라떼', price: 6000, quantity: 1, icon: 'fa-glass-water' },
    { id: 3, name: '크림 치즈 베이글', price: 5500, quantity: 1, icon: 'fa-bread-slice' },
];

const basketList = document.getElementById('basket-items');
const subtotalEl = document.getElementById('subtotal-price');
const totalEl = document.getElementById('total-price');
const discountEl = document.getElementById('discount-price');

// 숫자 포맷팅 유틸리티
const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
};

// 총액 계산 및 렌더링
const updateTotals = () => {
    let subtotal = 0;
    basketItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let discount = 0;
    // 15000원 이상 구매시 10% 할인 프로모션
    if (subtotal >= 15000) {
        discount = subtotal * 0.1;
    }

    const total = subtotal - discount;

    subtotalEl.textContent = formatPrice(subtotal);
    discountEl.textContent = '-' + formatPrice(discount);
    totalEl.textContent = formatPrice(total);
};

// 수량 변경 로직
const changeQuantity = (id, delta) => {
    const item = basketItems.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) item.quantity = 1;
        renderCart();
    }
};

// 아이템 삭제 로직
const removeItem = (id) => {
    basketItems = basketItems.filter(item => item.id !== id);
    renderCart();
};

// 장바구니 렌더링
const renderCart = () => {
    basketList.innerHTML = '';

    if (basketItems.length === 0) {
        basketList.innerHTML = `
            <div class="empty-cart glass-panel">
                <i class="fa-solid fa-basket-shopping"></i>
                <h3>장바구니가 비어있습니다.</h3>
                <p>맛있는 메뉴를 담아보세요!</p>
            </div>
        `;
        updateTotals();
        return;
    }

    basketItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item glass-panel';
        
        li.innerHTML = `
            <div class="item-info">
                <div class="item-icon">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${formatPrice(item.price)}</p>
                </div>
            </div>
            
            <div class="item-actions">
                <div class="quantity-control">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                
                <div class="item-total">
                    <strong>${formatPrice(item.price * item.quantity)}</strong>
                </div>
                
                <button class="remove-btn" onclick="removeItem(${item.id})" title="삭제">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        basketList.appendChild(li);
    });

    updateTotals();
};

// 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
