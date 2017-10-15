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
	this.MOUSE_CLICK_EXP_GAIN = 10;
	this.BASE_EXP_TO_LEVEL = 100;
	this.GROWTH_EXP_TO_LEVEL = 1.2;
	
	// Game User Values 
	this.level = 0;
	this.exp = 0;
	// expMax is kept as a variable for display convenience.
	this.expMax = this.calculateExpMax();
	
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
}

Game.prototype.save = function() {
	
}

Game.prototype.load = function() {
	
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