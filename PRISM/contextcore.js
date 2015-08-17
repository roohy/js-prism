/**
 * Created by Ruhollah on 7/23/2015.
 */

var prism = prism || {};
prism.context = prism.context || {};

//context entity, add new variables for context entities here
prism.context.entity = function(name){
    this.name = name;
};
//

//here is context elements
prism.context.element = function(name,entity){
    this.name = name;
    this.entity = entity;
};
prism.context.element.prototype.getID = function(){
    return this.name+"///"+this.entity.name;
};
prism.context.element.prototype.checkID = function(ID){
    var result = ID.split("///");
    if(result[0] == this.name & result[1] == this.entity.name) {
        return true;
    }
    return false;
};


prism.context.standard = function(){};

prism.context.message = function(element, name, value ){
    this.element = element;
    this.name = name;
    this.value = value;
};

prism.context.message.prototype.setStandard = function(standard){
    this.standard = standard;
};
