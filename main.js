// When debug is true, game is put in the global namespace so that it can
// be easily accessed, manipulated, and tested.
var debug = true;
if (debug) {
	var game;
}

function onload() {
	// Create and load the game.
	game = new Game();
	game.load();
	
	// Setup Event Listeners and UI
	var bodyEl = document.getElementById('body');
	bodyEl.addEventListener('mousemove', function() {
		game.bodyMousemove();
	});
	bodyEl.addEventListener('click', function() {
		game.bodyClick();
	});
	
	var saveButton = document.getElementById('save-button');
	saveButton.addEventListener('click', function() {
		game.save();
	});
	game.uiTick();
	
	// Let the game run.
	game.timeoutPointer = setTimeout(gameTick, 33, game);
}

function Game() {
	// Constants and Game Data
	this.MOUSE_MOVEMENT_EXP_GAIN = 1;
	this.MOUSE_CLICK_EXP_GAIN = 15;
	this.BASE_EXP_TO_LEVEL = 100;
	this.GROWTH_EXP_TO_LEVEL = 1.3;
	this.BLUE_SHARD_PER_LEVEL_GAIN = 100;
	
	// Game User/State Values 
	this.level = 0;
	this.exp = 0;
	// expMax is kept as a variable for display convenience.
	this.expMax = this.calculateExpMax();
	
	this.blueShards = 0;
	
	// Other Game value
	this.timeoutPointer;
}

Game.prototype.calculateExpMax = function() {
	return Math.floor(this.BASE_EXP_TO_LEVEL * Math.pow(this.GROWTH_EXP_TO_LEVEL, this.level));
}

Game.prototype.bodyMousemove = function() {
	this.addExp(this.MOUSE_MOVEMENT_EXP_GAIN);
}

Game.prototype.bodyClick = function() {
	this.addExp(this.MOUSE_CLICK_EXP_GAIN);
}

Game.prototype.addBlueShards = function(amount) {
	// Can't reduce it below 0.
	if (amount < 0 && this.blueShards < -amount){
		return;
	}
	this.blueShards += amount;
}

Game.prototype.addExp = function(amount) {
	if (amount <= 0){
		return;
	}
	this.exp += amount;
	while (this.exp >= this.expMax){
		this.exp -= this.expMax;
		this.levelUp();
		this.expMax = this.calculateExpMax();
	}
}

Game.prototype.levelUp = function() {
	this.level++;
	// Level specific unlocks would be handled here as well.
	this.addBlueShards(this.level * this.BLUE_SHARD_PER_LEVEL_GAIN);
}

Game.prototype.save = function() {
	var gameState = {
		'level': this.level,
		'exp': this.exp,
		'blueShards': this.blueShards,
		'version': '0.0.1a',
	}
	localStorage.setItem('save', JSON.stringify(gameState));
	console.log('Game Saved!');
}

Game.prototype.load = function() {
	var gameState = JSON.parse(localStorage.getItem('save'));
	if (!gameState){
		console.log("An error occurred during loading, most likely due to not having a save.");
		return;
	}
	if (gameState.level) this.level = gameState.level;
	if (gameState.exp) this.exp = gameState.exp;
	this.expMax = this.calculateExpMax();
	if (gameState.blueShards) this.blueShards = gameState.blueShards;
}

Game.prototype.uiTick = function () {
	var updateables = document.getElementsByClassName('updateable');
	for (var i = 0; i < updateables.length; i++){
		var updateable = updateables[i];
		updateable.value = this[updateable.attributes.from.value];
		updateable.innerHTML = this[updateable.attributes.from.value];
	}
}

function gameTick(game) {
	game.uiTick();
	
	game.timeoutPointer = setTimeout(gameTick, 33, game); // God Bless Functional Programming
}