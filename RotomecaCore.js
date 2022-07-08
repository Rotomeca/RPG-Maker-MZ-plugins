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


class RotomecaBaseClass
{
	constructor()
	{}
}

class RotomecaEnum extends RotomecaBaseClass
{
	constructor(json)
	{
		super();
		for (const key in json) {
			if (Object.hasOwnProperty.call(json, key)) {
				const element = json[key];
				Object.defineProperty(this, key, {
					enumerable: true,
					configurable: false,
					writable: false,
					value:element
				});
			}
		}
	}

	static createEnum(name, json)
	{
		if (RotomecaEnum.createEnum.enums === undefined) RotomecaEnum.createEnum.enums = {};
		
		if (RotomecaEnum.createEnum.enums[name] !== undefined) throw 'Already exist';
		else RotomecaEnum.createEnum.enums[name] = new RotomecaEnum(json);

		return RotomecaEnum.createEnum.enums[name];
	}

	static get(name) {
		return RotomecaEnum.createEnum.enums[name];
	}
}

class RotomecaItem extends RotomecaBaseClass
{
	constructor(itemId, itemType)
	{
		super();
		this.item_id = itemId;
		this.item_type = itemType;
	}

	isWeapon()
	{
		return this.item_type === RotomecaItem.itemTypes.w;
	}

	isArmor()
	{
		return this.item_type === RotomecaItem.itemTypes.a;
	}

	isItem()
	{
		return this.item_type === RotomecaItem.itemTypes.i;
	}

	get()
	{
		switch (this.item_type) {
			case RotomecaItem.itemTypes.w:
				return $dataWeapons[this.item_id];
			case RotomecaItem.itemTypes.a:
				return $dataArmors[this.item_id];			
			case RotomecaItem.itemTypes.i:
				return $dataItems[this.item_id];
			default:
				return null;
		}
	}

	_container()
	{
		if (this.isWeapon()) return $gameParty.allWeapons(false);//.filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id)).length >= this.number_required;
        else if (this.isArmor()) return $gameParty.allArmors(false);//.filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id)).length >= this.number_required;
        else if (this.isItem()) return $gameParty.allItems(false);//.filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id)).length >= this.number_required;
		return null;
	}
}

Object.defineProperty(RotomecaItem, 'itemTypes', {
	enumerable: false,
	configurable: false,
	writable: false,
	value:RotomecaEnum.createEnum('RotomecaItem.itemTypes', {
		w:'w',
		a:'a',
		i:'i'
	})
});

//=============================================================================
// *** RotomecaSprite_Gauge ***
//=============================================================================
function RotomecaSprite_Gauge() {
    this.initialize(...arguments);
}

RotomecaSprite_Gauge.prototype = Object.create(Sprite.prototype);
RotomecaSprite_Gauge.prototype.constructor = RotomecaSprite_Gauge;

RotomecaSprite_Gauge.prototype.initialize = function(x = 0, y = 0, width = 255, height = 12, maxVal = 0, val = 0) {
    Sprite.prototype.initialize.call(this, new Bitmap(width, height));
	this._gauge_w = 0;
	this._gauge_h = 0
	this._gauge_val = 0;
	this._gauge_MaxVal = 0;
	this._gauge_color_back = '#000';
	this._gauge_color_1 = '#fff';
	this._gauge_color_2 = this._gauge_color_1;
	return this.setup(x, y, width, height, maxVal, val);
};

RotomecaSprite_Gauge.prototype.setup = function(x, y, w, h, mv, v)
{
	this.bitmap = new Bitmap(w, h);
	this.move(x, y);
	this._gauge_w = w;
	this._gauge_h = h;
	this._gauge_MaxVal = mv;
	this._gauge_val = v;
	return this.redraw();
};

RotomecaSprite_Gauge.prototype.set_background_color = function(color)
{
	this._gauge_color_back = color;
	return this.redraw();
}

RotomecaSprite_Gauge.prototype.set_gauge_color_1 = function(color)
{
	this._gauge_color_1 = color;
	return this.redraw();
}

RotomecaSprite_Gauge.prototype.set_gauge_color_2 = function(color)
{
	this._gauge_color_2 = color;
	return this.redraw();
}

RotomecaSprite_Gauge.prototype.set_gauge_color = function(color)
{
	return this.set_gauge_color_1(color).set_gauge_color_2(color);
}

RotomecaSprite_Gauge.prototype.draw = function()
{
	this.drawGauge();
	//this._refresh();
	return this;
}

RotomecaSprite_Gauge.prototype.redraw = function() {
    this.bitmap.clear();
    return this.draw();
};

RotomecaSprite_Gauge.prototype.update_value = function(val)
{
	this._gauge_val = val;
	return this.redraw();
}

RotomecaSprite_Gauge.prototype.update_max_value = function(val)
{
	this._gauge_MaxVal = val;
	return this.redraw();
}

RotomecaSprite_Gauge.prototype.gaugeRate = function() {
	const value = this._gauge_val;
	const maxValue = this._gauge_MaxVal;
	return maxValue > 0 ? value / maxValue : 0;
};

RotomecaSprite_Gauge.prototype.drawGauge = function() {
    const gaugeX = 0;
    const gaugeY = 0;
    const gaugewidth = this._gauge_w;
    const gaugeHeight = this._gauge_h;
    this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
};

RotomecaSprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
    const rate = this.gaugeRate();
    const fillW = Math.floor((width - 2) * rate);
    const fillH = height - 2;
    const color0 = this._gauge_color_back;
    const color1 = this._gauge_color_1;
    const color2 = this._gauge_color_2;
    this.bitmap.fillRect(x, y, width, height, color0);
    this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
};

//=============================================================================
// *** Game_Party ***
//=============================================================================

Game_Party.prototype.allArmors = function(include_wear = true) {
    let armors = this.armors();

    if (include_wear){
        armors.push(...this.allMembers().flatMap(x => x._equips.filter((f, i) => f._dataClass === 'armor' && f._itemId !== 0)).map(x => x.object()));
        
    }

    return armors;
}

Game_Party.prototype.allWeapons = function(include_wear = true) {
    let weapons = this.weapons();

    if (include_wear){
        weapons.push(...this.allMembers().flatMap(x => x._equips.filter((f, i) => f._dataClass === 'weapon' && f._itemId !== 0)).map(x => x.object()));
    }

    return weapons;
}

//=============================================================================
// *** RotomecaAudioVisualizator ***
//=============================================================================
class RotomecaAudioVisualizator extends RotomecaBaseClass
{
	constructor(audio)
	{
		super();
		const position = audio.seek();
		Object.defineProperty(RotomecaAudioVisualizator.prototype, "position", {
			get: function() {
				return position;
			},
			configurable: true
		});
	}
}


//=============================================================================
// *** RotomecaSound ***
//=============================================================================
class RotomecaSound extends RotomecaBaseClass{
	constructor(path)
	{
		super();
		let splited_path = path.split('/');
		this.master_folder = splited_path[0];
		this.file = splited_path.pop();
		this.folder = splited_path.filter((x, i) => i > 0).join('/');

		for (const key in RotomecaSound.ext_accepted) {
			if (Object.hasOwnProperty.call(RotomecaSound.ext_accepted, key)) {
				const element = '.'+RotomecaSound.ext_accepted[key];

				if (this.exist(element)) 
				{
					path = `${path}${element}`;
					break;
				}
			}
		}

		this.audio = new WebAudio(path);
	}

	exist(ext = '.ogg')
	{
		return StorageManager.audioExist(this.folder, this.file, ext);
	}

	play(volume = null, loop = false, offset = 0)
	{
		if (!!volume) this.volume = volume;

		this.audio.play(loop, offset);
		return this;
	}

	isPlaying()
	{
		return this.audio.isPlaying();
	}

	position()
	{
		return new RotomecaAudioVisualizator(this.audio);
	}

	toAudio()
	{
		return this.audio;
	}

	destroy()
	{
		this.audio.destroy();
	}
}

/**
 * The volume of the audio.
 *
 * @type number
 * @name RotomecaSound#volume
 */
 Object.defineProperty(RotomecaSound.prototype, "volume", {
    get: function() {
        return this.audio.volume;
    },
    set: function(value) {
        this.audio.volume = value;
    },
    configurable: true
});

Object.defineProperty(RotomecaSound, 'ext_accepted', {
	enumerable: true,
	configurable: false,
	writable: false,
	value:['ogg', 'mp3', 'waw', 'midi']
});