import "./index.css"
const IconsContainer=(props)=>{
    let propItems
    propItems= props.props?propItems=props.props.props:""
    //console.log(propItems)₹
    
    const renderItems = (data) => {
        let items = [];
        for (let i = 0; i < props.props.props.length; i++) {
            items.push(
                <div key={i} className="each-icons">
                    <img className="icon-image" src={data[i].iconUrl} alt="" />
                    <p className="icon-text">{data[i].iconText}</p>
                </div>
            ); 
        }
        return items;
    };

    return(
        <div className="icons-container">
            {propItems?renderItems(propItems):""}
        </div>
    )
}
export default IconsContainer