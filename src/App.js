import React from 'react';
import './App.css';
import yellow from './yellow-chair.png';
import green from './green-chair.png';
import gray from './gray-chair.png';


function App() {
  return (
    <SeatPicker/>
  );
}

function SeatPicker() {
	const numRows = 10;
	const numCol = 10;

	/* 
		This is a string representing the seats that are taken
		in this format: row_seat_1,column_seat_1;row_seat_2,column_seat_2;....
		I've added some mock taken seats.
		Replace with your own data.
	*/
	let busySeatsString =  "1,6;2,5;2,6;2,7;3,1;3,3;8,5;8,6";

	/*
		Here we build busySeatsIndexes, an array of elements
		of type: [row_seat, column_seat]
	*/
	let busySeatsIndexes = [];
	const busySeatsPairs = busySeatsString.split(";");
	busySeatsPairs.forEach(busySeatPair => {
			let busySeatIndexes = busySeatPair.split(",");
			busySeatIndexes[0] = parseInt(busySeatIndexes[0]);
			busySeatIndexes[1] = parseInt(busySeatIndexes[1]);
			busySeatsIndexes.push(busySeatIndexes);
		}
	);

	/*
		Here we build an array of seat objects for rendering.
		Each seat will have:
		- the row and column
		- color, which will become the className of the seat object
		- divClass, which is <br> for seats at the right edge and ""
				for other seats (basically starts a new row)
		- src - we have three images "yellow-chair", "green-chair", "gray-chair"

		If the seat is taken (if its coordinates are in the busySeatsIndexes array)
		the seat will have the source "gray-chair" otherwise, it will be a "green-chair"
	*/
	const rowVect = [];
	for (let i = 1; i <= numRows; i++) {
		for (let j = 1; j <= numCol; j++) {
			let color = 'button-free';
			let src = green;
			busySeatsIndexes.forEach( seat => {
					if (seat[0] === i && seat[1] === j) {
						color = 'button-busy';
						src = gray;
					}
			});
			let div = ("");
			if (j === numCol) {
				div =(<br></br>);
			}
			rowVect.push({
				row: i,
				col: j,
				color: color,
				divClass:div,
				src: src
			});
		}
	}

	/*
		When we click on a seat, if it was free we will pick it,
		if it was picked we will set it free.
		The gray chairs cannot be picked (see App.css at .button-busy).
	*/
	function handleSeatClick(btn) {
		console.log(btn.target.alt);
		if (document.getElementById(btn.target.alt).className === 'button-free') {
			document.getElementById(btn.target.alt).className = 'button-picked';
			document.getElementById(btn.target.alt).src = yellow;
		} else {
			document.getElementById(btn.target.alt).className = 'button-free';
			document.getElementById(btn.target.alt).src = green;
		}
	}

	/*
		On submit we add the picked seats to the already taken ones
	*/
	function handleOnSubmit() {
		for (let i = 1; i <= numRows; i++) {
			for (let j = 1; j <= numCol; j++) {
				const el_id = i+","+j;
				if (document.getElementById(el_id).className === 'button-picked') {
					busySeatsString += ";"+el_id;
				}
			}
		}
		console.log(busySeatsString);
	}

	/*
		If you wish to have buttons (squares) instead of the seat icons:
		- simply change "img" to "button"
		- replace "alt" with "value" (here and also in handleSeatClick)
		- remove  "src={r.src}"
	*/

	return(
		<div>
			{rowVect.map((r) => 
				<span key={r.row+" "+r.col}>
				<div className="rows">
				<img className={r.color} id={r.row+","+r.col} alt={r.row+","+r.col} src={r.src} onClick={handleSeatClick}/>
				</div>
				{r.divClass}
				</span>
			)}

			<input type="submit" onClick={handleOnSubmit}/>
		</div>
	);
}

export default App;