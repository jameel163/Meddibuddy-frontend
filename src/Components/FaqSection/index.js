import React, { useState, useEffect } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi'; 
import './index.css';

const FaqSection = (props) => {
  const [questions, setQuestions] = useState(props?.props?.props || []); // Use optional chaining to avoid undefined errors

  useEffect(() => {
    console.log(props); 
    if (props?.props?.props) {
      setQuestions(props.props.props);
    }
  }, [props]);
  
  
  const toggleExpand = (id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, isExpanded: !question.isExpanded }; 
      }
      return question;
    });
    setQuestions(updatedQuestions); 
  };

  // Render the FAQ list
  const lists = (data) => {
    if (!data || !Array.isArray(data)) {
      return <p>No questions available</p>;
    }

    return (
      <div>
        {data.map((item) => (
          <div key={item.id} className="faq-item">
            <div className="faq-question">
              <h3>{item.question}</h3>
              <button className="expand-button" onClick={() => toggleExpand(item.id)}>
                {item.isExpanded ? <HiMinus /> : <HiPlus />} {/* Show - icon if expanded, + icon if collapsed */}
              </button>
            </div>

            
            {item.isExpanded && (
              <div>
                <p>{item.answer}</p>
                {item.points && item.points.length > 0 && (
                  <ul>
                    {item.points.map((point, index) => (
                      <li key={index}>{point.pnt}</li>
                    ))}
                  </ul>
                )}
                {item.subpnt && item.subpnt.length > 0 && (
                  <ul>
                    {item.subpnt.map((subpoint, index) => (
                      <li key={index}>{subpoint}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className='faq-h1'>Frequently Asked Questions</h1>
      {lists(questions)}
    </div>
  );
};

export default FaqSection;
