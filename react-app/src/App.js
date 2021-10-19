import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/homepage_components/Home';
import Landing from './components/landing_components/Landing';
import MyTeams from './components/myteams_components/MyTeams';
import BrowseTeams from './components/browseteams_components/BrowseTeams';


function App() {

  

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/myteams" component={MyTeams} />
          <Route exact path="/browseteams" component={BrowseTeams} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
