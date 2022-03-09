/**
 * Author:    Zi Han Meng <zi.han.meng100@gmail.com>
 * Copyright: (c) 2021 Zi Han Meng
 * License:   MIT License <https://github.com/zymzy/mQ-DataStructs/blob/master/LICENSE>
 **/

/* Singly linked list */

class LinkedList {
    //Argument shall be an array of initial values or be omitted
    constructor(initialData) {
        //Error checking
        if (arguments.length !== 0 && !(Array.isArray(initialData))) throw new Error("Argument to 'LinkedList' constructor must be an array OR be omitted");
        
        this.length = 0; //Initialize length property

        //Setup a temporary sentinel object for easy appending of initial values
        let temp = this.head = {
            next: null
        };
        //Append each element of the argument array as initial values of the list
        if (Array.isArray(initialData)) {
            initialData.forEach((elem) => {
                temp.next = new LinkedList.node(elem);
                temp = temp.next;
                this.length++
            });
            this.tail = temp; //Set the tail to the end of the list
        } else this.tail = this.head.next; //Set the tail in case of no argument (i.e. to null)
        this.head = this.head.next; //Advance the head to remove the sentinel object
    }

    //Append the list of arguments as values at the beginning of the list.
    appendHead(...data) {
        if (data.length === 0) return; //Trivial case return
        
        let temp1, temp2;
        temp1 = temp2 = { next: null };
        for (let elem of data) {
            temp2.next = new LinkedList.node(elem);
            temp2 = temp2.next;
            this.length++
        }
        if (this.head === null) {
            this.tail = temp2;
            this.head = temp1.next; //THIS LINE CAN BE REFACTORED
        } 
        else {
            temp2.next = this.head;
            this.head = temp1.next; //THIS LINE CAN BE REFACTORED
        }
        
    }

    //Append the list of arguments as values at the end of the list.
    appendTail(...data) {
        if (data.length === 0) return; //Trivial case return
   
        let temp1, temp2;
        temp1 = temp2 = { next: null };
        for (let elem of data) {
            temp2.next = new LinkedList.node(elem);
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

    //Append the list of arguments starting from the second argument onwards as values after the first occurence of the value as specified by the first argument.
    appendAfter(precedingData, ...data) {
        if (data.length === 0) return; //Trivial case
        if (this.length === 0) throw new Error("Cannot find a suitable node after which to insert the new data!"); //Trivial case
        //Finding the the node after which to insert the new data
        let precedingNode = this.head;
        while (precedingNode.data != precedingData) {
            if (precedingNode.next === null) throw new Error("Cannot find a suitable node after which to insert the new data!");
            precedingNode = precedingNode.next
        }
        
        let temp1, temp2;
        temp1 = temp2 = { next: null };
        for (let elem of data) {
            temp2.next = new LinkedList.node(elem);
            temp2 = temp2.next;
            this.length++
        }
        temp2.next = precedingNode.next;
        precedingNode.next = temp1.next;
        if (precedingNode === this.tail) this.tail = temp2;
    }

    //Pop values/nodes from the beginning of the list. The argument specifies how many values to pop; if omitted, a single value is popped. Returns an array.
    popHead(count) {
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

    //Pop values/nodes from the end of the list. The argument specifies how many values to pop; if omitted, a single value is popped. Returns an array.
    popTail(count) {
        let result = []
        if (this.length <= 1 || count >= this.length) { //In case where the linked-list is empty or where 'count' is greater that the numbers of nodes in the linked-list.
            let iter = this.head;
            while (iter !== null) {
                result.push(iter.data);
                iter = iter.next;
            }
            this.clear();
        } else if (arguments.length === 0) { //In case where no argument is supplied
            result.push(this.tail.data)
            let temp = this.head;
            while (temp.next.next !== null) {
                temp = temp.next;
            }
            temp.next = null;
            this.tail = temp;
            this.length--;
        } else { //In case where argument 'count' is supplied
            let current, lookAhead;
            current = lookAhead = this.head;
            for (let i = 0; i < count; i++) {
                lookAhead = lookAhead.next;
                this.length--;
            }
            while (lookAhead.next !== null) {
                lookAhead = lookAhead.next;
                current = current.next;
            }
            let iter = current.next;
            while (iter !== null) {
                result.push(iter.data);
                iter = iter.next;
            }
            current.next = null;
            this.tail = current;
        }
        return result;
    }

    //Delete the first occurance of the value/node as specified by the argument from the linked-list.
    delete(data) {
        if (this.length < 1 || arguments.length === 0) return; //Trivial cases when the linked-list is empty and when no argument 'data' is supplied
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

    //Removes all values from the linked-list and resets it.
    clear() {
        this.head = this.tail = null;
        this.length = 0;
    }

    //Log a warning message to the console if the linked list is empty, otherwise return the value of the head node without deleting it.
    peekHead() {
        if (this.head === null) console.log("Warning: 'peek' operation unsuccessful. The linked list is currently empty. Nothing to peek.");
        else return this.head.data;
    }

    //Log a warning message to the console if the linked list is empty, otherwise return the value of the tail node without deleting it.
    peekTail() {
        if (this.tail === null) console.log("Warning: 'peek' operation unsuccessful. The linked list is currently empty. Nothing to peek.");
        else return this.tail.data;
    }

    //Linear search the linked-list for the value specified by the argument 'data'.
    contains(data) {
        if (this.length < 1 || arguments.length === 0) return false;
        let iter = this.head;
        while (iter.data !== data) {
            if (iter.next === null) return false;
            iter = iter.next;
        }
        return true;
    }

    //Return the size of the linked list.
    size() {
        return this.length;
    }
}

//Constructor for nodes of the linked-list
LinkedList.node = function(data){
    this.data = data;
    this.next = null;
};

//DEBUG LINES BELOW
arr = [1,2,3,4,5];
var test = new LinkedList(arr);
console.log(test);


///////////////////////////////////////////////////////////////////////////////////////////

