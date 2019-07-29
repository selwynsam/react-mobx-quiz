import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './stores';
import Quiz from './quiz/Quiz';
import Home from './quiz/Home';

function App() {
  return (
    <Provider {...store} >
      <BrowserRouter>
        <Route exact= {true} path= "/" component= {Home} />
        <Route exact= {true} path= "/quiz" component= {Quiz} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
