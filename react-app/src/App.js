import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/homepage_components/Home';
import Landing from './components/landing_components/Landing';
import MyTeams from './components/myteams_components/MyTeams';


function App() {

  

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/myteams" component={MyTeams} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
