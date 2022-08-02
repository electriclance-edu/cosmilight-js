class Player {
  static player;

  constructor(pos_x, pos_y) {
    this.pos = {
      x: pos_x,
      y: pos_y
    }
    this.resourceAmounts = {};
  }
  initializeResources() {
    Resource.resources.forEach(function(resource) {
      Player.player.resourceAmounts[resource.id] = 0;
    });
  }
  incrementResource(id,amt) {
    Player.player.resourceAmounts[id] = amt;
  }
}
