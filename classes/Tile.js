class Tile {
  constructor(biome, obj_structure) {
    this.biome = biome;
    this.structure = obj_structure;
    this.isDisplayed = false;
  }

  getBiome() {
    return Biome.getBiome(this.biome);
  }
}
