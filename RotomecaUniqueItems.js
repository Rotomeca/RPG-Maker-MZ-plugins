//=============================================================================
// RotomecaUniqueItems.js
//=============================================================================
/*:fr
 * @target MZ
 * @plugindesc (V2.0.0) Permet d'avoir des objets (objets, armures, équipements) unique.
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaCore
 * @orderAfter RotomecaCore
 * 
 * @param item_start_id
 * @text Index de départ des objets
 * @desc Index à partir duquel les objets uniques vont commencer (-1 : à partir de la fin de la bdd, n'autorise pas les updates et les dlc car ça va écraser l'éxistant)
 * @default 5000
 * @type number
 * 
 * @param weapon_start_id
 * @text Index de départ des armes
 * @desc Index à partir duquel les armes uniques vont commencer (-1 : à partir de la fin de la bdd, n'autorise pas les updates et les dlc car ça va écraser l'éxistant)
 * @default 5000
 * @type number
 * 
 * @param armor_start_id
 * @text Index de départ des armures
 * @desc Index à partir duquel les armures uniques vont commencer (-1 : à partir de la fin de la bdd, n'autorise pas les updates et les dlc car ça va écraser l'éxistant)
 * @default 5000
 * @type number
 * 
 * @command create_unique_item
 * @desc Créer un objet unique, et stocke son id dans une variable.
 * @text Créer un objet unique
 * 
 * @arg from
 * @text Objet cible
 * @desc Objet qui sera 'cloné' et qui sera donc modifiable.
 * @type item
 * @default 1
 * 
 * @arg id
 * @text Variable de jeu
 * @desc Variable qui stockera l'id de l'objet dupliqué.
 * @type variable
 * @default 1
 * 
 * @command create_unique_armor
 * @desc Créer une armure unique, et stocke son id dans une variable.
 * @text Créer une armure unique
 * 
 * @arg from
 * @text Armure cible
 * @desc Armure qui sera 'clonée' et qui sera donc modifiable.
 * @type armor
 * @default 1
 * 
 * @arg id
 * @text Variable de jeu
 * @desc Variable qui stockera l'id de l'armure dupliquée.
 * @type variable
 * @default 1
 * 
 * @command create_unique_weapon
 * @desc Créer une arme unique, et stocke son id dans une variable.
 * @text Créer une arme unique
 * 
 * @arg from
 * @text Arme cible
 * @desc Arme qui sera 'clonée' et qui sera donc modifiable.
 * @type weapon
 * @default 1
 * 
 * @arg id
 * @text Variable de jeu
 * @desc Variable qui stockera l'id de l'arme dupliquée.
 * @type variable
 * @default 1
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Unique Items ###
 * Author   -   Rotomeca
 * Version  -   1.0.0
 * Updated  -   13/04/2022
 * =============================================================================
 * 
 * Plugin qui permet la création d'objets unique et donc modifiable dynamiquement.
 * 
 * A Faire : traduction anglaise
 * 
 */

/*:
 * @target MZ
 * @plugindesc (V2.0.0) Permet d'avoir des objets (objets, armures, équipements) unique.
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaCore
 * @orderAfter RotomecaCore
 * 
 * @param item_start_id
 * @text Index de départ des objets
 * @desc Index à partir duquel les objets uniques vont commencer (-1 : à partir de la fin de la bdd, n'autorise pas les updates et les dlc car ça va écraser l'éxistant)
 * @default 5000
 * @type number
 * 
 * @param weapon_start_id
 * @text Index de départ des armes
 * @desc Index à partir duquel les armes uniques vont commencer (-1 : à partir de la fin de la bdd, n'autorise pas les updates et les dlc car ça va écraser l'éxistant)
 * @default 5000
 * @type number
 * 
 * @param armor_start_id
 * @text Index de départ des armures
 * @desc Index à partir duquel les armures uniques vont commencer (-1 : à partir de la fin de la bdd, n'autorise pas les updates et les dlc car ça va écraser l'éxistant)
 * @default 5000
 * @type number
 * 
 * @command create_unique_item
 * @desc Créer un objet unique, et stocke son id dans une variable.
 * @text Créer un objet unique
 * 
 * @arg from
 * @text Objet cible
 * @desc Objet qui sera 'cloné' et qui sera donc modifiable.
 * @type item
 * @default 1
 * 
 * @arg id
 * @text Variable de jeu
 * @desc Variable qui stockera l'id de l'objet dupliqué.
 * @type variable
 * @default 1
 * 
 * @command create_unique_armor
 * @desc Créer une armure unique, et stocke son id dans une variable.
 * @text Créer une armure unique
 * 
 * @arg from
 * @text Armure cible
 * @desc Armure qui sera 'clonée' et qui sera donc modifiable.
 * @type armor
 * @default 1
 * 
 * @arg id
 * @text Variable de jeu
 * @desc Variable qui stockera l'id de l'armure dupliquée.
 * @type variable
 * @default 1
 * 
 * @command create_unique_weapon
 * @desc Créer une arme unique, et stocke son id dans une variable.
 * @text Créer une arme unique
 * 
 * @arg from
 * @text Arme cible
 * @desc Arme qui sera 'clonée' et qui sera donc modifiable.
 * @type weapon
 * @default 1
 * 
 * @arg id
 * @text Variable de jeu
 * @desc Variable qui stockera l'id de l'arme dupliquée.
 * @type variable
 * @default 1
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Unique Items ###
 * Author   -   Rotomeca
 * Version  -   1.0.0
 * Updated  -   13/04/2022
 * =============================================================================
 * 
 * Plugin qui permet la création d'objets unique et donc modifiable dynamiquement.
 * TODO : English translation
 * 
 */



//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaUniqueItems = true;

var Rotomeca = Rotomeca || {}; 

(() => {
    //=============================================================================
    // ** Constantes
    //=============================================================================
    const r_rui_plugin_name = 'RotomecaUniqueItems';
    const r_rui_armor_text = 'armor';
    const r_rui_weapon_text = 'weapon';
    const r_rui_item_text = 'item';
    const r_rui_command_create_unique_item = 'create_unique_item';
    const r_rui_command_create_unique_armor = 'create_unique_armor';
    const r_rui_command_create_unique_weapon = 'create_unique_weapon';
    const r_rui_unique_is_unique = 'is_unique';
    const r_rui_unique_parent_id = 'parent_id';
    const r_rui_unique__datas = '_data';

    //=============================================================================
    // ** PLUGIN PARAMETERS
    //=============================================================================
    /**
     * Permet d'utiliser les commandes de Rpg Maker MZ
     * @type {Game_Interpreter}
     */
    Rotomeca.interpreter = Rotomeca.interpreter || new Game_Interpreter();
    /**
     * Paramètres ou divers variables globales du plugin
     */
    Rotomeca.RotomecaUniqueItems = {}
    /**
     * Paramètres du plugin
     */
    Rotomeca.RotomecaUniqueItems.parameters = PluginManager.parameters(r_rui_plugin_name);

    //=============================================================================
    // **  Rotomeca.RotomecaUniqueItems **
    //=============================================================================	
    /**
     * Récupère les données de langue pour ce plugin
     * @param {string} text Clé
     * @returns {string} Texte récupérer depuis les paramètres du plugin
     */
    Rotomeca.RotomecaUniqueItems.gettext = function gettext(text) {
        return Rotomeca.gettext(text, r_rui_plugin_name);
    }

    /**
     * Récupère les paramètres de langue pour ce plugin
     * @param {string} text Clé
     * @param {string} param Clé du paramètre
     * @returns {string} valeur récupérée depuis les paramètres du plugin
     */
    Rotomeca.RotomecaUniqueItems.lang_param = function lang_param(text, param) {
        return Rotomeca.lang_param(text, param, false, r_rui_plugin_name);
    }

    //=============================================================================
    // **  ScriptingHelper **
    //=============================================================================	
    Rotomeca.RotomecaUniqueItems._get_unique_id = function(starting_id, $data)
    {
        starting_id = parseInt(starting_id);
        if (starting_id === -1)
        {
            return $data.length;
        }
        else {
            if ($data.length < starting_id) return starting_id;

            for (index = starting_id; index <= $data.length; ++index) {
                const element = $data[index];
                if (element === undefined) return index;     
            }  
        }
            
    };

    Rotomeca.RotomecaUniqueItems.get_unique_id = function (type) {
        switch (type) {
            case r_rui_armor_text:
                return this._get_unique_id(Rotomeca.RotomecaUniqueItems.parameters.armor_start_id, $dataArmors);
            case r_rui_weapon_text:
                return this._get_unique_id(Rotomeca.RotomecaUniqueItems.parameters.weapon_start_id, $dataWeapons);
            case r_rui_item_text:
                return this._get_unique_id(Rotomeca.RotomecaUniqueItems.parameters.item_start_id, $dataItems);
        
            default:
                break;
        }
    };

    Rotomeca.RotomecaUniqueItems.create_unique_item = function(from, type)
    {    
        let isId = false;

        if (typeof from === 'number') isId = true;

        let item;
        let id = this.get_unique_id(type);
        switch (type) {
            case r_rui_armor_text:
                item = new Game_ItemUnique(isId ? $dataArmors[from] : from);
                $dataArmors[id] = item.object(id);
                break;
        
            case r_rui_weapon_text:
                item = new Game_ItemUnique(isId ? $dataWeapons[from] : from);
                $dataWeapons[id] = item.object(id);
                break;

            case r_rui_item_text:
                item = new Game_ItemUnique(isId ? $dataItems[from] : from);
                $dataItems[id] = item.object(id);
                break;

            default:
                break;
        }

        item._itemId = id;
        return item;
    };

    function $createUniqueItem(item) {
        return Rotomeca.RotomecaUniqueItems.create_unique_item(item, r_rui_item_text);
    }

    function $createUniqueWeapon(item) {
        return Rotomeca.RotomecaUniqueItems.create_unique_item(item, r_rui_weapon_text);
    }

    function $createUniqueArmor(item) {
        return Rotomeca.RotomecaUniqueItems.create_unique_item(item, r_rui_armor_text);
    }

    //=============================================================================
    // **  PluginManager **
    //=============================================================================	
    PluginManager.registerCommand(r_rui_plugin_name, r_rui_command_create_unique_item, data => {
        const tmp = $createUniqueItem(data.from);
        $gameVariables[data.id] = tmp._itemId;
    });	

    PluginManager.registerCommand(r_rui_plugin_name, r_rui_command_create_unique_armor, data => {
        const tmp = $createUniqueArmor(data.from);
        $gameVariables[data.id] = tmp._itemId;
    });

    PluginManager.registerCommand(r_rui_plugin_name, r_rui_command_create_unique_weapon, data => {
        const tmp = $createUniqueWeapon(data.from);
        $gameVariables[data.id] = tmp._itemId;
    });

    //=============================================================================
    // **  Game_Item **
    //=============================================================================	

    const alias_rotomeca_Game_Item_prototype_initialize = Game_Item.prototype.initialize;
    Game_Item.prototype.initialize = function(...args)
    {
        alias_rotomeca_Game_Item_prototype_initialize.call(this, ...args);
        if (typeof this._itemId === 'string') this._itemId = parseInt(this._itemId);
    }

    Game_Item.prototype.isUniqueItem = function iut()
    {
        return !!this.object().is_unique;
    };

    //=============================================================================
    // **  Game_ItemUnique **
    //=============================================================================	
    function Game_ItemUnique() {
        this.initialize(...arguments);
    }

    Game_ItemUnique.prototype = Object.create(Game_Item.prototype);
    Game_ItemUnique.prototype.constructor = Game_ItemUnique;

    Game_ItemUnique.prototype.initialize = function(item) {
        Game_Item.prototype.initialize.call(this, item);

        Object.defineProperty(this, r_rui_unique_is_unique, {
            enumerable: false,
            configurable: false,
            writable: false,
            value:true
        });

        if (!!item) this._parent_id = item.id;
    };

    Game_ItemUnique.prototype.object = function(newId = null) {
        let object = Game_Item.prototype.object.call(this);

        if(!!object)
        {
            if (newId !== null)  
            {
                object = Object.assign({}, object);
                object.id = newId;
                Object.defineProperty(object, r_rui_unique_parent_id, {
                    enumerable: true,
                    configurable: true,
                    writable: false,
                    value:this._parent_id
                });
            }
        }

        return object;
    };

    //=============================================================================
    // **  UniqueItem **
    //=============================================================================	
    class UniqueItem {
        constructor(item){
            Object.defineProperty(this, r_rui_unique__datas, {
                enumerable: false,
                configurable: true,
                writable: true,
                value:item
            });
            this.name = item.object().name;
            Object.defineProperty(this, r_rui_unique_is_unique, {
                enumerable: true,
                configurable: true,
                writable: false,
                value:true
            });
        }

        object() {
            return Object.assign(this._data.object(), this);
        }

        update()
        {
            if (this._data.isItem()) $dataItems[this._data._itemId] = this.object();
            else if (this._data.isWeapon()) $dataWeapons[this._data._itemId] = this.object();
            else if (this._data.isArmor()) $dataArmors[this._data._itemId] = this.object();
            return this;
        }

        changeName(newName) {
            this.name = newName;
            return this;
        }

        changeDesc(newDesc) {
            this.description = newDesc;
            return this;
        }

        _updateProp(prop, newValue) {
            this[prop] = newValue;
            return this;
        }

        id()
        {
            return this._data._itemId;
        }
    }

    Rotomeca.RotomecaUniqueItems.$createUniqueItem = $createUniqueItem;
    Rotomeca.RotomecaUniqueItems.$createUniqueWeapon = $createUniqueWeapon;
    Rotomeca.RotomecaUniqueItems.$createUniqueArmor = $createUniqueArmor;
    Rotomeca.RotomecaUniqueItems.Game_ItemUnique = Game_ItemUnique;
    Rotomeca.RotomecaUniqueItems.UniqueItem = UniqueItem;
})();
