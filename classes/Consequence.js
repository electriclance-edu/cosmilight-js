class Consequence {
  constructor(type,param = []) {
    this.type = type;
    this.param = param;

    if (!Object.keys(consequenceTriggers).includes(this.type)) {
      console.log("class Consequence: consequence type '" + this.type + "' does not exist, defaulting to none.");
    }
  }
  trigger() {
    consequenceTriggers[this.type](this.param);
  }
  static triggerSet(set) {
    if (!Array.isArray(set)) {
      set = [set];
    }
    set.forEach((consequence) => {
      consequence.trigger();
    });
  }
}
var consequenceTriggers = {
  endSituation:()=>{
    triggerUISituationState();
  },
  log:(text)=>{
    logText(text);
  },
  logWithStyle:(param)=>{
    logText(param.txt,param.classes);
  },
  damageBoat:(param)=>{},
  triggerSituation:(situationId)=>{},
  addResource:(param)=>{
    var amt = param.amt;
    if (Array.isArray(param.amt)) {
      amt = seededRandInt(param.amt[1],param.amt[0]);
    }
    Resource.byId[param.id].increment(amt);
  },
  takeResource:(param)=>{
    var amt = param.amt;
    if (Array.isArray(param.amt)) {
      amt = param.amt[seededRandInt(param.amt.length)];
    }
    Resource.byId[param.id].increment(-amt);
  },//must give a random amt of resource if given array of amt
  hurt:(amtToHurt)=>{
    if (Array.isArray(amtToHurt)) {
      amtToHurt = amtToHurt[seededRandInt(amtToHurt.length)];
    }
    logText(`you got hurt by ${amtToHurt}, ouchies`);
  },
  addTag:(tagName)=>{},
  removeTag:(tagName)=>{},
  none:()=>{}
}
