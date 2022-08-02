/*
EDITABLE SETTINGS
Affect Gameplay
*/
const sightRadius = 0; //affects how far land will be revealed. Default is 0, and will reveal only adjacent tiles.
const cullRadius = 7;
const godMode = false;
const debug = false; //sets seed to a cosntant and displays world
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
const revealRadius = 0;