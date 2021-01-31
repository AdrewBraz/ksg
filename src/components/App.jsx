import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalculator, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Switch } from 'react-router-dom';

import Search from './Search';
import Home from './Home';
import Calculate from './Calculate';

const App = () => (
  <>
    <div className="sidebar-container">
      <div className="sidebar-logo">
        Project Name
      </div>
      <ul className="sidebar-navigation">
        <li className="header">Navigation</li>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            {' '}
            Home
          </Link>
        </li>
        <li>
          <Link to="/Search">
            <FontAwesomeIcon icon={faSearch} />
            {' '}
            Search
          </Link>
        </li>
        <li>
          <Link to="/calculate">
            <FontAwesomeIcon icon={faCalculator} />
            {' '}
            Calculate
          </Link>
        </li>
      </ul>
    </div>

    <div className="content-container">

      <div className="container-fluid" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/calculate" component={Calculate} />
      </Switch>
    </div>
  </>
);

export default App;
