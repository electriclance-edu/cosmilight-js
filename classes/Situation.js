class Situation {
  static situations = {};

  constructor(id,biome,imgUrl = "areas/void.png",header,paragraphs,consequences,choices) {
    this.id = id;
    this.biome = biome;
    this.imgUrl = imgUrl;
    this.header = header;
    this.paragraphs = paragraphs;
    this.consequences = consequences;
    this.choices = choices;

    Situation.situations[id] = this;
  }
  static generateMinorSituations() {
    new Situation(
      "template",
      "biome",
      "areas/void.png",
      "header",
      [
        "paragraphOne",
        "paragraphTwo",
        {
          content:"paragraphThree with Style",
          class:["water","glow"]
        }
      ],
      [
        new Consequence("addResource",["water","1"])
      ],
      [
        new SituationChoice(
          "Option One Header",
          "Option One Description",
          "Option One Grey Description",
          [
            new Consequence("addTag","waterIgnorer")
          ],
          [
            new Condition("conditionType","param")
          ]
        ),
        new SituationChoice(
          "Option Two Header",
          "Option Two Description",
          false,
          [
            new Consequence("endSituation"),
            new Consequence("addResource",["water","3"])
          ],
          [
            new Condition("conditionType","param")
          ],
        )
      ]
    )
    new Situation(
      "flowerPatch",
      "plains",
      "areas/grove.png",
      "A quaint patch of color.",
      [
        "You find a small patch of thorned flowers, their color dimmed to near-grey, yet glowing faintly.",
        {
          content:"waoooo text but with color and glow!!!!",
          class:["water","strongGlow"]
        }
      ],
      [],
      [
        new SituationChoice(
          "Water the flowers.",
          "Their color may yet return.",
          false,
          [
            new Consequence("addResource",["lumen",[1,3]]),
            new Consequence("log","The flowers brighten and glow under the nourishment of the scarce water, beginning to drip with lumen. You carefully take a few drops."),
          ],
          new Condition("hasResources",["water",2])
        ),
        new SituationChoice(
          "Harvest the flowers.",
          "The flowers' faint glow tells you of lumen hidden within.",
          "The thorns of the flowers will hurt.",
          [
            new Consequence("hurt",1),
            new Consequence("addResource",["lumen",[1,5]]),
            new Consequence("log","The flowers brighten and glow under the nourishment of the scarce water, beginning to drip with lumen. You carefully take a few drops."),
          ]
        )
      ]
    )
  }
}

/* MINOR Situation IDEAS
plains - flowers
plains - bones
plains - cave
plains - campsite
plains - observatory
forest - lake
forest - cottage
forest - hutch
desert - oasis
desert - cactus forest
desert - dunehouse
wasteland - field of glass
wasteland - rundown solar panel
wasteland - observatory
mountain - glittercave
mountain - massive rock
mountain - old cabin
MAJOR Situation IDEAS
forest - smth to explain why fruits exist
forest - cabin of the Chieftain
wasteland - the facility
    - a facility with a door that requires steelsilk to open
    - the facility has two sections, the second section is inaccessible without
    fully exploring the first section
    - the first section is bright n only a bit weird
    - the second section is dark and implies *something* is roaming here
    - the second section changes slightly after completely exploring (descriptions get slightly changed, the last switch with a monster "contained" is suddenly "opened")
*/
