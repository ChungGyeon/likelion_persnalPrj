import React from 'react';

const MenuCard = ({ menu }) => (
  <div className="card">
    <img src={menu.imageUrl} alt={menu.name} />
    <h3>{menu.name}</h3>
    <p>{menu.price}원</p>
  </div>
);

export default MenuCard;
