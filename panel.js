/**
 * Panel is the class which the game uses to display the various mini-games.
 * Extend this prototype and <TODO: how to plug into main game?> plug into
 * main.js and it will be playable in game.
 */
function Panel () {
	/**
	 * tabName is the name that will be displayed in the tab which is pressed
	 * to switch to this panel.
	 */
	this.tabName = "";
	/**
	 * stateName is the name that will be used in the save object to store
	 * this panel's save state
	 */
	this.stateName = "";
	/**
	 * revealed is whether or not the panel should be visible to the player.
	 * This is for display in the shop, not for display in the tab row.
	 */
	this.revealed = false;
	/**
	 * isUnlocked is whether or not this panel has been unlocked. This defines
	 * if it can be displayed in the tab row and be accessed.
	 */
	this.isUnlocked = false;
}

/**
 * Panel.onSwitchTo should initialize the panel as if the player had just
 * switched to it.  Extensions of this function should call this function
 * first since it handles animations for the transition.
 *
 * Args:
 *    fromPanel: the Panel object which was previously active.
 * Returns:
 *    None
 */
Panel.prototype.onSwitchTo = function (fromPanel) {
	// TODO: animations
}

/**
 * Panel.onSwitchAway should clean up references within this panel.  This gets
 * called when the panel is no longer active, so any timeouts should be
 * destructed and the state should become suitable for idling if that is part
 * of the mini-games mechanics.
 *
 * Args:
 *    toPanel: the Panel object which is going to become active.
 * Returns:
 *    None
 */
Panel.prototype.onSwitchAway = function (toPanel) {}

/**
 * Panel.onDisplay should modify the provided panelElement to have this panel's
 * initial display.  This function should expect that panelElement's innerHTML
 * is empty and that it must fill all appropriate pieces in.
 *
 * Args:
 *    panelElement: an HTML Element which is this panel's display.
 * Returns:
 *    None
 */
Panel.prototype.onDisplay = function (panelElement) {
	
}

/**
 * Panel.onUpdate should update the panel's state based on the time which has
 * transpired since the last time this function was called.  The time delta is
 * passed to this function for convenience.  This function is not responsible
 * for updating the display (see Panel.onDisplayUpdate).  Panels should rely on
 * this function for updating state and should not create timeouts or intervals
 * of their own.
 *
 * Args:
 *    timeDelta: the time between this tick and the last tick.
 * Returns:
 *    None
 */
Panel.prototype.onUpdate = function (timeDelta) {
	
}

/**
 * Panel.onDisplayUpdate should update the panel's display based on the current
 * state and the time since the last time this function was called.  This
 * function should modify panelElement and expect it be already initialized.
 * The time delta is passed to this function for convenience.  This function is
 * not responsible for updating the panel's state (see Panel.onUpdate).  Panels
 * should rely on this function for updating display and should not create
 * timeouts or intervals of their own.  Because display is IO intensive, this
 * function may be throttled based on the browser's performance.  Implementers
 * should not expect this function to be called once for each call of onUpdate.
 *
 * Args:
 *    panelElement: the HTML Element which is this panel's display.
 *    timeDelta: the time between this tick and the last tick.
 * Returns:
 *    None
 */
Panel.prototype.onDisplayUpdate = function (panelElement, timeDelta) {
	
}

/**
 * Panel.canUnlock should return true when the game can unlock this panel and
 * false otherwise.  This function should not actually unlock the panel (see
 * Panel.unlock) and should only check that it can be unlocked.
 *
 * Args:
 *    game: the Game object which contains all the state information.
 * Returns:
 *    boolean: true if this panel can be unlocked, false otherwise.
 */
Panel.prototype.canUnlock = function (game) {
	return false;
}

/**
 * Panel.unlock should initialize this panel's state and subtract any unlocking
 * costs from game's state.  Extensions of this function should call this
 * function to ensure that isUnlocked is set correctly.
 *
 * Args:
 *    game: the Game object
 * Returns:
 *    None
 */
Panel.prototype.unlock = function (game) {
	this.isUnlocked = true;
}

/**
 * Panel.saveState returns an object whch holds all the data the needs to be 
 * saved.  The saved state will be put into the browser's local storage, so
 * there is a cap on how large the returned object can be.
 *
 * Args:
 * 	  None
 * Returns:
 *    An object to be used as a save state
 */
Panel.prototype.saveState = function () {
	
}

/**
 * Panel.load should use the information from loadState to generate the state
 * of a panel before save.  The information should be added to this.  Callers
 * of this function should not expect a new Panel object to be returned.
 *
 * Args:
 *    loadState: An object which is a panel's save state.
 * Returns:
 *    None
 */
Panel.prototype.load = function (loadState) {
	
}