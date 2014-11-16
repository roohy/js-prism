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
    prism.core.abstractScheduler.call(this);


    /**
     * Store for the queue in the FIFO organized as a circular queue
     */
    this.queue = [];
    /**
     * Current capacity of the message queue
     */
    this.size = typeof(inputSize) !== 'undefined' ? inputSize : this.DEFAULT_SIZE;

    this.queue = [];
    /**
     * Keep track of the number of empty slots in the queue
     */
    this.emptySlots = 0;
    /**
     * The location of the head of the FIFO
     */
    this.head = 0
    /**
     * The location of the tail of the FIFO
     */
    this.tail = 0;

    this.emptySlots = this.size;


}; // end of constructor function





/**
 * By default a 250 event queue is assumed.
 */
prism.core.FIFOScheduler.prototype.DEFAULT_SIZE = 250;

prism.core.FIFOScheduler.prototype.isQueueFull = function(){
    return (this.emptySlots == this.size);
};
prism.core.FIFOScheduler.prototype.isQueueEmpty = function(){
    return (this.emptySlots == 0);
};

/**
 * Add an event to the beginning of the queue. The method is synchronized so that simultaneous
 * additions and removals are not possible. This is a potential major bottleneck.
 * @param m		Event to be added
 */

prism.core.FIFOScheduler.prototype.add = function(event){
  try{
    if(this.isQueueFull()){  }
  }
};