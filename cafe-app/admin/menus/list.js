// 기본 메뉴 데이터 (localStorage가 비어있을 때 사용)
const defaultMenus = [
    { id: 1, category: '커피', name: '아메리카노', price: 4500, status: '판매중', image: '☕️' },
    { id: 2, category: '커피', name: '카페 라떼', price: 5000, status: '판매중', image: '☕️' },
    { id: 3, category: '커피', name: '바닐라 라떼', price: 5500, status: '판매중', image: '☕️' },
    { id: 4, category: '커피', name: '콜드브루', price: 5000, status: '품절', image: '🧊' },
    { id: 5, category: '디저트', name: '초코무스 케이크', price: 6500, status: '판매중', image: '🍰' },
    { id: 6, category: '음료', name: '자몽 에이드', price: 5500, status: '판매중', image: '🍹' }
];

// 페이지가 로드될 때 메뉴 목록을 불러오는 함수
function loadMenus(menusToRender) {
    let menus;
    // 인자로 메뉴 목록이 들어오지 않으면 localStorage에서 불러옴
    if (!menusToRender) {
        const storedMenus = localStorage.getItem('cafeMenus');
        if (!storedMenus) {
            // localStorage가 비어있으면 기본 메뉴로 초기화
            localStorage.setItem('cafeMenus', JSON.stringify(defaultMenus));
            menus = defaultMenus;
        } else {
            menus = JSON.parse(storedMenus);
        }
    } else {
        menus = menusToRender;
    }

    const tbody = document.getElementById('menuTableBody');
    tbody.innerHTML = ''; // 기존 내용을 비움

    menus.forEach(menu => {
        const statusClass = menu.status === '판매중' ? 'badge completed' : 'badge pending';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><div class="menu-thumbnail">${menu.image}</div></td>
            <td><span class="category-tag">${menu.category}</span></td>
            <td class="menu-name">${menu.name}</td>
            <td>₩${menu.price.toLocaleString()}</td>
            <td><span class="${statusClass}">${menu.status}</span></td>
            <td>
                <button class="btn-small edit" onclick="location.href='edit.html?id=${menu.id}'">수정</button>
                <button class="btn-small delete" onclick="deleteMenu(${menu.id})">삭제</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 메뉴 삭제 함수
function deleteMenu(id) {
    if(confirm('정말 이 메뉴를 삭제하시겠습니까?')) {
        let menus = JSON.parse(localStorage.getItem('cafeMenus'));
        menus = menus.filter(menu => menu.id !== id);
        localStorage.setItem('cafeMenus', JSON.stringify(menus));
        loadMenus(); // 목록 새로고침
    }
}

// 검색 기능
document.getElementById('searchInput').addEventListener('keyup', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const menus = JSON.parse(localStorage.getItem('cafeMenus'));
    const filteredMenus = menus.filter(menu => menu.name.toLowerCase().includes(searchTerm));
    loadMenus(filteredMenus); // 필터링된 결과로 목록 다시 렌더링
});

// 페이지 첫 로드 시 실행
document.addEventListener('DOMContentLoaded', () => loadMenus());