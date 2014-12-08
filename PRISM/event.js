/**
 * Created by Ro0ohy on 11/16/2014.
 */

var prism = prism || {};
prism.core = prism.core || {};
/**
 * Event represents the basic message that is used by Bricks to communicate.
 *  */

prism.core.event = function(str, issuer,rc){
    this.name = typeof str !== 'undefined' ? str : null;
    this.originatingBrick = typeof issuer !== 'undefined' ? issuer : null;
    this.handlingBrick = typeof rc !== 'undefined' ? rc : null;


    /**
     * Brick that created this event
     */
    //this.originatingBrick = null;


    /**
     * Brick through which this event should be sent
     */
    //this.handlingBrick = null;


    /**
     * Event type. Could be a request or reply.
     */
    this.eventType = null;

    //name-value pairs
    this.parameters = {};

};

prism.core.event.prototype.EVENT_INITIAL_LENGTH = 2;



/**
 * Adds a name-value pair to the event object.
 * @param name			String name of the value being stored
 * @param value			Object that contains a Java object for the value
 */

prism.core.event.prototype.addParameter = function(name , value){
    this.parameters[name] = value;
};


/**
 * Checks to see if the event contains a name-value pair identified by name.
 * @return Boolean 	true if the event contains parameter Name and false if not.
 */

prism.core.event.prototype.hasParameter= function(str){
    return str in this.parameters;
};


/**
 * Gets a parameter from the event object.
 * @param name			String identifier for the name-value pair being read
 * @return Object		The value being requested. If not found, null is returned
 */

prism.core.event.prototype.getParameter = function(str){
    if (str in this.parameters){
        return this.parameters[str];
    }
    return null;
};


/**
 * Removes a name-value pair from the event object.
 * @param name			String the name of the value being removed from the message
 */

prism.core.event.prototype.removeParameter = function(str){
    if(str in this.parameters){
        delete this.parameters[str];
    }
};


prism.core.event.prototype.replicate = function(){
    var newEvent = new prism.core.event(this.name);
    newEvent.parameters = this.parameters; //TODO: ask neno or jae about this
    newEvent.originatingBrick = this.originatingBrick;
    newEvent.eventType = this.eventType;
    return newEvent;
};