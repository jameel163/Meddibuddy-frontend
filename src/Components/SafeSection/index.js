
import "./index.css"

const SafeSection = (props) => {
    const element = props.props || ""
    const lists = (data) => {
        console.log(data)
        return (
            <ul className="trusted-list s-ul">
                {data.map((item, index) => (
                    <li className=" safe-list" key={index}> 
                        <img className="trusted-img" src={item.img} alt="banner" />
                        <p className="trusted-title">{item.title}</p>
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div className="safesection">
            <h1>100% Safe & Secure Lab Test</h1>
            {element.props ? lists(element.props) : ""}
        </div>
    )

}
export default SafeSection