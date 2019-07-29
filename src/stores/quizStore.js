import { observable, action, computed } from 'mobx';
import api from '../services/quizService';

export class QuizStore {
    @observable
    quizData = [];

    @observable quizCategories = [];
    @observable quizConfigData = {
        name: 'User',
        categoryId: null,
        categoryName: 'Any',
        totalQuestions: 30,
        totalQuestionsToAnswer: 30,
        timeInMilliseconds: 150000
    }

    @observable questionData = {
        question:null,
        correctAnswerId: null,
        difficulty: null,
        answersOptions: [],
        correctAnswer: null,
        score: 0,
        startTimer: false
    };

    @observable questionInc = 0;

    @action
    getQuizCategories(){
        api.get('api_category.php').then(res =>{
            this.quizCategories = res.data.trivia_categories;
        });
    }

    @action 
    getCategoryQuestionCount(){
        api.get('api_count.php',{ 'category': this.quizConfigData.categoryId }).then(res =>{
            this.quizConfigData.totalQuestions = res.data.category_question_count.total_question_count;
        });
    }

    @action
    getQuizQuestions(){
        let data = {
            amount: this.quizConfigData.totalQuestionsToAnswer,
            category: this.quizConfigData.categoryId,
        };
        api.get('api.php',data).then(res =>{
            if(res.data.response_code === 0){
                this.quizData = res.data.results;
                this.loadQuestion(this.questionInc);
                this.questionData.startTimer = true;
            }else{
                switch(res.data.response_code){
                    case 1:
                        alert('No Results Could not return results.');
                        break;

                    case 2:
                        alert(`Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid`);
                        break;

                    default: 
                        alert('Failed to fetch questions');
                }
            }
        });
    }

    @action
    loadQuestion(){
        const inc =  this.questionInc;
        
        if( inc <= this.quizData.length - 1 ){
            const questionData = this.questionData;
            let answersOptions = [...this.quizData[inc].incorrect_answers,this.quizData[inc].correct_answer];
                
            questionData.answersOptions = this.shuffleArray(answersOptions);
            questionData.correctAnswer = this.quizData[inc].correct_answer;
            questionData.correctAnswerId = questionData.answersOptions.indexOf(questionData.correctAnswer);
            questionData.question = this.quizData[inc].question;
            questionData.difficulty = this.quizData[inc].difficulty;

            this.questionInc++;

            return true;
        }

        this.questionData.startTimer = false;
        return false;
    }

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    @action
    checkAnswer(selectedId){
        const questionData = this.questionData
        if(selectedId === questionData.correctAnswerId){
            questionData.score = questionData.score + 1;
        }
    }

    @action
    reset(){
        this.quizData = [];

        this.quizCategories = [];
        this.quizConfigData = {
            name: 'User',
            categoryId: null,
            categoryName: 'Any',
            totalQuestions: 30,
            totalQuestionsToAnswer: 30,
            timeInMilliseconds: 150000
        }

        this.questionData = {
            question:null,
            correctAnswerId: null,
            difficulty: null,
            answersOptions: [],
            correctAnswer: null,
            score: 0,
            startTimer: false
        };

        this.questionInc = 0;
    }

    set totalTime(totalQuestions){
        this.quizConfigData.timeInMilliseconds = totalQuestions*5000;
    }

    @computed
    get totalTime(){
        let timeInMiunutes = this.quizConfigData.timeInMilliseconds / 60000;
        return timeInMiunutes.toFixed(1);
    }
}

export default new QuizStore();