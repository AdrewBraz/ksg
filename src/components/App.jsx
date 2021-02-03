import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faCalculator, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Report from './Report';
import Calculate from './Calculate';

const App = () => (
  <>
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
          {' '}
          Home
        </Link>
      </div>
      <ul className="sidebar-navigation">
        <li>
          <Link to="/calculate">
            <FontAwesomeIcon icon={faCalculator} />
            {' '}
            Расчет КСГ
          </Link>
        </li>
        <li>
          <Link to="/report">
            <FontAwesomeIcon icon={faFileExcel} />
            {' '}
            Отчет за период
          </Link>
        </li>
      </ul>
    </div>

    <div className="content-container">

      <div className="container-fluid" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/calculate" component={Calculate} />
        <Route exact path="/report" component={Report} />
      </Switch>
    </div>
  </>
);

export default App;
