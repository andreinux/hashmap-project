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


let map = new hashmap;

map.set("benj", 19);
map.set("ella", 19);
map.set("abe", 19);
map.set("mark", 19);
map.set("benj", 13);
console.log(map.count);