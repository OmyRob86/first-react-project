import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import Home          from './pages/Home';
import CreateArticle from './pages/CreateArticle';
import DeleteArticle from './pages/DeleteArticle';
import NotFound      from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Accueil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/articles/create">
            Créer un artcile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/artciles/delete">
            Supprimer un artcile
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path="/"          component={Home} />
        <Route path="/articles/create" component={CreateArticle} />
        <Route path="/articles/delete" component={DeleteArticle} />
        <Route path="*"                component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

