// 공유 자원에서 데이터 및 유틸리티 가져오기 가정
import { menuData } from '../js/data.js'; 
import { cartUtil } from '../js/utils.js'; 

// URL 쿼리 스트링에서 메뉴 ID 획득 (예: detail.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const menuId = parseInt(urlParams.get('id')) || 1;

// 상태 관리 변수
let currentMenu = null;
let quantity = 1;
let selectedOptions = {
    temp: 'HOT',
    size: 'Regular'
};

// DOM 요소 
const elImage = document.getElementById('menuImage');
const elName = document.getElementById('menuName');
const elDescription = document.getElementById('menuDescription');
const elPrice = document.getElementById('menuPrice');
const elStatus = document.getElementById('menuStatus');
const elQuantity = document.getElementById('quantityDisplay');
const elTotalPrice = document.getElementById('totalPrice');
const elCartCount = document.getElementById('cartCount');

// 초기화 함수
function init() {
    // 1. 데이터 바인딩
    loadMenuData();
    // 2. 이벤트 리스너 등록
    setupEventListeners();
    // 3. 장바구니 카운트 동기화
    updateCartBadge();
}

// 메뉴 데이터 로드 및 렌더링
function loadMenuData() {
    // menuData 배열에서 id가 일치하는 아이템 매칭
    currentMenu = menuData.find(item => item.id === menuId);

    if (!currentMenu) {
        alert('존재하지 않는 메뉴입니다.');
        history.back();
        return;
    }

    // 데이터 화면에 반영
    elImage.src = currentMenu.image || 'https://via.placeholder.com/300';
    elImage.alt = currentMenu.name;
    elName.textContent = currentMenu.name;
    elDescription.textContent = currentMenu.description || '상세 설명이 없습니다.';
    elPrice.textContent = `${currentMenu.price.toLocaleString()}원`;
    
    if(currentMenu.status) {
        elStatus.textContent = currentMenu.status;
    }

    calculateTotalPrice();
}

// 총 금액 계산 및 렌더링
function calculateTotalPrice() {
    let basePrice = currentMenu.price;
    
    // 사이즈 옵션에 따른 추가 금액 예시 (+500원)
    if (selectedOptions.size === 'Large') {
        basePrice += 500;
    }

    const total = basePrice * quantity;
    elTotalPrice.textContent = `${total.toLocaleString()}원`;
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 수량 증가
    document.getElementById('btnIncrease').addEventListener('click', () => {
        quantity++;
        elQuantity.textContent = quantity;
        calculateTotalPrice();
    });

    // 수량 감소
    document.getElementById('btnDecrease').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            elQuantity.textContent = quantity;
            calculateTotalPrice();
        }
    });

    // 옵션 버튼 클릭 토글 이벤트
    document.querySelectorAll('.btn-option').forEach(button => {
        button.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const value = e.target.dataset.value;

            // 동일 그룹의 active 클래스 제거 후 현재 버튼에 추가
            document.querySelectorAll(`.btn-option[data-type="${type}"]`).forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            // 상태 업데이트 및 재계산
            selectedOptions[type] = value;
            calculateTotalPrice();
        });
    });

    // 장바구니 담기 버튼
    document.getElementById('btnAddToBasket').addEventListener('click', () => {
        const cartItem = {
            id: currentMenu.id,
            name: currentMenu.name,
            price: currentMenu.price,
            quantity: quantity,
            options: { ...selectedOptions }
        };
        
        // 공유 유틸리티(cartUtil)를 사용하여 로컬스토리지 등에 저장 처리
        if (cartUtil && typeof cartUtil.addItem === 'function') {
            cartUtil.addItem(cartItem);
            alert('장바구니에 상품을 담았습니다.');
            updateCartBadge();
        } else {
            // fallback 처리
            alert('장바구니 담기 성공 (유틸리티 연동 대기)');
        }
    });

    // 바로 주문하기 버튼
    document.getElementById('btnOrderNow').addEventListener('click', () => {
        const confirmOrder = confirm(`${currentMenu.name} 상품을 바로 주문하시겠습니까?`);
        if(confirmOrder) {
            // 주문 페이지 이동 혹은 로직 처리
            window.location.href = '../orders/list.html';
        }
    });
}

// 장바구니 배지 개수 갱신
function updateCartBadge() {
    if (cartUtil && typeof cartUtil.getCount === 'function') {
        elCartCount.textContent = cartUtil.getCount();
    }
}

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', init);