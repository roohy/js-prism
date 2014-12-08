
//We do not have interfaces in javascript so there is no IArchitecture or any other iThings :D
//of course we can add something like an interface mechanism to ensure write function calls. But I do not see any need for
// that now. so I make this TODO: consider using interface-like mechanism for the 4 classes of architectural elements


var prism = prism || {};

prism.core = prism.core || {};



/**
 * Base class for the Prism Architecture. This class is a Brick by itself
 * that can be a part of another Prism Brick. It is responsible for keeping
 * state of the components and connectors that are currently part of this Prism
 * architecture.
 */
prism.core.architecture = function(str){
    //console.log('Architecture is initializing str is '+str);
    prism.core.brick.call(this,str);
    this.bricks = [];
    this.style = prism.core.prismConstants.DEFAULT;
};


prism.core.architecture.prototype = Object.create(prism.core.brick.prototype);
prism.core.architecture.prototype.constructor = prism.core.architecture;

/**
 * This method must be called to start the architecture.
 *  This method will in turn call the <code>start()</code>
 * method of each Brick in the architecture.
 */

prism.core.architecture.prototype.start = function(){
  for ( var i  = 0 ; i< this.bricks.length ; i++){
      //console.log("Staring the bricks of the arch we have"+ this.bricks.length+ " things to start");
        try {
            //console.log("haha starting : "+ this.bricks[i]);
            this.bricks[i].start();

        }catch(e){
            console.log("error at starting bricks of the architecture "+ e);

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
    //console.log("adding a brick to the arch", brick);
    this.bricks.push(brick);
    //console.log("now we have ",);
}

/**
 * This method removes a brick from the architecture and thereby preventing
 * it from receiving anymore messages from this architecture. If
 * it is not found to be a part of this architecture then the method
 * does nothing and returns.
 * @param b 		A brick object to be removed from the architecture.
 */
prism.core.architecture.prototype.remove = function(brick){
    for(var i = 0 ; i < this.bricks.length ; i++){
        if(this.bricks[i] == brick){
            this.bricks.splice(i,1);
        }
    }
}


prism.core.architecture.prototype.getBrickByInstanceName = function(instanceName){
    for( var i = 0 ; i < this.bricks.length ; i++){
        if ( this.bricks[i].name == instanceName){
            return this.bricks[i];
        }
    }
};

/**
 * This is a generic method for connecting two Ports. It is assumed that the two ports have already been
 * assigned to another parent Brick (component/connector) object.
 *
 *@param p1      First Port
 *@param p2      second Port
 */


//TODO: First imlepment ports then you can implement these two functions
//TODO: continue implementation from here
//TODO: implemented these two but some other functions are still needed
prism.core.architecture.prototype.weld= function(port1 , port2){
    port1.setMutualPort(port2);
    port2.setMutualPort(port1);

};


/**
 * This method disconnects two ports.
 * @param p1 		First Port
 * @param p2 		Second Port
 */
prism.core.architecture.prototype.unweld = function(port1,port2){
    port1.setMutualPort(null);
    port2.setMutualPort(null);
};