import React, { useState } from 'react';
import { useParams } from 'wouter';
import { menus } from '../../js/data';

const Detail = () => {
    const { id } = useParams();
    const menu = menus.find((menu) => menu.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});

    if (!menu) {
        return <div>메뉴를 찾을 수 없습니다.</div>;
    }

    const handleOptionChange = (optionName, choice) => {
        setSelectedOptions((prev) => ({ ...prev, [optionName]: choice }));
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        console.log('장바구니에 추가:', { menu, quantity, selectedOptions });
    };

    return (
        <div className="bg-surface min-h-screen p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={menu.imageUrl} alt={menu.name} className="w-full h-auto rounded-lg" />
                <div>
                    <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
                    <p className="text-lg mb-4">{menu.description}</p>
                    <p className="text-xl font-semibold mb-4">{menu.price}원</p>

                    {menu.options && menu.options.map((option) => (
                        <div key={option.name} className="mb-4">
                            <h3 className="text-lg font-bold mb-2">{option.name}</h3>
                            <div className="flex space-x-2">
                                {option.choices.map((choice) => (
                                    <button
                                        key={choice.label}
                                        className={`px-4 py-2 rounded-lg ${selectedOptions[option.name] === choice.label ? 'bg-accent text-white' : 'bg-mid text-muted'}`}
                                        onClick={() => handleOptionChange(option.name, choice.label)}
                                    >
                                        {choice.label} (+{choice.price}원)
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center space-x-4 mb-4">
                        <button onClick={() => handleQuantityChange(quantity - 1)} className="px-4 py-2 bg-mid text-white rounded-lg">-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(quantity + 1)} className="px-4 py-2 bg-mid text-white rounded-lg">+</button>
                    </div>

                    <button onClick={handleAddToCart} className="px-6 py-3 bg-accent text-white rounded-lg">장바구니에 담기</button>
                </div>
            </div>
        </div>
    );
};

export default Detail;