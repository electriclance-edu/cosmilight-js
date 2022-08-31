class Player {
  static player;

  constructor(pos_x, pos_y) {
    this.pos = {
      x: pos_x,
      y: pos_y
    }
    this.resourceAmounts = {};
    this.tags = [];

    if (debug) {
      this.addTag("debug");
    }
  }
  initializeResources(amt = 0) {
    Resource.resources.forEach(function(resource) {
      Player.player.resourceAmounts[resource.id] = amt;
    });
  }
  incrementResource(id,amt) {
    Player.player.resourceAmounts[id] += amt;
    updateResource(Resource.resourcesByName[id],Player.player.resourceAmounts[id],amt < 0);
  }
  hasResource(id,amt) {
    return Player.player.resourceAmounts[id] >= amt;
  }
  setPos(x,y) {
    this.pos = {x:x,y:y};
    document.getElementById("debug_position-x").innerHTML = "x: " + x;
    document.getElementById("debug_position-y").innerHTML = "y: " + y;
  }
  hasTag(tag) {
    return this.tags.includes(tag);
  }
  addTag(tag) {
    this.tags.push(tag);
  }
  removeTag(tag) {
    this.tags.splice(this.tags.indexOf(tag),1);
  }
}
