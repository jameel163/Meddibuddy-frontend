// import React, { useState, useEffect } from 'react';
// import { BiSolidTimer } from "react-icons/bi";
// import { IoMdHome } from "react-icons/io";
// import { ImLab } from "react-icons/im";
// import "./index.css"

// const FeaturedSection = (props) => {
//     const [activeBtn, setActiveBtn] = useState("POPULAR");
//     const [currentCart, setCurrentCart] = useState({});

//     let data;
//     data = props.props ? props.props : "";

//     useEffect(() => {
//         setCurrentCart(currentCart);
//     }, [currentCart]);

//     // Button Section
//     const categoriesSection = (data) => {
//         const categories = data["10386"];
//         let items = [];
//         for (let i = 0; i < categories.length; i++) {
//             items.push(
//                 <li key={i} onClick={() => setActiveBtn(categories[i].toUpperCase())} className={`${activeBtn === categories[i].toUpperCase() ? "active-button" : ""} each-category-item`}>
//                     <button>{categories[i]}</button>
//                 </li>
//             );
//         }
//         return <ul className="categories-list">{items}</ul>;  // Wrap items inside <ul>
//     };

//     // Increase Cart Item Count
//     const increaseBtn = (name) => {
//         let temp = { ...currentCart };
//         temp[name] = temp[name] ? temp[name] + 1 : 1;
//         setCurrentCart(temp);  // Correct state update without affecting category selection
//     };

//     // Render Cards
//     const cards = (data, i) => {
//         return (
//             <li className='featured-card-list' key={i}>
//                 <h3 className='featured-card-list-heading'>{data.packageDisplayName}</h3>
//                 <div className='report-time'>
//                     <BiSolidTimer className='timer-icon' />
//                     <p>{data.reportsTatText}</p>
//                 </div>
//                 <div className='featured-card-list-element-2'>
//                     <div className='test-count-container'>
//                         <p className='testcount'>{data.testCount} Tests</p>
//                         <ul className='testsummary'>
//                             <li>{data.testsSummary[0]}</li>
//                             <li>{data.testsSummary[1]}....+ {data.testCount - 2} more</li>
//                         </ul>
//                     </div>
//                     <div className='includes-container'>
//                         <p className='testcount'>Includes</p>
//                         <div className='includes-image-container'>
//                             <img className='radiology-image' src="https://www.doctor2u.my/wp-content/uploads/2018/01/View-Radiology-icon.png" alt="" />
//                             <p>Radiology</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='featured-card-list-element-3'>
//                     <div>
//                         <p className='fasting'>Fasting</p>
//                         <p className='fasting-hour'>{data.fastingHoursText || "Not required"}</p>
//                     </div>
//                     <div>
//                         <p className='fasting'>Available at</p>
//                         {data.visitType.includes("HomeVisit") ? (
//                             <div className='home-icon-container'>
//                                 <IoMdHome className='home-icon' />
//                                 <p> Home</p>
//                             </div>
//                         ) : ""}
//                         {data.visitType.includes("LabVisit") ? (
//                             <div className='home-icon-container'>
//                                 <ImLab className='home-icon' />
//                                 <p> Lab</p>
//                             </div>
//                         ) : ""}
//                     </div>
//                 </div>
//                 <div className='price-container'>
//                     <p>₹{data.price}</p>
//                     <div className='add-cart-button'>
//                         <button>-</button>
//                         <p>{currentCart[data.packageName] || 0}</p>
//                         <button onClick={() => increaseBtn(data.packageName)}>+</button>
//                     </div>
//                 </div>
//             </li>
//         );
//     };

//     const cardsContainer = (data) => {
//         let elements;
//         const temp = data[0].packages;
//         elements = temp.filter((each) => each.subCategories.includes(activeBtn));

//         return (
//             <ul className="featured-card-container">
//                 {elements.map((item, index) => cards(item, index))}
//             </ul>
//         );
//     };

//     return (
//         <div className="featured-container">
//             <div className="featured-heading-container">
//                 <h3 className="featured-heading">Featured Health Check-up</h3>
//                 <button className="featured-heading-container-view-all">View All</button>
//             </div>
//             {data.categories ? categoriesSection(data.categories) : ""}
//             {data.props ? cardsContainer(data.props) : ""}
//         </div>
//     );
// };

// export default FeaturedSection;

// FeaturedSection.js
import React, { useState, useEffect } from 'react';
import { BiSolidTimer } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { ImLab } from "react-icons/im";
import { useMyContext } from '../../MyContext' // Import useMyContext hook
import "./index.css"

const FeaturedSection = (props) => {
  const { cart, addCart } = useMyContext(); // Access cart and addCart from context
  const [activeBtn, setActiveBtn] = useState("POPULAR");

  let data = props.props ? props.props : "";

  // Button Section
  const categoriesSection = (data) => {
    const categories = data["10386"];
    let items = [];
    for (let i = 0; i < categories.length; i++) {
      items.push(
        <li
          key={i}
          onClick={() => setActiveBtn(categories[i].toUpperCase())}
          className={`${activeBtn === categories[i].toUpperCase() ? "active-button" : ""} each-category-item`}
        >
          <button>{categories[i]}</button>
        </li>
      );
    }
    return <ul className="categories-list">{items}</ul>;  // Wrap items inside <ul>
  };

  // Increase Cart Item Count
  const increaseBtn = (data) => {
    const name = data.packageName
    const newCart = { ...cart };
    if (newCart[name]) {
      newCart[name].count += 1;
    } else {
      newCart[name] = { price: data.price, count: 1 };
    }
    addCart(newCart); // Update global cart state in the context
  };
  
  const decreaseBtn = (name) => {
    const newCart = { ...cart };
  
    // Check if the item exists in the cart and the count is greater than 0
    if (newCart[name] && newCart[name].count > 0) {
      // Decrement the count
      newCart[name].count -= 1;
  
      // If the count reaches 0, remove the item from the cart
      if (newCart[name].count === 0) {
        delete newCart[name]; // Remove the item from the cart
      }
  
      // Update global cart state in the context
      addCart(newCart);
    }
  };
  
  
  // Render the card content
  const cards = (data, i) => {
    const itemCount = cart[data.packageName]?.count || 0;
    const itemPrice = cart[data.packageName]?.price || 0;
  
    return (
      <li className='featured-card-list' key={i}>
        <h3 className='featured-card-list-heading'>{data.packageDisplayName}</h3>
        <div className='report-time'>
          <BiSolidTimer className='timer-icon' />
          <p>{data.reportsTatText}</p>
        </div>
        <div className='featured-card-list-element-2'>
          <div className='test-count-container'>
            <p className='testcount'>{data.testCount} Tests</p>
            <ul className='testsummary'>
              <li>{data.testsSummary[0]}</li>
              <li>{data.testsSummary[1]}....+ {data.testCount - 2} more</li>
            </ul>
          </div>
          <div className='includes-container'>
            <p className='testcount'>Includes</p>
            <div className='includes-image-container'>
              <img
                className='radiology-image'
                src='https://www.doctor2u.my/wp-content/uploads/2018/01/View-Radiology-icon.png'
                alt=''
              />
              <p>Radiology</p>
            </div>
          </div>
        </div>
        <div className='featured-card-list-element-3'>
          <div>
            <p className='fasting'>Fasting</p>
            <p className='fasting-hour'>{data.fastingHoursText || 'Not required'}</p>
          </div>
          <div>
            <p className='fasting'>Available at</p>
            {data.visitType.includes('HomeVisit') ? (
              <div className='home-icon-container'>
                <IoMdHome className='home-icon' />
                <p> Home</p>
              </div>
            ) : (
              ''
            )}
            {data.visitType.includes('LabVisit') ? (
              <div className='home-icon-container'>
                <ImLab className='home-icon' />
                <p> Lab</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='price-container'>
          <p>₹{data.price}</p>
          <div className='add-cart-button'>
            <button onClick={() => decreaseBtn(data.packageName)}>-</button>
            <p>{itemCount}</p> {/* Render count here */}
            <button onClick={() => increaseBtn(data)}>+</button>
          </div>
        </div>
      </li>
    );
  };
  
  // Cards container
  const cardsContainer = (data) => {
    let elements;
    const temp = data[0].packages;
    elements = temp.filter((each) => each.subCategories.includes(activeBtn));
  
    return (
      <ul className='featured-card-container'>
        {elements.map((item, index) => cards(item, index))}
      </ul>
    );
  };
  

  return (
    <div className="featured-container">
      <div className="featured-heading-container">
        <h3 className="featured-heading">Featured Health Check-up</h3>
        <button className="featured-heading-container-view-all">View All</button>
      </div>
      {data.categories ? categoriesSection(data.categories) : ""}
      {data.props ? cardsContainer(data.props) : ""}
    </div>
  );
};

export default FeaturedSection;
