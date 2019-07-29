import React, { Component } from 'react';
import { observer,inject} from 'mobx-react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

@inject('quizStore')
@observer
class Home extends Component{

    constructor(props){
        super(props);
        this.inputChangeHandler.bind(this);
        if(this.props.quizStore.quizData.length > 0){
            this.props.quizStore.reset();
        }
    }

    componentDidMount(){
        this.props.quizStore.getQuizCategories();
    }

    inputChangeHandler = e =>{
        const { quizConfigData } = this.props.quizStore;
        quizConfigData[e.target.id] = e.target.value;

        if(e.target.id === 'categoryId' && e.target.value > 0){
            quizConfigData.categoryName = e.target[e.target.selectedIndex].getAttribute('data-categoryname');
            this.props.quizStore.getCategoryQuestionCount();
        }

        if(e.target.id === 'totalQuestionsToAnswer' && e.target.value > 0){
            this.props.quizStore.totalTime = quizConfigData.totalQuestionsToAnswer;
        }
    }

    render(){
        const { quizConfigData, quizCategories } = this.props.quizStore;
        return(
            <Container>
                <Row>
                    <Col md={{span:6, offset:3}} className="p-0">
                        <Form id="quizForm">
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" onChange={ this.inputChangeHandler } required={true} />
                            </Form.Group>
                            <Form.Group controlId="categoryId">
                                <Form.Label>Select Category</Form.Label>
                                <Form.Control as="select" onChange={ this.inputChangeHandler }>
                                <option key={0} value = {0} >Any</option>
                                    { quizCategories.map((val,i)=>{
                                        return(<option key={i+1} data-categoryname={val.name} value = {val.id}>{val.name}</option>);
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="totalQuestionsToAnswer">
                                <Form.Label>Total Questions</Form.Label>
                                <Form.Control type="number" min = {10}  max={ quizConfigData.totalQuestions } value = { quizConfigData.totalQuestionsToAnswer } placeholder="Total Questions" onChange={ this.inputChangeHandler } />
                                <Form.Text className="text-muted">
                                    You can reduce the number of questions you want to answer ( max = { quizConfigData.totalQuestions } ).
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="totalTime">
                                <Form.Label>Total Time</Form.Label>
                                <Form.Control type="text" value = { `${this.props.quizStore.totalTime} minutes` } placeholder="Total Time" readOnly={ true } />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick = { e =>{ this.props.history.push('/quiz'); }}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
