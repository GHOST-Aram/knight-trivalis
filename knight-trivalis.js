import { Board } from "./board.js";
import {Node} from './node.js'
const board = new Board()

//Create Board
const boardSquares = board.board

//Create square nodes rows and columns
for(let rank = 0; rank < 8; rank ++){
    for(let file = 0; file < 8; file ++){
        const node = new Node(rank, file)
    }
    
}