/**
 * Created by Ro0ohy on 12/2/2014.
 */

var prism = prism || {};

prism.core = prism.core || {};


/**
 * A connector provides interaction and mediation services to attached components.
 * The connector is connected to a set of components on both sides (a set may be empty).
 * Connectors use the provided AbstractHandler to distribute event among connected Bricks.
 *
 *@version 2.0
 *@author USC Soft. Arch. Group. Contact: Sam Malek <A HREF="mailto:malek@usc.edu"> malek@usc.edu </A>
 */

prism.core.connector = function(name,pStyle){
    prism.core.brick.call(name);
    this.ports = [];
    this.style = typeof pStyle !== 'undefined' ? pStyle : prism.core.prismConstants.DEFAULT;

};


prism.core.connector.prototype = Object.create(prism.core.brick.prototype);
prism.core.connector.prototype.constructor = prism.core.connector;

/**
 * This method distributes the incoming event to connected Bricks. Distribution
 * policy depends on the type of IHandler that is installed.
 * @param e      Incoming Event
 */
prism.core.connector.prototype.handle = function(event){
    event.handlingBrick = this;
    var thisPort;
    var brick;
    var pID;
    for ( var i = 0 ; i < this.ports.length; i++){
        thisPort = this.ports[i];
        if(thisPort.getPortType() == event.eventType){
            if (thisPort.isExtensible()){
                brick = thisPort;
            }
            else
                brick = (thisPort.getMutualPort()).getParentBrick();
            brick.handle(event);
        }
    }
};


/**
 * Adds a port to this connector.
 * @param port    Port to be added.
 */

prism.core.connector.prototype.addConnPort = function(port){
  port.setParentBrick(this);
    this.ports.push(port);
};


/**
 * Removes a port from this component.
 *@param port    Port to be removed.
 */

prism.core.connector.prototype.removeConPort = function(port){
    for ( var i = 0 ; i < this.ports.length; i++){
        if(this.ports[i] == port)
            this.ports.splice(i);
    }
}



/**
 * This method returns a list of all available ports in this connector.
 *@return DynamicArray   List of available ports
 */

prism.core.connector.prototype.getConnPorts = function(){
    return (this.ports);//TODO: what is this error!!!!
}