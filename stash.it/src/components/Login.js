import React from 'react'
import axios from 'axios'
/* import Loader from 'react-loader-spinner' */
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Alert
} from 'reactstrap'

import { logIn } from './actions/actions'

// --- Login 

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.modalToggle = this.modalToggle.bind(this)
  }

  componentDidMount() {
    if (this.props.token) {
    }
  }

  modalToggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = e => {
    e.preventDefault()
    const userInfo = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.logIn(userInfo)
      .then(res => {
        this.props.history.push('/tabs')
      })
  }

  register = e => {
    e.preventDefault()
    axios
      .post('https://tabless-db.herokuapp.com/register', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(res => {
        console.log(res)
        this.modalToggle();
      })
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-form-wrapper">
          <Form className="login-form" onSubmit={this.login}>
            <div className="logo-tt">
              <a href="https://stash-it.netlify.com/">
                <img className="login-head-logo" src="https://i.imgur.com/lEtYe1l.png" title="Stash.it Logo" alt="#" />
              </a>
            </div>
            <Input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="login-input"
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="login-input"
            />
            <div />
            {this.props.error && <p className="error">{this.props.error}</p>}
            <div className="login-button-wrapper">
              <p onClick={this.modalToggle}>need an account?</p>
              <Button className="login-button">
                {this.props.loggingIn ? (
                  {/* <Loader
                    type="ThreeDots"
                    color="#000000"
                    height="12"
                    width="26"
                  /> */}
                ) : (
                    'Login'
                  )}
              </Button>
              {this.props.error === true ? (
                <Alert color="danger">
                  This is a danger alert — check it out!
              </Alert>) : <> </>}
            </div>
          </Form>
        </div>
        <>
          <Modal
            isOpen={this.state.modal}
            toggle={this.modalToggle}
            className="sign-up"
          >
            <ModalHeader className="sign-up" toggle={this.modalToggle}>
              <a href="https://stash-it.netlify.com/">
                <img className="signup-head-logo" src="https://i.imgur.com/lEtYe1l.png" title="Stash.it Logo" alt="#" />
              </a>
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChange}
                className="login-input"
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="login-input"
                required
              />
              {/* <Input
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="login-input"
              /> */}
            </ModalBody>
            <ModalFooter className="sign-up">
              <Button className="reg-btn" onClick={this.register}>
                Stash It!
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </>
      </div>
    )
  }
}

const mapStateToProps = ({ error, loggingIn, token, user_id }) => ({
  token,
  user_id
})

export default connect(
  mapStateToProps,
  { logIn }
)(Login)