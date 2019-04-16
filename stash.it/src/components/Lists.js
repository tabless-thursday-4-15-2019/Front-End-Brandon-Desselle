import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap'

import { fetchLists, addList, deleteList } from './actions/actions'
import axiosWithAuth from '../axiosWithAuth'
import List from './List'

// --- Lists component

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newList: {
        // title: '',
        website: '',
        // short_description: '',
        category: '',
        user_id: this.props.user_id
      }
    }
    this.modalToggle = this.modalToggle.bind(this)
  }

  componentDidMount() {
    const { user_id } = this.props
    this.props.fetchLists(user_id)
  }

  modalToggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange = e => {
    this.setState({
      newList: {
        ...this.state.newList,
        [e.target.name]: e.target.value
      }
    })
  }

  logout() {
    localStorage.clear("token")
    localStorage.clear("user_id")
    window.location.reload()
  }

  addList() {
    this.props.addList(this.state.newList)
    this.setState({
      ...this.state,
      newList: {
        // title: '',
        website: '',
        // short_description: '',
        category: ''
      }
    })
    this.modalToggle()
  }

  deleteList = id => {
    axiosWithAuth()
      .delete(`http://localhost:3000/tabs/${id}`)
      .then(res => {
        console.log(res)
        this.props.fetchLists(this.props.user_id)
        this.componentDidMount()
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.props.fetchingLists === true) {
      return (
        <Loader
          type="Grid"
          className="loader"
          color="#000000"
          height={280}
          width={280}
        />
      )
    }
    // grab the categories off the Object
    const cats = Object.keys(this.props.lists)
    return (
      <div className="lists-wrapper">
        <div className="nav-bar">
          <div className="plus">
            <i className="fas fa-plus" onClick={this.modalToggle} />
          </div>
          <div className="user">
            {/* <i className="fas fa-cog" /> */}
            {/* <i className="fas fa-users" /> */}
            <i className="fas fa-sign-out-alt" onClick={this.logout} />
          </div>
        </div>
        <div>
          {cats.map((cat, i) => (
            <List
              key={i}
              category={cat}
              tabs={this.props.lists[cat]}
              deleteList={this.deleteList}
              fetchLists={this.props.fetchLists}
              user_id={this.state.user_id}
            />
          ))}
        </div>
        <>
          <footer>
            <i className="fas fa-copyright" />
            <p>2019 Stash.it</p>
          </footer>
          <Modal
            isOpen={this.state.modal}
            toggle={this.modalToggle}
            className="sign-up"
          >
            <ModalHeader className="add-tab-header" toggle={this.modalToggle}>
              <img
                className="fav"
                src="#"
                alt="Stash.it Logo"
              />
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                name="website"
                placeholder="link"
                value={this.state.newList.website}
                onChange={this.handleChange}
                className="login-input"
              />
              <Input
                type="text"
                name="category"
                placeholder="don't make a mess—categorize your link!"
                value={this.state.newList.category}
                onChange={this.handleChange}
                className="login-input"
              />
            </ModalBody>
            <ModalFooter>
              <Button className="add-tab-btn" onClick={() => this.addList()}>
                add it!
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  fetchingLists: state.fetchingLists,
  user_id: state.user_id
})

export default connect(
  mapStateToProps,
  {
    fetchLists,
    addList,
    deleteList
  }
)(Lists)