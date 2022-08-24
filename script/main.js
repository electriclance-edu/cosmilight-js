/*--------------
GLOBALS
--------------*/
var isotileWidth, isotileHeight, isotilePadding;

var chatlog = document.getElementById("chatlog");
var isotilePositioner = document.getElementById("isotilePositioner");
var roomPositioner = document.getElementById("roomPositioner");
var situationContainer = document.getElementById("situationContainer");
var displays = [];
var currentDisplay = "";

var walkTransitionLength = 1900;
var lastWarnedLocations = [];

var audioInit = false;
var audioAmbience;
var audioVolume = 1;
/*
--------------
LISTENERS
--------------
*/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('button')) {
    sound('button');
  }
  if (event.target.classList.contains('room')) {
    recenterRoomDisplay(event.target);
  }
  if (!audioInit) {
    audioInit = true;
    initializeAudio();
  }
})
document.addEventListener('keydown', function(e) {
  if (event.repeat) {
    return;
  }

  if (currentDisplay == "mapDisplay") {
    var key = e.code;
    var x = Player.player.pos.x;
    var y = Player.player.pos.y;
    e.preventDefault();
    if (key == "ArrowLeft" || key == "KeyA") {
      x--;
    } else if (key == "ArrowUp" || key == "KeyW") {
      y++;
    } else if (key == "ArrowRight" || key == "KeyD") {
      x++;
    } else if (key == "ArrowDown" || key == "KeyS") {
      y--;
    }
    movePlayer(x,y,getTileElem(x,y));
  }
});
/*
--------------
ONLOAD FUNCTIONS
--------------
*/
getCSSVariables();
initializeDebug();
initialize();
function initializeDebug() {
  document.getElementById("debug_muteState").innerHTML = mute ? 'unmute' : 'mute';
}
function initialize() {
  Biome.generateBiomes();
  Resource.generateResources();
  Situation.generateMinorSituations();
  createResourceElements();

  var seed = randInt(1000);
  console.log(`seed: ${seed}`);
  document.getElementById("debug_worldSeed").innerHTML = "seed: " + seed;
  rawSeededRand = new Math.seedrandom(seed);

  World.world = new World(100,seed);

  var start = World.world.selectStartPosition();
  Player.player = new Player(start[0],start[1]);
  displayTile(start[0],start[1],false,true);
  var startTileElem = getTileElem(start[0],start[1]);
  setHoverState(startTileElem,true);
  movePlayer(start[0],start[1],startTileElem,true);

  if (!startWithResources) {
    Player.player.initializeResources();
    Player.player.incrementResource("water",5);
    Player.player.incrementResource("lumen",5);
    Player.player.incrementResource("thread",3);
    Player.player.incrementResource("nectar",1);
    Player.player.incrementResource("seed",1);
  } else {
    Player.player.initializeResources(10);
  }
  updateResources();

  displays = document.getElementById("displayParent").children;
  displayDisplay(startDisplay);

  toggleDebugMenu(debug);
  if (mute) {
    audioVolume = 0;
  }

  //REMOVE
  triggerSituation('flowerPatch')
}
function toggleDebugMenu(state = false) {
  document.getElementById("debugMenu").style.display = ["none","block"][state ? 1 : 0];
  document.getElementById("debugMenuHidden").style.display = ["none","block"][state ? 0 : 1];
}
function initializeAudio() {
  audioAmbience = new Audio("resources/audio/high-ambience.mp3");
  audioAmbience.volume = audioVolume*0.1;
  audioAmbience.loop = true;
  audioAmbience.play();
}
function getCSSVariables() {
  var style = getComputedStyle(document.body);
  isotilePadding = parseInt(style.getPropertyValue("--isotilePadding").slice(0,-2));
  isotileWidth = parseInt(style.getPropertyValue("--rawIsotileWidth").slice(0,-2));
  isotileHeight = isotileWidth/2;
}
/*
--------------
GENERAL GUI FUNCTIONS
--------------
*/
function displayDisplay(id) {
  currentDisplay = id;
  for (var i = 0; i < displays.length; i++) {
    if (!displays[i].classList.contains("hidden")) {
      displays[i].classList.add("hidden");
    }
  }
  document.getElementById(id).classList.remove("hidden");
}
/*
--------------
STRUCTURE FUNCTIONS
--------------
*/
function toggleStructureMenu() {
  //toggle right menu
}
function recenterRoomDisplay(elem) {
  var positionerRect = roomPositioner.getBoundingClientRect();
  var positionerX = (positionerRect.right + positionerRect.left)/2;
  var positionerY = (positionerRect.top + positionerRect.bottom)/2;

  var rect = elem.getBoundingClientRect();
  var xOffset = -1 * ((rect.right + rect.left)/2 - positionerX);
  var yOffset = -1 * ((rect.top + rect.bottom)/2 - positionerY);

  roomPositioner.style.top = yOffset + "px";
  roomPositioner.style.left = xOffset + "px";
}
/*
--------------
LOGGING FUNCTIONS
--------------
*/
function logText(string,classNames = false) {
  var elem = document.createElement("p");
  elem.innerHTML = string;
  if (classNames != false) {
    classNames.forEach(function(className){
      elem.classList.add("txt-" + className);
    });
  }
  chatlog.prepend(elem);
}
function triggerSituation(id) {
  var situation = Situation.situations[id];
  //check if situation is triggerable
  displaySituation(situation);
  //trigger all consequences of the situation
}
function toggleDarkScreen(state, msg = false, transitionLength = false) {
  document.getElementById("darkenedScreen").style.opacity = state ? 1 : 0;

  if (msg != false) {
    document.getElementById("darkenedScreenMsg").innerHTML = msg;
  }
  var progressBar = document.getElementById("darkenedScreenProgress");
  if (transitionLength != false) {
    progressBar.style.transitionDuration = "0s";
    progressBar.style.width = "0%";
    progressBar.style.opacity = 1;
    setTimeout(()=>{
      progressBar.style.transitionDuration = transitionLength;
      progressBar.style.width = "100%";
    },2);
  } else {
    progressBar.style.transitionDuration = "0s";
    progressBar.style.width = "0%";
    progressBar.style.opacity = 0;
  }
}
function displaySituation(situation) {
  situationContainer.innerHTML = 0;

  var situationDiv = document.createElement("div");
  situationDiv.classList.add("situation");
  var img = document.createElement("img");
  img.src = "resources/img/" + situation.imgUrl;
  var header = document.createElement("p");
  header.classList.add("header");
  header.innerHTML = situation.header;

  situationDiv.appendChild(img);
  situationDiv.appendChild(header);

  for (var i = 0; i < situation.paragraphs.length; i++) {
    situationDiv.appendChild(createTextObject(situation.paragraphs[i]));
  }

  var choices = document.createElement("div");
  choices.classList.add("situationChoices");

  for (var i = 0; i < situation.choices.length; i++) {
    choices.appendChild(createSituationOptionObject(situation.choices[i]));
  }
  situationDiv.appendChild(choices);

  situationContainer.appendChild(situationDiv);
}
function createTextObject(data) {
  var elem = document.createElement("p");
  if (typeof data == "string") {
    elem.innerHTML = data;
  } else {
    elem.innerHTML = data.content;
    for (var i = 0; i < data.class.length; i++) {
      elem.classList.add("txt-" + data.class[i]);
    }
  }
  return elem;
}
function createSituationOptionObject(situationOption) {
  var situationOptionElement = document.createElement("div");
  situationOptionElement.classList.add("button");
  var header = createTextObject(situationOption.header);
  header.classList.add("header");
  var desc = createTextObject(situationOption.desc);
  situationOptionElement.appendChild(header);
  situationOptionElement.appendChild(desc);

  if (situationOption.greyDesc != false) {
    var greyText = createTextObject(situationOption.greyDesc);
    greyText.classList.add("txt-grey");
    greyText.classList.add("smallText");
    situationOptionElement.appendChild(greyText);
  }

  return situationOptionElement;
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

  var elem = createTileElem(x,y,tileData.getBiome(),isVoid);
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
  var graphic = elem.children[elem.children.length - 1].children[0];
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
function movePlayer(x,y,tile,bypass = false) {
  var diff_x = Math.abs(Player.player.pos.x - x);
  var diff_y = Math.abs(Player.player.pos.y - y);

  var isAdjacent = (diff_x <= 1 && diff_y <= 1 && diff_x != diff_y);
  var isNotSameTile = diff_x + diff_y != 0;
  if (((isAdjacent || godMode) && isNotSameTile) || bypass) {
    updateTileFromVoid(tile);
    var biome = World.world.getTile(x,y).getBiome();

    if ((biome.conditionsSatisfied() && biome.resourcesSatisfied() || World.world.getTile(x,y).isExplored) || godMode || bypass) {
      lastWarnedLocations = [];

      var transitionLength = walkTransitionLength;
      if (bypass || godMode) {
        transitionLength = 0;
      } else if (World.world.getTile(x,y).isExplored) {
        transitionLength = 0;
        if (Player.player.hasResource("water",1)) {
          Player.player.incrementResource("water",-1);
        } else {
          //percentage chance Player.player.damage(1);
          logText("Thirst yay")
        }
      } else {
        biome.triggerConsequences();
        sound("walk");
        toggleDarkScreen(true,"Exploring new tile...",transitionLength/1000 + "s");
      }

      setTimeout(()=>{
        toggleDarkScreen(false);
        document.getElementById(coordsToTileId(x,y)).classList.remove("unexploredIsotile");
        //log biome stuff
        if (!biome.hasBeenLogged) {
          logText(biome.getDesc(),["italic","strongGlow","center"]);
          biome.hasBeenLogged = true;
        } else if (!World.world.getTile(x,y).isExplored) {
          logText(biome.getFlavorText());
        }
        recenterMap(x,y);
        //reveal surrounding tiles
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
        //hide tiles that are too far from render dist
        cull(x,y);
        World.world.getTile(x,y).isExplored = true;
      },transitionLength);
    } else {
      for (var i = 0; i < lastWarnedLocations.length; i++) {
        if (lastWarnedLocations[i][0] == x && lastWarnedLocations[i][1] == y) {
          return;
        }
      }
      lastWarnedLocations.push([x,y]);
      if (!biome.conditionsSatisfied()) {
        toggleDarkScreen(false);
        biome.triggerFailConsequences();
      } else if (!biome.resourcesSatisfied()) {
        logText("You do not have the resources required to explore further.");
      }
    }
  }
}
function recenterMap(x,y) {
  isotilePositioner.style.top = (isotileHeight/-2)*x - (isotileHeight/-2)*y - (isotilePadding*x - isotilePadding*y) + "px";
  isotilePositioner.style.left = (isotileWidth/-2)*x + (isotileWidth/-2)*y - (isotilePadding*x + isotilePadding*y) + "px";
  setHoverState(getTileElem(x,y),true);
  setHoverState(getTileElem(Player.player.pos.x,Player.player.pos.y),false);
  Player.player.setPos(x,y);
}
function createTileElem(x,y,biome = Biome.getBiome("plains"),isVoid, obj_structure = false) {
  var tile = document.createElement("div");
  tile.id = `tile${x},${y}`;
  tile.classList.add("isotile");
  tile.classList.add("unexploredIsotile");
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
  var cost = document.createElement("div");

  title.appendChild(cost);
  tile.appendChild(title);

  var tileGraphicEffect = document.createElement("div");
  tileGraphicEffect.classList.add("tileGraphicEffect");
  var tileGraphic = document.createElement("div");
  tileGraphic.classList.add("tileGraphic");
  tileGraphic.classList.add("isotile-" + biome.id);
  if (isVoid) {
    tileGraphic.classList.add("isotile-void");
  } else {
    tile.classList.add("titleParent");
  }
  tileGraphicEffect.appendChild(tileGraphic);
  tile.appendChild(tileGraphicEffect);

  return tile;
}
/*
---------------
AUDIO FUNCTIONS
---------------
*/
function sound(type) {
  if (mute) {
    return true;
  }

  var audio;
  if (type == "button") {
    audio = new Audio("resources/audio/thockTwo.mp3");
  } else if (type == "walk") {
    audio = new Audio("resources/audio/walk2.mp3");
  }
  audio.volume = audioVolume;
  audio.play();
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
/*
-----------------
SPECIAL FUNCTIONS
-----------------
*/
//Modified at initialization.
function rawSeededRand(){};
