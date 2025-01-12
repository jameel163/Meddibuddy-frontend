import { LuShieldCheck } from "react-icons/lu";
import "./index.css";

const TrustedSection = (props) => {
  const element = props.props || {}; // Default to an empty object if props is undefined

  const lists = (data) => {
    

    console.log(data);
    return (
      <ul className="trusted-list">
        {data.map((item, index) => (
          <li className="lis" key={index}> {/* Move key prop here */}
            <img className="trusted-img" src={item.img} alt="banner" />
            <p className="trusted-title">{item.title}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="trusted-container">
      <div className="heading-container">
        <h1>Trusted by <span>20,00,000+</span> <span>Users Every month</span></h1>
        <LuShieldCheck className="shield" />
      </div>
      {element && element.props ? lists(element.props) : <p>No data available</p>}
    </div>
  );
};

export default TrustedSection;
