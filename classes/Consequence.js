class Consequence {
  constructor(type,param = []) {
    this.type = type;
    this.parameters = param;
  }
  trigger() {
    consequenceTriggers[this.type]();
  }
}
var consequenceTriggers = {
  endEvent:()=>{
    triggerUIEventState();
  },
  log:(eventId)=>{},
  triggerEvent:(eventId)=>{},
  addResource:(param)=>{},//must give a random amt of resource if given array of amt
  addTag:(tagName)=>{},
  removeTag:(tagName)=>{}
}
