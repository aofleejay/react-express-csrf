import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      result: 'no result'
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:4001/process')
      .then(response => {
        this.setState({ result: response.data })
      })
      .catch(error => {
        alert(error)
      })
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <p>value: {this.state.result}</p>
        <form onSubmit={e => this.onSubmit()}>
          <input type="hidden" name="_csrf" value={this.props.csrfToken} />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default App
