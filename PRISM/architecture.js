
var prism = prism || {};

prism.core = prism.core || {};



/**
 * Base class for the Prism Architecture. This class is a Brick by itself
 * that can be a part of another Prism Brick. It is responsible for keeping
 * state of the components and connectors that are currently part of this Prism
 * architecture.
 */
prism.core.architecture = function(str){
    prism.core.brick.call(this,str);
    this.bricks = [];
    this.style = prism.core.prismConstants.DEFAULT;
};


/**
 * This method must be called to start the architecture.
 *  This method will in turn call the <code>start()</code>
 * method of each Brick in the architecture.
 */

prism.core.architecture.prototype.start = function(){
  for ( var i  = 0 ; i< this.bricks.length ; i++){
        try {
            this.bricks[i].start();
        }catch(e){
            console.log("error at starting bricks of the architecture");
        }

    }
};


/**
 * This method will define the action to be taken by this architecture when it
 * recieves an event from another Brick attached to it.
 */

prism.core.architecture.prototype.handle = function(){};


/**
 * This method will add a brick instance <code>b</code> to the architecture.
 *
 * @param b		A brick object to be added
 */
prism.core.architecture.prototype.add = function(brick){
    this.bricks.add(brick);
}
