// 10 --> 5 --> 16

// let myLinkedList = {
//     head: {
//         value: 10,
//         next: {
//             value: 5,
//             next: {
//                 value: 16,
//                 next: null
//             }
//         }
//     }
// }

class NodeLinkedList {
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null,
            prev: null
        }

        // if we have only one item the head is the tail
        this.tail = this.head;
        this.length = 1;
    }

    append(value){
        const newNode = new NodeLinkedList(value);
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }

    prepend(value){
        const newNode = new NodeLinkedList(value);
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.length++;
        return this;
    }

    insert(index, value){
        //check params
        if(index >= this.length){
            return this.append(value);
        }

        if(index === 0){
            return this.prepend(value);
        }

        const newNode = new NodeLinkedList(value);

        const leader = this.traverseToIndex(index - 1);
        console.log('leader', leader);
        const follower = leader.next;
        leader.next = newNode;
        newNode.prev = leader;
        newNode.next = follower;
        follower.prev = newNode;
        this.length++;
        console.log('this', this);
        return this.printList();
    }

    traverseToIndex(index) {
        //check param
        let counter = 0;
        let currentNode = this.head;
        console.log('currentNode1', currentNode);
        while(counter !== index) {
            console.log('counter', counter);
            console.log('index', index);
            currentNode = currentNode.next;
            console.log('currentNode2', currentNode);
            counter++;
        }
        return currentNode;
    }

    printList(){
        const array = [];
        let currentNode = this.head;
        while(currentNode !== null ){
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }

    remove(index){
        //check param
        const leader = this.traverseToIndex(index - 1);
        const unwantedNode = leader.next;
        unwantedNode.prev = leader;
        leader.next = unwantedNode.next;
        this.length--;
        return this.printList();
    }
}

const myLinkedList = new DoublyLinkedList(10);

// console.log('myLinkedList', myLinkedList)
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend(1);
myLinkedList.insert(3, 99);
// myLinkedList.remove(3, 99);
console.log('myLinkedList.tail 1111111111111111111111111', myLinkedList.tail.prev.value);
console.log('myLinkedList.tail 1111111111111111111111111', myLinkedList.tail.prev.prev.next);
console.log('myLinkedList1', myLinkedList.printList());
// console.log('myLinkedList2', JSON.stringify(myLinkedList))