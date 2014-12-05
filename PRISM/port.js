/**
 * Created by Ro0ohy on 11/18/2014.
 */

var prism = prism || {};

prism.core = prism.core || {};


/**
 * Port represents locus of communication in Prism.
 */


/**
 * Port constructor.
 * @param pPortType     PortType which could either be Request or Reply.
 * @param pBrick        parent of this Port. Usually a Component/Connector.
 */

prism.core.port = function(str,type){
    prism.core.brick.call(this,str);
    this.portType = type;
    this.parentBrick = null;
    this.mutualPort = null;

    this.extPort = null;

};


/**
 * Simple place holder method. Doesn't do anything.
 */
prism.core.port.prototype.handle = function(){

};


/**
 * Sets the mutual port for this port
 *@param pPort   Port to be added
 */

prism.core.port.prototype.setMutualPort = function(bPort){
    this.mutualPort = bPort;
};


/**
 * This method returns the mutual port
 *@return IPort the mutual port
 */

prism.core.port.prototype.getMutualPort = function(){
    return this.mutualPort;
};


/**
 * Returns the type of port. Request is equivalent to the notion of Top in C2. Reply is
 * equivalent to the notion of Bottom in C2.
 * @return int    port type
 */

prism.core.port.prototype.getPortType = function(){
    return this.portType;
};


/**
 * Returns the parent brick of this Port.
 *@return Brick   parent Brick
 */

prism.core.port.prototype.getParentBrick = function(){
    return this.parentBrick;
}

/**
 * Sets the parent brick of this Port.
 *@return Brick   parent Brick
 */
prism.core.port.prototype.setParentBrick = function(pBrick){
    this.parentBrick = pBrick;
}


/**
 * In situations when the Port is actually more specialized and is an
 * ExtensiblePort, this method returns the ExtensiblePort.
 *@return ExtensiblePort      child ExtensiblePort
 */

prism.core.port.prototype.getExtensiblePort = function(){
  return this.extPort;
};


/**
 * Sets the reference of this port object to its ExtensiblePort(child).
 *@param pExtPort     child ExtensiblePort
 */

prism.core.port.prototype.setExtensiblePort = function(exPort){
    this.extPort = exPort;
};


/**
 * is extensible function which return false. unless it is an extensible one. so we can
 * find out it being extensible
 */

prism.core.port.prototype.isExtensible = function(){
    return false;
};

prism.core.port.prototype.isPort = function(){
    return true;
};