class Resource {
  static resources = [];

  constructor(id, name, symbol, symbolSize) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.symbolSize = symbolSize;

    Resource.resources.push(this);
  }
  static generateResources() {
    new Resource("water","water","🌢","big");
    new Resource("lumen","lumen","🟆","med");
    new Resource("steelsilk","steelsilk","◆","med");
    new Resource("seed","seed","⚉","med");
    new Resource("sableSap","sable sap","✾","small");
    new Resource("heartstring","heartstring","❦","small");
    new Resource("radiantCore","radiant core","✠","small");
  }
}
