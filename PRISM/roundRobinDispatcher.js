
var prism = prism || {};
prism.core = prism.core || {};

prism.core.roundRobinDispatcher = function(scheduler , n){
    this.DEFAULT_COUNT = 10;
    this.threadCount = 0;
    this.workerThreads = [];
    this.scheduler = typeof scheduler !== "undefined" ? scheduler : null;
    this.n = typeof n !== "undefined" ? n : this.DEFAULT_COUNT;
    for( var i =  0 ; i < this.n ; i++){
        var temp = new prism.core.workerThread(""+i , this , this.scheduler);
        this.workerThreads.push(temp);
    }


};

prism.core.roundRobinDispatcher.prototype.start = function(){
    for ( var i = 0 ; i < this.workerThreads.length ; i++){
        this.workerThreads[i].run();
    }

};

prism.core.roundRobinDispatcher.prototype.stop = function(){
    for ( var i = 0 ; i < this.workerThreads.length ; i++){
        this.workerThreads[i].keepWorking = false;
    }
};