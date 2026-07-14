import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/MenuCard';
import { categories } from '../../js/data';
import { useApi } from '../../hooks/useApi';
import apiClient from '../../lib/api';

const fetchMenus = () => apiClient.get('/menus');

const List = () => {
  const { data: menus, loading, error, execute } = useApi(fetchMenus);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('인기순');

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  const filteredMenus = menus
    ?.filter((menu) =>
      selectedCategory === '전체' ||
      categories.find((cat) => cat.id === menu.categoryId)?.name === selectedCategory
    )
    .filter((menu) => menu.name.includes(searchTerm))
    .sort((a, b) => {
      if (sortOrder === '가격 낮은순') return a.price - b.price;
      if (sortOrder === '가격 높은순') return b.price - a.price;
      return 0; // 인기순은 기본 정렬
    });

  return (
    <div className="bg-surface min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {['전체', ...categories.map((cat) => cat.name)].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-accent text-white' : 'bg-mid text-muted'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="검색"
          className="border px-4 py-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-lg"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="인기순">인기순</option>
          <option value="가격 낮은순">가격 낮은순</option>
          <option value="가격 높은순">가격 높은순</option>
        </select>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMenus?.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default List;
