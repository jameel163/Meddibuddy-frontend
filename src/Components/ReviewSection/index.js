import './index.css';


const ReviewSection = ({ title, props = [] }) => {  // Default props to an empty array
    console.log(props.props)
    console.log("jameel")
    return (
        <div className="review-section">
            <h2 className="title">{props.title}</h2>
            <div className="reviews-container">
                {/* Only map if props is not empty or undefined */}
                {Array.isArray(props.props) && props.props.length > 0 ? (
                    props.props.map((review, index) => (
                        <div className="review-card" key={index}>
                            <div className='star-cont'>
                                <div className="rating">
                                    {'⭐'.repeat(review.rating)}
                                </div>
                                <p className="date-location">
                                    {review.days} {review.location && ` | ${review.location}`}
                                </p>
                            </div>


                            <p className="content">"{review.content}"</p>
                            <p className="name">{review.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>  // Show a fallback message if no reviews
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
