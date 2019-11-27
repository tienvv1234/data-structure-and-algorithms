![Big O notation](https://cdn-media-1.freecodecamp.org/images/1*KfZYFUT2OKfjekJlCeYvuQ.jpeg)

good code can describe in two things:

1. Readable
2. Scalable

Big-O notation is what allow us to measure this idea of scalable code that can scale

we can measure the big-O of function using the performance.now()

1. O(n) Linear time
2. O(1) Constant time

## lecture Big O

### section 5 O(n)

- this is linear our number of inputs increase the number of operations increase as well
- the big o depends on the number of inputs

### section 6 O(1)
- console.log(boxes[0]), console.log(boxes[1]) this will exexute 2 operation so the big o notation is O(2) we can round this down to O(1) --> we can call constant time

### section 11
There are some rules on the big O:
1. Worst Case
2. Remove Constants
3. Different term for input
4. Drop non Dominants

### section 12 Rule 1
when calculate the big(O) we always thing about the worst case (tính toàn the big O là luôn chiếu theo trường hợp xấu nhất)

### section 13 Rule 2
drop the constants, (không tính các cái fix cứng trong big o như là vong lặp với 1 mảng cố định)

### section 14 Rule 3
Different term for input(nếu là 2 mảng khách nhau thì big O đc tính là O(n + n)

### section 16 Rule 4
Drop non Dominants (O(n + n^2) we can drop n then the big O(n^2) because the n^2 is more importance, we just care about scalable) 

### section 18
https://www.bigocheatsheet.com/

### section 19 O(n!)

### section 21 Space Complexity
- whem a program executes it has two ways to remember things. the heap and the stack.
- the heap is usually where we store variables that we assign values to
- the stack is usually where we keep track of our function call

## lecture How to solve coding problems

## Data structure
- DS is a collection of values
- algorithms are the steps or processes we put into place to manipulate(điều khiển) these collection of values.

- there are two parts to understanding DS
1. How to build one
2. how to Use it

- these variables are stored in RAM

## Lecture Arrays

### Arrays
- Array which are sometime called list organizes item sequentially. That mean one after another in memory. they are stored in contignuous(liên tiếp nhau) memory that is in order, they are also have the smallest footprint of any ds
- So if all you need is to store some data and iterate over it that is go one by one step by step, Arrays are best choice, especially(đặt biệt) if you know the indices (array[1])

Lookup(assess `array[index]`) O(1), push O(1), insert O(n), delete O(n)

there are two type of array and what's the different between the two
1. static (fixed in size meaning you need to specify the number of element your array will hold ahead of time)
2. dynamic (allow us to copy and rebuild an array at a new location which with more memory)

Dynamic array

Lookup(assess `array[index]`) O(1), append*(* can be O(n)) O(1), insert O(n), delete O(n) 
- when we add another item underneath the hood because this is a dynamic array. it's going to loop over these items. copy them and move it to a different location with now double blocks of space, so that we can keep adding on.

- why append* sometime can be is O(n) because when to expand the array it's going to loop over these items. copy them and move it to a different location with now double blocks of space, so that we can keep adding on.

note : dynamic array usually doubles the space when it expand
- pros and cons of array:
+ Fast lookups
+ Fast push/pop
+ Ordered

+ Slow inserts
+ slow deletes
+ fixed size (if using static array)

## Option Classes

### Reference Type
[] === [] is false


### context (context vs scope)
- if you remember we said that scope is created when it sees curly bracket
- context tell you where we are within the object

### instantiation

## Hash Table (or Hash Map)

### Hash Function
- is simple a function that generates a value of fixed length for each input that gets
- First is the one way.
- Second is that no matter how many times i put hello in there it's going to be the same generates value --> this call idempotent
- the one benefit and why we would want to use this and a data structure is that we get really fast

insert O(1) Lookup O(1) Delete O(1) Search O(1)

- hash collisions

es6 have map and set
- map: the different between a map and an object is fact that a map allows you to save any data type as the key, with an object you can only save the key as a string, another benefit of map is that it maintains insertion order, what does that mean. With an object there is no order is there 
- set: this semilar to map, the only difference is that it only stores the keys no values

- a HashTable works is that it takes a key input and then run it through a hash function a hash function basically just map string to numbers and usually the numbers just correspond to indexes in an array, a hash function need to be consistent, when you run a key through the hash function it always gives the same number, and it should map different words to different numbers, if two words get hashed to the same number, this is call collision, one way to handle collisions is just store both key value pair at that index upon lookup of either you would have to iterate through the bucket of items to find the key you looking for, this could take a extra time because of iteration

- HashTable are great when you want quick access to certain vallues
#### Reviews
- Fast Lookups*
- Fast inserts
- Flexible key
* Good collision resolution needed
- Unordered
- Slow key Iteration

## Linked list
- two types of linked list : singly, doubly 
- linked list is a list that linked

### Singly Linked Lít
linked list: apples --> grapes --> pears

more exactly
apples
8947 ---> grapes
          8742 -->  pears
                    327 --> null

- iterate through linked list quite a bit slower than iterating through items like an array, event though they are technically both of O(n), however these inserts that we can do in the middle of a linked list is a lot better than an array
- when insert a item in linked list we just scatter it all over memory and we can just keep adding and we don't have to do any of that like unshift or shift on the index that we did with the array

- the one advantage that it has over hash table is that there is some sort of order to linked list

prepend O(1), append O(1), lookup O(n), insert O(n), delete O(n)

prepend is add item in begin of list
append is add item in the end of list

#### Pointer
- it's a refernce to another place in memory or another object or another node and in javascript we can demonstrate it with something like this: 

    const obj1 = { a: true }
    const obj2 = obj1

### Doubly LinkedList
{
    value:
    prev:
    next:
}

#### when should we use one over the other
singly vs doubly

- singly
pros : it's a fairly simple implementation especially compare to the doubly one. it requires less memory as we can see here less block, this a litte bit faster, but singly the downside with a singly linked list is that it can not be iterated in reverse or traverse from back to front, so singly list is appropriate to use when you have less memory and your goal is that you want to fast insertion and deletion and you don't really have that much searching, especially when you have insertion at the beginning of a list

- doubly
the good side of is that it can be iterated or traversa both from the front or from the back. another beauty is that if you need to delete a previous node you don't need to traverse from the head node and find what the previous notice which a singly linked list has no concept of, you can do that fairly easily with a doubly linked list, it's more complex than singly and requires more memory and storage, so doubly linked list are really good when you don't have that much limitation on memory, and when you want good operation for searching for elements such as searching backward(tìm kiếm ngược dòng) instead of fort
