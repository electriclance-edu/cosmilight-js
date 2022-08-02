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
