import React from 'react';
import Column from './Column.js';

export default class Row extends React.Component {
    constructor() {
        super()

        this.renderColumns = this.renderColumns.bind(this);
    }

    renderColumns() {
        return (
            this.props.currentRow.map((cell, index) => {
                return (< Column player={this.props.player} key={index} currentColumn={cell} onCellClick={() => this.props.onCellClick(index)} />)
            })
        )
    }



    render() {
        return (
            <div className="row">
                {this.renderColumns()}
            </div>
        )
    }
}