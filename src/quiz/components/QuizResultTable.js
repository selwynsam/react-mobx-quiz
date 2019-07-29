import React from 'react';
import { Table } from 'react-bootstrap';

const QuizResultTable = (props) =>{
    const tableData = [
        { colName: 'Name', value: props.quizConfigData.name },
        { colName: 'Quiz Categoryme', value: props.quizConfigData.categoryName },
        { colName: 'Correct Answers', value: props.score },
        { colName: 'Total Questions', value: props.quizConfigData.totalQuestionsToAnswer }
    ];
    
    const tableComponent = tableData.map((col,i)=>{
        return(
            <tr key={i}>
                <td>{col.colName}</td>
                <td>{col.value}</td>
            </tr>
        );
    });
    return(
        <Table responsive>
            <tbody>
                {tableComponent}
            </tbody>
        </Table>
    );
}

export default QuizResultTable;