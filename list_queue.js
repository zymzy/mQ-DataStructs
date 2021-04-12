/* Queue implemented using a singly linked-list */

class ListQueue {
    //Argument shall be an array of initial values or be omitted
    constructor(initialData) {
        //Error checking
        if (arguments.length !== 0 && !(Array.isArray(initialData))) throw new Error("Argument to 'ListQueue' constructor must be an array OR be omitted");
        
        this.length = 0; //Initialize length property

        //Setup a temporary sentinel object for easy appending of initial values
        let temp = this.head = {
            next: null
        };
        //Append each element of the argument array as initial values of the queue
        if (Array.isArray(initialData)) {
            initialData.forEach((elem) => {
                temp.next = new ListQueue.node(elem);
                temp = temp.next;
                this.length++
            });
            this.tail = temp; //Set the tail to the end of the queue
        } else this.tail = this.head.next; //Set the tail in case of no argument (i.e. to null)
        this.head = this.head.next; //Advance the head to remove the sentinel object
    }

    //Enqueue the list of arguments as values (to the back of the queue).
    enqueue(...data) {
        if (data.length === 0) return; //Trivial case return
   
        let temp1, temp2;
        temp1 = temp2 = { next: null };
        for (let elem of data) {
            temp2.next = new ListQueue.node(elem);
            temp2 = temp2.next;
            this.length++
        }
        if (this.head === null) {
            this.tail = temp2; //THIS LINE CAN BE REFACTORED
            this.head = temp1.next;
        } 
        else {
            this.tail.next = temp1.next;
            this.tail = temp2; //THIS LINE CAN BE REFACTORED
        }
    }
    
    //Dequeue values/nodes (from the front of the queue). The argument specifies how many values to dequeue; if omitted, a single value is dequeued. Returns an array.
    dequeue(count) {
        let result = [];
        if (this.length <= 1 || count >= this.length) { //In case where the linked-list is empty or where 'count' is greater that the number of nodes in the linked-list.
            count = this.length;
            this.tail = null;
        } 
        else if (arguments.length === 0) count = 1; //In case where no argument is supplied
        for (let i = 0; i < count; i++) { //In case where argument 'count' is supplied
            result.push(this.head.data);
            this.head = this.head.next;
            this.length--;
        }
        return result;
    }

    //Delete the first occurance of the value/node as specified by the argument from any position within the queue
    delete(data) {
        if (this.length < 1 || arguments.length === 0) return; //Trivial cases when the queue is empty and when no argument 'data' is supplied
        let iter = { //A temporary helper object to simplify the code
            headGuard: true,
            next: this.head
        };
        while (iter.next.data != data) {
            iter = iter.next;
            if (iter.next === null) throw new Error("'delete' operation failed. Cannot find the specified data.")
        }
        iter.next = iter.next.next;
        if (iter.headGuard) this.head = iter.next;
        if (iter.next === null) this.tail = iter;
        this.length--;
    }

    //Removes all values from the queue and resets it.
    clear() {
        this.head = this.tail = null;
        this.length = 0;
    }

    //Log a warning message to the console if the queue is empty, otherwise return the value/node at the front of the queue without deleting it.
    peek() {
        if (this.head === null) console.log("Warning: 'peek' operation unsuccessful. The queue is currently empty. Nothing to peek.");
        else return this.head.data;
    }

    //Linear search the queue for the value specified by the argument 'data'.
    contains(data) {
        if (this.length < 1 || arguments.length === 0) return false;
        let iter = this.head;
        while (iter.data !== data) {
            if (iter.next === null) return false;
            iter = iter.next;
        }
        return true;
    }

    //Return the size of the queue.
    size() {
        return this.length;
    }
}

//Constructor for nodes of the linked-list
ListQueue.node = function(data){
    this.data = data;
    this.next = null;
};

//DEBUG LINES BELOW
arr1 = [1,2,3,4,5];
arr2 = ["a", "b", "c"]
arr3 = [{someProp: true}, 888, "obi-wan"]
var test = new ListQueue(arr1);
console.log(test);


//////////////////////////////////////////////////////////////////////////////////