
// import React, { useState, useEffect } from 'react';
// import { BiSolidTimer } from "react-icons/bi";
// import { IoMdHome } from "react-icons/io";
// import { ImLab } from "react-icons/im";
// import { useMyContext } from '../../MyContext'
// import "./index.css"

// const BookPopular = (props) => {
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

//     // Decrease Cart Item Count (ensure it doesn't go below 0)
//     const decreaseBtn = (name) => {
//         let temp = { ...currentCart };
//         if (temp[name] > 0) {
//             temp[name] = temp[name] - 1;
//             setCurrentCart(temp);
//         }
//     };

//     // Render Cards
//     const cards = (data, i) => {
//         return (
//             <li className='bookpackage-card-list' key={i}>
                
//                 <div className='part-1'>
//                     <h3 >{data.testsSummary[0]}</h3>
//                     <div className='report-time'>
//                         <BiSolidTimer className='timer-icon' />
//                         <p>{data.reportsTatText}</p>
//                     </div>
//                     <div className='visit'>
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
//                 <div className='part-2'>
//                     <div className='price-cont'>
//                         <div className='price-discount'>
//                             <p className='discount'>₹{data.priceRange}</p>
//                             <p className='discount-percentage'>{data.discount}% OFF</p>
//                         </div>
//                         <p className='price'>₹{data.price}/- <span>Onwards</span></p>
//                     </div>
//                     <button>Add</button>
//                 </div>
                
//             </li>
//         );
//     };

//     const cardsContainer = (data) => {
//         let elements;
//         const temp = data[0].packages;
//         elements = temp.filter((each) => each.subCategories.includes(activeBtn));

//         return (
//             <ul className="bookpackage-card-container">
//                 {elements.map((item, index) => cards(item, index))}
//             </ul>
//         );
//     };

//     return (
//         <div className="featured-container bookpackage">
//             <div className="featured-heading-container">
//                 <h3 className="featured-heading">Book Popular Lab Test</h3>
//                 <button className="featured-heading-container-view-all">View All</button>
//             </div>
//             {data.categories ? categoriesSection(data.categories) : ""}
//             {data.props ? cardsContainer(data.props) : ""}
//         </div>
//     );
// };

// export default BookPopular;


import React, { useState, useEffect } from 'react';
import { BiSolidTimer } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { ImLab } from "react-icons/im";
import { useMyContext } from '../../MyContext';  // Import useMyContext hook
import "./index.css";

const BookPopular = (props) => {
    const { cart, addCart } = useMyContext();  // Access cart and addCart from context
    const [activeBtn, setActiveBtn] = useState("POPULAR");

    let data = props.props ? props.props : "";

    
    // Button Section
    const categoriesSection = (data) => {
        const categories = data["10386"];
        let items = [];
        for (let i = 0; i < categories.length; i++) {
            items.push(
                <li key={i} onClick={() => setActiveBtn(categories[i].toUpperCase())} className={`${activeBtn === categories[i].toUpperCase() ? "active-button" : ""} each-category-item`}>
                    <button>{categories[i]}</button>
                </li>
            );
        }
        return <ul className="categories-list">{items}</ul>;
    };

    // Add Item to Cart and Update Button Text
    const handleAddToCart = (data) => {
        const key = data.testsSummary && data.testsSummary[0] ? data.testsSummary[0] : data.packageName;  // Check if testsSummary[0] exists, otherwise fallback to packageName
        const newCart = { ...cart };

        // Update cart state and change button text to 'Added'
        if (!newCart[key]) {
            newCart[key] = {price:data.price, count: 1};  // Add item to the cart with count 1
        }
        
        addCart(newCart);  // Update the global cart state via context

        // Change the button text to "Added"
        const updatedCart = { ...cart, [key]: newCart[key] };
        addCart(updatedCart);
    };

    // Render Cards
    const cards = (data, i) => {
        const key = data.testsSummary && data.testsSummary[0] ? data.testsSummary[0] : data.packageName;
        let isAdded = cart[key]?1:0;  // Check if the item is already in the cart

        return (
            <li className='bookpackage-card-list' key={i}>
                <div className='part-1'>
                    <h3>{data.testsSummary[0]}</h3>
                    <div className='report-time'>
                        <BiSolidTimer className='timer-icon' />
                        <p>{data.reportsTatText}</p>
                    </div>
                    <div className='visit'>
                        {data.visitType.includes("HomeVisit") ? (
                            <div className='home-icon-container'>
                                <IoMdHome className='home-icon' />
                                <p> Home</p>
                            </div>
                        ) : ""}
                        {data.visitType.includes("LabVisit") ? (
                            <div className='home-icon-container'>
                                <ImLab className='home-icon' />
                                <p> Lab</p>
                            </div>
                        ) : ""}
                    </div>
                </div>
                <div className='part-2'>
                    <div className='price-cont'>
                        <div className='price-discount'>
                            <p className='discount'>₹{data.priceRange}</p>
                            <p className='discount-percentage'>{data.discount}% OFF</p>
                        </div>
                        <p className='price'>₹{data.price}/- <span>Onwards</span></p>
                    </div>
                    <button className={isAdded?"part2-button added":"part2-button"} onClick={() => handleAddToCart(data)}>{isAdded ? "Added" : "Add"}</button>
                </div>
            </li>
        );
    };

    const cardsContainer = (data) => {
        let elements;
        const temp = data[0].packages;
        elements = temp.filter((each) => each.subCategories.includes(activeBtn));

        return (
            <ul className="bookpackage-card-container">
                {elements.map((item, index) => cards(item, index))}
            </ul>
        );
    };

    return (
        <div className="featured-container bookpackage">
            <div className="featured-heading-container">
                <h3 className="featured-heading">Book Popular Lab Test</h3>
                <button className="featured-heading-container-view-all">View All</button>
            </div>
            {data.categories ? categoriesSection(data.categories) : ""}
            {data.props ? cardsContainer(data.props) : ""}
        </div>
    );
};

export default BookPopular;
