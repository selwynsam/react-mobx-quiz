import React from 'react';
import { Row, Col } from 'react-bootstrap';

const DifficultyLevel = (prop) =>{
    return(
        <Row>
            <Col md={{span:6, offset:3}} className="p-0 game-level-info">
                &lt;{ prop.difficulty } <b>Game</b>&gt;
            </Col>
        </Row>
    );
    
}

export default DifficultyLevel;