import React from 'react';

export default class Victory extends React.Component {

    render() {
        return (
            <h1 className="container">
               {this.props.player} has won! <br/>
               <button onClick={() => this.props.rematch(this.props.player)}>Rematch!</button>
            </h1>
        )
    }
}