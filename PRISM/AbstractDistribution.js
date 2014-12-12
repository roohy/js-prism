/**
 * Created by felicitia on 12/10/14.
 */
/**
 * Any distribution implementation in Prism needs to extend this abstract class. The communication protocol doesn't matter as
 * long as the appropriate implementation is provided for the methods specified in this abstract class.
 **/
 var prism = prism || {};

prism.extension = prism.extension || {};

prism.extension.port = prism.extension.port || {};

prism.extension.port.distribution = prism.extension.port.distribution || {};

prism.extension.port.distribution.abstractDistribution = prism.extension.port.distribution.abstractDistribution ||{};

/**
 * Set the parent ExtensiblePort, which is the ExtensiblePort that is associated with this distribution object.
 *@param parent ExtensiblePort
 */
prism.extension.port.distribution.abstractDistribution.prototype.setParentPort = function(extensiblePort){};

/**
* Returns the parent ExtensiblePort, which is the ExtensiblePort that is associated with this distribution object.
*@return Parent ExtensiblePort
*/
prism.extension.port.distribution.abstractDistribution.prototype.getParentPort = function(){};

/**
 * Returns the port number used to listen for incoming connection requests.
 *@return port number
 */
prism.extension.port.distribution.abstractDistribution.prototype.getListeningPortNum = function(){};

/**
 * Returns list of connections that are affiliated with the parent port
 *@return list of connections
 */
prism.extension.port.distribution.abstractDistribution.prototype.getConnections = function(){};

/**
 * This method is called from the ExtensiblePort to initialized the distribution.
 */
prism.extension.port.distribution.abstractDistribution.prototype.start = function(){};


/**
 * Creates a connection between this ExtensiblePort to the desired ExtensiblePort.
 * @param hostName Name of the host to which this connector is connecting. It
 *      is in the form of IP address or hostname.
 * @param portNum Port to which this connection will be binded.
 */
prism.extension.port.distribution.abstractDistribution.prototype.connect = function(hostName, portNum){};


/**
 * Sends the outgoing event to the connections.
 *@param eventObj   Outgoing event
 */
prism.extension.port.distribution.abstractDistribution.prototype.writeEvent = function(eventObj){};

/**
 * Gets the incoming event from the connection.
 *@param eventObj   Incoming event
 */
prism.extension.port.distribution.abstractDistribution.prototype.readEvent = function(eventObj){};

/**
 * Adds the connection to the list of connections.
 *@param pConn      Connection to be added
 */
prism.extension.port.distribution.abstractDistribution.prototype.addConnection = function(pConn){};

/**
 * Removes the connection from the list of connections.
 *@param pConn      Connection to be removed
 */
prism.extension.port.distribution.abstractDistribution.prototype.removeConnection = function(pConn){};