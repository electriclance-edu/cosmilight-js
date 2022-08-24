/*
EDITABLE SETTINGS
Affect Gameplay
*/
var sightRadius = 2; //affects how far land will be revealed. Default is 0, and will reveal only adjacent tiles.
var cullRadius = 5;
var godMode = false; //allows flying, skips tile transition animation
const debug = false; //shows debug menu
const startWithResources = false; //starts player w 10 resources
var mute = true;

/*
EDITABLE SETTINGS
Affect World Generation
*/
const seaProminence = 2; //affects width of sea biomes, higher values mean smaller islands
const deepSeaProminence = 8; //affects width of deep sea
const deepSeaPocketProminence = 30; //affects size of sea biome holes in deep sea
const plainsLimit = 10; //noise level where plains can spawn, affects mountains and deserts
const cityProminence = 0.15; //affects rarity of cities
const mountainThickness = 1.3; //affects width of mountains

/*
You don't really want to edit these.
*/
var revealRadius = sightRadius - 1;
const startDisplay = "expeditionDisplay"; //"roomDisplay" "mapDisplay" "introDisplay" expeditionDisplay
