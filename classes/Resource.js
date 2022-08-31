class Resource {
  static resources = [];
  static resourcesByName = {};

  constructor(id,name,cap = false,isRare = false) {
    this.id = id;
    this.name = name;
    this.cap = cap;
    this.isRare = isRare;

    Resource.resources.push(this);
    Resource.resourcesByName[id] = this;
  }
  static generateResources() {
    new Resource("water","Water",10);
    new Resource("lumen","Lumen");
    new Resource("thread","Thread");
    new Resource("nectar","Nectar");
    new Resource("seed","Seed");
    new Resource("steelsilk","Steelsilk",false,true);
    new Resource("sableSap","Sable Sap",false,true);
    new Resource("heartstring","Heartstring",false,true);
    new Resource("radiantCore","Radiant Core",false,true);
  }
}
//🌢🟆≋🟐⚉◆✾❦✠
//🎕🟐🞺🞛🞇🟂
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
