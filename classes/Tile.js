class Tile {
  constructor(biome, obj_structure) {
    this.biome = biome;
    this.structure = obj_structure;
    this.isDisplayed = false;
    this.isExplored = false;
  }

  getBiome() {
    return Biome.getBiome(this.biome);
  }
}
