console.log("initialization");

class hashmap{
    constructor(){
        this.loadf = 0.75;
        this.capacity = 16;

        this.buckets = new Array(this.capacity);
        this.count = 0;

    }
    
    resize(){
        let oldbuckets = this.buckets;
        this.capacity *= 2;
        this.count = 0;

        this.buckets = new Array(this.capacity);

        for(let bucket of oldbuckets){
            if(bucket === undefined) continue;

            let curr = bucket.head;

            while(curr !== null){
                this.set(curr.key, curr.value);
               curr =  curr.next;
            }
        }

    }
    

    hash(key){
        let hashcode = 0;
        let primeNumber = 31;
        let index;

        if(key.length > 100){
            throw new Error("KEY TOO LONG");
        }


        for(let i = 0; i<key.length; i++){  
            hashcode = primeNumber * hashcode + key.charCodeAt(i);
        }
        
        index = hashcode % this.capacity;

        return index;
    
    }

    set(key, value){
        let index = this.hash(key);
        
        if(this.buckets[index] == undefined){
            this.buckets[index] = new linkedlist;
        }

        if(this.buckets[index].head == null){
            this.buckets[index].head = new Node(key,value);
            this.count++;

        }else{
            let curr = this.buckets[index].head;
            let prev;

            while(curr !== null){

                if(curr.key == key){
                    curr.value = value;
                    return;
                }
                prev = curr;
                curr = curr.next;
            }

            prev.next = new Node(key,value);
            this.count++;
        }


         if(this.count / this.capacity> this.loadf){
                this.resize();
            }
        
    }


    get(key){
        let index = this.hash(key);

        if(this.buckets[index] == undefined){
            return undefined;
        }

       let curr =  this.buckets[index].head;

       while(curr != null){
        if(curr.key == key){
            return curr.value
        }
        curr = curr.next;
       }

       return undefined;
    }


    has(key){
        let index = this.hash(key);

        if(this.buckets[index] == undefined){
            return false;
        }

       let curr =  this.buckets[index].head;

       while(curr != null){
        if(curr.key == key){
            return true;
        }
        curr = curr.next;
       }

       return false;
    }

   remove(key){
        let index = this.hash(key);
        let prev =null;
        

        if(this.buckets[index] == undefined){
            return false;
        }

        let curr =  this.buckets[index].head;

       while(curr != null){
        

        if(curr.key === key){
              if(prev == null){
                this.buckets[index].head = curr.next;
              }else{     
                prev.next = curr.next;
              }
            this.count--;
            return true;
        }
       
         prev = curr;
         curr = curr.next;
       }

       return false;
    }

    length(){
        return this.count;
    }

    clear(){
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
        this.count = 0;
    }

    keys(){
        let array = [];
        let curr;
        for(let bucket of this.buckets){
            if(bucket === undefined) continue;

            curr = bucket.head;

            while(curr != null){
                array.push(curr.key);
                curr = curr.next;
            }
        }

        return array;
    }
    
     values(){
        let array = [];
        let curr;
        for(let bucket of this.buckets){
            if(bucket === undefined) continue;

            curr = bucket.head;

            while(curr != null){
                array.push(curr.value);
                curr = curr.next;
            }
        }

        return array;
    }

      entries(){
        let array = [];
        let curr;
        for(let bucket of this.buckets){
            if(bucket === undefined) continue;

            curr = bucket.head;

            while(curr != null){
                array.push([curr.key, curr.value]);
                curr = curr.next;
            }
        }

        return array;
    }
}

class linkedlist {
    constructor(){
        this.head = null;
    }
}

class Node{
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}


const test = new hashmap();

// Initial setup
console.log("INITIAL CAPACITY:", test.capacity);
console.log("INITIAL LENGTH:", test.length());

// Populate the hash map
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Check load factor
console.log("\n--- AFTER 12 INSERTIONS ---");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);
console.log("Load factor:", test.count / test.capacity);

// Overwrite existing values
test.set("apple", "green");
test.set("banana", "brown");
test.set("lion", "orange");

console.log("\n--- AFTER OVERWRITING ---");
console.log("Length:", test.length()); 
console.log("Capacity:", test.capacity);
console.log("Apple:", test.get("apple"));
console.log("Banana:", test.get("banana"));
console.log("Lion:", test.get("lion"));

// Trigger resizing
test.set("moon", "silver");

console.log("\n--- AFTER RESIZING ---");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);
console.log("Load factor:", test.count / test.capacity);

// Check overwriting after resizing
test.set("moon", "white");
test.set("frog", "lime");

console.log("\n--- OVERWRITING AFTER RESIZING ---");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);
console.log("Moon:", test.get("moon"));
console.log("Frog:", test.get("frog"));

// Test get()
console.log("\n--- GET ---");
console.log(test.get("apple")); 
console.log(test.get("moon"));
console.log(test.get("unknown")); // undefined

// Test has()
console.log("\n--- HAS ---");
console.log(test.has("apple"));   // true
console.log(test.has("moon"));    // true
console.log(test.has("unknown")); // false

// Test remove()
console.log("\n--- REMOVE ---");
console.log(test.remove("apple"));   // true
console.log(test.remove("unknown")); // false
console.log("Length after removal:", test.length());
console.log("Apple exists:", test.has("apple"));

// Test keys(), values(), entries()
console.log("\n--- COLLECTION METHODS ---");
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

// Test clear()
console.log("\n--- CLEAR ---");
test.clear();
console.log("Length:", test.length());     // 0
console.log("Capacity:", test.capacity);   // 16
console.log("Keys:", test.keys());         // []
console.log("Values:", test.values());     // []
console.log("Entries:", test.entries());   // []

// Test inserting again after clear()
test.set("new key", "new value");

console.log("\n--- AFTER CLEAR AND REINSERTION ---");
console.log("Length:", test.length()); 
console.log("Value:", test.get("new key"));

