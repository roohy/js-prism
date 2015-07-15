/**
 * Created by Ruhollah on 7/13/2015.
 */
Server = function(){
    prism.core.abstractImplementation.call(this);


};
Server.prototype = Object.create(prism.core.abstractImplementation.prototype);
Server.prototype.constructor = Server;



Server.prototype.handle = function(event){
    console.log("On server Side, we have got a message",event.getParameter('Value'));
    var event2 = new prism.core.event("Message");
    event2.addParameter("Value", "We are good here");
    event2.eventType = prism.core.prismConstants.REPLY;
    this.send(event2);

};