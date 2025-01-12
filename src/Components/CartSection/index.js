import React, { useState, useEffect } from 'react';
import { useMyContext } from '../../MyContext'; // Access MyContext
import './index.css'; // CSS file for styles

const CartPage = () => {
    const { cart, addCart } = useMyContext(); // Access cart and addCart from context
    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const increaseCount = (key) => {
        const updatedCart = { ...cartItems };
        updatedCart[key].count += 1;
        addCart(updatedCart);
    };

    const decreaseCount = (key) => {
        const updatedCart = { ...cartItems };
        if (updatedCart[key].count > 1) {
            updatedCart[key].count -= 1;
            addCart(updatedCart);
        } else {
            delete updatedCart[key];
            addCart(updatedCart);
        }
    };

    const calculateTotalPrice = () => {
        return Object.values(cartItems).reduce(
            (total, item) => total + item.price * item.count,
            0
        );
    };

    return (
        <div className="cart-page">
            <header className="cart-header">
                <h2>Your Cart</h2>
                <p className="delivery-info">Standard Delivery ({Object.keys(cartItems).length})</p>
                <p className="free-shipping-banner">
                    Add ₹{Math.max(0, 50 - calculateTotalPrice()).toFixed(2)} for free shipping!
                </p>
            </header>
            <div className="cart-items">
                {Object.keys(cartItems).map((key) => {
                    const item = cartItems[key];
                    return (
                        <div key={key} className="cart-item">
                            <div className="cart-item-details">
                                
                                <div className="item-info">
                                    <p className="item-name">{key}</p>
                                    <p className="item-desc">{item.description}</p>
                                    <p className="item-price">₹{item.price}</p>
                                </div>
                            </div>
                            <div className="item-count-container">
                                <button className="count-btn" onClick={() => decreaseCount(key)}>-</button>
                                <span className="item-count">{item.count}</span>
                                <button className="count-btn" onClick={() => increaseCount(key)}>+</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="cart-footer">
                <div className="subtotal">
                    <h3>Subtotal</h3>
                    <h3>₹{calculateTotalPrice()}</h3>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default CartPage;
