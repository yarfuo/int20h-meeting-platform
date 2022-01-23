import './index.css'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Video from './components/MeetX'
import shortId from 'shortid'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route
            path="/"
            exact
            component={() => <Redirect to={'room/' + shortId()} />}
          />
          <Route path="/room/:roomId" exact component={Video} />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App
