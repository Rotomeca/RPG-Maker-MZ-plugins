//=============================================================================
// RotomecaCore.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V1.0.0) Divers commandes d'aide
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 *
 */

//=============================================================================
// ** Constantes
//=============================================================================


//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaCore = true;

var Rotomeca = Rotomeca || {}; 

//=============================================================================
// *** Rotomeca ***
//=============================================================================
Rotomeca.gettext = function gettext(text, plugin = null) {
	const params = !plugin ? Rotomeca.parameters : Rotomeca[plugin].parameters;

	return params[`LANG:${text}`] ?? text;
};

Rotomeca.lang_param = function lang_param(text, param, _default, plugin = null) {
	const params = !plugin ? Rotomeca.parameters : Rotomeca[plugin].parameters;

	return params[`${text}:${param}`] ?? _default;
};

Rotomeca.wait = async function wait(ms) {
    await new Promise((ok, nok) => {
        setTimeout(ok, ms);
    });
}

//=============================================================================
// *** Fonctions utiles ***
//=============================================================================
if (!window.isNullOrUndefined)
{
	/**
	 * Vérifie si une variable est null ou undefined.
	 * @param {*} obj Objet à vérifier 
	 * @returns {boolean} 
	 */
	window.isNullOrUndefined = function isNullOrUndefined(obj)
	{
		return !obj;
	}
}

if (!window.isEmpty)
{
	/**
	 * Vérifie si un objet est null, undefined ou égale à un string vide
	 * @param {*} obj Objet à vérifier
	 * @returns {boolean}
	 */
	window.isEmpty = function isEmpty(obj)
	{
		return isNullOrUndefined(obj) || obj === String.empty;
	}
}

if (!window.wait)
{
	/**
	 * @async Attend x milliseconds avant de continuer
	 * @param {number} ms Millisecondes 
	 */
	window.wait = async function wait(ms) {
		await Rotomeca.wait();
	}
}

if (isNullOrUndefined(String.empty)) 
{
	Object.defineProperty(String, 'empty', {
		enumerable: false,
		configurable: false,
		writable: false,
		value:''
	});
}

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

//=============================================================================
// *** StorageManager ***
//============================================================================= 
StorageManager.spriteExist = function (folder, fileName, ext = ".png") {
	const fs = require("fs");
	return fs.existsSync("img" + "\\" + folder + "\\" + fileName + ext);
};

//=============================================================================
// *** StorageManager ***
//=============================================================================
StorageManager.audioExist = function (folder, fileName, ext = ".ogg") {
	const fs = require("fs");
	return fs.existsSync("audio" + "\\" + folder + "\\" + fileName + ext);
};

//=============================================================================
// *** ImageManager ***
//=============================================================================
ImageManager.loadSprite = function (path, spriteName) {
	return this.loadBitmap("img/" + path, spriteName);
};

//=============================================================================
// *** Scene_Menu ***
//=============================================================================
Scene_Menu.prototype.base_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Rotomeca.triggerEvent('Scene_Menu.createCommandWindow.before', this);
	this.base_createCommandWindow();
	Rotomeca.triggerEvent('Scene_Menu.createCommandWindow.after', this, this._commandWindow);
};

const alias_rotomeca_PluginManager_callCommand = PluginManager.callCommand;
PluginManager.callCommand = function(self, pluginName, commandName, args) {
    if (Rotomeca.interpreter) Rotomeca.interpreter._eventId = self._eventId;// = Object.assign({}, self);
	alias_rotomeca_PluginManager_callCommand.call(this, self, pluginName, commandName, args);
	if (Rotomeca.interpreter) Rotomeca.interpreter._eventId = 0; 
};