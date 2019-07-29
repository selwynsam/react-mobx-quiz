import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const QuizOptions = (prop) => {
    
    const quizOptions = prop.options.map((opt,i) =>{
        return[
            <li key = {i} className = {prop.optionClass(i)}  onClick={prop.clickEvent.bind(this,i)}>{ReactHtmlParser(opt)}</li>
        ];
    });

    return(
        <ul className="answers-container">
            { quizOptions }
        </ul>
    );
}

export default QuizOptions;