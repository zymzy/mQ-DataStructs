/* Stack implemented using a singly linked-list */

class ListStack {
    //Argument shall be an array of initial values or be omitted
    constructor(initialData) {
        //Error checking
        if (arguments.length !== 0 && !(Array.isArray(initialData))) throw new Error("Argument to 'ListStack' constructor must be an array OR be omitted");
        
        this.length = 0; //Initialize length property

        //Setup a temporary sentinel object for easy appending of initial values
        let temp = this.top = {
            next: null
        };
        //Append each element of the argument array as initial values of the stack
        if (Array.isArray(initialData)) {
            initialData.forEach((elem) => {
                temp.next = new ListStack.node(elem);
                temp = temp.next;
                this.length++
            });
        }
        this.top = this.top.next; //Advance the top to remove the sentinel object
    }

    //Append the list of arguments as values at the beginning of the stack.
    push(...data) {
        if (data.length === 0) return; //Trivial case return
        
        let temp1, temp2;
        temp1 = temp2 = { next: null };
        for (let elem of data) {
            temp2.next = new ListStack.node(elem);
            temp2 = temp2.next;
            this.length++
        }
        if (this.top !== null) temp2.next = this.top;
        this.top = temp1.next;
    }

    //Pop values from the beginning of the stack. The argument specifies how many values to pop; if omitted, a single value is popped. Returns an array.
    pop(count) {
        let result = [];
        if (this.length <= 1 || count >= this.length) count = this.length;
        else if (arguments.length === 0) count = 1;
        for (let i = 0; i < count; i++) { //In case where argument 'count' is supplied
            result.push(this.top.data);
            this.top = this.top.next;
            this.length--;
        }
        return result;
    }

    //Removes all values from the stack and resets it.
    clear() {
        this.top = null;
        this.length = 0;
    }

    //Log a warning messsage to the console if the stack is empty, otherwise return the value at the top of the stack without deleting it.
    peek() {
        if (this.top === null) console.log("Warning: 'peek' operation unsuccessful. The stack is currently empty. Nothing to peek.");
        else return this.top.data;
    }

    //Linear search the stack for the value specified by the argument 'data'.
    contains(data) {
        if (this.length < 1 || arguments.length === 0) return false;
        let iter = this.top;
        while (iter.data !== data) {
            if (iter.next === null) return false;
            iter = iter.next;
        }
        return true;
    }

    //Return the size of the stack.
    size() {
        return this.length;
    }
}

//Constructor for nodes of the stack
ListStack.node = function(data){
    this.data = data;
    this.next = null;
};

//DEBUG LINES BELOW
arr = [1,2,3,4,5];
var test = new ListStack(arr);
console.log(test);