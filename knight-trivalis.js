import { Board } from "./board.js";
import {Node} from './node.js'
const board = new Board()

//Create Board
const boardSquares = board.board

//Create square nodes rows and columns
for(let rank = 0; rank < 8; rank ++){
    const row = []
    for(let file = 0; file < 8; file ++){
        //Create new Node for every square
        const node = new Node(rank, file)

        //Push new nodes into row
        row.push(node)
    }
    //Append to board squares
    boardSquares.push(row)
}

// const path = board.knightMoves(,
 //Place Knight on board
 let path = []
 board.placePiece('Knight', [0,0])

 //Mark target squares
 board.markTarget([1,2])

 //Search target then find path
 if(board.goToTarget([0,0]))
    path =  board.backTrackPath([1,2])
  

console.log(path)
