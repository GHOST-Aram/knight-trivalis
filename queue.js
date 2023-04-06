export class Queue {
    /**
     * Use an Array as Abstract data Structure to 
     * implement a FIFO Data structure
     * Use Array.prototype.unshift to Enqueue elements
     * Use Array.prototype.shift to Dequeue 
     */

    constructor(){
        this.collection = []
    }

    //Append an item at the end of the collection
    enqueue(item){
        this.collection.unshift(item)
    }

    // Get item from the front of the collection
    dequeue(){
        return this.collection.shift()
    }

    // Check if collection contains any items
    isEmpty(){
        return this.collection.length <= 0
    }
}