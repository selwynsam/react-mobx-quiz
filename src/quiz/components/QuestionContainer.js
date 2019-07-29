import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

const QuestionContainer = (prop) => {
    return(
        <Row>
            <Col md={{span:6, offset:3}} className="p-0">
                <div className="question-container">{ ReactHtmlParser(prop.question) }</div>
                <div className="wave"></div>
            </Col>
        </Row>
    );
}

export default QuestionContainer;

