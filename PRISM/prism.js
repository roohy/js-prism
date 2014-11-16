/* author: Roohy Shemirani
    This is the base file for PRISM Javascript Library */

var prism = prism || {};

prism.core = prism.core || {};


/**
 * Brick is the abstract building block for architectures. It is never used directly, but instantiated as
 * either a component, connector, or port. This class does not have a behavior of its own, but depends on sub classes
 * to handle messages.*/

 prism.core.brick = function(bName) {
     this.scaffold = null;
     this.name = typeof(baName) !== 'undefined' ? bName : null;
     this.style = null;
 };

prism.core.brick.prototype.getStyle = function(){
    return this.style;
};


/**
 * By default a brick does not do anything. The start method is called to activate this brick
 */

prism.core.brick.prototype.start = function(){};


/**
 * Add a message to the scaffold which results in a message getting added to the scaffold's queue.
 * @param event     Event object to be added
 */

prism.core.brick.prototype.add = function(event){
    if(event.originatingBrick == null){
        event.originatingBrick = this;
    }
    if(scaffold != null){
        scaffold.call('add',event);
    }
};


/**
 * This abstract method needs to be overriden by any object that extends Brick. The subclassing object shall
 * provide the desired implementation to handle an Event.
 *
 * @param e      Event object to be handled
 */

prism.core.brick.prototype.handle = function(event){};