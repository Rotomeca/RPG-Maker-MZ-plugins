//=============================================================================
// RotomecaItemDurability.js
//=============================================================================
/*:fr
 * @target MZ
 * @plugindesc (V1.0.0) Permet d'avoir une durabilitée sur les armes et armures
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaUniqueItems
 * @orderAfter MOG_BattleCamera
 * @orderAfter RotomecaCore
 * @orderAfter RotomecaUniqueItems
 * 
 * @param durability_default
 * @text Durabilitée par défaut
 * @desc Durabilitée par défaut si appelé par les différentes commandes sans durabilitée dans les notes
 * @default 1
 * @type number
 * @min 1
 * 
 * @param broken_file
 * @text Audio quand brisé
 * @desc Fichier audio qui sera joué lorsqu'une arme ou une armure se brise.
 * @default audio/se/Break
 * @type file
 * 
 * @param ----LANG---
 * @text 
 * @desc 
 * @default
 * @type string
 * 
 * @param LANG:BROKEN
 * @text LANG:BROKEN
 * @desc Texte affiché quand une arme ou une armure se brise. (%1 = Nom de l'objet)
 * @default %1 se brise !
 * @type string
 * 
 * @command get_durability_armor
 * @desc Ajoute à l'équipe une armure avec une durabilitée réduite ou différente de l'originale.
 * @text Obtenir une armure
 * 
 * @arg from
 * @text Armure cible
 * @desc Armure qui aura une durabilitée modifiée.
 * @type armor
 * @default 1
 * 
 * @arg durability
 * @text Durabilitée
 * @desc Valeur de la durabilitée
 * @type number
 * @default 1
 * @min 1
 * 
 * @arg update_max
 * @text Changer la durabilitée maximum
 * @desc -1 pour auto, 0 pour non, sinon, valeur de la nouvelle durabilitée
 * @type number
 * @default 0
 * @min -1
 * 
 * @command get_durability_weapon
 * @desc Ajoute à l'équipe une arme avec une durabilitée réduite ou différente de l'originale.
 * @text Obtenir une arme
 * 
 * @arg from
 * @text Arme cible
 * @desc Arme qui aura une durabilitée modifiée.
 * @type weapon
 * @default 1
 * 
 * @arg durability
 * @text Durabilitée
 * @desc Valeur de la durabilitée
 * @type number
 * @default 1
 * @min 1
 * 
 * @arg update_max
 * @text Changer la durabilitée maximum
 * @desc -1 pour auto, 0 pour non, sinon, valeur de la nouvelle durabilitée
 * @type number
 * @default 0
 * @min -1
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Item Durability ###
 * Author   -   Rotomeca
 * Version  -   1.0.0
 * Updated  -   05/04/2022
 * =============================================================================
 * Permet d'ajouter une durabilitée aux armes ou aux armures.
 * Dans les notes d'une arme ou d'une armure, ajoutez : 
 * <durability:x>
 * Remplacez x par une valeur.
 * Ex : <durability:500>
 * 
 * Pour obtenir un objet quand l'objet se casse, vous pouvez ajouter : 
 * <getItemWhenBroken:y/x>
 * Replacez y par : 
 *  - w pour les armes,
 *  - a pour les armures,
 *  - i pour les objets
 * Remplacez x pour l'index de l'objet (objet/arme/armure) souhaité.
 * Ex : <getItemWhenBroken:w/1>
 * 
 * Une arme perd de la durabilitée lorsqu'elle utilise une compétence physique sur un ennemi.
 * Une armure perd de la durabilitée si elle reçoit un coups physique.
 * Si un personnage reçoit une attaque magique, l'accessoire perd forcément en durabilitée, les autres armures peuvent perdre 1 point de durabilitée (1 chance sur 2)
 * 
 * Vous pouvez créer des durabilitée spéciales avec les commandes 
 * get_durability_armor et get_durability_weapon.
 * 
 * Pour modifier la valeur d'une arme ou d'un objet dans votre inventaire ou équipé, 
 * utilisez le plugin RotomecaCrafting&Blacksmith ou implémentez votre propre plugin. 
 * 
 * A faire :
 * Traduction anglaise
 * 
 */
/*:
 * @target MZ
 * @plugindesc (V1.0.0) Permet d'avoir une durabilitée sur les armes et armures
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaUniqueItems
 * @orderAfter MOG_BattleCamera
 * @orderAfter RotomecaCore
 * @orderAfter RotomecaUniqueItems
 * 
 * @param durability_default
 * @text Durabilitée par défaut
 * @desc Durabilitée par défaut si appelé par les différentes commandes sans durabilitée dans les notes
 * @default 1
 * @type number
 * @min 1
 * 
 * @param broken_file
 * @text Audio quand brisé
 * @desc Fichier audio qui sera joué lorsqu'une arme ou une armure se brise.
 * @default audio/se/Break
 * @type file
 * 
 * @param ----LANG---
 * @text 
 * @desc 
 * @default
 * @type string
 * 
 * @param LANG:BROKEN
 * @text LANG:BROKEN
 * @desc Texte affiché quand une arme ou une armure se brise. (%1 = Nom de l'objet)
 * @default %1 se brise !
 * @type string
 * 
 * @command get_durability_armor
 * @desc Ajoute à l'équipe une armure avec une durabilitée réduite ou différente de l'originale.
 * @text Obtenir une armure
 * 
 * @arg from
 * @text Armure cible
 * @desc Armure qui aura une durabilitée modifiée.
 * @type armor
 * @default 1
 * 
 * @arg durability
 * @text Durabilitée
 * @desc Valeur de la durabilitée
 * @type number
 * @default 1
 * @min 1
 * 
 * @arg update_max
 * @text Changer la durabilitée maximum
 * @desc -1 pour auto, 0 pour non, sinon, valeur de la nouvelle durabilitée
 * @type number
 * @default 0
 * @min -1
 * 
 * @command get_durability_weapon
 * @desc Ajoute à l'équipe une arme avec une durabilitée réduite ou différente de l'originale.
 * @text Obtenir une arme
 * 
 * @arg from
 * @text Arme cible
 * @desc Arme qui aura une durabilitée modifiée.
 * @type weapon
 * @default 1
 * 
 * @arg durability
 * @text Durabilitée
 * @desc Valeur de la durabilitée
 * @type number
 * @default 1
 * @min 1
 * 
 * @arg update_max
 * @text Changer la durabilitée maximum
 * @desc -1 pour auto, 0 pour non, sinon, valeur de la nouvelle durabilitée
 * @type number
 * @default 0
 * @min -1
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Item Durability ###
 * Author   -   Rotomeca
 * Version  -   1.0.0
 * Updated  -   05/04/2022
 * =============================================================================
 * Permet d'ajouter une durabilitée aux armes ou aux armures.
 * Dans les notes d'une arme ou d'une armure, ajoutez : 
 * <durability:x>
 * Remplacez x par une valeur.
 * Ex : <durability:500>
 * 
 * Pour obtenir un objet quand l'objet se casse, vous pouvez ajouter : 
 * <getItemWhenBroken:y/x>
 * Replacez y par : 
 *  - w pour les armes,
 *  - a pour les armures,
 *  - i pour les objets
 * Remplacez x pour l'index de l'objet (objet/arme/armure) souhaité.
 * Ex : <getItemWhenBroken:w/1>
 * 
 * Une arme perd de la durabilitée lorsqu'elle utilise une compétence physique sur un ennemi.
 * Une armure perd de la durabilitée si elle reçoit un coups physique.
 * Si un personnage reçoit une attaque magique, l'accessoire perd forcément en durabilitée, les autres armures peuvent perdre 1 point de durabilitée (1 chance sur 2)
 * 
 * Vous pouvez créer des durabilitée spéciales avec les commandes 
 * get_durability_armor et get_durability_weapon.
 * 
 * Pour modifier la valeur d'une arme ou d'un objet dans votre inventaire ou équipé, 
 * utilisez le plugin RotomecaCrafting&Blacksmith ou implémentez votre propre plugin. 
 * 
 * To do :
 * English translation
 * 
 */

//=============================================================================
// ** Constantes
//=============================================================================
const r_rid_plugin_name = 'RotomecaItemDurability';

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaItemDurability = true;

var Rotomeca = Rotomeca || {}; 

/**
 * Permet d'utiliser les commandes de Rpg Maker MZ
 * @type {Game_Interpreter}
 */
Rotomeca.interpreter = Rotomeca.interpreter || new Game_Interpreter();
/**
 * Paramètres ou divers variables globales du plugin
 */
Rotomeca.RotomecaItemDurability = {}
/**
 * Paramètres du plugin
 */
Rotomeca.RotomecaItemDurability.parameters = PluginManager.parameters(r_rid_plugin_name);

//=============================================================================
// **  PluginManager **
//=============================================================================	
PluginManager.registerCommand(r_rid_plugin_name, 'get_durability_armor', data => {
    Rotomeca.RotomecaItemDurability.addItemDurabilityToParty(0, data);
});	

PluginManager.registerCommand(r_rid_plugin_name, 'get_durability_weapon', data => {
    Rotomeca.RotomecaItemDurability.addItemDurabilityToParty(1, data);
});	

//=============================================================================
// **  Rotomeca.RotomecaItemDurability **
//=============================================================================	
/**
 * Récupère les données de langue pour ce plugin
 * @param {string} text Clé
 * @returns {string} Texte récupérer depuis les paramètres du plugin
 */
Rotomeca.RotomecaItemDurability.gettext = function gettext(text) {
    return Rotomeca.gettext(text, r_rid_plugin_name);
}

/**
 * Récupère les paramètres de langue pour ce plugin
 * @param {string} text Clé
 * @param {string} param Clé du paramètre
 * @returns {string} valeur récupérée depuis les paramètres du plugin
 */
Rotomeca.RotomecaItemDurability.lang_param = function lang_param(text, param) {
    return Rotomeca.lang_param(text, param, false, r_rid_plugin_name);
}

Rotomeca.RotomecaItemDurability.createItemWithDurability = function ciwd(type, item, durability, changeMaximum = false) {
    const isId = typeof  item === "number";
    let returned;

    switch (type) {
        case 0: //armor
        item = (!isId ? item : $dataArmors[item]);
        returned = $createUniqueArmor(item);
        break;

        case 1: //weapon
        item = (!isId ? item : $dataWeapons[item]);
        returned = $createUniqueWeapon(item);
        break;
    
        default:
            break;
    }

    const default_durability = item.note.includes('<durability:') ? item.note.split('<durability:')[1].split('>')[0].replaceAll(' ', '') : Rotomeca.RotomecaItemDurability.parameters.durability_default;
    returned = new UniqueItemDurability(returned, parseInt(default_durability));

    if (changeMaximum) returned.updateMax(durability);

    return returned.set(durability);
};

Rotomeca.RotomecaItemDurability.addItemDurabilityToParty = function aidtp(type, data) {
    data.from = parseInt(data.from);
    data.durability = parseInt(data.durability);
    data.update_max = parseInt(data.update_max);

    let item = Rotomeca.RotomecaItemDurability.createItemWithDurability(type, data.from, data.durability, data.update_max !== 0);
    item.durability_already_generated = true;

    if (data.update_max > 0) item.updateMax(data.update_max); 

    switch (type) {
        case 0: //weapon
            Rotomeca.interpreter.command128([item.id(), 0, 0, 1]);
            break;
        case 1: //weapon
            Rotomeca.interpreter.command127([item.id(), 0, 0, 1]);
            break;
    
        default:
            break;
    }

    return item;
};

Rotomeca.RotomecaItemDurability.broken = function(index, itemBroken, actor)
{
    if (StorageManager.audioExist('se', 'Break'))
    {
        let audio = new WebAudio('audio\\se\\Break.ogg');
        audio.play(false, 0);
    }
    $gameActors.actor(actor._actorId).forceChangeEquip(index, null);

    this.getItemWhenBroken(itemBroken);

    const text = Rotomeca.RotomecaItemDurability.gettext('BROKEN').replaceAll('%1', itemBroken.default_name);
    if (Imported.MOG_BattleCamera === true)
        SceneManager._scene._spriteset.createBrokenIndicator(text, SceneManager._scene._spriteset._actorSprites[actor._actorId-1].x - SceneManager._scene._spriteset._actorSprites[actor._actorId-1].width + $gameTemp._bcamPos[0], SceneManager._scene._spriteset._actorSprites[actor._actorId-1].y - SceneManager._scene._spriteset._actorSprites[actor._actorId-1].height  + $gameTemp._bcamPos[1]);
    else 
        SceneManager._scene._spriteset.createBrokenIndicator(text, SceneManager._scene._spriteset._actorSprites[actor._actorId-1].x - SceneManager._scene._spriteset._actorSprites[actor._actorId-1].width, SceneManager._scene._spriteset._actorSprites[actor._actorId-1].y - SceneManager._scene._spriteset._actorSprites[actor._actorId-1].height);
};

Rotomeca.RotomecaItemDurability.getItemWhenBroken = function(item) {
    if (!!item && !!item.note && item.note.includes('<getItemWhenBroken'))
    {
        let brokenDatas = new BrokenReward(item.note.split('<getItemWhenBroken:')[1].split('>')[0]);

        $gameParty.gainItem(brokenDatas.get(), 1, false);

        return brokenDatas;
    }

    return null;
};

//=============================================================================
// **  BrokenReward **
//=============================================================================	
class BrokenReward
{
    constructor(str)
    {
        str = str.split('/');
        this.type = str[0];
        this.index = parseInt(str[1]);
    }

    isWeapon(){
        return this.type === 'w';
    }

    isArmor(){
        return this.type === 'a';
    }

    isItem(){
        return this.type === 'i';
    }

    get()
    {
        if (this.isWeapon()) return $dataWeapons[this.index];
        else if (this.isArmor()) return $dataArmors[this.index];
        else if (this.isItem()) return $dataItems[this.index];

        return null;
    }
}

//=============================================================================
// **  UniqueItemDurability **
//=============================================================================	
class UniqueItemDurability extends UniqueItem
{
    constructor(from, durability)
    {
        super(from);
        this.durability_max = durability;
        this.durability = this.durability_max;
        Object.defineProperty(this, 'haveDurability', {
            enumerable: true,
            configurable: true,
            writable: false,
            value:true
        });
        const item = this._data.object();
        this.default_name = item.default_name ?? item.name;
    }

    _stabilize()
    {
        if (this.durability > this.durability_max) this.durability = this.durability_max;
        else if (this.durability < 0) this.durability = 0;
        return this;
    }

    update(){
        this.name = `${this.default_name} ${this.durability}/${this.durability_max}`;
        return super.update();
    }

    set(durability)
    {
        this.durability = durability;
        return this._stabilize().update();
    }

    changeName(newName) {
        this.name = newName;
        this.default_name = this.name;
        return this;
    }

    add(durability)
    {
        this.durability += durability;
        return this._stabilize().update();
    }

    remove(durability)
    {
        return this.add(-durability);
    }

    updateMax(newMax)
    {
        this.durability_max = newMax;
        return this._stabilize().update();
    }

    restore()
    {
        this.durability = this.durability_max;
        return this._stabilize().update();
    }

    isBroken()
    {
        return this.durability <= 0;
    }
}

//=============================================================================
// **  Game_Party **
//=============================================================================	
const alias_rotomeca_Game_Party_prototype_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (item, amount, includeEquip)
{
    if (!!item && !!item.note && item.note.includes('<durability:') && !(new Game_Item(item).haveDurability()) && item.durability_already_generated === undefined) {
        for (let index = 0; index < amount; ++index) {
            let game_item;

            if (DataManager.isWeapon(item)) {
                game_item = $createUniqueWeapon(item);
            } else if (DataManager.isArmor(item)) {
                game_item = $createUniqueArmor(item);
            }
            else
            {
                alias_rotomeca_Game_Party_prototype_gainItem.call(this, item, amount, includeEquip);
                break;
            }

            item = new UniqueItemDurability(game_item, parseInt(item.note.split('<durability:')[1].split('>')[0].replaceAll(' ', ''))).object();

            alias_rotomeca_Game_Party_prototype_gainItem.call(this, item, 1, includeEquip);
        }
    }
    else alias_rotomeca_Game_Party_prototype_gainItem.call(this, item, amount, includeEquip);
}

//=============================================================================
// **  Game_Item **
//=============================================================================	
Game_Item.prototype.haveDurability = function hd()
{
    return !!(this.object()?.haveDurability);
};

Game_Item.prototype.isDurabilityItemBase = function idib()
{
    return (this.object()?.note?.includes('<durability:') ?? false) && !this.haveDurability();
};

//=============================================================================
// **  Game_ItemDurability **
//=============================================================================	
function Game_ItemDurability() {
    this.initialize(...arguments);
}

Game_ItemDurability.prototype = Object.create(Game_ItemUnique.prototype);
Game_ItemDurability.prototype.constructor = Game_ItemDurability;

Game_ItemDurability.prototype.initialize = function(item) {
    Game_ItemUnique.prototype.initialize.call(this, item);
};

Game_ItemDurability.prototype.haveDurability = function hd()
{
    return true;
};

Game_ItemDurability.prototype.getItemDurability = function()
{
    const object = this.object();
    let item = new UniqueItemDurability(this, object.durability_max);
    item.durability = object.durability;
    return item;
};

//=============================================================================
// **  Game_Actor **
//=============================================================================	
const alias_rotomeca_Game_Actor_prototype_initEquips = Game_Actor.prototype.initEquips;
Game_Actor.prototype.initEquips = function(...args)
{
    alias_rotomeca_Game_Actor_prototype_initEquips.call(this, ...args);
    this.initDurability();
}

Game_Actor.prototype.initDurability = function(){
    let durabilityItem;
    for (let index = 0; index < this._equips.length; ++index) {
        const element = this._equips[index];

        if (element.isDurabilityItemBase())
        {            
            if (element.isWeapon())
                durabilityItem = Rotomeca.RotomecaItemDurability.createItemWithDurability(1, element.object(), Number.POSITIVE_INFINITY, false);
            else if (element.isArmor())
                durabilityItem = Rotomeca.RotomecaItemDurability.createItemWithDurability(0, element.object(), Number.POSITIVE_INFINITY, false);
            else
                continue;
            this.forceChangeEquip(index, null);
            this.forceChangeEquip(index, durabilityItem.object());
        }
        
    }
};

//=============================================================================
// **  BattleManager **
//=============================================================================	
const alias_rotomecva_Game_Actor_prototype_performActionEnd = BattleManager.invokeAction;
BattleManager.invokeAction = function(...args)
{
    alias_rotomecva_Game_Actor_prototype_performActionEnd.call(this, ...args);
    const action = this._action;
    const result = args[1].result();
    if (result.success)
    {
        if (args[0].isActor() && args[1].isEnemy() && action._item._dataClass === 'skill' && $dataSkills[action._item._itemId].hitType === 1)
        {
            for (let index = 0; index < args[0]._equips.length; ++index) {
                const element = args[0]._equips[index];
                if (element.isWeapon() && element.haveDurability())
                {
                    const tmp = new Game_ItemDurability(element.object());//new UniqueItemDurability(element)
                    const item = tmp.getItemDurability().remove(1);
                    if (item.isBroken())
                    {
                        Rotomeca.RotomecaItemDurability.broken(index, item.object(), args[0]);
                    }
                    break;
                }
            }
        }
        else if (args[0].isEnemy() && args[1].isActor()) {
            if ($dataSkills[action._item._itemId].hitType === 1)
            {
                for (let index = 0; index < args[1]._equips.length; ++index) {
                    const element = args[1]._equips[index];
                    if (element.isArmor() && element.haveDurability())
                    {
                        const tmp = new Game_ItemDurability(element.object());//new UniqueItemDurability(element)
                        const item = tmp.getItemDurability().remove(1);
                        if (item.isBroken())
                        {
                            Rotomeca.RotomecaItemDurability.broken(index, item.object(), args[1]);
                        }
                        break;
                    }
                }
            }
            else {
                for (let index = args[1]._equips.length - 1; index >= 0; --index) {
                    const element = args[1]._equips[index];
                    const element_object = element.object();
                    if (element.isArmor() && element.haveDurability())
                    {
                        if (element_object.etypeId === 5 || Math.randomInt(2) === 1)
                        {
                            const tmp = new Game_ItemDurability(element.object());
                            const item = tmp.getItemDurability().remove(1);
                            if (item.isBroken())
                            {
                                Rotomeca.RotomecaItemDurability.broken(index, item.object(), args[1]);
                            }

                            if (element_object.etypeId !== 5) break;
                        }
                    }
                }
            }
        }
    }

};

//=============================================================================
// **  Spriteset_Battle **
//=============================================================================	
Spriteset_Battle.prototype.createBrokenIndicator = function(name, x, y) {
    if (!this._indicators) this._indicators = [];
    this._indicators.push(new BrokenIndicator(name, x, y));
    this._indicators[this._indicators.length - 1].z = 100;
    this._indicators[this._indicators.length - 1]._refresh();
	this.addChild(this._indicators[this._indicators.length - 1]);
};

const alias_rotomeca_Spriteset_Battle_prototype_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function()
{
    alias_rotomeca_Spriteset_Battle_prototype_update.call(this);

    if (!!this._indicators)
    {
        let elementsToDelete = [];
        for (let index = 0; index < this._indicators.length; ++index) {
            const element = this._indicators[index];
            element._refresh();
            if (element._finished) elementsToDelete.push(element);
        }

        for (let index = 0; index < elementsToDelete.length; ++index) {
            const element = elementsToDelete[index];
            this.removeChild(element);
        }
    }
}

//=============================================================================
// **  BrokenIndicator **
//=============================================================================	
function BrokenIndicator() {
    this.initialize.apply(this, arguments);
};

BrokenIndicator.prototype = Object.create(Sprite.prototype);
BrokenIndicator.prototype.constructor = BrokenIndicator;

BrokenIndicator.prototype.initialize = function(itemName, poz_x, poz_y)
{
    Sprite.prototype.initialize.call(this);
    this._item_name = itemName;
    this._started = false;
    this._finished = false;
    this._it = 0;
    this._moved = false;
    this.createName();
    this.move(poz_x, poz_y);
}

BrokenIndicator.prototype.createName = function() {
	this._name = new Sprite(new Bitmap(150,32));
	this._name.x = ImageManager.iconWidth + 4;
	this._name.bitmap.fontSize = $gameSystem.mainFontSize();
	this.addChild(this._name);
};

BrokenIndicator.prototype.refreshName = function() {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this._item_name,0,0,145,32);
    if (!this._moved){
        this.move(this.x - this._name.bitmap.measureTextWidth(), this.y),
        this._moved = true;
    }
};

BrokenIndicator.prototype._refresh = function ()
{
    if (this._finished) return;

    Sprite.prototype._refresh.call(this);
    this.refreshName();
    if (!this._started) this._started = true;
    else if (this._started)
    {
        this.move(this.x, this.y - 1);
        
        if (this._it >= 5)
        {
            this.opacity -= 5;

            if (this.opacity <= 0) this._finished = true;
        }
        else ++this._it;
    }
}