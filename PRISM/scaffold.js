/**
 * Created by Ro0ohy on 11/13/2014.
 */

var prism = prism || {};
prism.core = prism.core || {};

prism.core.abstractScaffold = function (){ };

prism.core.abstractScaffold.prototype.call= function(method , param){};



prism.core.scaffold = function(){
    prism.core.abstractScaffold.call(this);
    this.scheduler = null;
    this.dispatcher = null;
};
prism.core.scaffold.prototype.call = function(command, param){
  if(command == 'add' && dispatcher != null){
      //TODO: complete
      this.scheduler.add(param);
  }
};

//TODO: complete this shit :D later after adding othere dependencies