import React from 'react'
import { Card, CardHeader, CardBody,/*  CardTitle, */ CardText } from 'reactstrap'

import EditList from './EditList'

// --- List component

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="obj-wrapper">
        <h1>{this.props.tab}</h1>

        <div className="cat-wrapper">
          {this.props.tabs.map((tab, i) => (

            <Card className="tabs" key={i}>

              <CardHeader className="cap">
                {tab.favicon ? (<img className="fav" src={tab.favicon} alt="tab logo" />) : <img className="fav" src="#" alt="" />}
              </CardHeader>

              <CardBody className="card-body">
                {/* <CardTitle className="title">{tab.title}</CardTitle> */}
                <CardText>
                  <a href={tab.tab} target="_blank" rel="noopener noreferrer">
                    {tab.tab}
                  </a>
                  <br />
                  <br />
                  {/* <span>{tab.short_description}</span> */}
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
    )
  }
}

export default List;