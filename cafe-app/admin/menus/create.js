// 카테고리에 맞춰 자동으로 이모지를 할당하기 위한 맵
const categoryEmojiMap = {
    '커피': '☕️',
    '음료': '🍹',
    '디저트': '🍰',
    '베이커리': '🥐'
};

document.getElementById('createMenuForm').addEventListener('submit', function(e) {
    // 폼이 제출되면서 페이지가 새로고침 되는 기본 동작을 막음
    e.preventDefault();

    // 1. 입력된 값 가져오기
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').value;
    const name = document.getElementById('menuName').value;
    const price = parseInt(document.getElementById('price').value, 10);

    // 체크박스 값 배열로 모으기 (예: ['HOT', 'ICE'])
    const checkedOptions = [];
    document.querySelectorAll('input[name="options"]:checked').forEach(checkbox => {
        checkedOptions.push(checkbox.value);
    });

    const description = document.getElementById('description').value;

    // 2. 기존 로컬스토리지 데이터 불러오기 (list.js와 동일한 키 사용)
    let menus = localStorage.getItem('cafeMenus');
    menus = menus ? JSON.parse(menus) : [];

    // 3. 새 메뉴에 부여할 고유 ID 생성 (가장 마지막 ID + 1)
    const newId = menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1;

    // 4. 리스트 형식에 맞게 새 메뉴 객체 생성
    const newMenu = {
        id: newId,
        category: category,
        name: name,
        price: price,
        status: status,
        image: categoryEmojiMap[category] || '🍽️', // 맵에 없으면 기본 이모지
        options: checkedOptions, // 옵션이나 설명은 당장 list 화면엔 안 나오지만 데이터엔 저장됨
        description: description
    };

    // 5. 배열에 추가하고 다시 로컬스토리지에 저장
    menus.push(newMenu);
    localStorage.setItem('cafeMenus', JSON.stringify(menus));

    // 6. 성공 알림 후 목록 페이지로 이동
    alert('새 메뉴가 성공적으로 추가되었습니다!');
    window.location.href = 'list.html';
});