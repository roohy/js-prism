// Created by Roohy

prism = prism || {};

prism.core = prism.core || {};


/**
 * AbstractScheduler defines an abstract class for performing architectural level scheduling of events. This basically comes down to the ordering
 * policy of events in the queue.
 */
prism.core.scheduler = function(){};

/**
 * Add a message to the list in an arbitrary order.
 * @param e		Event object to be added to the list
 */
prism.core.scheduler.prototype.add = function(e){};


/**
 * Get the number of messages waiting to be dispatched.
 * @return int		Number of waiting messages
 */
prism.core.scheduler.prototype.getWaitingLength = function(){};


/**
 * Get the next message to be dispatched in an arbitrary order. The order is decided by the
 * class implementing this interface
 * @return Event		the event object for dispatched event
 */
prism.core.scheduler.prototype.getEvent = function(){};


/**
 * Set the capacity of messages that can be stored before being dispatched
 * @param n		int the required capacity of the message store
 */

prism.core.scheduler.prototype.setEventCapacity = function(n){};