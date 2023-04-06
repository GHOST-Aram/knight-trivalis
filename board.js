import {Queue} from './queue.js'
export class Board {
    /**
     * Board class instanciates an object with an 8 by 8 Multidimensional array representing
     * a square of 64 nonde
     */
    constructor (){
        this.board = []
    }/**
     * 
     * @param {*} coordinate 
     * Coordinate contains array reference indices of the target square on the chess board
     * Method backtrack parth of knight through parents of each squares from target to start square
     * returns coordinates of the path as an array of coordinate arrays eg [[x-start,y-start], [x1, y1]..., [x-target, y-target]]
     * X and y represents rows and columns in a multidimensional array / rank and file on a chessboard respectively
     */
    backTrackPath(coordinate){
        const coordinates = []
        let current = this.board[coordinate[0]][coordinate[1]]

        //Search backwards until parent is null
        do{
            // Stack the coordinates in order from target to start -> reverse of start to target
            coordinates.unshift(current.coordinate)

            // Advance current node pointer
            current = current.parent
        }while(current !== null)

        // Stack starting square cordinate infront of the array
        coordinates.unshift(coordinate)

        return coordinates
    }
    /**
     * 
     * @param {*} coordinate 
     * Coordinates are in the order Row by column 
     * Represents the curent position of a pice on the chessboard
     * Method returns an array of 8 possible coordinates of knight moves
     * Throws error if array Index is less than 0 or greater than 7
     */
    getAdjacentCoordinates(coordinate){
        if(coordinate[0] > 7 || coordinate[0] < 0 || coordinate[1] > 7 || coordinate[1]< 0)
            throw `ArrayIndexOutOfBounds: Index ${(coordinate[0] < 0 ||coordinate[0] > 7) ? coordinate[0] : coordinate[1]}` 
        const adjacentCoordinates =  [
            [(coordinate[0] + 2), (coordinate[1] - 1)],
            [(coordinate[0] + 2), (coordinate[1] + 1)],
            [(coordinate[0] + 1), (coordinate[1] - 2)],
            [(coordinate[0] - 1), (coordinate[1] - 2)],
            [(coordinate[0] - 2), (coordinate[1] - 1)],
            [(coordinate[0] - 2), (coordinate[1] + 1)],
            [(coordinate[0] - 1), (coordinate[1] + 2)],
            [(coordinate[0] + 1), (coordinate[1] + 2)]

        ]

        //Filter out Indices that are out of bounds and visited nodes
        return adjacentCoordinates.filter(
            coordinate => {
                return (coordinate[0] >= 0 && coordinate[0] <= 7) && (coordinate[1] >= 0 && coordinate[1] <= 7)
                        && this.board[coordinate[0]][coordinate][1].visited === false
            }
            )

    }/**
     * 
     * @param {*} startCoordinate 
     * Start Coordinate represents the intial position of knight on the board
     * Traverses all possible knight moves using BFS until it finds target square
     * Target square is labbled with istargetProperty set to true
     * This Traversal visits every square only once
     * Once a square is visited, it is marked as visited and not to be visited again
     * This method uses a queue to track squares in order
     */
    goToTarget(startCoordinate){
        const coordinates = new Queue()

        // Enqueue first coordinate
        coordinates.enqueue(startCoordinate)
        
        while(coordinates.length > 0){
            //Dequeue 
            currentCoordinate = coordinates.dequeue()

            //Check if item is target
            if(this.board[currentCoordinate[0]][currentCoordinate[1]].isTarget === true){
                return true
            }
            //If current is not target
            else{
                // Get coordinates of adjacent nodes
                const adjacentCoordinates = this.getAdjacentCoordinates(currentCoordinate)

                //Scan nodes at those indices/coordinates
                adjacentCoordinates.forEach(
                    coordinate =>{
                        //Set parent
                        this.board[coordinate[0]][coordinate[1]].parent = this.board[currentCoordinate[0]][currentCoordinate[1]]
                        
                        //Mark as visited 
                        this.board[coordinate[0]][coordinate[1]].visited = true

                        //Enqueue coordinate
                        coordinates.enqueue(coordinate)
                    }
                )
            }
        }
    }
    /**
     * 
     * @param {*} coordinate 
     * Coordinate are in the order Row by column 
     * Represents the position of a pice on the chessboard
     * Marks target with a truthy value
     * Throws error if array Index is less than 0 or greater than 7
     */
    markTarget(coordinate){
        if(coordinate[0] > 7 || coordinate[0] < 0 || coordinate[1] > 7 || coordinate[1]< 0)
            throw `ArrayIndexOutOfBounds: Index ${(coordinate[0] < 0 ||coordinate[0] > 7) ? coordinate[0] : coordinate[1]}` 
        this.board[coordinate[0]][coordinate[1]].isTarget = true
    }
    /**
     * 
     * @param {*} piece -  String of Chess piece name
     * @param {*} coordinate - [rank, file] Position in the board where
     *  the piece is suppossed to be placed
     * Coordinate order corresponds to Multidimensional array referencing order ->[row][column]
     * If row or column(rank or file) is greater than 7 or less than 0: The method throws an error
     */
    placePiece(piece, coordinate){
        if(coordinate[0] > 7 || coordinate[0] < 0 || coordinate[1] > 7 || coordinate[1]< 0)
            throw `ArrayIndexOutOfBounds: Index ${(coordinate[0] < 0 ||coordinate[0] > 7) ? coordinate[0] : coordinate[1]}` 
        
        this.board[coordinate[0]][coordinate[1]].piece = piece
    }


    
}   
