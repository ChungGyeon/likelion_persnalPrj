import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { menus, categories } from '../../../js/data';

const AdminMenuEdit = () => {
  const { id } = useParams();
  const menu = menus.find((menu) => menu.id === parseInt(id));

  const [formData, setFormData] = useState(menu || {
    name: '',
    categoryId: '',
    price: '',
    description: '',
    imageUrl: '',
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('메뉴 수정:', formData);
  };
import React, { useState } from 'react';
  if (!menu) {
    return <div>메뉴를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">메뉴 수정</h1>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">메뉴명</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">카테고리</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">선택</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">가격</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">이미지 URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">재고 상태</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={(e) => setFormData((prev) => ({ ...prev, isAvailable: e.target.checked }))}
          /> 판매중
        </div>
        <button type="submit" className="px-6 py-3 bg-accent text-white rounded-lg">수정하기</button>
      </form>
    </div>
  );
};

export default AdminMenuEdit;
import { menus, categories } from '../../../js/data';

const AdminMenuList = () => {
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenus = menus.filter((menu) => {
    const categoryName = categories.find((cat) => cat.id === menu.categoryId)?.name;
    return (
      (categoryFilter === '전체' || categoryName === categoryFilter) &&
      menu.name.includes(searchTerm)
    );
  });

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">메뉴 관리</h1>
      <div className="flex space-x-4 mb-6">
        {['전체', ...categories.map((cat) => cat.name)].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${categoryFilter === category ? 'bg-accent text-white' : 'bg-mid text-muted'}`}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
        <input
          type="text"
          placeholder="검색"
          className="border px-4 py-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="p-4">썸네일</th>
            <th className="p-4">이름</th>
            <th className="p-4">카테고리</th>
            <th className="p-4">가격</th>
            <th className="p-4">재고 상태</th>
            <th className="p-4">액션</th>
          </tr>
        </thead>
        <tbody>
          {filteredMenus.map((menu) => (
            <tr key={menu.id}>
              <td className="p-4">
                <img src={menu.imageUrl} alt={menu.name} className="w-16 h-16 rounded-lg" />
              </td>
              <td className="p-4">{menu.name}</td>
              <td className="p-4">{categories.find((cat) => cat.id === menu.categoryId)?.name}</td>
              <td className="p-4">{menu.price}원</td>
              <td className="p-4">{menu.isAvailable ? '판매중' : '품절'}</td>
              <td className="p-4">
                <button className="px-4 py-2 bg-mid text-white rounded-lg mr-2">수정</button>
                <button className="px-4 py-2 bg-danger text-white rounded-lg">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenuList;
