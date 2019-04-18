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
      tab: '',
      description: '',
      user_id: ''
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
    e.preventDefault()
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  logout() {
    localStorage.clear("token")
    localStorage.clear("user_id")
    window.location.reload()
  }

  addList() {
    const newList = { tab: this.state.tab, description: this.state.description, user_id: Number(this.state.user_id) }
      console.log(newList);
    this.props.addList(newList)
    this.setState({
        // tab: '',
        tab: '',
        // description: '',
        description: '',
        // user_id: '',
        user_id: ''
    })
    this.modalToggle()
  }

  deleteList = id => {
    axiosWithAuth()
      .delete(`https://tabless-db.herokuapp.com/tabs/${id}`)
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
            <i className="fas fa-sign-out-alt" onClick={this.logout} />
          </div>
        </div>
        <div>
          {cats.map((cat, i) => {
            console.log(cat)
            console.log(this.props.lists)
            return <List
              key={i}
              category={cat}
              tabs={this.props.lists[cat]}
              deleteList={this.deleteList}
              fetchLists={this.props.fetchLists}
              user_id={this.state.user_id}
            />
          })}
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
                alt=""
              />
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                name="tab"
                placeholder="Link"
                value={this.state.tab}
                onChange={this.handleChange}
                className="login-input"
              />
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChange}
                className="login-input"
              />
              {/* USER ID INPUT */}
              <Input
                type="text"
                name="user_id"
                placeholder="User ID"
                value={this.state.user_id}
                onChange={this.handleChange}
                className="login-input"
              />
            </ModalBody>
            <ModalFooter>
              <Button className="add-tab-btn" onClick={() => this.addList()}>
                Create Tab
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