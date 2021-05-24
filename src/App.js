import React, { useState, useEffect } from 'react';
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/css/global.css';
import { AreaUser } from "./pages/AreaUser";

function App() {
  const [ areaUser, setAreaUser ] = useState();
  const [ urlAreaUser, setUrlAreaUser ] = useState();

  function getAreaUser(data){
    if(data){
      setAreaUser(data.login);
      setUrlAreaUser(data.userUrl);
    }
  }

  useEffect(() => {
    getAreaUser();
  })

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home getAreaUser={getAreaUser}/>
          </Route>

          <Route path="/:AreaUser">
            <AreaUser userUrl={urlAreaUser}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
