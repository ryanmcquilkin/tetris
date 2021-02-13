var pieces = require('./modules/pieces');
var math = require('mathjs');
var mechanics = require('./modules/mechanics');

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
	if (key.ctrl && key.name === 'c') {
		process.exit();
	} else {
		switch (key.name) {
			case 'up':
				if (piece.id != 4) {
					if (!mechanics.detectSpinCollision(piece, board)) {
						piece = mechanics.spin(piece);
						displayPieceOnBoard(board);
					}
				}
				break;
			case 'down':
				step();
				break;
			case 'left':
				if (!mechanics.detectCollision(piece, board, 'left')) {
					piece.left -= 1;
					displayPieceOnBoard(board);
				}
				break;
			case 'right':
				if (!mechanics.detectCollision(piece, board, 'right')) {
					piece.left += 1;
					displayPieceOnBoard(board);
				}
				break;
			case 'space':
				while (piece.top > 0) {
					dropPiece();
				}
		}
	}
});

function setBoard() {
	var board = math.zeros(28, 16);

	//set up the board with a solid perimeter
	board.forEach(function (value, index, matrix) {
		if (
			index[1] == 0 ||
			index[1] == 1 ||
			index[1] == 2 ||
			index[1] == 13 ||
			index[1] == 14 ||
			index[1] == 15
		) {
			board._data[index[0]][index[1]] = 1;
		}
		if (index[0] > 23) {
			board._data[index[0]][index[1]] = 1;
		}
	});

	return board;
}

// displays the current board
function showBoard(theBoard) {
	process.stdout.write('\033c');
	for (var i = 0; i < theBoard._size[0]; i++) {
		if (i > 2 && i < 25) {
			console.log(
				theBoard._data[i]
					.toString()
					.replace(/,/g, ' ')
					.replace(/0/g, ' ')
					.replace(/2\s/g, '██')
					.replace(/1\s?/g, '██')
					.replace(/3\s/g, '\x1b[33m██\x1b[0m')
					.replace(/4\s/g, '\x1b[34m██\x1b[0m')
					.replace(/5\s/g, '\x1b[35m██\x1b[0m')
					.replace(/6\s/g, '\x1b[36m██\x1b[0m')
					.replace(/7\s/g, '\x1b[32m██\x1b[0m')
					.replace(/8\s/g, '\x1b[31m██\x1b[0m')
			);
		}
	}
}

// See if we can drop the piece, and return true if we did.
// Return false if the piece cannot go any lower.
function dropPiece() {
	var hitSomething = mechanics.detectCollision(piece, board, 'down');

	if (hitSomething == true) {
		if (piece.top < 2) {
			clearInterval(looper);
			lockPiece();
			showBoard(board);
			console.log('GAME OVER, LOSER!');
		} else {
			lockPiece();
			checkLines();
			spawnPiece();
		}
	} else {
		// Did not hit any other piece, or the bottom, so let's drop down
		piece.top += 1;
	}
	return !hitSomething;
}

// Lock the piece in place on the main board
function lockPiece() {
	piece.matrix.forEach(function (value, index, matrix) {
		//  console.log('value:', value, 'index:', index);
		if (value == piece.id)
			board = board.subset(
				math.index(index[0] + piece.top, index[1] + piece.left),
				piece.id
			);
	});
}

function spawnPiece() {
	piece = pieces.getNewPiece();
}

function checkLines() {
	let lines = 0;
	for (let i = piece.top; i < piece.top + 5; i++) {
		if (i > 23) break;
		if (board._data[i].indexOf(0) === -1) {
			clearLine(board, i);
			lines++;
		}
	}
	calcPoints(lines);
}

function calcPoints(lines) {
	if (lines === 1) {
		gameScore += 100;
	} else {
		gameScore += lines * 200;
	}
}

function clearLine(board, row) {
	var temp = math.subset(
		board,
		math.index(math.range(0, row), math.range(3, 13))
	);
	board.subset(math.index(math.range(1, row + 1), math.range(3, 13)), temp);
}

function displayPieceOnBoard() {
	var tempBoard = board.clone();
	// Copies a piece onto the board
	piece.matrix.forEach(function (value, index, matrix) {
		//  console.log('value:', value, 'index:', index);
		if (index[0] + piece.top >= 0 && value == piece.id) {
			tempBoard.subset(
				math.index(index[0] + piece.top, index[1] + piece.left),
				piece.id
			);
		}
	});
	showBoard(tempBoard);
	console.log('score: ', gameScore);
	console.log('level: ', level);
	// console.log("interval: ", interval);
}

function step() {
	if (dropPiece()) {
		displayPieceOnBoard();
		if (gameScore > level * 1000) {
			interval /= 2;
			looper = setInterval(step, interval);
			level++;
		}
	}
}

// set the initial board
var board = setBoard();

var piece = pieces.getNewPiece();

var next = pieces.getNewPiece();

displayPieceOnBoard();

// This calls the step() function [to drop the current piece] each <interval> seconds
var interval = 600;
var looper = setInterval(step, interval);
var looping = true;
var gameScore = 0;
var level = 1;
