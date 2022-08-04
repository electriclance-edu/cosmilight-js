class Biome {
  static biomes = [];

  constructor(id,title,desc,movements,isSpawnable = false,traversalCost = ["water",1],traversalRequirements = "none") {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.movements = movements;
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
      "Grass crushes beneath your foot as you walk on barren, empty ground, the sight extending far into the horizon. These old <b>Plains</b> still are a sanctuary of peace in this world, though now, hollowed out of all life.",
      [
        "A cold breeze blows through.",
        "The grass rustles in the wind.",
        "You pass by a patch of dead flowers."
      ],
      true
    );
    new Biome(
      "forest",
      "Forest",
      "From a distance, a faint glow from multicolored bioluminescent plants illuminates a grand canopy of trees. In these desolate lands lit by starlight, these <b>Forests</b> may be the last bastions of light.",
      [
        "Leaves rustle loudly above you.",
        "Your steps crush the undergrowth.",
        "You part fern and leaf as you walk.",
        "You mistake the wind for a howling wolf.",
        "Light illuminates your path.",
        "You pass by a massive tree, covered with faintly glowing moss.",
        "You pass through a flowing river, lit by glowing bulbs of fruit.",
      ],
      false
    );

    new Biome(
      "desert",
      "Desert",
      "The last areas of land to be consumed by the darkness, as it was thought that there was nothing here to consume. But life did live here, the last humans of the <b>Desert</b>-born civilization of the Firefly.",
      [
        "The winds howl past you.",
        "Your feet sinks slightly into the sand with each step.",
        "A dust storm blows in the horizon, dimly lit by moonlight.",
        "You pass by a boulder, rubbed smooth by sand and wind."
      ],
      true,
      ["water",2]
    );
    new Biome(
      "wasteland",
      "Wasteland",
      "In the wake of human innovation was left a ravaged land, harvested, and disposed of, a <b>Wasteland</b> dried of all worth.",
      [
        "Silence permeates the off-colored desert.",
        "You step past a pile of glass shards.",
        "Thin metal foil blows in the wind, glittering yet toxic.",
        "You walk through black sand dunes."
      ],
      false,
      ["water",2,"lumen",1]
    );

    new Biome(
      "mountain",
      "Mountain",
      "Great <b>Mountains</b> that separated the lands of the Sun and Moon, extending far into the sky.",
      [
        "Loose rock tumbles past you as you walk.",
        "You find your way around a steep clifface.",
        "You walk past the pitiful remains of what was once a house.",
        "The cold bites through your clothing."
      ],
      false,
      ["water",1,"thread",1],
      [
        new Condition("research",["mountainClimbing"])
      ]
    );
    new Biome(
      "highPeak",
      "High Peaks",
      "Worshipped in both laboratory and shrine, these <b>High Peaks</b> reached into the sky where their gods laid. But only one of those gods watch now.",
      [
        "Snowstorms threaten to blow you away from your climb.",
        "Screaming winds throw silt and rock into your path.",
        "The glittering stars above are repeatedly obscured by cloud and dust.",
        "Under the leaves of impossibly-resillient trees you find brief respite from the continuous battering of wind."
      ],
      false,
      ["water",2,"thread",2],
      [
        new Condition("research",["mountainClimbing"])
      ]
    );

    new Biome(
      "shallowSea",
      "Shallow Coast",
      "Calm waters that separate close islands, these <b>Shallow Coasts</b> harbor little danger for those who seek to travel.",
      [
        "Tranquil waves splash below you.",
        "You walk through soft sand and dark seawater.",
        "Seaweed float by you gently, carried by faint currents.",
        "In the distance you almost seem to see movement under the water, but it fades as an illusion would.",
        "The splash of water below your steps is all that accompanies you in this shallow sea."
      ],
      false,
      ["water",1,"lumen",1],
      [
        new Condition("research",["seawalk"])
      ]
    );
    new Biome(
      "sea",
      "Sea",
      "Deeper than the shallow seas, these <b>Seas</b> accumulate the darkness that has enveloped these lands, a darkness that will threaten to devour those who seek to cross it. Beware.",
      [
        "Roiling waves unsteady your boat.",
        "Unnatural movements under the water keep you alert, but nothing seems to cross your path.",
        "Rushes of warm and cold air threaten to form spouts beside you.",
        "You pass through especially turbulent water, gurgling as if some massive beast lay below."
      ],
      false,
      ["water",1,"lumen",1],
      [
        new Condition("research",["sailing"]),
        new Condition("tag",["hasBoat"])
      ]
    );
    new Biome(
      "abyssalWaters",
      "Abyssal Waters",
      "The most powerful domain of the everpresent Eminence, these waters will see your light, and devour it. Wield every power you possess, machine and magical, if you dream to cross these <b>Abyssal Waters</b> alive.",
      [
        "Powerful currents rock below you, almost humming with force and danger.",
        "Below your boat is an abyss of darkness without a hint of blue, one that threatens to devour you whole.",
        "Your lumenlight flickers as the eminent light of the moon pours across the horizon.",
        "Thunderstorms come and go in flashes as you sail through these dark waters."
      ],
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
      "At the <b>center</b> of the world lies the ruins of a tower, one that reached beyond the sky.",
      [
        "big tower Poggers"
      ],
      false,
      ["water",1,"thread",1],
      [
        new Condition("tag",["debug"])
      ]
    );
    var cityDescriptions = [
      "Within these ruins echo a story old and nearly forgotten. Humanity had lived here, powerful and resplendent, enjoying the blessings of life and machine and magic.",
      "Humanity knew these blessings were given by the resplendent light of the Sun. Life and machine and magic held something in common, an unending requirement for energy, and they would depend on none other than the resplendence of the Sun to sate that thirst.",
      "But man was a different beast from its predecessors of life, and its daughters of machine and magic, as though these would accept what they were given, man sought all that they could see. And in ancient stories and whispers, they saw promises of power beyond the Sun. For beyond the skies, there existed beings separate from the resplendence, the eminent Moon and its mystery. In their lust they sought to unlock the otherworldly power of the eminence."
    ];
    new Biome(
      "fireflyCity",
      "Firefly City",
      cityDescriptions,
      [
        "Smooth towering architecture marks here the greatest technological civilization of Humanity, the <b>Fireflies</b>."
      ],
      false,
      ["water",1,"lumen",3]
    );
    new Biome(
      "anuraCity",
      "Anura City",
      cityDescriptions,
      [
        "Surrounded and intertwined with leaf, tree, and nature, the most powerful magical civilization of Humanity had lived here, the <b>Anura</b>."
      ],
      false,
      ["water",1,"lumen",3]
    );
    new Biome(
      "somnolentCity",
      "Somnolent City",
      cityDescriptions,
      [
        "Floating with the tides, the ancient worldsailing cities of the <b>Somnolents</b> had observed the actions of all around them. Now, these cities lie as wrecks, artificial islands in the middle of deep sea."
      ],
      false,
      ["water",1,"lumen",3]
    );
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
  getDesc() {
    if (!Array.isArray(this.desc)) {
      return this.desc;
    } else {
      return this.desc[0];
      this.desc.splice(0,1);
    }
  }
  getMovementDesc() {
    return this.movements[randInt(this.movements.length)];
  }
}
