import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Quiz.css';

import QuestionContainer from './components/QuestionContainer';
import QuizOptions from './components/QuizOptions';
import DifficultyLevel from './components/DifficultyLevel';
import CountdownTimer from './components/CountdownTimer';
import QuizResultTable from './components/QuizResultTable';


@inject('quizStore')

@observer
class Quiz extends Component {
    state = {
        selectedAnswerId: null,
        isAnswerSelected: false,
        showNextQuestionBtn: false,
        timerDuration: 0,
        startTimer: false,
        gameInProgress : true
    };

    componentDidMount(){
        this.props.quizStore.getQuizQuestions();
    }

    loadNextQuestion = () => {
        const gameProgress = this.props.quizStore.loadQuestion();
        this.setState({gameInProgress: gameProgress});
        this.clearState();
    }

    selectAnswer = (selectedId) => { 
        if(!this.state.isAnswerSelected){
            this.setState({
                isAnswerSelected:true,
                selectedAnswerId: selectedId,
                showNextQuestionBtn: true
            });

            this.props.quizStore.checkAnswer(selectedId);
        }
    }

    getOptionsCLass = (optionId) => {
        if(this.state.isAnswerSelected){
            if(optionId === this.props.quizStore.questionData.correctAnswerId){
                return 'correctOptionClass';
            }

            if(optionId === this.state.selectedAnswerId){
                return 'wrongOptionClass';
            }
        }
    }

    clearState = () =>{
        this.setState({
            selectedAnswerId: null,
            isAnswerSelected: false,
            showNextQuestionBtn: false,
            timerDuration: 0,
            startTimer: false
        })
    }

    onTimerEnd = (e) => {
        this.setState({gameInProgress: false});
        this.clearState();
    }

    render(){
        const {questionData, quizConfigData } = this.props.quizStore;
        return(
            <Container>
                { this.state.gameInProgress ? (
                    <div>
                        <DifficultyLevel difficulty = { questionData.difficulty } />
                        {
                            questionData.startTimer && (
                                <CountdownTimer duration = {quizConfigData.timeInMilliseconds} onComplete = {this.onTimerEnd}/>
                            )
                        }
                        <QuestionContainer question = { questionData.question } />
                        <Row>
                            <Col md={{span:6, offset:3}} className="p-0">
                                <QuizOptions options = { questionData.answersOptions } clickEvent = {this.selectAnswer} optionClass = {this.getOptionsCLass} />
                                { this.state.showNextQuestionBtn ? <Button variant="primary" className="next-question" onClick = {this.loadNextQuestion}>NEXT QUESTION</Button> : null }
                                <div className="score">SCORE: { questionData.score }</div>
                            </Col>  
                        </Row>
                    </div>
                ) : (
                    <div>
                        <Row>
                            <Col md={{span:6, offset:3}} className="score-card">
                                <Row className="score-card-header">Quiz Result</Row>
                                <Row>
                                   <QuizResultTable quizConfigData = {quizConfigData} score={ questionData.score }/>
                                </Row>
                            </Col>  
                        </Row>    
                    </div>  
                )}
            </Container>
        );
    }
}
export default Quiz;