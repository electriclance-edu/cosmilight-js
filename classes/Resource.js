class Resource {
  static resources = [];
  static resourcesByName = {};

  constructor(id, name, char, charSize, counter) {
    this.id = id;
    this.name = name;
    this.char = char;
    this.charSize = charSize;
    this.counter = counter;

    Resource.resources.push(this);
    Resource.resourcesByName[id] = this;
  }
  static generateResources() {
    new Resource("water","Water","🌢","big",["flask","flasks"]);
    new Resource("lumen","Lumen","🟆","med",["droplet","droplets"]);
    new Resource("thread","Thread","≋","tiny",["spool","spools"]);
    new Resource("seed","Seed","⚉","med",["seed","seeds"]);
    new Resource("steelsilk","Steelsilk","◆","med",false);
    new Resource("sableSap","Sable Sap","✾","small",false);
    new Resource("heartstring","Heartstring","❦","small",false);
    new Resource("radiantCore","Radiant Core","✠","small",false);
  }
}
/*
HOW TO CREATE A RESOURCE
- Create a new Resource() line in Resource.generateResources()
    - id/name do not have to be same
    - char is used in the resources list
    - charSize changes the size of the char in the resources list.
        - try out small first and see if it looks fine when displayed
        - this changes depending on what char is used
    - counter denotes what noun to be used when counting the resource
        - if the resource is rare, set to false
        - if the resource is not rare, set to an array w the form ["singular","plural"]
- Add a color class for the resource in txt.css
*/
