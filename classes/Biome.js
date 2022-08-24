class Biome {
  static biomes = [];

  constructor(
    id,
    title,
    desc,
    explorationLogText,
    tags = {isSpawnable:false},
    resourceConditions = new Condition("hasResource",{id:"water",amt:1}),
    consequences = new Consequence("addResource",{id:"water",amt:-1}),
    conditions = false,
    failConsequences = false
  ) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.explorationLogText = explorationLogText;
    this.tags = tags;
    this.resourceConditions = resourceConditions;
    this.consequences = consequences;
    this.conditions = conditions;
    this.failConsequences = failConsequences;

    this.hasBeenLogged = false;

    Biome.biomes.push(this)
  }
  getTag(name) {
    if (this.tags[name]) {
      return true;
    } else if (!this.tags[name]) {
      return false;
    } else {
      console.log(`Biome.getTag(): tag with name '${name}' does not exist`);
      console.log(this.tags);
    }
  }
  triggerFailConsequences() {
    Consequence.triggerSet(this.failConsequences);
  }
  triggerConsequences() {
    Consequence.triggerSet(this.consequences);
  }
  resourcesSatisfied() {
    return Condition.setSatisfied(this.resourceConditions);
  }
  conditionsSatisfied() {
    return Condition.setSatisfied(this.conditions);
  }
  getDesc() {
    if (!Array.isArray(this.desc)) {
      return this.desc;
    } else {
      return this.desc[0];
      // this.desc.splice(0,1); the hell is this code doing here? unreachable
    }
  }
  getFlavorText() {
    this.explorationLogText.push(this.explorationLogText[0]);
    this.explorationLogText.splice(0,1);
    return this.explorationLogText[0];
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
      {isSpawnable:true}
    );
    new Biome(
      "forest",
      "Forest",
      "From a distance, the faint glow of bioluminescent plants illuminates a grand canopy of trees in shades of pink, blue, and lumenyellow. In these desolate lands lit by cosmic light, these <b>Forests</b> may be the last bastions of life's radiance.",
      [
        "Leaves rustle loudly above you.",
        "Your steps crush the undergrowth.",
        "You part fern and leaf as you walk.",
        "You mistake the wind for a howling wolf hidden in the trees.",
        "The faint glow of dense plants illuminates your path.",
        "You pass by a massive tree, covered with faintly glowing moss.",
        "You pass through a flowing river, lit by glowing bulbs of fruit.",
      ],
      {isSpawnable:true}
    );

    new Biome(
      "desert",
      "Desert",
      "The last areas of land to be consumed by the darkness, as it was thought that there was nothing here to consume. But life did live here, the last humans of the <b>Desert</b>-born civilization of the Firefly.",
      [
        "The dusty winds howl past you.",
        "Your feet sinks slightly into the sand with each step.",
        "A dust storm blows in the horizon, dimly lit by moonlight.",
        "You pass by a boulder, rubbed smooth by sand and wind."
      ],
      {isSpawnable:true},
      new Condition("hasResource",{id:"water",amt:2}),
      new Consequence("addResource",{id:"water",amt:-2})
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
      {isSpawnable:true},
      [
        new Condition("hasResource",{id:"water",amt:2}),
        new Condition("hasResource",{id:"lumen",amt:1})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-2}),
        new Consequence("addResource",{id:"lumen",amt:-1})
      ]
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
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:2}),
        new Condition("hasResource",{id:"thread",amt:1})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-2}),
        new Consequence("addResource",{id:"thread",amt:-1})
      ],
      [
        new Condition("hasTag","mountainClimbing")
      ],
      new Consequence("logWithStyle",{txt:"A tall climb blocks your path. You don't have the equipment to go further.",classes:["grey"]})
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
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:2}),
        new Condition("hasResource",{id:"thread",amt:2})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-2}),
        new Consequence("addResource",{id:"thread",amt:-2})
      ],
      [
        new Condition("hasTag","mountainClimbing")
      ],
      new Consequence("logWithStyle",{txt:"A steep, dangerous clifface blocks your path as dust rains from above. Beyond, you hear the raging winds of powerful snowstorms. Could anything survive up there?",classes:["grey"]})
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
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:1}),
        new Condition("hasResource",{id:"lumen",amt:1})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-1}),
        new Consequence("addResource",{id:"lumen",amt:-1})
      ],
      [
        new Condition("hasTag","seawalker")
      ],
      new Consequence("logWithStyle",{txt:"A vast body of water stretches out before you. It's shallow, but the water itself seems to seep into flesh and bone, dissolving it slowly. Protection is warranted.",classes:["grey"]})
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
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:1}),
        new Condition("hasResource",{id:"lumen",amt:1})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-1}),
        new Consequence("addResource",{id:"lumen",amt:-1}),
        new Consequence("damageBoat",{amt:1,chance:10})
      ],
      [
        new Condition("hasTag","sailing"),
        new Condition("hasBoat")
      ],
      new Consequence("logWithStyle",{txt:"You can't see the bottom of the black water here. It seems anything, no matter how buoyant, will sink to the bottom. What could cross this?",classes:["grey"]})
    );
    new Biome(
      "abyssalWaters",
      "Abyssal Waters",
      "The most powerful domain of the everpresent Eminence, these waters will see your light, and devour it. Wield every power you possess, machine and magical, if you dream to cross these <b>Abyssal Waters</b> alive.",
      [
        "Powerful currents rock below you, almost humming with force and danger.",
        "Below your boat is an abyss of darkness without a hint of blue, one that threatens to devour you whole.",
        "Your lumenlight flickers as the eminent light of the moon pours across the horizon.",
        "Thunderstorms come and go in flashes as you sail through these dark waters.",
        "Water thrashes against your boat in an almost animal way."
      ],
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:1}),
        new Condition("hasResource",{id:"lumen",amt:2})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-1}),
        new Consequence("addResource",{id:"lumen",amt:-2}),
        new Consequence("damageBoat",{amt:1,chance:30})
      ],
      [
        new Condition("hasTag","sailing"),
        new Condition("hasBoat")
      ],
      new Consequence("logWithStyle",{txt:"In the distance, towering black waves and swirling whirlpools cast shadows in the moonlight, threatening to crush and devour anything that might step a single foot into their influence. You feel as if you look upon a domain of pure darkness.",classes:["grey"]})
    );

    new Biome(
      "center",
      "Center of the World",
      "At the <b>center</b> of the world lies the ruins of a tower, ruins that once reached beyond the sky.",
      [
        "big tower Poggers",
        "there is a tower among us"
      ],
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:2}),
        new Condition("hasResource",{id:"thread",amt:1})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-2}),
        new Consequence("addResource",{id:"thread",amt:-1})
      ],
      [
        new Condition("hasTag","debug")
      ],
      new Consequence("logWithStyle",{txt:"At the <b>center</b> of the world lies the ruins of a tower, ruins that once reached beyond the sky.",classes:["grey"]})
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
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:1}),
        new Condition("hasResource",{id:"lumen",amt:3})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-1}),
        new Consequence("addResource",{id:"lumen",amt:-3})
      ]
    );
    new Biome(
      "anuraCity",
      "Anura City",
      cityDescriptions,
      [
        "Surrounded and intertwined with leaf, tree, and nature, the most powerful magical civilization of Humanity had lived here, the <b>Anura</b>."
      ],
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:1}),
        new Condition("hasResource",{id:"lumen",amt:3})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-1}),
        new Consequence("addResource",{id:"lumen",amt:-3})
      ]
    );
    new Biome(
      "somnolentCity",
      "Somnolent City",
      cityDescriptions,
      [
        "Floating with the tides, the ancient worldsailing cities of the <b>Somnolents</b> had observed the actions of all around them. Now, these cities lie as wrecks, artificial islands in the middle of deep dark sea."
      ],
      {isSpawnable:false},
      [
        new Condition("hasResource",{id:"water",amt:1}),
        new Condition("hasResource",{id:"lumen",amt:3})
      ],
      [
        new Consequence("addResource",{id:"water",amt:-1}),
        new Consequence("addResource",{id:"lumen",amt:-3})
      ]
    );
  }
}
