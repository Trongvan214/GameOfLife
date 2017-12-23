import React, {Component} from 'react';
import Box from './box';

export default class Grid extends Component {
    render(){
        const width = (this.props.cols * 16) + 1;
        let boxClass, boxId;
        let boxes = this.props.grid.map((v,i) => v.map((v,j) => {
            boxId = i+"-"+j;
            boxClass = v ? "box on" : "box off";
            return (
                <Box
                boxClass={boxClass}
                key={boxId}
                boxId={boxId}
                row={i}
                col={j}
                selectBox={this.props.selectBox}
                />
            )
        }));
        return (
            <div className="grid" style={{"width": width}}>
                {boxes}
            </div>
        )
    }
}