import React, {Component} from 'react'
import {ButtonToolbar} from 'react-bootstrap';

export default class Buttons extends Component {
    handleSelect = (evt) => {
        this.props.gridSize(evt);
    }
    render(){
        return (
            <div className="center">
                <ButtonToolbar>
                    <button className="btn btn-default" onClick={this.props.playButton}>Play</button>
                    <button className="btn btn-default" onClick={this.props.pauseButton}>Pause</button>
                    <button className="btn btn-default" onClick={this.props.clear}>Clear</button>
                    <button className="btn btn-default" onClick={this.props.slow}>Slow</button>
                    <button className="btn btn-default" onClick={this.props.fast}>Fast</button>
                    <button className="btn btn-default" onClick={this.props.seed}>Seed</button>
                </ButtonToolbar>
            </div>
        )
    }
}