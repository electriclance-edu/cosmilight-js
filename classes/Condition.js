class Condition {
  constructor(type,param) {
    this.type = type;
    this.param = param;
  }
  //returns whether or not the condition's type and parameters are satisfied
  //ie. new Condition("resource",["water",1]) will return true if the player has >=1 water
  isSatisfied() {
    if (!Object.keys(conditionChecks).includes(this.type)) {
      console.log(`Condition.isSatisfied(): function corresponding to type '${this.type}' does not exist`);
      return false;
    }
    return conditionChecks[this.type](this.param);
  }
  static setSatisfied(conditionSet) {
    if (conditionSet == false) {
      return true;
    } else if (!Array.isArray(conditionSet)) {
      conditionSet = [conditionSet];
    }

    var allConditionsSatisfied = true;
    conditionSet.forEach((condition) => {
      if (!condition.isSatisfied()) {
        allConditionsSatisfied = false;
      }
    });
    return allConditionsSatisfied;
  }
}

var conditionChecks = {
  hasTag:(tag)=>{
    return Player.player.hasTag(tag);
  },
  hasResource:(param)=>{
    return Player.player.hasResource(param.id,param.amt);
  },
  none:()=>{
    return true;
  }
}
