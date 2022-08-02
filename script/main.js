/*--------------
GLOBALS
--------------*/
var isotileWidth, isotileHeight, isotilePadding;
var isotilePositioner = document.getElementById("isotilePositioner");
/*--------------
LISTENERS
--------------*/
document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
      case 37:
          var x = Player.player.pos.x;
          var y = Player.player.pos.y;
          x--;
          movePlayer(x,y,getTileElem(x,y));
          break;
      case 38:
          var x = Player.player.pos.x;
          var y = Player.player.pos.y;
          y++;
          movePlayer(x,y,getTileElem(x,y));
          break;
      case 39:
          var x = Player.player.pos.x;
          var y = Player.player.pos.y;
          x++;
          movePlayer(x,y,getTileElem(x,y));
          break;
      case 40:
          var x = Player.player.pos.x;
          var y = Player.player.pos.y;
          y--;
          movePlayer(x,y,getTileElem(x,y));
          break;
  }
});
/*--------------
ONLOAD
--------------*/
getCSSVariables();
initialize();

function rawSeededRand(){};

function initialize() {
  Biome.generateBiomes();
  Resource.generateResources();
  createResourceElements();

  var seed;
  if (debug) {
    seed = 2;
  } else {
    var seed = randInt(1000);
    console.log(`seed: ${seed}`);
  }
  rawSeededRand = new Math.seedrandom(seed);

  World.world = new World(100,seed);
  if (debug) {
    World.world.debugDisplay();
  }

  var start = World.world.selectStartPosition();
  Player.player = new Player(start[0],start[1]);
  displayTile(start[0],start[1],false,true);
  var startTileElem = getTileElem(start[0],start[1]);
  setHoverState(startTileElem,true);
  movePlayer(start[0],start[1],startTileElem,true);

  Player.player.initializeResources();
  Player.player.incrementResource("water",5);
  Player.player.incrementResource("lumen",6);
  Player.player.incrementResource("thread",10);
  Player.player.incrementResource("seed",1);
  updateResources();
}
function getCSSVariables() {
  var style = getComputedStyle(document.body);
  isotilePadding = parseInt(style.getPropertyValue("--isotilePadding").slice(0,-2));
  isotileWidth = parseInt(style.getPropertyValue("--rawIsotileWidth").slice(0,-2));
  isotileHeight = isotileWidth/2;
}
/*
--------------
RESOURCE FUNCTIONS
--------------
*/
function createResourceElements() {
  var majorResourcesElement = document.getElementById("majorResources");
  var rareResourcesParent = document.getElementById("rareResources");

  for (var i = 0; i < Resource.resources.length; i++) {
    if (!Resource.resources[i].counter) {
      rareResourcesParent.appendChild(createRareResourceElement(Resource.resources[i]));
    } else {
      majorResourcesElement.appendChild(createMajorResourceElement(Resource.resources[i]));
    }
  }
}
function updateResources() {
  for (var i = 0; i < Resource.resources.length; i++) {
    updateResource(Resource.resources[i].id,Player.player.resourceAmounts[Resource.resources[i].id]);
  }
}
function updateResource(id,amt,show = false) {
  //display the element
  var resourceElement = document.getElementById(`resource-${id}`);
  var resource = Resource.resourcesByName[id];

  //prevents the element from displaying at the start when there is no element, to prevent spoiling the existence of the rare resources
  if (amt != 0 || show) {
    if (resource.counter == false) {
      document.getElementById("rareResourcesHeader").style.display = "block";
      resourceElement.style.display = "inline-block";
    } else {
      resourceElement.style.display = "block";
    }
  }
  //update element amounts
  if (resource.counter != false) {
    var count = document.getElementById(`resourceCount-${id}`);
    if (amt == 1) {
      count.innerHTML = amt + " " + resource.counter[0];
    } else {
      count.innerHTML = amt + " " + resource.counter[1];
    }
  }
  var char = document.getElementById(`resourceChar-${id}`);
  char.innerHTML = resource.char.repeat(amt);
}
function createMajorResourceElement(resource) {
  var container = document.createElement("div");
  container.classList.add("resource");
  container.id = `resource-${resource.id}`;
  var title = document.createElement("span");
  title.classList.add("header");
  title.classList.add("headerTwo");
  title.innerHTML = resource.name;
  var count = document.createElement("span");
  count.classList.add("smallText");
  count.id = `resourceCount-${resource.id}`;
  var br = document.createElement("br");
  var char = document.createElement("span");
  char.classList.add("txt-" + resource.id);
  char.classList.add("char-" + resource.charSize);
  char.id = `resourceChar-${resource.id}`;

  container.appendChild(title);
  container.appendChild(count);
  container.appendChild(br);
  container.appendChild(char);

  return container;
}
function createRareResourceElement(resource) {
  var container = document.createElement("div");
  container.id = `resource-${resource.id}`;
  container.style.display = "none";
  var title = document.createElement("span");
  title.classList.add("smallText");
  title.classList.add("header");
  title.classList.add("txt-grey");
  title.innerHTML = resource.name;
  var br = document.createElement("br");
  var char = document.createElement("span");
  char.classList.add("txt-" + resource.id);
  char.classList.add("char-" + resource.charSize);
  char.id = `resourceChar-${resource.id}`;

  container.appendChild(title);
  container.appendChild(br);
  container.appendChild(char);

  return container;
}
/*
--------------
TILE FUNCTIONS
--------------
*/
function displayTile(x,y,isVoid = true) {
  var tileData = World.world.getTile(x,y);

  if (tileData == false) {
      console.log(`displayTile(): inputted coordinates (${x},${y}) invalid, out of range of World.getTile();`);
    return false;
  }
  if (tileData.isDisplayed == true) {
    return true;
  }

  var elem;
  if (tileData.structure != false) {
    elem = createTileElem(x,y,tileData.getBiome(),isVoid,tileData.structure);
  } else {
    elem = createTileElem(x,y,tileData.getBiome(),isVoid);
  }
  elem.style.transitionDelay = randFloat(0.3)+"s";
  elem.style.top = (isotileHeight/2)*x - (isotileHeight/2)*y + (isotilePadding*x - isotilePadding*y) + "px";
  setTimeout(()=>{
    elem.style.opacity = 1;
    elem.style.transform = "translatey(0)";
  },1);

  elem.style.left = (isotileWidth/2)*x + (isotileWidth/2)*y + (isotilePadding*x + isotilePadding*y) + "px";
  elem.style.zIndex = x-y;

  isotilePositioner.appendChild(elem);

  tileData.isDisplayed = true;
  return true;
}
function setHoverState(elem,state) {
  if (state) {
    elem.classList.add("forceHover");
  } else {
    elem.classList.remove("forceHover");
  }
}
function displayTileRectangle(x_one,y_one,x_two,y_two,isVoid = true) {
  for (i = x_one; i <= x_two; i++) {
    for (j = y_one; j <= y_two; j++) {
      displayTile(i,j,isVoid);
    }
  }
}
function revealTileRectangle(x_one,y_one,x_two,y_two) {
  for (i = x_one; i <= x_two; i++) {
    for (j = y_one; j <= y_two; j++) {
      updateTileFromVoid(getTileElem(i,j));
    }
  }
}
function displayAdjacents(x,y,isVoid) {
  displayTile(x-1,y,isVoid);
  displayTile(x+1,y,isVoid);
  displayTile(x,y-1,isVoid);
  displayTile(x,y+1,isVoid);
}
function updateTileFromVoid(elem) {
  var graphic = elem.children[elem.children.length - 1];
  if (graphic.classList.contains("isotile-void")) {
    graphic.classList.remove("isotile-void");
    elem.classList.add("titleParent");
  }
}
function cull(x,y) {
  var topLeft_x = x-cullRadius;
  var topLeft_y = y-cullRadius;
  var bottomRight_x = x+cullRadius;
  var bottomRight_y = y+cullRadius;

  var tiles = document.getElementById("isotilePositioner").children;
  for (i = 0; i < tiles.length; i++) {
    var coords = tileIdToCoords(tiles[i].id);
    var distance = dist([coords.x,coords.y],[Player.player.pos.x,Player.player.pos.y]);
    if (distance > cullRadius) {
      tiles[i].style.display = "none";
    } else {
      tiles[i].style.display = "block";
      //calcLight(coords.x,coords.y,distance,tiles[i]);
    }
  }
}
//function that calculates the brightness of a tile
function calcLight(x,y,distance,tile) {
  var amplitude = distance/cullRadius - 1;
  tile.style.filter = `brightness(${1.1 - Math.exp(4*amplitude)})`;
}
function movePlayer(x,y,tile,bypass = false) {
  var diff_x = Math.abs(Player.player.pos.x - x);
  var diff_y = Math.abs(Player.player.pos.y - y);
  var isAdjacent = (diff_x <= 1 && diff_y <= 1 && diff_x != diff_y);
  if (isAdjacent || godMode || bypass) {
    updateTileFromVoid(tile);
    if (World.world.getTile(x,y).getBiome().isTraversable() || godMode) {
      isotilePositioner.style.top = (isotileHeight/-2)*x - (isotileHeight/-2)*y - (isotilePadding*x - isotilePadding*y) + "px";
      isotilePositioner.style.left = (isotileWidth/-2)*x + (isotileWidth/-2)*y - (isotilePadding*x + isotilePadding*y) + "px";
      setHoverState(getTileElem(x,y),true);
      setHoverState(getTileElem(Player.player.pos.x,Player.player.pos.y),false);
      Player.player.pos = {x:x,y:y};

      if (sightRadius == 0) {
        displayAdjacents(x,y);
      } else {
        displayTileRectangle(x-sightRadius,y-sightRadius,x+sightRadius,y+sightRadius);
        var actualRevealRadius;
        if (revealRadius == 0) {
          actualRevealRadius = sightRadius - 1;
        } else {
          actualRevealRadius = revealRadius;
        }
        revealTileRectangle(x-actualRevealRadius,y-actualRevealRadius,x+actualRevealRadius,y+actualRevealRadius);
      }
      cull(x,y);
    }
  }
}
function createTileElem(x,y,biome = Biome.getBiome("plains"),isVoid, obj_structure = false) {
  var tile = document.createElement("div");
  tile.id = `tile${x},${y}`;
  tile.classList.add("isotile");
  tile.setAttribute("data-x",x);
  tile.setAttribute("data-y",y);
  tile.onclick = function(){
    var x = parseInt(this.getAttribute("data-x"));
    var y = parseInt(this.getAttribute("data-y"));

    movePlayer(x,y,this);
  };

  var title = document.createElement("div");
  title.classList.add("title");
  var header = document.createElement("span");
  header.classList.add("header");
  header.innerHTML = biome.title;
  title.appendChild(header);
  if (obj_structure != false) {
    var structure = document.createElement("span");
    structure.classList.add("greyText");
    structure.classList.add("smallText");
    structure.classList.add(obj_structure.colorClass);
    structure.innerHTML = obj_structure.title;
    title.appendChild(structure);
  }
  tile.appendChild(title);

  var tileGraphic = document.createElement("div");
  tileGraphic.classList.add("tileGraphic");
  tileGraphic.classList.add("isotile-" + biome.id);
  if (isVoid) {
    tileGraphic.classList.add("isotile-void");
  } else {
    tile.classList.add("titleParent");
  }
  tile.appendChild(tileGraphic);

  return tile;
}
/*
---------------
AUDIO FUNCTIONS
---------------
*/
function buttonPress() {
  new Audio("resources/audio/thockTwo.mp3").play();
}
/*
-----------------
UTILITY FUNCTIONS
-----------------
*/
function seededRandInt(max) {
  return Math.floor(rawSeededRand()*(max));
}
function seededRandFloat(max = 1) {
  return rawSeededRand()*max;
}
function randInt(max) {
  return Math.floor(Math.random()*(max));
}
function randFloat(max) {
  return Math.random()*max;
}
function randElem(array) {
  return array[seededRandInt(array.length)];
}
function tileIdToCoords(id) {
  id = id.slice(4).split(",");
  var coords = {
    x:parseInt(id[0]),
    y:parseInt(id[1])
  }
  return coords;
}
function coordsToTileId(x,y) {
  return `tile${x},${y}`;
}
function getTileElem(x,y) {
  return document.getElementById(coordsToTileId(x,y));
}
function simplex(x,y,scale) {
  scale += 0.01;
  return Math.abs(noise.simplex2(x/scale,y/scale).toFixed(3));
}
function dist(pointOne,pointTwo) {
  return Math.sqrt((pointOne[0] - pointTwo[0])**2 + (pointOne[1] - pointTwo[1])**2);
}
