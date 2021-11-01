import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home'
import Projects from './components/Projects'
import ProjectPage from './components/ProjectPage'
import Header from './Layout/Header'

const App = () => {
  return (

    <Router>
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/portfolio" component={Projects} />
      <Route exact path="/portfolio/:id" component={ProjectPage} />
    
    </div>
    </Router>

  );
}

export default App;
