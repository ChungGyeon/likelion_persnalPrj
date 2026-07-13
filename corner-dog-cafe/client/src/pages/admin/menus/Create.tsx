import React, { useState } from 'react';
import { categories } from '../../../js/data';

const AdminMenuCreate = () => {
  const [formData, setFormData] = useState({
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
    console.log('메뉴 생성:', formData);
  };

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">메뉴 추가</h1>
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
        <button type="submit" className="px-6 py-3 bg-accent text-white rounded-lg">추가하기</button>
      </form>
    </div>
  );
};

export default AdminMenuCreate;
