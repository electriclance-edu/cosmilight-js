class SituationChoice {
  constructor(header,desc,greyDesc = false,consequences = [new Consequence("endSituation")],conditions) {
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
