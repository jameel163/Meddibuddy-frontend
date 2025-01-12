// // App.js
// import { Route, Routes } from 'react-router-dom';
// import React, { useState } from 'react';
// import Homepage from './Components/Homepage';
// import { MyProvider } from './MyContext'; // Import MyProvider

// const App = () => {
//   const [cart, addCart] = useState({}); // Cart state

//   return (
//     // Wrap Routes with MyProvider
//     <MyProvider value={{ cart, addCart }}>
//       <Routes>
//         <Route path="/medi" element={<Homepage />} />
//         {/* You can add more routes here */}
//       </Routes>
//     </MyProvider>
//   );
// }

// export default App;
import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Homepage from './Components/Homepage';
import { MyProvider } from './MyContext'; // Import MyProvider
import CartSection from './Components/CartSection'

const App = () => {
  const [cart, addCart] = useState({}); // Cart state

  return (
    <MyProvider value={{ cart, addCart }}>
      <Routes>
        <Route path="/medi" element={<Homepage />} />
        <Route path='/cart-page' element={<CartSection/>}/>
      </Routes>
    </MyProvider>
  );
}

export default App;
