/*
A queue that can be of type T
Generics are great in any language
*/

// export class Queue<T> {
//     private items: T[] = [];
//
//     constructor(items?: T[]) {
//         if (items) {
//             this.items = items
//         }
//     }
//
//     public add = (item: T ) => {
//         this.items.push(item);
//     }
//
//     public pop(): T | undefined {
//         if (this.isEmpty()) {
//             return;
//         } else {
//             return this.items.shift() as T;
//         }
//     }
//
//     public isEmpty(): boolean {
//         return this.items.length === 0;
//     }
//
//     public poll(): T | undefined {
//         return this.pop();
//     }
//
//     public peek(): T | undefined {
//         if (this.isEmpty()) {
//             return;
//         } else {
//             return this.items[0];
//         }
//     }
//
//     // --- start extend functions ---
//     public addMany = (items: T[]) => {
//         this.items = [...this.items, ...items];
//     }
//
//     public concat = (queue: Queue<T>) => {
//         this.items = [...this.items, ...queue.items];
//     }
//
//     public clear = () => {
//         this.items = []
//     }
//     // --- end extend functions ---
// }

// /**
//  * @license MIT
//  * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
//  *
//  * @class
//  */
// export class Queue<T> {
//     private _elements: T[];
//     private _offset: number;
//
//     /**
//      * Creates a queue.
//      * @param {array} [elements]
//      */
//     constructor(elements?: T[]) {
//         this._elements = Array.isArray(elements) ? elements : [];
//         this._offset = 0;
//     }
//
//     /**
//      * Adds an element at the back of the queue.
//      * @public
//      * @param {any} element
//      */
//     enqueue(element: T): Queue<T> {
//         this._elements.push(element);
//         return this;
//     }
//
//     /**
//      * Dequeues the front element in the queue.
//      * @public
//      * @returns {any}
//      */
//     dequeue(): T | null {
//         if (this.size() === 0) return null;
//
//         const first = this.front();
//         this._offset += 1;
//
//         if (this._offset * 2 < this._elements.length) return first;
//
//         // only remove dequeued elements when reaching half size
//         // to decrease latency of shifting elements.
//         this._elements = this._elements.slice(this._offset);
//         this._offset = 0;
//         return first;
//     }
//
//     /**
//      * Returns the front element of the queue.
//      * @public
//      * @returns {any}
//      */
//     front() {
//         return this.size() > 0 ? this._elements[this._offset] : null;
//     }
//
//     /**
//      * Returns the back element of the queue.
//      * @public
//      * @returns {any}
//      */
//     back() {
//         return this.size() > 0 ? this._elements[this._elements.length - 1] : null;
//     }
//
//     /**
//      * Returns the number of elements in the queue.
//      * @public
//      * @returns {number}
//      */
//     size(): number {
//         return this._elements.length - this._offset;
//     }
//
//     /**
//      * Checks if the queue is empty.
//      * @public
//      * @returns {boolean}
//      */
//     isEmpty(): boolean {
//         return this.size() === 0;
//     }
//
//     /**
//      * Returns the remaining elements in the queue as an array.
//      * @public
//      * @returns {array}
//      */
//     toArray(): T[] {
//         return this._elements.slice(this._offset);
//     }
//
//     /**
//      * Clears the queue.
//      * @public
//      */
//     clear(): void {
//         this._elements = [];
//         this._offset = 0;
//     }
//
//     /**
//      * Creates a shallow copy of the queue.
//      * @public
//      * @return {Queue}
//      */
//     clone(): Queue<T> {
//         return new Queue(this._elements.slice(this._offset));
//     }
//
//     /**
//      * Creates a queue from an existing array.
//      * @public
//      * @static
//      * @param {array} elements
//      * @return {Queue}
//      */
//     static fromArray<T>(elements: T[]): Queue<T> {
//         return new Queue(elements);
//     }
// }
export {}
