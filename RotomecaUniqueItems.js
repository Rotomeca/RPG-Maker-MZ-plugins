//=============================================================================
// RotomecaUniqueItems.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (V3.0.1) Permet d'avoir des objets (objets, armures, équipements) unique.
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
 * @command have_item
 * @desc Vérifie si l'équipe possède un objet et stocke le résultat dans une variable.
 * @text Possède l'objet
 * 
 * @arg id
 * @text Id de l'objet
 * @desc Id de l'objet qui sera tester.
 * @type item
 * @default 1
 * 
* @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @command have_weapon
 * @desc Vérifie si l'équipe possède un équipement et stocke le résultat dans une variable.
 * @text Possède l'équipement
 * 
 * @arg id
 * @text Id de l'équipement
 * @desc Id de l'équipement qui sera tester.
 * @type weapon
 * @default 1
 * 
 * @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @arg include_wear
 * @text Inclut équiper ?
 * @desc Inclut les équipements porter par les membres de l'équipe ?
 * @type boolean
 * @default false
 * 
 * @command have_armor
 * @desc Vérifie si l'équipe possède une armure et stocke le résultat dans une variable.
 * @text Possède une armure
 * 
 * @arg id
 * @text Id de l'armure
 * @desc Id de l'armure qui sera tester.
 * @type armor
 * @default 1
 * 
 * @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @arg include_wear
 * @text Inclut équiper ?
 * @desc Inclut les armures porter par les membres de l'équipe ?
 * @type boolean
 * @default false
 * 
 * @command actor_have_weapon
 * @desc Vérifie si un membre de l'équipe possède une arme et stocke le résultat dans une variable.
 * @text Membre possède une arme
 * 
 * @arg actor
 * @text Id du membre
 * @desc Id du membre que l'on souhaite tester.
 * @type actor
 * @default 1
 * 
 * @arg id
 * @text Id de l'arme
 * @desc Id de l'arme qui sera tester.
 * @type weapon
 * @default 1
 * 
 * @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @command actor_have_armor
 * @desc Vérifie si un membre de l'équipe possède une armure et stocke le résultat dans une variable.
 * @text Membre possède une armure
 * 
 * @arg actor
 * @text Id du membre
 * @desc Id du membre que l'on souhaite tester.
 * @type actor
 * @default 1
 * 
 * @arg id
 * @text Id de l'armure
 * @desc Id de l'armure qui sera tester.
 * @type armor
 * @default 1
 * 
 * @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @command customize_item
 * @desc Modifie un objet et le change en objet unique
 * @text Modifier objet
 * 
 * @arg id
 * @text Id de l'object
 * @desc Id de l'objet à modifier.
 * @type item
 * @default 1
 * 
 * @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @arg add_to_party
 * @text Ajouter dans l'inventaire
 * @desc Ajouter le résultat dans l'inventaire
 * @type boolean
 * @default true
 * 
 * @arg custom_name
 * @text Nom de l'item
 * @desc Nouveau nom de l'objet. Vous pouvez utilisez le nom d'un personnage avec \C[ID]
 * @type string
 * @default default
 * 
 * @arg custom_desc
 * @text Description de l'item
 * @desc Nouvelle description de l'objet. Vous pouvez utilisez le nom d'un personnage avec \C[ID]
 * @type string
 * @default default
 * 
 * @command customize_item_from_var
 * @desc Modifie un objet (dont l'id est définie par une variable) et le change en objet unique
 * @text Modifier objet depuis une variable
 * 
 * @arg id
 * @text Id de la variable qui contient l'id de l'objet
 * @desc Id de la variable qui contient l'id de l'objet qui sera changé.
 * @type variable
 * @default 1
 * 
 * @arg var_id
 * @text Id de la variable
 * @desc Variable qui stockera le résultat
 * @type variable
 * @default 1
 * 
 * @arg add_to_party
 * @text Ajouter dans l'inventaire
 * @desc Ajouter le résultat dans l'inventaire
 * @type boolean
 * @default true
 * 
 * @arg custom_name
 * @text Nom de l'item
 * @desc Nouveau nom de l'objet. Vous pouvez utilisez le nom d'un personnage avec \C[ID]
 * @type string
 * @default default
 * 
 * @arg custom_desc
 * @text Description de l'item
 * @desc Nouvelle description de l'objet. Vous pouvez utilisez le nom d'un personnage avec \C[ID]
 * @type string
 * @default default
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Unique Items ###
 * Author   -   Rotomeca
 * Version  -   3.0.1
 * Updated  -   05/05/2023
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
    Rotomeca.RotomecaUniqueItems._get_unique_id = function _get_unique_id(starting_id, $data)
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

    Rotomeca.RotomecaUniqueItems.get_unique_id = function get_unique_id(type) {
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

    Rotomeca.RotomecaUniqueItems.create_unique_item = function create_unique_item(from, type, add_to_party = false)
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

        if (add_to_party) {
            $gameParty.gainItem(item.object(), 1);
        }

        return item;
    };

    function $createUniqueItem(item, add_to_party = false) {
        return Rotomeca.RotomecaUniqueItems.create_unique_item(item, r_rui_item_text, add_to_party);
    }

    function $createUniqueWeapon(item, add_to_party = false) {
        return Rotomeca.RotomecaUniqueItems.create_unique_item(item, r_rui_weapon_text, add_to_party);
    }

    function $createUniqueArmor(item, add_to_party = false) {
        return Rotomeca.RotomecaUniqueItems.create_unique_item(item, r_rui_armor_text, add_to_party);
    }

    function $getActorEquip(actor_id, equipment_id, equipement_type) {
        let state = false;
        const member = $gameParty.members().find(x => x.actorId() === actor_id)
        const equipment = member._equips?.find?.(x => {
            state = false;
            if (0 !== x.itemId() && ((x.isUniqueItem() && x.object().parent_id === equipment_id) || 
                                     (!x.isUniqueItem() && x.itemId() === equipment_id)))
            {
                if ((x.isArmor() && equipement_type === r_rui_armor_text) ||
                    (x.isWeapon() && equipement_type === r_rui_weapon_text))
                {
                    state = true;
                }
            }

            return state;
        });

        return equipment;
    }

    function $getHaveItem(item_id, item_type, include_wear = false) {
        let items = [];
        switch (item_type) {
            case r_rui_armor_text:
                $items = $gameParty.allArmors(include_wear);
                break;

            case r_rui_weapon_text:
                $items = $gameParty.allWeapons(include_wear);
                break;
                
            case r_rui_item_text:
                $items = $gameParty.allItems();
                break;

            default:
                break;
        }

        if (items.length > 0) {
            return items.find(x => util_find_item(x, item_id));
        }

        return null;
    }

    function $haveItem(item_id) {
        return !!$getHaveItem(item_id, r_rui_item_text);
    }

    function $haveWeapon(item_id, include_wear = false) {
        return !!$getHaveItem(item_id, r_rui_weapon_text, include_wear);
    }

    function $haveArmor(item_id, include_wear = false) {
        return !!$getHaveItem(item_id, r_rui_armor_text, include_wear);
    }

    function $actorHaveWeapon(actor_id, equipment_id) {
        return !!$getActorEquip(actor_id, equipment_id, r_rui_weapon_text);
    }

    function $actorHaveArmor(actor_id, equipment_id) {
        return !!$getActorEquip(actor_id, equipment_id, r_rui_armor_text);
    }

    function util_find_item(x, equipment_id) {
        return (x.isUniqueItem() && x.object().parent_id === equipment_id) || 
        (!x.isUniqueItem() && x.itemId() === equipment_id);
    }

    function _update_item_if_not_default(text, actor_member, item, item_action) {
        const DEFAULT_TEXT = 'default';
        const HERO_SELECTOR_RIGHT = '\\C[';
        const HERO_SELECTOR_LEFT = ']';
        if (DEFAULT_TEXT !== text) {
            if (text.includes(HERO_SELECTOR_RIGHT)){
                const id = parseInt(text.split(HERO_SELECTOR_RIGHT)[1].split(HERO_SELECTOR_LEFT)[0]);
                const HERO_SELECTOR = `${HERO_SELECTOR_RIGHT}${id}${HERO_SELECTOR_LEFT}`;
                text = text.replace(HERO_SELECTOR, $gameActors.actor(id)[actor_member]());
            }

            item_action.call(item, text);    
        }

        return item;
    }

    function customize_item(item_id, item_type, new_name, new_desc, add_to_party = true) {
        /**
         * @type {UniqueItem}
         */
        let item = Rotomeca.RotomecaUniqueItems.create_unique_item(item_id, item_type, false);
        item = new UniqueItem(item);
        
        item = _update_item_if_not_default(new_name, 'name', item, item.changeName);
        item = _update_item_if_not_default(new_desc, 'name', item, item.changeDesc);

        if (add_to_party) {
            $gameParty.gainItem(item.object(), 1);
        }

        return item;
    }

    //=============================================================================
    // **  PluginManager **
    //=============================================================================	
    PluginManager.registerCommand(r_rui_plugin_name, r_rui_command_create_unique_item, data => {
        if ("string" === typeof data.from) data.from = parseInt(data.from);
        if ("string" === typeof data.id) data.id = parseInt(data.id);
        if ("string" === typeof data.add_to_party) data.add_to_party = 'true' === data.add_to_party;

        const add_to_party = data.add_to_party ?? true;
        const tmp = $createUniqueItem(data.from, add_to_party);
        $gameVariables.setValue(data.id, tmp._itemId);
    });	

    PluginManager.registerCommand(r_rui_plugin_name, r_rui_command_create_unique_armor, data => {
        if ("string" === typeof data.from) data.from = parseInt(data.from);
        if ("string" === typeof data.id) data.id = parseInt(data.id);
        if ("string" === typeof data.add_to_party) data.add_to_party = 'true' === data.add_to_party;

        const add_to_party = data.add_to_party ?? true;
        const tmp = $createUniqueArmor(data.from, add_to_party);
        $gameVariables.setValue(data.id, tmp._itemId);
    });

    PluginManager.registerCommand(r_rui_plugin_name, r_rui_command_create_unique_weapon, data => {
        if ("string" === typeof data.from) data.from = parseInt(data.from);
        if ("string" === typeof data.id) data.id = parseInt(data.id);
        if ("string" === typeof data.add_to_party) data.add_to_party = 'true' === data.add_to_party;

        const add_to_party = data.add_to_party ?? true;
        const tmp = $createUniqueWeapon(data.from, add_to_party);
        $gameVariables.setValue(data.id, tmp._itemId);
    });

    PluginManager.registerCommand(r_rui_plugin_name, 'have_item', datas => {
        const val = $haveItem(datas.id) ? 1 : 0;
        $gameVariables.setValue(parseInt(datas.var_id), val);
    });	

    PluginManager.registerCommand(r_rui_plugin_name, 'have_weapon', datas => {
        const val = $haveWeapon(parseInt(datas.id), datas.include_wear == 'true') ? 1 : 0;
        $gameVariables.setValue(parseInt(datas.var_id), val);
    });	

    PluginManager.registerCommand(r_rui_plugin_name, 'have_armor', datas => {
        const val = $haveArmor(parseInt(datas.id), datas.include_wear == 'true') ? 1 : 0;
        $gameVariables.setValue(parseInt(datas.var_id), val);
    });	

    PluginManager.registerCommand(r_rui_plugin_name, 'actor_have_weapon', datas => {
        const val = $actorHaveWeapon(parseInt(datas.actor), parseInt(datas.id), datas.include_wear == 'true') ? 1 : 0;
        $gameVariables.setValue(parseInt(datas.var_id), val);
    });	

    PluginManager.registerCommand(r_rui_plugin_name, 'actor_have_armor', datas => {
        const val = $actorHaveArmor(parseInt(datas.actor), parseInt(datas.id), datas.include_wear == 'true') ? 1 : 0;
        $gameVariables.setValue(parseInt(datas.var_id), val);
    });	

    PluginManager.registerCommand(r_rui_plugin_name, 'customize_item', datas => {
        if ("string" === typeof datas.id) datas.id = parseInt(datas.id);
        if ("string" === typeof datas.add_to_party) datas.add_to_party = 'true' === datas.add_to_party;

        const item = customize_item(datas.id, r_rui_item_text, datas.custom_name, datas.custom_desc, datas.add_to_party);
        $gameVariables.setValue(parseInt(datas.var_id), item._itemId);
    });

    PluginManager.registerCommand(r_rui_plugin_name, 'customize_item_from_var', datas => {
        if ("string" === typeof datas.id) datas.id = parseInt(datas.id);
        if ("string" === typeof datas.add_to_party) datas.add_to_party = 'true' === datas.add_to_party;

        const item = customize_item($gameVariables.value(datas.id), r_rui_item_text, datas.custom_name, datas.custom_desc, datas.add_to_party);
        $gameVariables.setValue(parseInt(datas.var_id), item.id());
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
    Rotomeca.RotomecaUniqueItems.$getActorEquip = $getActorEquip;
    Rotomeca.RotomecaUniqueItems.$getHaveItem = $getHaveItem;
    Rotomeca.RotomecaUniqueItems.$haveItem = $haveItem;
    Rotomeca.RotomecaUniqueItems.$haveWeapon = $haveWeapon;
    Rotomeca.RotomecaUniqueItems.$haveArmor = $haveArmor;
    Rotomeca.RotomecaUniqueItems.$actorHaveWeapon = $actorHaveWeapon;
    Rotomeca.RotomecaUniqueItems.$actorHaveArmor = $actorHaveArmor;
    Rotomeca.RotomecaUniqueItems.Game_ItemUnique = Game_ItemUnique;
    Rotomeca.RotomecaUniqueItems.UniqueItem = UniqueItem;
})();
