/**
 * Created by Ro0ohy on 12/5/2014.
 */

var prism = prism || {}

prism.core = prism.core || {}

prism.core.abstractImplementation = function(){
    this.associatedComp = null;

};

prism.core.abstractImplementation.prototype.send = function(event){
    if(this.associatedComp != null){
        this.associatedComp.send(event);
    }
};

prism.core.abstractImplementation.prototype.setAssociatedComponent = function(comp){
    this.associatedComp = comp;
};

prism.core.abstractImplementation.prototype.getAssociatedComponent = function(){
  return this.associatedComp;
};

prism.core.abstractImplementation.prototype.start = function(){

};

prism.core.abstractImplementation.prototype.handle = function(){

};
