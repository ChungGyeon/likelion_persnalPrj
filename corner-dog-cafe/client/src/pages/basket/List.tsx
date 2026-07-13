import React, { useContext } from 'react';
import { useCart } from '../../contexts/CartContext';

const BasketList = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      addToCart({ ...item, quantity: newQuantity });
    } else {
      removeFromCart(item.id);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-surface min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      {cart.length === 0 ? (
        <div className="text-center text-muted">장바구니가 비어 있습니다.</div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg" />
                <div className="flex-grow">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-muted">{item.price}원</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    className="px-2 py-1 bg-mid text-white rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="px-2 py-1 bg-mid text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-danger text-white rounded-lg"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-mid text-white rounded-lg">
            <p className="text-lg font-bold">합계: {totalPrice}원</p>
            <button className="mt-4 px-6 py-3 bg-accent text-white rounded-lg">주문하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketList;
