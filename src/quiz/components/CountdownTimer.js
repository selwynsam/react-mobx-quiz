import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Countdown from 'react-countdown-now';

// const CountdownTimer = (prop) => {
class CountdownTimer extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render(){
        return(
            <Row>
                <Col md={{span:6, offset:3}} className="p-0 timer-section">
                    <b>Time Remaining: </b><Countdown date={Date.now() + this.props.duration } zeroPadTime={2} autoStart= 
                    {this.props.startTimer} onComplete = {this.props.onComplete} pause={true}/>
                </Col>
            </Row>
        );
    }
}

export default CountdownTimer;