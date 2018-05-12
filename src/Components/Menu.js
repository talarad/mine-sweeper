import React from 'react';
import Player from './Player';

export default class Menu extends React.Component {

  render() {
    if (this.props.currentPlayer === "Red") {
      return (
        <div className="main-menu">
          <div className="red-turn">
            <Player score={this.props.red} name="Red" wins={this.props.redWins} currentPlayer={this.props.currentPlayer} />
          </div>
          <div className="circle">
            {this.props.bombs}
          </div>
          <div className="blue">
            <Player score={this.props.blue} name="Blue" wins={this.props.blueWins} currentPlayer={this.props.currentPlayer} />
          </div>
        </div>
      )
    } else {
      if (this.props.currentPlayer === "Blue") {
        return (
          <div className="main-menu">
            <div className="red">
              <Player score={this.props.red} name="Red" wins={this.props.redWins} currentPlayer={this.props.currentPlayer} />
            </div>
            <div className="circle">
              {this.props.bombs}
            </div>
            <div className="blue-turn">
              <Player score={this.props.blue} name="Blue" wins={this.props.blueWins} currentPlayer={this.props.currentPlayer} />
            </div>
          </div>
        )
      }
    }
  }
}