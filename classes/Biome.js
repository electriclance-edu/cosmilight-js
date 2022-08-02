class Biome {
  static biomes = [];

  constructor(id,title,desc,isSpawnable = false,traversalCost = ["water",1],traversalRequirements = "none") {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.isSpawnable = isSpawnable;
    this.traversalCost = traversalCost;
    this.traversalRequirements = traversalRequirements;

    this.hasBeenLogged = false;

    Biome.biomes.push(this)
  }
  static getBiome(id) {
    var biome = false;
    for (var i = 0; i < Biome.biomes.length; i++) {
      if (Biome.biomes[i].id == id) {
        biome = Biome.biomes[i];
        break;
      }
    }
    return biome;
  }
  static generateBiomes() {
    new Biome(
      "plains",
      "Plains",
      "You walk on barren, empty ground, extending far into the horizon. The old Plains, still a sanctuary of peace in this world, but now hollowed by the darkness.",
      true
    );
    new Biome(
      "forest",
      "Forest",
      "From a distance, a faint glow from multicolored bioluminescent plants illuminates a grand canopy of trees. In these desolate lands lit by starlight, these Forests may be the last bastions of light.",
      false
    );

    new Biome(
      "desert",
      "Desert",
      "The last areas of land to be consumed by the darkness, as it was thought that there was nothing here to consume. But life did live here, the last humans of the Desert-born civilization of the Firefly.",
      true,
      ["water",2]
    );
    new Biome(
      "wasteland",
      "Wasteland",
      "In the wake of human innovation was left a ravaged land, harvested, and disposed of.",
      false,
      ["water",2,"lumen",1]
    );

    new Biome(
      "mountain",
      "Mountain",
      "These great Mountains separated the lands of the Sun and Moon, separating the desert-born and forest-born civilizations from meeting so soon.",
      false,
      ["water",1,"thread",1],
      [
        new Condition("research",["mountainClimbing"])
      ]
    );
    new Biome(
      "highPeak",
      "High Peaks",
      "Worshipped in both laboratory and shrine, these peaks reached into the sky where their gods laid. Now only one remains.",
      false,
      ["water",2,"thread",2],
      [
        new Condition("research",["mountainClimbing"])
      ]
    );

    new Biome(
      "shallowSea",
      "Shallow Sea",
      "Calm waters that separate close islands, these Shallow Seas harbor little danger for those who seek to travel.",
      false,
      ["water",1,"lumen",1],
      [
        new Condition("research",["seawalk"])
      ]
    );
    new Biome(
      "sea",
      "Sea",
      "Deeper than the shallow seas, these oceans accumulate the darkness that has enveloped these lands, a darkness that will threaten to devour those who seek to cross it. Beware.",
      false,
      ["water",1,"lumen",1],
      [
        new Condition("research",["sailing"]),
        new Condition("tag",["hasBoat"])
      ]
    );
    new Biome(
      "deepSea",
      "Deep Sea",
      "The most powerful domain of the everpresent Eminence, these waters will see your light, and devour it. Wield every power you possess, machine and magical, if you dream to cross alive.",
      false,
      ["water",1,"lumen",2],
      [
        new Condition("research",["sailing"]),
        new Condition("tag",["hasBoat"])
      ]
    );

    new Biome(
      "center",
      "Center of the World",
      "At the center of the world lies the ruins of a tower, one that reached beyond the sky.",
      false,
      ["water",1,"thread",1],
      [
        new Condition("tag",["debug"])
      ]
    );
    var cityDescriptions = [
      "Within these ruins echo a story old and nearly forgotten. Humanity had lived here, powerful and resplendent, enjoying the blessings of life and machine and magic.",
      "Humanity knew these blessings were given by the resplendent light of the Sun. Life and machine and magic held something in common, an unending requirement for energy, and the Sun would satiate that thirst endlessly.",
      "But man was a different beast from its predecessors of life, and its daughters of machine and magic, as though these would accept what they were given, man sought all that they could see. And in ancient stories and whispers, they saw promises of power beyond the Sun. For beyond the skies, there existed beings separate from the resplendence, the eminent Moon and its mystery. In their lust they sought to unlock the otherworldly power of the eminence."
    ];
    new Biome("fireflyCity","Firefly City",cityDescriptions,["water",1,"lumen",3]);
    new Biome("anuraCity","Anura City",cityDescriptions,["water",1,"lumen",3]);
    new Biome("somnolentCity","Somnolent City",cityDescriptions,["water",1,"lumen",3]);
  }
  isTraversable() {
    var allConditionsSatisfied = true;
    if (this.traversalRequirements != "none") {
      for (var i = 0; i < this.traversalRequirements.length; i++) {
         if (!this.traversalRequirements[i].isSatisfied()) {
           allConditionsSatisfied = false;
           break;
         }
      }
    }
    return allConditionsSatisfied;
  }
}
