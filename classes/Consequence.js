class Consequence {
  constructor(type,param = []) {
    this.type = type;
    this.param = param;
  }
  trigger() {
    consequenceTriggers[this.type](this.param);
  }
  static triggerSet(set) {
    if (Array.isArray(set)) {
      set.forEach((consequence) => {
        consequence.trigger();
      });
    } else {
      set.trigger();
    }
  }
}
var consequenceTriggers = {
  endSituation:()=>{
    triggerUISituationState();
  },
  log:(situationId)=>{},
  logWithStyle:(param)=>{
    logText(param.txt,param.classes);
  },
  triggerSituation:(situationId)=>{},
  addResource:(param)=>{
    if (Array.isArray(param.amt)) {
      param.amt = param.amt(seededRandInt(param.amt.length));
    }
    Player.player.incrementResource(param.id,param.amt);
  },//must give a random amt of resource if given array of amt
  addTag:(tagName)=>{},
  removeTag:(tagName)=>{}
}
