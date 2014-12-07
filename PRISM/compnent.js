/**
 * Created by Ro0ohy on 11/18/2014.
 */


/**
 * This class defines the basic Prism component and the send methods that
 * allow any class extending this one to interact with the architecture.
 * The usual practice is to create a component in your own architecture
 * by extending this class and implementing the handle method.
 */


/**
 * This constructor calls on the <code>Brick(String)</code> constructor.
 *
 * @param name	String: the name of this component object.
 */

prism.core.component = function(name , pImplementation){
    prism.core.brick.call(name);
    this.ports = [];
    this.implementation = typeof pImplementation !== 'undefined' ? pImplementation : null;
    //TODO: set assisiated component here after implementing the absImplementation
};

prism.core.component.prototype.start = function(){
    if(this.implementation != null)
        this.implementation.start();
};

prism.core.component.prototype.setImplementation = function(impl){
    this.implementation = impl;
};

prism.core.component.prototype.getImplementation = function(){
    return this.implementation;
};


/**
 * This method sends the event up/down the Prism architecture that this component is a
 * part of.
 *
 * @param e		a Event to be sent to the Brick above/below.
 */
prism.core.component.prototype.send = function(event){
    event.originatingBrick = this;
    for(var i = 0 ; i < this.ports.length; i++){
        var thisPort = this.ports[i];
        if(thisPort.getPortType() == event.eventType){
            if(thisPort.isExtensible()){
                var e2 = event.replicate();
                e2.handlingBrick = thisPort;
                this.add(e2);
            }
            else{
                var e2 = event.replicate();
                var mutualPort = thisPort.getMutualPort();
                e2.handlingBrick = mutualPort.getParentBrick();
                this.add(e2);

            }
        }//TODO: complete from the above. after you wrote extensible port review it

    }
};

/**
 * Handling of Event. This is application specific code and should be implemented by subclasses of this class.
 *
 * @param e	Event to be handled
 */
prism.core.component.prototype.handle = function(event){
    if(this.implementation != null){
        this.implementation.handle(event);
    }
}


/**
 * Adds a port to this component.
 * @param port    Port to be added.
 */
prism.core.component.prototype.addCompPort= function(port){

    port.setParentBrick(this);
    this.ports.push(port);
};


/**
 * Removes a port from this component.
 *@param port    Port to be removed.
 */

prism.core.component.prototype.removeCompPort = function(port){
    for( var i = 0 ; i < this.ports.length ; i++){
        if(this.ports[i] == port){
            this.ports.splice(i);
        }
    }
}


/**
 * Removes a port from this component.
 *@param port    Port to be removed.
 */

prism.core.component.prototype.getCompPorts = function(){
    return this.port;
};