import React from 'react'
import { Card, CardHeader, CardBody,/*  CardTitle, */ CardText } from 'reactstrap'

import EditList from './EditList'

import { addList } from './actions/actions'
import { connect } from 'react-redux'

// --- List component

class List extends React.Component {


  render() {
    console.log(this.props)
    return (
      <div className="obj-wrapper">
        <h1>{/* this.props.tab */}</h1>

        <div className="cat-wrapper">
            {this.props.lists.map((tab, i) => (

            <Card className="tabs" key={i}>

              <CardHeader className="cap">
                {tab.favicon ? (<img className="fav" src={tab.favicon} alt="tab logo" />) : <img className="fav" src="#" alt="" />}
              </CardHeader>

              <CardBody className="card-body">
                <CardText>
                  <a href={tab.tab} target="_blank" rel="noopener noreferrer">
                    {tab.tab}
                  </a>
                  <br />
                  <br />
                </CardText>

              </CardBody>

              <EditList
                tab={tab}
                deleteList={this.props.deleteList}
                fetchLists={this.props.fetchLists}
                user_id={this.props.user_id}
              />
            </Card>

          ))}
        </div>
      </div>
    )}
  }

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, 
  {addList})(List);