class SituationChoice {
  constructor(header,desc,greyDesc = false,consequences = [new Consequence("endSituation")],conditions = []) {
    this.header = header;
    this.desc = desc;
    this.greyDesc = greyDesc;
    this.consequences = consequences;

    if (Array.isArray(conditions)) {
      this.conditions = conditions;
    } else {
      this.conditions = [conditions];
    }
  }
  getConditions(type) {
    var matchingConditions = [];

    for (var i = 0; i < this.conditions.length; i++) {
      if (this.conditions[i].type == type) {
        matchingConditions.push(this.conditions[i]);
      }
    }

    if (matchingConditions.length == 0) {
      return false;
    }
    return matchingConditions;
  }
  getConsequences(type) {
    var matchingConsequences = [];

    for (var i = 0; i < this.consequences.length; i++) {
      if (this.consequences[i].type == type) {
        matchingConsequences.push(this.consequences[i]);
      }
    }

    if (matchingConsequences.length == 0) {
      return false;
    }
    return matchingConsequences;
  }
  conditionsSatisfied() {
    var isSatisfied = true;
    this.conditions.forEach((condition)=>{
      if (!condition.isSatisfied()) {
        isSatisfied = false;
      }
    });
    return isSatisfied;
  }
  attemptTrigger() {
    if (this.conditionsSatisfied()) {
      this.trigger();
    }
  }
  trigger() {
    this.consequences.forEach((consequence)=>{
      consequence.trigger();
    });
  }
}
