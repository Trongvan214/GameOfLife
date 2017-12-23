import React, { Component } from 'react';
import Grid from './grid';
import Buttons from './buttons';

export default class App extends Component {
  constructor(props){
    super(props);
    this.speed = 30;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }
  }
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.grid);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState(() => ({grid: gridCopy}));
  }
  seed = () => {
    let gridCopy = arrayClone(this.state.grid);
    gridCopy.forEach((v,i) => v.forEach((p, j) => {
      if(Math.floor(Math.random()*4) === 1){
        gridCopy[i][j] =  true;
      }  
    }));
    this.setState(() => ({grid: gridCopy}));
  }
  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }
	play = () => {
		let g = this.state.grid;
		let g2 = arrayClone(this.state.grid);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
    }
    this.setState(prevState => {
      return {
        grid: g2,
        generation: prevState.generation+1,
      }
    })
  }
  pauseButton = () => {
    clearInterval(this.intervalId);
  }
  slow = () => {
    this.speed = 1000;
    this.playButton();
  }
  fast = () => {
    this.speed = 50;
    this.playButton();
  }
  clear = () => {
    clearInterval(this.intervalId);
    this.setState({grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)), generation: 0});
  }
  componentDidMount(){
    this.seed();
    this.playButton();
  }
  render() {
    return (
      <div className="App">
        <h1>The Game of Life</h1>
        <Buttons 
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid 
          grid={this.state.grid}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayClone(arr){
  return arr.slice();
}