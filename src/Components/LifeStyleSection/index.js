
import "./index.css"
const LifeStyleSection=(props)=>{
    console.log(props)
    const element=props.props||""
    const lists=(data)=>{
        console.log(data)
        return(<ul>
            {data.map((item, index) => (
          <li className="list-items" key={index}> 
            <img className="" src={`https://www.medibuddy.in/${item.imgSrc}`} alt={item.title} />
            <p className="">{item.title}</p>
          </li>
        ))}
        </ul>)
    }
return(
    <div className="lifestyle">
        <h1>{element?element.title:""}</h1>
        {element.props?lists(element.props):""}
    </div>
)
 
}
export default LifeStyleSection