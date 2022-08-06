class Condition {
  constructor(type,parameters) {
    this.type = type;
    this.parameters = parameters;
  }
  //returns whether or not the condition's type and parameters are satisfied
  //ie. new Condition("resource",["water",1]) will return true if the player has >=1 water
  isSatisfied() {
    return false;
  }
}

var conditionChecks = {
  hasTag:(tagName)=>{
    return false;
  },
  hasResources:(param)=>{
    return false;
  }
}
