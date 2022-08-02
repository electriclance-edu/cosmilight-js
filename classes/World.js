var debug_templateStructures = [
  {
    title:"Grove",
    colorClass:"txt-seed"
  },
  {
    title:"Old House",
    colorClass:"txt-steelsilk"
  },
  {
    title:"Cave",
    colorClass:"txt-thread"
  },
  false,false,false,false];

class World {
  static world;
  //worldSize, seed

  constructor(worldSize,seed) {
    this.worldSize = worldSize;

    this.seed = seed;
    noise.seed(this.seed);

    var tiles = [];
    var biome, noiseValue, altNoiseValue, basicBiomeNoiseValue, roughNoiseValue, seaNoiseValue, oceanNoiseValue, seededRandValue, altBasicBiomeNoiseValue;
    for (var i = 0; i < worldSize; i++) {
      tiles.push(new Array(worldSize));
      for (var j = 0; j < worldSize; j++) {
        noiseValue = (simplex(i,j,10) + simplex(i,j,5)/5)*20;
        altNoiseValue = (simplex(i+100000,j+100000,20) + simplex(i+100000,j+100000,10)/5)*20;
        roughNoiseValue = simplex(i+200000,j+200000,1)*100;
        seaNoiseValue = (simplex(i,j,50)/-3 + simplex(i,j,25) + simplex(i,j,10)/2)*15;
        oceanNoiseValue = (simplex(i,j,50) + simplex(i,j,10)/2)*15;
        basicBiomeNoiseValue = (simplex(i+200000,j+200000,50)+simplex(i+200000,j+200000,10)/7)*20;
        altBasicBiomeNoiseValue = (simplex(i+400000,j+400000,50)+simplex(i+400000,j+400000,10)/7)*20;
        // the following code generates the world (excluding structures like cities/mountains)
        //how it works is it's a chain of if/else that sets the biome depending on the noiseValues above
        //some noise value are rough while others are smooth
        if (seaNoiseValue < seaProminence) {
          biome = "sea";
        } else if (oceanNoiseValue < deepSeaProminence) {
          if (noiseValue - roughNoiseValue/deepSeaPocketProminence < 11) {
            biome = "deepSea";
          } else {
            biome = "sea";
          }
        } else if (noiseValue < 10) {
          biome = "shallowSea";
        } else {
          if (basicBiomeNoiseValue < plainsLimit) {
            //plains biome
            if (altNoiseValue < 10) {
              biome = "plains"
            } else if (altNoiseValue < 16) {
              biome = randElem(["forest","forest","forest","plains"]);
            }
          } else {
            //desert biome
            if (altNoiseValue < 10) {
              biome = "desert"
            } else if (altNoiseValue < 16) {
              biome = randElem(["wasteland","wasteland","desert","desert"]);
            }
          }
        }
        //add mountains (partially override seas)
        if (basicBiomeNoiseValue < plainsLimit + mountainThickness && basicBiomeNoiseValue > plainsLimit) {
          if (oceanNoiseValue < deepSeaProminence) {
            biome = randElem(["mountain","sea"]);
          } else if (basicBiomeNoiseValue > plainsLimit + (mountainThickness/2-0.2) && basicBiomeNoiseValue < plainsLimit + (mountainThickness/2+0.2)) {
            biome = "highPeak";
          } else {
            biome = "mountain";
          }
          //mountains biome
        }
        //add cities
        if (biome == "deepSea" && seededRandFloat() < cityProminence/2/3) {
          biome = "somnolentCity";
        } else if (biome == "forest" && seededRandFloat() < cityProminence/3) {
          biome = "anuraCity";
        } else if (biome == "desert" && seededRandFloat() < cityProminence/3) {
          biome = "fireflyCity";
        }
        tiles[i][j] = new Tile(biome,debug_templateStructures[randInt(debug_templateStructures.length)]);
      }
    }
    //sample perlin noise for base biomes (layer temperatures and stuff to determine what goes where?)
    //add on city/meteorite seeds
    //turn seeds into structures

    this.tiles = tiles;
    this.setTile(0,0,new Tile("center"));
  }
  selectStartPosition() {
    for (var radius = 1; radius <= this.worldSize; radius++) {
      var tiles = this.getSquare(radius);
      for (var i = 0; i < tiles.length; i++) {
        var randIndex = randInt(tiles.length);
        if (this.getTile(tiles[randIndex][0],tiles[randIndex][1]).getBiome().isSpawnable) {
          return tiles[randIndex];
        }
        tiles.splice(randIndex,1);
      }
    }
    return [0,0];
  }
  debugDisplay() {
    var debug_world = document.getElementById("debug_world");

    var row;
    for (var i = 0; i < this.worldSize; i++) {
      row = document.createElement("tr");
      for (var j = 0; j < this.worldSize; j++) {
        var square = document.createElement("td");
        square.classList.add("debugTile");
        if (this.tiles[i][j].biome == undefined) {
          console.log(this.tiles[i][j]);
        }
        square.classList.add("isotile-" + this.tiles[i][j].biome);
        row.appendChild(square);
      }
      debug_world.appendChild(row);
    }
  }
  getTile(x,y) {
    if ((x < this.worldSize/2)||(y < this.worldSize/2)) {
      return this.tiles[x + this.worldSize/2][y + this.worldSize/2];
    } else {
      console.log(`World.getTile(): Given coordinates (${x},${y}) invalid, out of range of worldSize ${worldSize}`);
      return false;
    }
  }
  setTile(x,y,obj_tile) {
    if ((x < this.worldSize/2)||(y < this.worldSize/2)) {
      this.tiles[x + this.worldSize/2][y + this.worldSize/2] = obj_tile;
    } else {
      console.log(`World.setTile(): Given coordinates (${x},${y}) invalid, out of range of worldSize ${worldSize}`);
      return false;
    }
  }
  getSquare(radius,origin = [0,0]) {
    var x_one = origin[0] - radius;
    var x_two = origin[0] + radius;
    var y_one = origin[1] - radius;
    var y_two = origin[1] + radius;

    var listOfTileCoordinates = [];
    for (var i = x_one; i <= x_two; i++) {
      for (var j = y_one; j <= y_two; j++) {
        listOfTileCoordinates.push([i,j]);
      }
    }

    return listOfTileCoordinates;
  }
}
