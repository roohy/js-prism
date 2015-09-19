var prism = prism || {};

prism.context.FIFOScheduler = function(inputSize, contextInputSize){
    prism.core.FIFOScheduler.call(this, inputSize);
    this.contextArraySize = contextInputSize;
    this.contextList = [];
    this.context;
};

prism.context.FIFOScheduler.prototype = Object.create(prism.core.FIFOScheduler);
prism.context.FIFOScheduler.prototype.constructor = prism.context.FIFOScheduler;

prism.context.FIFOScheduler.prototype.submitContext = function(message){

};