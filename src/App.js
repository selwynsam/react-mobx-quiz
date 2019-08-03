import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import store from './stores';
import Quiz from './quiz/Quiz';
import Home from './quiz/Home';

function App() {

  const BASE_URL = '/';
  
  return (
    <Provider {...store} >
      <BrowserRouter basename= {BASE_URL}>
        <Switch>
          <Route exact= {true} path= "/" component= {Home} />
          <Route exact= {true} path= "/quiz" component= {Quiz} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
