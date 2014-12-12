/**
 * Created by felicitia on 12/11/14.
 */

/**
 * Any compression implementation in Prism needs to extend this abstract class.
 * */

var prism = prism || {};

prism.extension = prism.extension || {};

prism.extension.port = prism.extension.port || {};

prism.extension.port.compression = prism.extension.port.compression || {};

prism.extension.port.compression.abstractCompression = prism.extension.port.distribution.abstractCompression ||{};


/**
 * This method is called from the ExtensbilePort. Any initialization of compression module occurs here.
 */
prism.extension.port.compression.abstractCompression.prototype.start = function(){};

/**
 * This method is called to compress or decomperss an event depending on the direction of the event.
 *
 *@param eventObj    event to be processed
 *@param direction   "IN" for decompression, "OUT" for compression
 */

prism.extension.port.compression.abstractCompression.prototype.processEvent = function(eventObj, direction){};