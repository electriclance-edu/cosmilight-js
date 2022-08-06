class EventOption {
  constructor(header,desc,greyDesc = false,consequences = [new Consequence("endEvent")],conditions) {
    this.header = header;
    this.desc = desc;
    this.greyDesc = greyDesc;
    this.consequences = consequences;
    this.conditions = conditions;
  }
  trigger() {
    this.consequences.forEach((consequence)=>{
      consequence.trigger();
    });
  }
}
