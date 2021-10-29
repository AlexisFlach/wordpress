import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Projects from './components/Projects'
import ProjectPage from './components/ProjectPage'

const App = () => {
  return (
    <Router>
    <div className="App">

      <Route exact path="/" component={Projects} />
      <Route exact path="/project/:id" component={ProjectPage} />
    
    </div>
    </Router>
  );
}

export default App;
