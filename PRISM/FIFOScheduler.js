/**
 * Created by Ro0ohy on 11/14/2014.
 */

prism = prism || {};
prism.core = prism.core || {};
/**
 * A simple FIFO based message store which allows a dynamic set of queue to be handled in the architecture.
 * Messages are always added to the end of the queue whereas they are removed at the head of the queue.
 * There is no knowledge of priorities.
 * */
//We do not declare prism and prism.core here. because we assume scheduler is loaded before this one.
prism.core.FIFOScheduler = function(inputSize){

    //inherits from abstract scheduler. next line does this for us.
    prism.core.scheduler.call(this);


    /**
     * Store for the queue in the FIFO organized as a circular queue
     */
    this.queue = [];
    /**
     * Current capacity of the message queue
     */
    this.size = typeof(inputSize) !== 'undefined' ? inputSize : this.DEFAULT_SIZE;

    /**
     * Keep track of the number of empty slots in the queue
     */
    this.emptySlots = 0;
    /**
     * The location of the head of the FIFO
     */
    this.head = 0;
    /**
     * The location of the tail of the FIFO
     */
    this.tail = 0;

    this.emptySlots = this.size;


}; // end of constructor function


prism.core.FIFOScheduler.prototype = Object.create(prism.core.scheduler.prototype);
prism.core.FIFOScheduler.prototype.constructor = prism.core.FIFOScheduler;



/**
 * By default a 250 event queue is assumed.
 */
prism.core.FIFOScheduler.prototype.DEFAULT_SIZE = 250;

prism.core.FIFOScheduler.prototype.isQueueFull = function(){
    return (this.emptySlots == 0);
};
prism.core.FIFOScheduler.prototype.isQueueEmpty = function(){

    return (this.emptySlots == this.size);
};

/**
 * Add an event to the beginning of the queue. The method is synchronized so that simultaneous
 * additions and removals are not possible. This is a potential major bottleneck.
 * @param m		Event to be added
 */

prism.core.FIFOScheduler.prototype.add = function(event){
    //console.log("ading " , event);
  try{
    if(this.isQueueFull()){
        /*setTimeout(function(){
           this.add(event);
        }.bind(this),100);*/
        prism.core.Threading.addToWaitingList(this.add,this);
        //We have to busy wait, I will try to fix it using code changes to the upper levels

        //prism.core.Threading.sleep(500);
        return;
    }
  }catch (e){
      console.log("unexpected error waiting for queue to get empty");
  }
    this.queue.push(event);
    //this.queue[this.tail] = event;
    //this.incrementTail();
    this.emptySlots = this.emptySlots -1 ;
    //prism.core.Threading.notifyAll();
    //TODO:this class is not complete
    this.dispatcher.notify();
};

//make it(them) synchronized later
prism.core.FIFOScheduler.prototype.getEvent = function(){
    var ev = null;
    try{
        if(this.isQueueEmpty()){
            //console.log(" queue is empty, nothing to get, so wait");
            //prism.core.Threading.addToWaitingList(this.getEvent(),this);
            //same as above. this should return the upper level function should do something
            //prism.core.Threading.sleep(500);
            return null;


        }
    }catch(e){
        console.log("unexpected error waiting for queue to get something to do!!!");
    }
    ev = this.queue.splice(0,1);
    //ev = this.queue[this.head];
    //this.queue[this.head] = null;
    //this.incrementHead();
    this.emptySlots = this.emptySlots + 1;
    //prism.core.Threading.notifyAll();
    return ev;
};


prism.core.FIFOScheduler.prototype.incrementTail = function(){
    if(this.tail == this.size-1){
        this.tail = 0;
    }
    else
        ++(this.tail);
};
//TODO: we can have a to string function for debugging purposes.

prism.core.FIFOScheduler.prototype.incrementHead = function() {
    if (this.head == this.size - 1) {
        this.head = 0;
    }
    else
        ++(this.head);

    /**
     * Set the capacity of messages that can be stored before being dispatched
     * @param n        int the required capacity of the message store
     */
};

prism.core.FIFOScheduler.prototype.setEventCapacity=function(n){
    return;
};