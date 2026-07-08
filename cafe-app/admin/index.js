// 페이지가 로드될 때 메뉴 데이터를 불러오고 화면에 표시하는 함수
function loadDashboardData() {
    // localStorage에서 메뉴 데이터 가져오기
    const storedMenus = localStorage.getItem('cafeMenus');
    const menus = storedMenus ? JSON.parse(storedMenus) : [];

    // 활성 메뉴 개수 업데이트
    const activeMenus = menus.filter(m => m.status === '판매중');
    const activeMenuCountEl = document.getElementById('activeMenuCount');
    if (activeMenuCountEl) {
        activeMenuCountEl.textContent = `${activeMenus.length}개`;
    }

    // 메뉴 목록 테이블 렌더링
    const tbody = document.getElementById('dashboardMenuTableBody');
    if (!tbody) return; // 테이블이 없으면 실행 중단

    tbody.innerHTML = ''; // 기존 내용 초기화

    // 최근 5개 메뉴만 대시보드에 표시 (혹은 원하는 개수만큼)
    const recentMenus = menus.slice(-5).reverse(); 

    recentMenus.forEach(menu => {
        const statusClass = menu.status === '판매중' ? 'badge completed' : 'badge pending';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><div class="menu-thumbnail">${menu.image}</div></td>
            <td><span class="category-tag">${menu.category}</span></td>
            <td class="menu-name">${menu.name}</td>
            <td>₩${menu.price.toLocaleString()}</td>
            <td><span class="${statusClass}">${menu.status}</span></td>
            <td>
                <button class="btn-small edit" onclick="location.href='menus/edit.html?id=${menu.id}'">수정</button>
                <button class="btn-small delete" onclick="deleteMenu(${menu.id})">삭제</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 메뉴 삭제 함수 (list.js와 동일한 기능)
function deleteMenu(id) {
    if (confirm('정말 이 메뉴를 삭제하시겠습니까?')) {
        let menus = JSON.parse(localStorage.getItem('cafeMenus'));
        menus = menus.filter(menu => menu.id !== id);
        localStorage.setItem('cafeMenus', JSON.stringify(menus));
        loadDashboardData(); // 대시보드 데이터 새로고침
    }
}

// DOM이 완전히 로드된 후 대시보드 데이터 로드 함수 실행
document.addEventListener('DOMContentLoaded', loadDashboardData);