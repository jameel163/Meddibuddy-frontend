// TopSection.js
import React from 'react';
import { IoLocation, IoWalletOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { useMyContext } from '../../MyContext'; // Import the custom hook
import { useNavigate } from 'react-router-dom';
import './index.css';

const TopSection = () => {
  const { cart } = useMyContext(); // Access the cart from context
  const navigate = useNavigate(); 
  // Calculate the number of unique items in the cart (count of keys)
  const uniqueItemsCount = Object.keys(cart).length;

  const handleClick = () => {
    navigate('/cart-page'); // Redirect to /another-page when the item is clicked
  };

  return (
    <div className="top-section">
      <div>
        <div className="address-section">
          <p className="top-add">Billekahli</p>
          <IoLocation className="location-icon" />
        </div>
        <p className="bel-add">Saravabhoumanagar</p>
      </div>

      <div className="wallet-container">
        <IoWalletOutline className="wallet" />
        <div className="wallet-section" onClick={handleClick}>
          <LuShoppingCart className="wallet" />
          {/* Conditionally render the cart count */}
          {uniqueItemsCount > 0 && <p>{uniqueItemsCount}</p>}
        </div>
      </div>
    </div>
  );
};

export default TopSection;
