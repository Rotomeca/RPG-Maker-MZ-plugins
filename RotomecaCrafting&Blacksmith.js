//=============================================================================
// RotomecaCrafting&Blacksmith.js
//=============================================================================
/*:fr
 * @target MZ
 * @plugindesc (V2.0.0) Ajoute un système de crafting et de forgeron (si le plugin RotomecaItemDurability existe)
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaCore
 * @orderAfter RotomecaCore
 * @orderAfter RotomecaItemDurability
 *
 * @param item_created
 * @text Audio quand créé
 * @desc Fichier audio qui sera joué lorsqu'un objet a été crafter.
 * @default audio/se/Item3
 * @type file
 * 
 * @param item_repair
 * @text Audio quand réparé
 * @desc Fichier audio qui sera joué lorsqu'un objet a été gagne en durabilité.
 * @default audio/se/Hammer
 * @type file
 * 
 * @param durability_item_healer
 * @text Item durabilité max
 * @desc Objet optionel qui, si est ajouté, soignera la durabilité au maximum. 
 * @type item
 * 
 * @command open_crafting
 * @desc Ouvre le menu de craft
 * @text Menu de craft
 * 
 * @command open_blacksmith
 * @desc Ouvre le menu de forgeron
 * @text Ouvrir la forge
 *
 * @command add_recipe_weapon
 * @desc Ajoute la recette d'une arme à vôtre liste de recettes.
 * @text Obtenir une recette d'arme
 *
 * @arg id
 * @text Index
 * @desc Arme qui possède un craft. Ne fais rien si elle n'en a pas.
 * @type weapon
 * @default 1
 *
 * @command add_recipe_armor
 * @desc Ajoute la recette d'une armure à vôtre liste de recettes.
 * @text Obtenir une recette d'armure
 *
 * @arg id
 * @text Index
 * @desc Armure qui possède un craft. Ne fais rien si elle n'en a pas.
 * @type armor
 * @default 1
 *
 * @command add_recipe_item
 * @desc Ajoute la recette d'un objet à vôtre liste de recettes.
 * @text Obtenir une recette d'objet
 *
 * @arg id
 * @text Index
 * @desc Objet qui possède un craft. Ne fais rien si il n'en a pas.
 * @type item
 * @default 1
 *
 * @help
 * =============================================================================
 * ### Rotomeca Crafting & Blacksmith ###
 * Author   -   Rotomeca
 * Version  -   1.0.0
 * Updated  -   08/07/2022
 * =============================================================================
 * Ajoute un système de crafting et de forgeron basique.
 * Le système de forgeron est disponible seulement si le plugin RotomecaItemDurability est activé.
 * 
 * Paramètres : 
 *  Audio quand créé => Le fichier audio qui sera joué quand un objet sera fabriquer (crafting).
 *  Audio quand réparé => Le fichier audio qui sera joué quand un objet sera réparé (forgeron).
 *  Item durabilité max => Item optionel qui, si il est dans l'inventaire, rendra la durabilité au maximum.
 * 
 * Commandes :
 *   Menu de craft => Ouvre le menu de craft
 *   Ouvrir la forge => Ouvre le menu de forge
 *   Obtenir une recette d'arme => Permet d'obtenir la recette d'une arme
 *   Obtenir une recette d'armure => Permet d'obtenir la rectte d'une armure
 *   Obtenir une recette d'objet => Permet d'obtenir la recette d'un objet
 * 
 *  Ce qu'il reste à faire : 
 *   Traduction anglaise
 * 
 */
/*:
 * @target MZ
 * @plugindesc (V2.0.0) Ajoute un système de crafting et de forgeron
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaCore
 * @orderAfter RotomecaCore
 * @orderAfter RotomecaItemDurability
 *
 * @param item_created
 * @text Audio quand créé
 * @desc Fichier audio qui sera joué lorsqu'un objet a été crafter.
 * @default audio/se/Item3
 * @type file
 * 
 * @param item_repair
 * @text Audio quand réparé
 * @desc Fichier audio qui sera joué lorsqu'un objet a été gagne en durabilité.
 * @default audio/se/Hammer
 * @type file
 * 
 * @param durability_item_healer
 * @text Item durabilité max
 * @desc Objet optionel qui, si est ajouté, soignera la durabilité au maximum. 
 * @type item
 * 
 * @command open_crafting
 * @desc Ouvre le menu de craft
 * @text Menu de craft
 * 
 * @command open_blacksmith
 * @desc Ouvre le menu de forgeron
 * @text Ouvrir la forge
 *
 * @command add_recipe_weapon
 * @desc Ajoute la recette d'une arme à vôtre liste de recettes.
 * @text Obtenir une recette d'arme
 *
 * @arg id
 * @text Index
 * @desc Arme qui possède un craft. Ne fais rien si elle n'en a pas.
 * @type weapon
 * @default 1
 *
 * @command add_recipe_armor
 * @desc Ajoute la recette d'une armure à vôtre liste de recettes.
 * @text Obtenir une recette d'armure
 *
 * @arg id
 * @text Index
 * @desc Armure qui possède un craft. Ne fais rien si elle n'en a pas.
 * @type armor
 * @default 1
 *
 * @command add_recipe_item
 * @desc Ajoute la recette d'un objet à vôtre liste de recettes.
 * @text Obtenir une recette d'objet
 *
 * @arg id
 * @text Index
 * @desc Objet qui possède un craft. Ne fais rien si il n'en a pas.
 * @type item
 * @default 1
 *
 * @help
 * =============================================================================
 * ### Rotomeca Crafting & Blacksmith ###
 * Author   -   Rotomeca
 * Version  -   1.0.0
 * Updated  -   08/07/2022
 * =============================================================================
 * Ajoute un système de crafting et de forgeron basique.
 * Le système de forgeron est disponible seulement si le plugin RotomecaItemDurability est activé.
 * 
 * Paramètres : 
 *  Audio quand créé => Le fichier audio qui sera joué quand un objet sera fabriquer (crafting).
 *  Audio quand réparé => Le fichier audio qui sera joué quand un objet sera réparé (forgeron).
 *  Item durabilité max => Item optionel qui, si il est dans l'inventaire, rendra la durabilité au maximum.
 * 
 * Commandes :
 *   Menu de craft => Ouvre le menu de craft
 *   Ouvrir la forge => Ouvre le menu de forge
 *   Obtenir une recette d'arme => Permet d'obtenir la recette d'une arme
 *   Obtenir une recette d'armure => Permet d'obtenir la rectte d'une armure
 *   Obtenir une recette d'objet => Permet d'obtenir la recette d'un objet
 * 
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaCraftingBlacksmith = true;

var Rotomeca = Rotomeca || {};

(() => {
    //=============================================================================
    // ** Constantes
    //=============================================================================
    const r_rcab_plugin_name = 'RotomecaCrafting&Blacksmith';

    //=============================================================================
    // ** Alias
    //=============================================================================
    const RotomecaItem = Rotomeca.RotomecaItem;
    const RotomecaSprite_Gauge = Rotomeca.RotomecaSprite_Gauge;
    const RotomecaSound = Rotomeca.RotomecaSound; 
    const Game_ItemDurability = Rotomeca.RotomecaItemDurability.Game_ItemDurability;
    
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
    Rotomeca.RotomecaCraftingBlacksmith = {}
    Rotomeca.RotomecaCraftingBlacksmith.classes = {};
    /**
     * Paramètres du plugin
     */
    Rotomeca.RotomecaCraftingBlacksmith.parameters = PluginManager.parameters(r_rcab_plugin_name);

    //=============================================================================
    // **  Rotomeca.RotomecaCraftingBlacksmith **
    //=============================================================================
    /**
     * Récupère les données de langue pour ce plugin
     * @param {string} text Clé
     * @returns {string} Texte récupérer depuis les paramètres du plugin
     */
    Rotomeca.RotomecaCraftingBlacksmith.gettext = function gettext(text) {
        return Rotomeca.gettext(text, 'RotomecaCraftingBlacksmith');
    }

    //=============================================================================
    // **  PluginManager **
    //=============================================================================
    PluginManager.registerCommand(r_rcab_plugin_name, 'open_crafting', data => {
        SceneManager.push(Scene_Crafting);
    });

    PluginManager.registerCommand(r_rcab_plugin_name, 'open_blacksmith', data => {
        SceneManager.push(Scene_Blacksmith);
    });


    PluginManager.registerCommand(r_rcab_plugin_name, 'add_recipe_weapon', data => {
        $gameParty.addRecipe(parseInt(data.id), RotomecaItem.itemTypes.w);
    });

    PluginManager.registerCommand(r_rcab_plugin_name, 'add_recipe_armor', data => {
        $gameParty.addRecipe(parseInt(data.id), RotomecaItem.itemTypes.a);
    });

    PluginManager.registerCommand(r_rcab_plugin_name, 'add_recipe_item', data => {
        $gameParty.addRecipe(parseInt(data.id), RotomecaItem.itemTypes.i);
    });

    //=============================================================================
    // **  RotomecaIngredients **
    //=============================================================================
    class RotomecaIngredients extends RotomecaItem
    {
        constructor(string)
        {
            super(0, '');
            string = this.decryptString(string);
            this.item_id = string.id;
            this.item_type = string.type;
            this.number_required = string.number;
            this.setup(string);
        }

        index() {
            return `${this.item_id}/${this.item_type}`;
        }

        isIngredientGet()
        {
            if (this.isWeapon()) return $gameParty.allWeapons(false).filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id)).length >= this.number_required;
            else if (this.isArmor()) return $gameParty.allArmors(false).filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id)).length >= this.number_required;
            else if (this.isItem()) return $gameParty.numItems(this.get())/*.filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id)).length*/ >= this.number_required;

            return false;
        }

        ingredientPossNumber()
        {
            let sum = 0;
            const array = this._container().filter(x => x.id === this.item_id || (!!x.parent_id && x.parent_id === this.item_id));
            for (let index = 0; index < array.length; ++index) {
                const element = array[index];
                sum += $gameParty.numItems(element);     
            }

            return sum;
        }

        haveDurabilityItemInIngredients()
        {
            if (this._container().filter(x => x.id === this.item_id).length >= this.number_required) return false;

            return this._container().filter(x => (!!x.durability && !!x.durability_max && x.parent_id === this.item_id && x.durability !== x.durability_max)).length > 1;

        }

        setup(decryptedString) {
            return this;
        }

        decryptString(str)
        {
            const element = str.split('/');
            const tmp = element[1].split('*');
            const type = element[0];
            const index = parseInt(tmp[0]);
            const nRequired = parseInt(tmp[1]);

            return {
                id:index,
                number:nRequired,
                type
            };
        }
    }

    if (Imported.RotomecaItemDurability === true)
    {
        //=============================================================================
        // **  RotomecaBlacksmithIngredients **
        //=============================================================================
        class RotomecaBlacksmithIngredients extends RotomecaIngredients
        {
            constructor(string)
            {
                super(string);
            }
        }
        Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaBlacksmithIngredients = RotomecaBlacksmithIngredients;
    }

    //=============================================================================
    // **  RotomecaRecipeBase **
    //=============================================================================
    class RotomecaRecipeBase extends RotomecaItem
    {
        constructor(itemResultId, resultType)
        {
            super(itemResultId, resultType);
            this._ingredients = {};
        }

        canBeCrafted()
        {
            return false;
        }
    }

    //=============================================================================
    // **  RotomecaRecipe **
    //=============================================================================
    class RotomecaRecipe extends RotomecaRecipeBase
    {
        constructor(item)
        {
            super(0, '')
            const result = this._getResult(item);
            this.item_id = result.id;
            this.item_type = result.type;
            this._ingredients = this._getIngredients(item.note);
        }

        _getIngredients(note) {
            let tmp =  {
                length() {
                    let it = 0;
                    for (const key in this) {
                        if (Object.hasOwnProperty.call(this, key)) {
                            ++it;
                        }
                    }
                    return it;
                }
            };
            Object.defineProperty(tmp, 'length', {
                enumerable:false
            });
            return tmp;
        }

        _getResult(item) {
            return this._formatResult(0, '');
        }

        _formatResult(id, type)
        {
            return {id, type};
        }

        getResult()
        {
            return this.get();
        }
    }

    //=============================================================================
    // **  RotomecaCraftingRecipe **
    //=============================================================================
    class RotomecaCraftingRecipe extends RotomecaRecipe
    {
        constructor(item)
        {
            super(item);
        }

        _getIngredients(note)
        {
            const format = this.noteFormat();
            let base = super._getIngredients(note);
            /*
            <recipe:type/index*number|type/index*number
                    type/index*number>
            */

            if (note.includes(format))
            {
                const datas = note.replaceAll(' ', '').split(format)[1].split('>')[0].split('\n').flatMap(x => x.includes('|') ? x.split('|') : x);
                for (let i = 0; i < datas.length; ++i) {
                    const element = datas[i];
                    const tmp = this._generateIngredients(element);

                    if (tmp === 'break') break;
                    else if (tmp === 'continue') continue;

                    base[`${tmp.item_id}/${tmp.item_type}`] = tmp;
                }
            }

            return base;
        }

        _generateIngredients(data)
        {
            return this.classIngredient(data);
        }

        _getResult(_item) {
            const item = new Game_Item(_item);
            let type = '';

            if (item.isWeapon()) type = RotomecaItem.itemTypes.w;
            else if (item.isArmor()) type = RotomecaItem.itemTypes.a;
            else if (item.isItem()) type = RotomecaItem.itemTypes.i;

            return this._formatResult(_item.id, type);
        }

        canBeCrafted()
        {
            for (const key in this._ingredients) {
                if (Object.hasOwnProperty.call(this._ingredients, key)) {
                    const element = this._ingredients[key];
                    if (!element.isIngredientGet) continue;
                    if (!element.isIngredientGet())
                    {
                        if (!this.isMagikItem(element.get())) return false;
                    }
                }
            }

            return true;
        }

        haveDurabilityItemInIngredients()
        {
            for (const key in this._ingredients) {
                if (Object.hasOwnProperty.call(this._ingredients, key)) {
                    const element = this._ingredients[key];
                    if (!element.haveDurabilityItemInIngredients) continue;
                    if (element.haveDurabilityItemInIngredients()) return true;
                }
            }

            return false;
        }

        isMagikItem(item)
        {
            return item.id == Rotomeca.RotomecaCraftingBlacksmith.parameters.durability_item_healer;
        }

        noteFormat()
        {
            return '<recipe:';
        }

        classIngredient(...args)
        {
            return new RotomecaIngredients(...args);
        }

        static hasRecipe(item)
        {
            return !!item && !!item.note && item.note.includes('<recipe:');
        }
    }

    if (Imported.RotomecaItemDurability === true)
    {
        //=============================================================================
        // **  RotomecaBlacksmithRecipe **
        //=============================================================================
        class RotomecaBlacksmithRecipe extends RotomecaCraftingRecipe
        {
            constructor(item)
            {
                /*
                <blacksmith:type/index*number-durability_gain|type/index*number-durability_gain
                            type/index*number-durability_gain>
                */
                super(item);
            }

            noteFormat()
            {
                return '<blacksmith:';
            }

            classIngredient(...args)
            {
                return new Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaBlacksmithIngredients(...args);
            }

            _generateIngredients(data)
            {
                return data.includes('dg') ? 'continue' : super._generateIngredients(data);
            }

            _getIngredients(note)
            {
                let base = super._getIngredients(note);

                if (note.includes('dg')) base.durability_gain = parseInt(note.split('dg')[1].replaceAll('\r\n', '¤').replaceAll('|', '¤').replaceAll('>', '¤').split('¤')[0]);
                else base.durability_gain = Number.POSITIVE_INFINITY;

                const magik_item = Rotomeca.RotomecaCraftingBlacksmith.parameters.durability_item_healer;
                if (!!magik_item && magik_item > 0) base['magik_item'] = this._generateIngredients(`i/${magik_item}*1`);

                return base;
            }

            durability_gain()
            {
                if (!!this._ingredients['magik_item'] && this._ingredients['magik_item'].ingredientPossNumber() >= 1) return Number.POSITIVE_INFINITY;

                return this._ingredients.durability_gain;
            }

            canBeCrafted()
            {
                return super.canBeCrafted() && this.get().durability < this.get().durability_max;
            }

            max_durability_gain()
            {
                let gain = this.durability_gain();

                if (Number.isFinite(gain))
                {
                    let min = null;
                    for (const key in this._ingredients) {
                        if (Object.hasOwnProperty.call(this._ingredients, key)) {
                            const element = this._ingredients[key].get();
                            if (!min || $gameParty.numItems(element) < $gameParty.numItems(min))
                            {
                                min = element;
                            } 
                        }
                    }
                    //gain = this.durability_gain() * this 
                }

                return gain;
            }

            heal(){
                let healed_item = new Game_ItemDurability(this.get());
                healed_item.getItemDurability().add(this.durability_gain());
                return healed_item;
            }

            static hasBlacksmithRecipe(item) {
                return !!item && !!item.note && item.note.includes('<blacksmith:');
            }
        }

        Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaBlacksmithRecipe = RotomecaBlacksmithRecipe;
    }

    const alias_rotomeca_rcb__Game_Party_prototype_initAllItems = Game_Party.prototype.initAllItems;
    Game_Party.prototype.initAllItems = function () {
        alias_rotomeca_rcb__Game_Party_prototype_initAllItems.call(this);
        this.recipes = {
            i:[],
            w:[],
            a:[]
        };
    };

    Game_Party.prototype.getRecipes = function () {
        return this.recipes;
    };

    Game_Party.prototype.getRecipe = function (type, index)
    {
        return this.recipes[type][index];
    };

    Game_Party.prototype.addRecipe = function (index, type)
    {
        this.recipes[type][index] = new RotomecaCraftingRecipe(new RotomecaItem(index, type).get());
        return this;
    }

    if (Imported.RotomecaItemDurability === true)
    {
        Game_Party.prototype.getItemsWithDurabilityDown = function ()
        {
            return this.allWeapons(true).filter(x => x.is_unique && x.haveDurability && x.durability < x.durability_max)
            .concat(this.allArmors(true).filter(x => x.is_unique && x.haveDurability && x.durability < x.durability_max));
        }

        Game_Party.prototype.getItemsWithDurabilityDownByType = function ()
        {
            const recipe = Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaBlacksmithRecipe;
            let tmp = {};
            tmp[RotomecaItem.itemTypes.w] = this.allWeapons(true).filter(x => x.is_unique && x.haveDurability && x.durability < x.durability_max).map(x => new recipe(x));
            tmp[RotomecaItem.itemTypes.a] = this.allArmors(true).filter(x => x.is_unique && x.haveDurability && x.durability < x.durability_max).map(x => new recipe(x));
            return tmp;
        }
    }

    //=============================================================================
    // **  Window_CraftTypeSelect **
    //=============================================================================
    function Window_CraftTypeSelect() {
        this.initialize(...arguments);
    }

    Window_CraftTypeSelect.prototype = Object.create(Window_HorzCommand.prototype);
    Window_CraftTypeSelect.prototype.constructor = Window_CraftTypeSelect;

    Window_CraftTypeSelect.prototype.initialize = function (rect, _enum, recipe_base) {
        this._enum = _enum;
        this._recipes = recipe_base;
        Window_Command.prototype.initialize.call(this, rect);
    };

    Window_CraftTypeSelect.prototype.makeCommandList = function() {
        Window_Command.prototype.makeCommandList.call(this);
        this.addOriginalCommands();
    };

    Window_CraftTypeSelect.prototype.addOriginalCommands = function(){
        for (const key in this._enum) {
            if (!!this._enum[key] && !!this._recipes[key] && Object.hasOwnProperty.call(this._enum, key)) {
                const element = this._enum[key];
                this.addCommand(Rotomeca.RotomecaCraftingBlacksmith.gettext(element), element, this._recipes[key].length > 0);
            }
        }
    }

    //=============================================================================
    // **  Window_CraftSelect **
    //=============================================================================
    function Window_CraftSelect() {
        this.initialize(...arguments);
    }

    Window_CraftSelect.prototype = Object.create(Window_Command.prototype);
    Window_CraftSelect.prototype.constructor = Window_CraftSelect;

    Window_CraftSelect.prototype.initialize = function (rect, recipes) {
        this._recipes = recipes;
        Window_Command.prototype.initialize.call(this, rect);
    };

    Window_CraftSelect.prototype.makeCommandList = function() {
        Window_Command.prototype.makeCommandList.call(this);
        this.addOriginalCommands();
    };

    Window_CraftSelect.prototype.addOriginalCommands = function(){
        for (const key in this._recipes) {
            if (!!this._recipes[key] && Object.hasOwnProperty.call(this._recipes, key)) {
                const element = this._recipes[key];
                const item = element.get();
                this.addCommand(item.name, item.id, element.canBeCrafted());
            }
        }
    }

    //=============================================================================
    // **  Window_CraftBase **
    //=============================================================================
    function Window_CraftBase() {
        this.initialize(...arguments);
    }

    Window_CraftBase.prototype = Object.create(Window_Scrollable.prototype);
    Window_CraftBase.prototype.constructor = Window_CraftBase;

    Window_CraftBase.prototype.initialize = function (rect, recipes, windowCraft) {
        this._recipes = recipes;
        this._craftWindowList = windowCraft;
        this._index = windowCraft?._index;
        Window_Scrollable.prototype.initialize.call(this, rect);
        this.paint();
    };

    Window_CraftBase.prototype.paint = function() {
        Window_Scrollable.prototype.paint.call(this);
        this.createContents();
        try {
            this.drawItem();
        } catch (error) {
            console.error('###[Window_CraftBase.prototype.paint]', error);
        }
    };

    Window_CraftBase.prototype.refresh = function() {
        this._index = this._craftWindowList._index;
        this.update();
        this.paint();
    }

    Window_CraftBase.prototype.drawItem = function() {
        this._draw(this._recipes[parseInt(this._craftWindowList._list[this._index].symbol)])
    }

    Window_CraftBase.prototype._draw = function(recipe)
    {

    }

    Window_CraftBase.prototype.placeGauge = function(item, x, y, val, max, w = null) {
        const key = "item%1-gauge".format('potential');
        const sprite = this.createInnerSprite(key, RotomecaSprite_Gauge);//.setWidth(w);
        sprite.bitmap.clear();
        sprite.setup(x, y, w, 24, max, val);
        sprite.set_gauge_color_1('#FF0000');
        if (val <= max / 4) sprite.set_gauge_color_2('#FF0000');
        else if (val <= max * 3/4) sprite.set_gauge_color_2('#FFFF00');
        else sprite.set_gauge_color_2('#00FF00');
        sprite.show();
    };

    Window_CraftBase.prototype.createInnerSprite = function(key, spriteClass) {
        if (this._additionalSprites === undefined) this._additionalSprites = {};
        const dict = this._additionalSprites;
        if (dict[key]) {
            return dict[key];
        } else {
            const sprite = new spriteClass();
            dict[key] = sprite;
            this.addInnerChild(sprite);
            return sprite;
        }
    };

    //=============================================================================
    // **  Window_Recipe **
    //=============================================================================
    function Window_Recipe() {
        this.initialize(...arguments);
    }

    Window_Recipe.prototype = Object.create(Window_CraftBase.prototype);
    Window_Recipe.prototype.constructor = Window_Recipe;

    Window_Recipe.prototype.initialize = function (rect, recipes, windowCraft) {
        Window_CraftBase.prototype.initialize.call(this, rect, recipes, windowCraft);
    };

    Window_Recipe.prototype._draw = function(recipe)
    {
        Window_CraftBase.prototype._draw.call(this, recipe);
        const item = recipe.get();
        const mw = (Graphics.width - Graphics.width / 4) - 24;
        this.drawRecipeIcon(item).drawRecipeName(item, mw).drawIngredients(recipe, mw);

        if (!recipe.isItem()) this.drawPotential(recipe, mw);
    }

    Window_Recipe.prototype.drawRecipeIcon = function(item) {
        this.drawIcon(item.iconIndex, 0, -this._scrollBaseY);
        return this;
    }

    Window_Recipe.prototype.drawRecipeName = function(item, mw) {
        //this.drawText(, 37, 0, mw - 37);
        const desc = item.description || item.name;
        this.drawTextEx(desc, 37, -this._scrollBaseY, mw - 37);
        return this;
    }

    Window_Recipe.prototype.drawPotential = function(recipe, mw) {
        const text = 'Potentiel : ';
        const text_size = this.textWidth(text);
        this.drawText(text, 0, 68 + 8 -this._scrollBaseY, text_size)
        const potential = this.getPotential(recipe);
        this.placeGauge(recipe.get(), text_size + 5, 68 + 15 -this._scrollBaseY, potential.current, potential.max, mw - (text_size - 5));
        return this;
    }

    Window_Recipe.prototype.getPotential = function (recipe)
    {
        const item = recipe.get();
        let sum = 0;
        let max = 0;
        for (let index = 0; index < item.params.length; ++index) {

            if (index <= 1) continue;

            if (recipe.isArmor() && (index === 2 || index === 4)) continue;
            else if (recipe.isWeapon() && index !== 2 && index !== 4) continue;

            const element = item.params[index];

            if (element <= 0) continue;

            sum += element;
            max += 500;
        }

        return {
            current:sum,
            max
        };
    };

    Window_Recipe.prototype.drawIngredients = function(recipe, mw) {
        this.drawText('Ingrédients :', 0, 68+ 30 + 25 -this._scrollBaseY);
        let it = 2;
        for (const key in recipe._ingredients) {
            if (Object.hasOwnProperty.call(recipe._ingredients, key)) {
                const ingred = recipe._ingredients[key];
                this.drawIngredientsIcon(ingred, it).drawIngredientsNameAndNumber(ingred, it++, mw);
            }
        }
        this._ing_count = it - 2;
        return this;
    }

    Window_Recipe.prototype.drawIngredientsIcon = function(ing, it) {

        const base = 34;
        this.drawIcon(ing.get().iconIndex, 0, (base * it) + 34 + 55 -this._scrollBaseY);
        return this;
    }

    Window_Recipe.prototype.drawIngredientsNameAndNumber = function(ing, it, mw) {
        const possed = ing.ingredientPossNumber();
        const startColor = possed >= ing.number_required ? '\\C[0]' : '\\C[7]';
        const endColor = '\\C[0]';
        this.drawTextEx(`${startColor}${ing.get().name}${endColor}`, 34 + 5, (34 * it) + 34 + 55 -this._scrollBaseY);
        const current = `${startColor}${possed}/${ing.number_required}${endColor}`;
        this.drawTextEx(current, mw - (this.textWidth(current) - this.textWidth(startColor + endColor)), (34 * it) + 34 + 55 -this._scrollBaseY);
        return this;
    }

    Window_Recipe.prototype.flushTextState = function(textState) {
        const text = textState.buffer;
        const rtl = textState.rtl;
        const width = textState.width || this.textWidth(text);
        const height = textState.height;
        const x = rtl ? textState.x - width : textState.x;
        const y = textState.y;
        if (textState.drawing) {
            this.contents.drawText(text, x, y, width, height);
        }
        textState.x += rtl ? -width : width;
        textState.buffer = this.createTextBuffer(rtl);
        const outputWidth = Math.abs(textState.x - textState.startX);
        if (textState.outputWidth < outputWidth) {
            textState.outputWidth = outputWidth;
        }
        textState.outputHeight = y - textState.startY + height;
    };

    Window_Recipe.prototype.overallHeight = function() {
    return 200 + (this._ing_count || 0) * this.itemHeight()
    };

    //=============================================================================
    // **  Window_Blacksmith **
    //=============================================================================
    function Window_Blacksmith() {
        this.initialize(...arguments);
    }

    Window_Blacksmith.prototype = Object.create(Window_Recipe.prototype);
    Window_Blacksmith.prototype.constructor = Window_Blacksmith;

    Window_Blacksmith.prototype.initialize = function (rect, recipes, windowCraft) {
        Window_Recipe.prototype.initialize.call(this, rect, recipes, windowCraft);
    };

    Window_Blacksmith.prototype.drawItem = function() {
        this._draw(this._recipes[this._index]);
    }

    Window_Blacksmith.prototype._draw = function(recipe)
    {
        Window_CraftBase.prototype._draw.call(this, recipe);
        const item = recipe.get();
        const mw = (Graphics.width - Graphics.width / 4) - 24;
        this.draw_actor(recipe, item, mw).draw_durability_gauge(item, mw).draw_durability_gain(recipe).draw_ingredients_needed(recipe, mw);
    };

    Window_Blacksmith.prototype.draw_actor = function(recipe, item, mw)
    {
        const actors = $gameParty.allMembers();//[0].isEquipped()
        for (let index = 0; index < actors.length; ++index) {
            const actor = actors[index];
            if (actor.isEquipped(item)) 
            {
                this._actor_drawn = true;
                return this.draw_actor_face(actor).draw_actor_name(actor, mw);
            }
        }
        this._actor_drawn = false;
        return this;
    };

    Window_Blacksmith.prototype.draw_actor_face = function(actor)
    {
        this.drawActorFace(actor, 0, 0, 96, 96);
        return this;
    };

    Window_Blacksmith.prototype.draw_actor_name = function(actor, mw)
    {
        const text_size = mw - 99;
        this.drawText(actor.name(), 99, 0, text_size)
        return this;
    };

    Window_Blacksmith.prototype.draw_durability_gauge = function(item, mw)
    {
        const y = (this._actor_drawn === true ? 99 : 0);
        const text_size = mw;
        this.drawText('Durabilitée : ', 0, y, text_size)
        this.placeGauge(item, 0, y + 35, item.durability, item.durability_max, mw);
        return this;
    };

    Window_Blacksmith.prototype.draw_durability_gain = function(recipe, mw)
    {
        const y = (this._actor_drawn === true ? (99 + 35 + 35 + 10) : (70 + 10));
        const text_size = mw;
        let durability_gain = recipe.durability_gain() ?? 1;

        if (!Number.isFinite(durability_gain) || durability_gain > recipe.get().durability_max) durability_gain = 'MAX';

        this.drawText(`Durabilitée gagnée : ${durability_gain}`, 0, y, text_size);
        return this;
    };

    Window_Blacksmith.prototype.draw_ingredients_needed = function(recipe, mw)
    {
        const y = (this._actor_drawn === true ? (99 + 35 + 35 + 10 + 65) : (70 + 10 + 65));
        const text_size = mw;
        this.drawText("Ingrédients : ", 0, y, text_size);
        
        let it = 0;
        for (const key in recipe._ingredients) {
            if (Object.hasOwnProperty.call(recipe._ingredients, key) && key !== 'durability_gain') {
                const ing = recipe._ingredients[key];

                if (key === 'magik_item' && ing.ingredientPossNumber() < ing.number_required) continue;

                this.draw_ingredients_icon(ing, it).draw_ingredients_name(key, ing, it, mw);
            }
            else --it;

            ++it;
        }

        return this;
    };

    Window_Blacksmith.prototype.draw_ingredients_icon = function(ing, it)
    {
        const true_base = (this._actor_drawn === true ? (99 + 35 + 35 + 10 + 65) : (70 + 10 + 65)) + 45;
        const base = 34;
        this.drawIcon(ing.get().iconIndex, 0, true_base + (base * it) /*-this._scrollBaseY*/);
        return this;
    };

    Window_Blacksmith.prototype.draw_ingredients_name = function(key, ing, it, mw)
    {
        const true_base = (this._actor_drawn === true ? (99 + 35 + 35 + 10 + 65) : (70 + 10 + 65)) + 45;
        const possed = ing.ingredientPossNumber();
        const startColor = possed >= ing.number_required ? '\\C[0]' : '\\C[7]';
        const endColor = '\\C[0]';
        let text = `${ing.get().name}`;

        if (key === 'magik_item') 
        {
            text = `(${text})`;   
        }

        text = `${startColor}${text}${endColor}`;

        this.drawTextEx(text, 34 + 5, (34 * it) + true_base);
        const current = `${startColor}${possed}/${ing.number_required}${endColor}`;
        this.drawTextEx(current, mw - (this.textWidth(current) - this.textWidth(startColor + endColor)), (34 * it) + true_base);
        return this;
    };

    Window_Blacksmith.prototype.drawActorFace = function(
        actor, x, y, width, height
    ) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    };

    //=============================================================================
    // **  Window_RecipeTemp **
    //=============================================================================
    function Window_RecipeTemp() {
        this.initialize(...arguments);
    }

    Window_RecipeTemp.prototype = Object.create(Window_CraftBase.prototype);
    Window_RecipeTemp.prototype.constructor = Window_RecipeTemp;

    Window_RecipeTemp.prototype.initialize = function (rect, recipe, text = '') {
        this._recipe = recipe;
        this._handlers = [];
        this._handlers_called = false;
        this._tmp_text = text;
        Window_CraftBase.prototype.initialize.call(this, rect, null, null);
    };

    Window_RecipeTemp.prototype.drawItem = function() {
        this._draw(this._recipe);
    }

    Window_RecipeTemp.prototype.addHandler = function(handler) {
        this._handlers.push(handler);
    };

    Window_RecipeTemp.prototype.callHandlers = function(_do = false)
    {
        if (this._handlers.length <= 0) return null;

        for (let index = 0; index < this._handlers.length; ++index) {
            const element = this._handlers[index];
            element(_do);
        }

        this._handlers_called = true;
    };

    Window_RecipeTemp.prototype._draw = function(recipe)
    {
        Window_CraftBase.prototype._draw.call(this, recipe);
        const item = recipe.get();
        this.drawText((this._tmp_text?.format(item.name) || `Vous avez créé ${item.name} !`), 0, 0, this.width);

        if (!this._handlers_called) this.callHandlers();
    }

    //=============================================================================
    // **  Scene_CraftingBase **
    //=============================================================================
    function Scene_CraftingBase() {
        this.initialize(...arguments);
    }

    Scene_CraftingBase.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CraftingBase.prototype.constructor = Scene_CraftingBase;

    Scene_CraftingBase.prototype.initialize = function (recipes) {
        Scene_MenuBase.prototype.initialize.call(this);
        this.init().setup(recipes);
    };

    Scene_CraftingBase.prototype.init = function()
    {
        this._craftingWindows = {};
        this._recipes = [];
        return this;
    }

    Scene_CraftingBase.prototype.setup = function(recipes)
    {
        this._recipes = recipes;
    };

    Scene_CraftingBase.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
    };

    Scene_CraftingBase.prototype.commandWindowRect = function()
    {
        const ww = Graphics.width;
        const wh = 80;
        const wx = 0;
        const wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CraftingBase.prototype.commandWindowCraftSelectRect = function()
    {
        const ww = Graphics.width / 4;
        const wh = Graphics.height - 80;
        const wx = 0;
        const wy = 80;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CraftingBase.prototype.commandWindowCraftRect = function()
    {
        const ww = Graphics.width - (Graphics.width / 4);
        const wh = Graphics.height - 80;
        const wx = Graphics.width / 4;
        const wy = 80;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CraftingBase.prototype.createCommandWindow = function()
    {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_CraftTypeSelect(rect, RotomecaItem.itemTypes, this._recipes);
        
        for (const key in RotomecaItem.itemTypes) {
            if (Object.hasOwnProperty.call(RotomecaItem.itemTypes, key)) {
                const element = RotomecaItem.itemTypes[key];
                commandWindow.setHandler(element, this.show_recipes.bind(this, element));
            }
        }
        
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._craftingWindows.main = commandWindow;
    }

    Scene_CraftingBase.prototype.show_recipes = function(type)
    {
        const rect = this.commandWindowCraftSelectRect();
        const commandWindow = new Window_CraftSelect(rect, this._recipes[type]);
        commandWindow.setHandler("cancel", this.onCommandCancel.bind(this));
        for (const key in this._recipes[type]) {
            if (Object.hasOwnProperty.call(this._recipes[type], key)) {
                const element = this._recipes[type][key];
                commandWindow.setHandler(element.item_id, this.craft.bind(this, element));
            }
        }
        this.addWindow(commandWindow);
        this._craftingWindows.recipes = commandWindow;
        this.show_recipe(this._recipes[type]);
    };

    Scene_CraftingBase.prototype.show_recipe = function(recipes)
    {
        const rect = this.commandWindowCraftRect();
        this._craftingWindows.recipe = this._show_recipe(rect, recipes);
        this.addWindow(this._craftingWindows.recipe);
    };

    Scene_CraftingBase.prototype._show_recipe = function(rect, recipes)
    {

    };

    Scene_CraftingBase.prototype.onCommandCancel = function() {
        this._craftingWindows.recipes.deselect();
        this._craftingWindows.recipes.close();
        this._craftingWindows.recipe.close();
        this._craftingWindows.main.activate();
    };

    Scene_CraftingBase.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this._craftingWindows?.recipe?.refresh();
    };

    Scene_CraftingBase.prototype.craft = function(recipe)
    {
        if (recipe.canBeCrafted()) return this._craft(recipe);
        
        return false;
    }

    Scene_CraftingBase.prototype._craft = function(recipe)
    {

    };

    Scene_CraftingBase.prototype.commandWindowTempRect = function()
    {
        const ww = Graphics.width;
        const wh = 80;
        const wx = 0;
        const wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CraftingBase.prototype.showTemporaryText = function(recipe, text = '')
    {
        if (!!this._craftingWindows.temp) 
        { 
            this._craftingWindows.temp.callHandlers(true);
            this._craftingWindows.temp._handlers_called = false;
            delete this._craftingWindows.temp;
        }

        const rect = this.commandWindowTempRect();
        const window = new Window_RecipeTemp(rect, recipe, text);
        window.addHandler(this._temporaryHandler.bind(this));
        this._craftingWindows.temp = window;
        this._craftingWindows.temp.paint();
        this.addWindow(this._craftingWindows.temp);
    };

    Scene_CraftingBase.prototype._temporaryHandler = function(_do = false, ms = 2000)
    {
        if (!_do) {
            this._t_o = setTimeout(() => {
            this._temporaryHandler(true)   
            delete this._t_o;
            }, ms); 
        }
        else {

            if (!!this._t_o)
            {
                clearTimeout(this._t_o);
                delete this._t_o;
            }

            this._craftingWindows.temp.close();
            this._craftingWindows.temp.destroy();
        }
    };

    //=============================================================================
    // **  Scene_Crafting **
    //=============================================================================
    function Scene_Crafting() {
        this.initialize(...arguments);
    }

    Scene_Crafting.prototype = Object.create(Scene_CraftingBase.prototype);
    Scene_Crafting.prototype.constructor = Scene_Crafting;

    Scene_Crafting.prototype.initialize = function (recipes = null) {
        Scene_CraftingBase.prototype.initialize.call(this, recipes ?? $gameParty.recipes);
    };

    Scene_Crafting.prototype._show_recipe = function(rect, recipes)
    {
        Scene_CraftingBase.prototype._show_recipe.call(this, rect, recipes);
        return new Window_Recipe(rect, recipes, this._craftingWindows.recipes);
    };

    /**
     * 
     * @param {RotomecaCraftingRecipe} recipe 
     */
    Scene_Crafting.prototype._craft = function(recipe)
    {
        Scene_CraftingBase.prototype._craft.call(this, recipe);
        const audio = new RotomecaSound(Rotomeca.RotomecaCraftingBlacksmith.parameters.item_created);

        if (audio.exist()) audio.play();

        for (const key in recipe._ingredients) {
            if (Object.hasOwnProperty.call(recipe._ingredients, key)) {
                const element = recipe._ingredients[key];
                $gameParty.gainItem(element.get(), -element.number_required, false);
            }
        }

        $gameParty.gainItem(recipe.getResult(), 1, false);
        this._craftingWindows.recipes.activate();
        this._craftingWindows.recipes.refresh();
        this.showTemporaryText(recipe);
    };

    //=============================================================================
    // **  Scene_Blacksmith **
    //=============================================================================
    function Scene_Blacksmith() {
        this.initialize(...arguments);
    }

    Scene_Blacksmith.prototype = Object.create(Scene_Crafting.prototype);
    Scene_Blacksmith.prototype.constructor = Scene_Blacksmith;

    Scene_Blacksmith.prototype.initialize = function () {
        Scene_Crafting.prototype.initialize.call(this, $gameParty.getItemsWithDurabilityDownByType());
    };

    Scene_Blacksmith.prototype._show_recipe = function(rect, recipes)
    {
        Scene_CraftingBase.prototype._show_recipe.call(this, rect, recipes);
        return new Window_Blacksmith(rect, recipes, this._craftingWindows.recipes);
    };

    /**
     * 
     * @param {RotomecaCraftingRecipe} recipe 
     */
    Scene_Blacksmith.prototype._craft = function(recipe)
    {
        Scene_CraftingBase.prototype._craft.call(this, recipe);
        const audio = new RotomecaSound(Rotomeca.RotomecaCraftingBlacksmith.parameters.item_repair);

        if (audio.exist()) audio.play();

        recipe.heal();

        for (const key in recipe._ingredients) {
            if (Object.hasOwnProperty.call(recipe._ingredients, key)) {
                const element = recipe._ingredients[key];

                if (!!element.get) $gameParty.gainItem(element.get(), -element.number_required, false);
            }
        }

        this._craftingWindows.recipes.activate();
        this._craftingWindows.recipes.refresh();
    };

    Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaIngredients = RotomecaIngredients;
    Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaRecipeBase = RotomecaRecipeBase;
    Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaRecipe = RotomecaRecipe;
    Rotomeca.RotomecaCraftingBlacksmith.classes.RotomecaCraftingRecipe = RotomecaCraftingRecipe;
    Rotomeca.RotomecaCraftingBlacksmith.Window_CraftTypeSelect = Window_CraftTypeSelect;
    Rotomeca.RotomecaCraftingBlacksmith.Window_CraftSelect = Window_CraftSelect;
    Rotomeca.RotomecaCraftingBlacksmith.Window_CraftBase = Window_CraftBase;
    Rotomeca.RotomecaCraftingBlacksmith.Window_Recipe = Window_Recipe;
    Rotomeca.RotomecaCraftingBlacksmith.Window_Blacksmith = Window_Blacksmith;
    Rotomeca.RotomecaCraftingBlacksmith.Window_RecipeTemp = Window_RecipeTemp;
    Rotomeca.RotomecaCraftingBlacksmith.Scene_CraftingBase = Scene_CraftingBase;
    Rotomeca.RotomecaCraftingBlacksmith.Scene_Crafting = Scene_Crafting;
    Rotomeca.RotomecaCraftingBlacksmith.Scene_Blacksmith = Scene_Blacksmith;
})();

