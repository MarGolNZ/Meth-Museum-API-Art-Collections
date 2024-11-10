import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import DepartmentData from './DepartmentData'

function Home() {
  const { path, url } = useRouteMatch()

  return (
    <div className="main-content">
      <h1>Welcome to the Met Museum Explorer</h1>
      <nav>
        <button>
          <Link to={`${url}departments`}>Departments</Link>
        </button>
      </nav>

      <div className="content">
        <Switch>
          <Route exact path={path} render={() => <p>Select an option above to view data.</p>} />
          <Route path={`${path}departments`} component={DepartmentData} />
        </Switch>
      </div>
    </div>
  )
}

export default Home
