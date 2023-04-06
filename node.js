export class Node {
    constructor(rank, file){

        //Record rank anf file
        this.coordinate = [rank, file]
        

        //Piece on this sqaure
        this.piece = ''

        //Visited
        this.visited = false

        //Parent node of this node
        this.parent = null

        //Is target
        this.isTarget = false

    }
}
