import React from 'react';

export default class Menu extends React.Component {
  constructor() {
    super()

    this.moveMessage = this.moveMessage.bind(this);
  }

  moveMessage() {
    if (this.props.currentPlayer === this.props.name) {
      return (
        <div className="main-font">
          It's your turn! <br />
          Make a move.
        </div>
      )
    } else {
      return (
        <div className="main-font">
          Your buddy is <br />
          making a move.
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <br />
        {this.props.name}
        <br />
        <div className="score">
          Score: {this.props.wins} <br />
        </div>
        {this.moveMessage()}
        <br />
        {this.props.score}
      </div>
    )
  }
}