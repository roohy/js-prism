/**
 * Created by Ruhollah on 7/23/2015.
 */
var prism = prism || {};
prism.context = prism.context || {};


//prism.context.

//This is a component based on
prism.context.component = function(name,pImplementation){
    prism.core.component.call(this,name,pImplementation);
    this.contextProviders = {};
    this.contextUsers = {};
};

prism.context.component.prototype = Object.create(prism.core.component.prototype);
prism.context.component.prototype.constructor = prism.context.component;

prism.context.component.prototype.submit =function(message){
    this.scaffold
};

