class Resource {
  static resources = [];
  static byId = {};
  static bagSize = 20;

  constructor(id,name,cap = false,isRare = false) {
    this.id = id;
    this.name = name;
    this.cap = cap;
    this.isRare = isRare;

    this.amt = 0;
    Resource.resources.push(this);
    Resource.byId[id] = this;
  }
  increment(amt) {
    if (this.cap != false) {
      var change = amt - clamp(this.amt + amt - this.cap,0,this.cap);
      this.amt += change;
    } else {
      var change = amt - clamp(Resource.bagSum() + amt - Resource.bagSize,0,Resource.bagSize);
      this.amt += change;
    }
    //update gui
    updateResource(this);
    //animate gui based on state
    if (this.reachedCap()) {
      animateResource(this.id,"capped");
    } else if (amt < 0) {
      animateResource(this.id,"loss");
    } else if (amt > 0) {
      animateResource(this.id,"gain");
    }
  }
  reachedCap() {
    if (this.cap != false) {
      return this.amt >= this.cap;
    }
    return Resource.bagSum() >= Resource.bagSize;
  }
  hasAmt(amt) {
    if (this.amt >= amt) {
      return true;
    } else {
      animateResource(this.id,"lacking");
      return false;
    }
  }
  static bagSum() {
    var sum = 0;
    Resource.resources.forEach((resource) => {
      if (resource.cap == false) {
        sum += resource.amt;
      }
    });
    return sum;
  }
  static setAllAmt(amt) {
    Resource.resources.forEach((resource) => {
      resource.amt = amt;
    });
  }
  static generateResources() {
    new Resource("water","Water",10);
    new Resource("ember","Ember",5);
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
