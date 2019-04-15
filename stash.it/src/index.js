import React, { Component } from 'react';
import { render } from 'react-dom';

import LoginRegister, {
  PROVIDER_GITHUB,
  PROVIDER_GOOGLE
} from 'react-mui-login-register';
import Result from './Results';

class App extends Component {
  state = {
    results: [],
    disableLocal: false,
    disableRegister: false

  }

  render() {
    return (
      <div>
        <LoginRegister
          onLogin={this.handleLogin}
          onLoginWithProvider={this.handleLoginWithProvider}
          onRegister={this.handleRegister}
          onRegisterWithProvider={this.handleRegisterWithProvider}
          providers={[PROVIDER_GITHUB, PROVIDER_GOOGLE]}
          disableLocal={this.state.disableLocal}
          disableRegister={this.state.disableRegister}
        />

        {this.state.results.map(r => <Result key={r} message={r} />)}

      </div>
    );
  }

  handleLogin = content => {
    this.addResult(`Logging in with ${JSON.stringify(content)}`)
  }
  handleLoginWithProvider = provider => {
    this.addResult(`Logging in with provider=${provider}`);
  }
  handleRegister = content => {
    this.addResult(`Registering with ${JSON.stringify(content)}`)
  }
  handleRegisterWithProvider = provider => {
    this.addResult(`Registering with provider=${provider}`);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  addResult = msg => {
    this.setState(prevState => {
      return {
        results: [...prevState.results, msg]
      };
    });
  }
}

render(<App />, document.getElementById('root'));

/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root')); */