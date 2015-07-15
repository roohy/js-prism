/**
 * Created by Ruhollah on 7/13/2015.
 */
Client = function(){
    prism.core.abstractImplementation.call(this);
};
Client.prototype = Object.create(prism.core.abstractImplementation.prototype);
Client.prototype.constructor = Client;


Client.prototype.sendMessage=function(){
    //console.log("it is not about prism. It is about sending a message >:)")
    var event = new prism.core.event("Message");
    console.log("sending the message from clinet side");
    event.addParameter("Value","I am Made by roohy and Yixue :D ");
    event.eventType = prism.core.prismConstants.REQUEST;
    //console.log("event in sendMessage",event);
    this.send(event);
};
Client.prototype.handle = function(event){
    console.log('I am handling it on client side, ', event.getParameter('Value'));
};