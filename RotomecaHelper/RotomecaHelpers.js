//=============================================================================
// RotomecaHelpers.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Divers commandes d'aide
 * @author Rotomeca
 * @url 
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaHelpers = true;

var Rotomeca = Rotomeca || {}; 
	
//=============================================================================
// *** Rotomeca ***
//=============================================================================
Rotomeca.gettext = function gettext(text, plugin = null) {
	const params = plugin ? Rotomeca.parameters : Rotomeca[plugin].parameters;

	return params[`LANG:${text}`] ?? text;
};

Rotomeca.lang_param = function lang_param(text, param, _default, plugin = null) {
	const params = plugin ? Rotomeca.parameters : Rotomeca[plugin].parameters;

	return params[`${text}:${param}`] ?? _default;
};

//=============================================================================
// *** StorageManager ***
//=============================================================================
	
  
StorageManager.spriteExist = function (folder, fileName, ext = ".png") {
	const fs = require("fs");
	return fs.existsSync("img" + "\\" + folder + "\\" + fileName + ext);
};

//=============================================================================
// *** ImageManager ***
//=============================================================================

ImageManager.loadSprite = function (path, spriteName) {
	return this.loadBitmap("img/" + path, spriteName);
};
  
ImageManager.loadATBIcon = function(filename) {
	if (StorageManager.spriteExist('atb', filename)) return this.loadBitmap('img/atb/', filename, 0, true);
	else return this.loadBitmap('img/atb/', 'Face_Test', 0, true);
};	

//=============================================================================
// *** RotomecaEventManager ***
//=============================================================================

Rotomeca.addEventListener = function addEventListener(key, callback) {
	if (Rotomeca._events === undefined) Rotomeca._events = {};

	if (Rotomeca._events[key] === undefined) Rotomeca._events[key] = [];

	Rotomeca._events[key].push(callback);
}

Rotomeca.triggerEvent = function triggerEvent(key, ...args) {
	if (Rotomeca._events !== undefined && Rotomeca._events[key] !== undefined)
	{
		let array = [];

		for (let index = 0; index < Rotomeca._events[key].length; ++index) {
			const element = Rotomeca._events[key][index];
			array.push(element(...args));
		}

		if (array.length === 1) return array[0];
		else return array;
	}

	return undefined;
}

Scene_Menu.prototype.base_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Rotomeca.triggerEvent('Scene_Menu.createCommandWindow.before', this);
	this.base_createCommandWindow();
	Rotomeca.triggerEvent('Scene_Menu.createCommandWindow.after', this, this._commandWindow);
};