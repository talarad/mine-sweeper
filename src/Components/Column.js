import React from 'react';

export default class Menu extends React.Component {
  //   constructor() {
  //     super()
  //   }


  
  render() {

    if (this.props.currentColumn === '-') {
      return (
        <div className="empty" onClick={this.props.onCellClick}>
        </div>
      )
    } else if (this.props.currentColumn === 'Red') {
      return (
        //<div className="image-flag">
          <img src={require("./red-flag.jpg")} alt="red" width="42px" height="42px" />
        //</div>
      )
    } else if (this.props.currentColumn === 'Blue') {
      return (
        //<div className="image-flag">
          <img src={require("./blue-flag.jpg")} alt="blue" width="42px" height="42px" />
        //</div>
      )
    } else {
      return (
        <div className="clicked">
          {this.props.currentColumn}
        </div>
      )
    }
  }
}
