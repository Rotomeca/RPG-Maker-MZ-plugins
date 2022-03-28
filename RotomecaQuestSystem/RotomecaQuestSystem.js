//=============================================================================
// RotomecaQuestSystem.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (V0.9.0) Add a quest system
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @orderAfter RotomecaHelpers
 * 
 * 
 * @param Quests
 * @text Quests
 * @desc Quests database
 * @default
 * @type struct<Quest>[]
 * 
 * @param Starting quests
 * @text Starting quest
 * @desc Quest already in the quest book at the start of the game
 * @type number[]
 * 
 * @param Default Quest Enabled
 * @text Menu Quest Enabled
 * @desc Quest menu enabled by default ?
 * @default true
 * @type boolean
 * 
 * @param Auto update
 * @text Auto update ?
 * @desc Quests updating after get game datas ?
 * @default true
 * @type boolean
 * 
 * @param Update When Menu
 * @text Update When Menu
 * @desc Quests update when entering in the quest menu ?
 * @default true
 * @type boolean
 * 
 * @param ShowQuestNotif
 * @text Show quest notif ?
 * @desc Show notification when a quest is done, failed or acquired ?
 * @default true
 * @type boolean
 * 
 * @param ShowStepUpdated
 * @text Show step notif ?
 * @desc Show a notification when a step is updated ?
 * @default true
 * @type boolean
 * 
 * @param --------LANG-------
 * @desc 
 * @default
 * @type string
 * 
 * @param LANG:QUEST
 * @desc Text showed in the main menu 
 * @default Quests
 * @type string
 * 
 * @param LANG:LOCATION
 * @desc Text showed for quest location
 * @default Go to
 * @type string
 * 
 * @param LANG:PERSON
 * @desc Text showed for draw the client name
 * @default Talking to
 * @type string
 * 
 * @param LANG:KILL_MONSTER
 * @desc Text showed who show the number of monster killed
 * @default killed on
 * @type string
 * 
 * @param LANG:STEP
 * @desc Text showed befores all steps
 * @default Step
 * @type string
 * 
 * @param STEP:INCLUDE:S
 * @desc Plural for LANG:STEP ?
 * @default true
 * @type boolean
 * 
 * @param LANG:REWARD
 * @desc Text showed befores all rewards
 * @default Reward
 * @type string
 * 
 * @param REWARD:INCLUDE:S
 * @desc Plural for LANG:REWARD
 * @default true
 * @type boolean
 * 
 * @command DisableQuestMenu
 * @desc Disable the quest menu in the main menu
 * @text Disable Quest Menu
 * 
 * @command EnableQuestMenu
 * @desc Enable the quest menu in the main menu
 * @text Enable Quest Menu
 * 
 * @command Update
 * @desc Update all quests advancement
 * @text Update
 *  
 * @arg async
 * @text Async
 * @desc Not wait the update is finished before continue
 * @type boolean
 * @default false
 * 
 * @command Add
 * @desc Add a quest in the questbook
 * @text Add
 *  
 * @arg id
 * @text Id
 * @desc Id of quest to add.
 * @type number
 * @default 1
 * 
 * @command Validate
 * @desc Validate a quest in the quest book
 * @text Validate
 *  
 * @arg id
 * @text Id
 * @desc Id of quest to validate.
 * @type number
 * @default 1
 * 
 * @command ValidateStep
 * @desc Validate a step of a quest in the questbook
 * @text Validate Step
 *  
 * @arg id
 * @text Id
 * @desc Id of the quest.
 * @type number
 * @default 1
 * 
 * @arg stepId
 * @text Id
 * @desc Id of the step to validate.
 * @type number
 * @default 1
 * 
 * 
 * @command FailStep
 * @desc Fail a step of a quest in the questbook
 * @text Fail Step
 *  
 * @arg id
 * @text Id
 * @desc Id of the quest.
 * @type number
 * @default 1
 * 
 * @arg stepId
 * @text Id
 * @desc Id of the quest.
 * @type number
 * @default 1
 *  
 * @command Fail
 * @desc Fail a quest in the questbook
 * @text Fail
 * 
 * @arg id
 * @text Id
 * @desc Id of the quest to fail.
 * @type number
 * @default 1
 * 
 * @command Create
 * @desc Create a quest in the quest database
 * @text Create
 *  
 * @arg Quest
 * @text Quest
 * @desc Quest added in the database
 * @type struct<Quest>
 * 
 * @command CreateQuests
 * @desc Create quests in the quest database
 * @text CreateQuests
 *  
 * @arg Quests
 * @text Quests
 * @desc Quests added in the database
 * @type struct<Quest>[]
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Quest System ###
 * Author   -   Rotomeca
 * Version  -   0.9.0
 * Updated  -   28/03/2022
 * =============================================================================
 * 
 */

/*~struct~QuestReward:
 * @param type
 * @text Reward type
 * @type select 
 * @default Variable
 * @option Game variable
 * @value Variable
 * @option Game Switch
 * @value Switch
 * @option Gold
 * @value Gold
 * @option Item
 * @value Item
 * @option Armor
 * @value Armor
 * @option Weapon
 * @value Weapon
 * @option Quest
 * @value Quest
 * @option Custom
 * @value Custom
 *
 * @param amount
 * @text Amount
 * @type number
 * 
 * @param id
 * @text Id of the reward
 * @type number
 * @desc by type
 * 
 * 
 */

/*~struct~QuestStep:
 * @param type
 * @text Step type
 * @desc Step to do for validate the quest
 * @type select 
 * @default Variable
 * @option Game variable
 * @value Variable
 * @option Game Switch
 * @value Switch
 * @option Location
 * @value Location
 * @option Talking to
 * @value Talking
 * @option Kill x ennemy(ies)
 * @value Ennemy
 * @option Get item(s)
 * @value Items
 * @option Get weapon(s)
 * @value Weapons
 * @option Get armor(s)
 * @value Armors
 * @option Custom
 * @value Custom
 * 
 * @param Game Data Id
 * @text Game data id
 * @desc Id in the RPG MAKER MZ database
 * @type number
 * 
 * @param Step desc
 * @text Step desc
 * @desc Location/Person name/Desc
 * @type text
 * 
 * @param Amount
 * @text Amout
 * @desc Amount (Except for game switch/Location/Talking to) 
 * @type number
 * 
 * @param Is Hidden
 * @text Is Hidden ?
 * @desc Step hidden ? (Put true if in 'Next Step(s)')
 * @default false
 * @type boolean
 * 
 * @param Next Step(s)
 * @text Next Step(s)
 * @desc Next step(s) showed when validate
 * @type number[]
 * 
 */

/*~struct~Quest:
 * 
 * @param Quest Name
 * @text Quest Name
 * @desc Name showed in the menu
 * @type text
 * 
 * @param Quest desc
 * @text Quest desc
 * @desc Quest desc
 * @type multiline_string
 * 
 * @param Main quest
 * @text Main Quest ?
 * @default true
 * @type boolean
 * 
 * @param Giver
 * @text Giver
 * @desc Person who give the quest
 * @type text
 * 
 * @param Location
 * @text Location
 * @desc Quest location
 * @type text
 * 
 * @param Steps
 * @text Steps
 * @type struct<QuestStep>[]
 * 
 * @param Rewards
 * @text Rewards
 * @desc Rewards get when the quest is validate
 * 
 */


/*:fr
 * @target MZ
 * @plugindesc (V0.9.0) Ajoute un système de quête
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 *
 * @param Quests
 * @text Quêtes
 * @desc Base de données des quêtes
 * @default
 * @type struct<Quest>[]
 * 
 * @param Starting quests
 * @text Quêtes de départ
 * @desc Les quêtes déjà dans le menu de quête au lancement de la partie.
 * @type number[]
 * 
 * @param Default Quest Enabled
 * @text Activer le menu de quête
 * @desc Le menu de quête est activé par défaut ?
 * @default true
 * @type boolean
 * 
 * @param Auto update
 * @text MAJ des quêtes automatique ?
 * @desc Les quêtes sont mises à jours à chaque "évènements" 
 * @default true
 * @type boolean
 * 
 * @param Update When Menu
 * @text MAJ des quêtes dans le menu ?
 * @desc Les quêtes sont mises à jours à l'entrée du menu des quêtes ?
 * @default true
 * @type boolean
 * 
 * @param ShowQuestNotif
 * @text Afficher les notifications des quêtes ?
 * @desc Affiche une notification lorsqu'une quête est finie, échouée ou obtenu ?
 * @default true
 * @type boolean
 * 
 * @param ShowStepUpdated
 * @text Afficher les notifications des étapes ?
 * @desc Affiche une notification lorsqu'une étape est mise à jours ?
 * @default true
 * @type boolean
 * 
 * @param --------LANG-------
 * @desc 
 * @default
 * @type string
 * 
 * @param LANG:QUEST
 * @desc Texte affiché dans le menu.
 * @default Quêtes
 * @type string
 * 
 * @param LANG:LOCATION
 * @desc Texte affiché avant la localisation dans le menu de quête
 * @default Aller à
 * @type string
 * 
 * @param LANG:PERSON
 * @desc Texte affiché avant la personne à aller parler dans le menu de quête
 * @default Parler à
 * @type string
 * 
 * @param LANG:KILL_MONSTER
 * @desc Texte affiché pour définir le nombre de monstres tués dans le menu de quête
 * @default tué(s) sur
 * @type string
 * 
 * @param LANG:STEP
 * @desc Texte affiché avant la liste des étapes dans le menu de quête
 * @default Etape
 * @type string
 * 
 * @param STEP:INCLUDE:S
 * @desc Prendre en compte le pluriel pour LANG:STEP
 * @default true
 * @type boolean
 * 
 * @param LANG:REWARD
 * @desc Texte affiché avant la liste des récompenses dans le menu de quête
 * @default Récompense
 * @type string
 * 
 * @param REWARD:INCLUDE:S
 * @desc Prendre en compte le pluriel pour LANG:REWARD
 * @default true
 * @type boolean
 * 
 * @command DisableQuestMenu
 * @desc Désactive le menu de quête dans le menu
 * @text Désactiver le menu de quête
 * 
 * @command EnableQuestMenu
 * @desc Active le menu de quête dans le menu
 * @text Activer le menu de quête
 * 
 * @command Update
 * @desc Met à jours l'avancement des quêtes
 * @text MAJ
 *  
 * @arg async
 * @text Asynchrone
 * @desc N'attend pas que la mise à jours suit fini avant de passer à la ligne suivante
 * @type boolean
 * @default false
 * 
 * @command Add
 * @desc Ajoute une quête au livre de quête
 * @text Ajouter
 *  
 * @arg id
 * @text Id
 * @desc Id de la quête à ajouter.
 * @type number
 * @default 1
 * 
 * @command Validate
 * @desc Valide une quête du livre de quête
 * @text Valider
 *  
 * @arg id
 * @text Id
 * @desc Id de la quête à valider.
 * @type number
 * @default 1
 * 
 * @command ValidateStep
 * @desc Valide une étape d'une quête du livre de quête
 * @text Valider une étape
 *  
 * @arg id
 * @text Id
 * @desc Id de la quête.
 * @type number
 * @default 1
 * 
 * @arg stepId
 * @text Id
 * @desc Id de l'étape à valider.
 * @type number
 * @default 1
 * 
 * @command FailStep
 * @desc Echoue une étape d'une quête du livre de quête
 * @text Echouer une étape
 *  
 * @arg id
 * @text Id
 * @desc Id de la quête.
 * @type number
 * @default 1
 * 
 * @arg stepId
 * @text Id de l'étape
 * @desc Id de l'étape à echouer.
 * @type number
 * @default 1
 * 
 * @command Fail
 * @desc Echoue une quête du livre de quête
 * @text Echouer 
 * 
 * @arg id
 * @text Id
 * @desc Id de la quête à echouer.
 * @type number
 * @default 1
 * 
 * @command Create
 * @desc Créé une quête
 * @text Créer
 *  
 * @arg Quest
 * @text Quête
 * @desc Quête qui sera ajouter à la base de données des quêtes.
 * @type struct<Quest>
 * 
 * @command CreateQuests
 * @desc Créé plusieurs quêtes
 * @text Créer plusieurs quêtes
 *  
 * @arg Quests
 * @text Quêtes
 * @desc Quêtes qui sera ajouter à la base de données des quêtes.
 * @type struct<Quest>[]
 * 
 * @orderAfter RotomecaHelpers
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Quest System ###
 * Author   -   Rotomeca
 * Version  -   0.9.0
 * Updated  -   28/03/2022
 * =============================================================================
 * 
 * Ajoute un système de quête au jeu.
 * 
 * Utilisez le paramètre 'Quêtes' pour ajouter des quêtes à votre jeu.
 * L'id de la quête correspond au nombre en face de la quête.
 * 
 * Commandes : 
 * - Désactiver le menu de quête
 *  => Désactive le menu de quête dans le menu
 * 
 * - Activer le menu de quête
 *  => Active le menu de quête dans le menu
 * 
 * - MAJ
 *  => Met à jours l'avancement de toute les quêtes obtenu
 *    => Le paramètres 'Asynchrone' permet d'activer ou non la fin de la commande avant de faire d'autre chose
 * 
 * - Valider/Echouer
 *  => Valide ou échoue une quête
 *    => Le paramètre 'id' correspond à l'id de la quête
 * 
 * - Valider une étape/Echouer une étape
 *  => Valide ou échoue une étape/un objectif d'une quête
 *    => Le paramètre 'id' correspond à l'id de la quête qui possède l'étape
 *    => Le paramètre 'Id de l'étape' correspond à l'id de l'étape (le nombre devant la liste des étapes d'une quête)
 * 
 * - Ajouter
 *  => Ajoute une quête au livre de quête
 *    => Le paramètre 'Id' correspond à l'id de la quête dans la base de données
 * 
 * Commandes conditionnels : 
 * Lorsque vous faites une branche conditionnel, choisssez 'script' et écrivez : 
 * - $questExist(id) 
 *  => Vérifie si une quête éxiste dans la base de données
 *    => id : Id de la quête dans la base de données
 *    => Renvoie vrai (true) si elle existe, faux (false) sinon
 * 
 * - $questHave(id)
 *  => Vérifie si une quête est dans le livre de quête
 *    => id : Id de la quête dans la base de données
 *    => Renvoie vrai (true) si elle y est, faux (false) sinon
 * - $questValidate(id)/$questFailed(id)/$questInProgress(id)
 *  =>Vérifie si une quête dans le livre de quête est validée, échouée ou en cours
 *    => id : Id de la quête dans la base de données
 *    => Renvoie vrai (true) si elle est validée, échouée ou en cours, faux (false) sinon
 * 
 * - $questIsAdded()
 *  => A utiliser après la commande Ajouter
 *    => Renvoie vrai (true) si la quête n'est pas dans le livre de quête, faux (false) sinon.
 * 
 * -----------------------------------------------------------------------------------------------------------
 * Ce qu'il reste à faire : 
 *  - Notifications
 *  - Traduction du @help anglais
 * 
 */

/*~struct~QuestReward:fr
 * @param type
 * @text Type de récompense
 * @desc Type de récompense qui sera obtenu après validation de la quête
 * @type select 
 * @default Variable
 * @option Variable de jeu
 * @value Variable
 * @option Interrupteur de jeu
 * @value Switch
 * @option Or (le thune quoi $$)
 * @value Gold
 * @option Objet
 * @value Item
 * @option Armure
 * @value Armor
 * @option Arme
 * @value Weapon
 * @option Quête
 * @value Quest
 * @option Créer par l'utilisateur (script)
 * @value Custom
 *
 * @param amount
 * @text Montant
 * @type number
 * @desc Nombre de récompense(s) que l'équipe obtient
 * 
 * @param id
 * @text Id de la récompense
 * @type number
 * @desc En fonction du type
 * 
 * 
 */

/*~struct~QuestStep:fr
 * @param type
 * @text Type d'étape
 * @desc Objectif à faire pour valider la quête
 * @type select 
 * @default Variable
 * @option Variable de jeu
 * @value Variable
 * @option Intérrupteur de jeu
 * @value Switch
 * @option Localisation
 * @value Location
 * @option Parler à
 * @value Talking
 * @option Tuer des monstres
 * @value Ennemy
 * @option Obtenir un(des) objet(s)
 * @value Items
 * @option Obtenir une(des) arme(s)
 * @value Weapons
 * @option Obtenir une(des) armure(s)
 * @value Armors
 * @option Créer par l'utilisateur (script)
 * @value Custom
 * 
 * @param Game Data Id
 * @text Id de la données de jeu
 * @desc Id dans la base de données
 * @type number
 * 
 * @param Step desc
 * @text Description de l'étape
 * @desc Nom de la localisation/Nom de la personne à aller parler/Description de l'étape 
 * @type text
 * 
 * @param Amount
 * @text Montant
 * @desc Valeur à atteindre (sauf pour Intérrupteur de jeu/Localisation/Parler à) 
 * @type number
 * 
 * @param Is Hidden
 * @text Etape cachée
 * @desc L'étape est cachée ? (Mettre vrai si elle se trouve dans le tableau 'Prochaine(s) étape(s)')
 * @default false
 * @type boolean
 * 
 * @param Next Step(s)
 * @text Prochaine(s) étape(s)
 * @desc Prochaines étapes qui seront affichés après que cette étape sera validée.
 * @type number[]
 * 
 */

/*~struct~Quest:fr
 * 
 * @param Quest Name
 * @text Nom de la quête
 * @desc Nom qui sera affiché
 * @type text
 * 
 * @param Quest desc
 * @text Description de la quête
 * @desc Description de la quête. (Pensez à vérifier le retour à la ligne en jeu.)
 * @type multiline_string
 * 
 * @param Main quest
 * @text Est une quête principale ?
 * @desc Si vrai, elle sera affiché dans le menu des quêtes principales, sinon, des secondaires.
 * @default true
 * @type boolean
 * 
 * @param Giver
 * @text Client
 * @desc Personne qui donne la quête
 * @type text
 * 
 * @param Location
 * @text Localisation
 * @desc Où on a reçut la quête/où il faut aller
 * @type text
 * 
 * @param Steps
 * @text Etapes
 * @desc Les étapes/objectifs de la quête
 * @type struct<QuestStep>[]
 * 
 * @param Rewards
 * @text Récompenses
 * @desc Récompenses de la quête
 * 
 */



//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
const plugin_name = 'RotomecaQuestSystem';

var Imported = Imported || {};
Imported.RotomecaQuestSystem = true;

var Rotomeca = Rotomeca || {}; 

/**
 * Permet d'utiliser les commandes de Rpg Maker MZ
 * @type {Game_Interpreter}
 */
Rotomeca.interpreter = Rotomeca.interpreter || new Game_Interpreter();
/**
 * Paramètres ou divers variables globales du plugin
 */
Rotomeca.RotomecaQuestSystem = {}
/**
 * Paramètres du plugin
 */
Rotomeca.RotomecaQuestSystem.parameters = PluginManager.parameters(plugin_name);
Rotomeca.RotomecaQuestSystem.parameters.quest_text = String(Rotomeca.RotomecaQuestSystem.parameters['LANG:QUEST'] || "Quêtes");	
Rotomeca.RotomecaQuestSystem.parameters.default_quest_enabled = Boolean(Rotomeca.RotomecaQuestSystem.parameters['Default Quest Enabled'] || true);	
Rotomeca.RotomecaQuestSystem.parameters.quests_database = Rotomeca.RotomecaQuestSystem.parameters['Quests'] || '[]';
Rotomeca.RotomecaQuestSystem.parameters.auto_update = Boolean(Rotomeca.RotomecaQuestSystem.parameters['Auto update'] || true);
Rotomeca.RotomecaQuestSystem.parameters.update_in_menu = Boolean(Rotomeca.RotomecaQuestSystem.parameters['Update When Menu'] || true);

/**
 * Si le menu de quête est actif ou non.
 * @type {boolean}
 */
Rotomeca.RotomecaQuestSystem.isQuestEnabled = Rotomeca.RotomecaQuestSystem.parameters.default_quest_enabled;

/**
 * Base de données des quêtes
 * @type {QuestDatabase}
 */
var $gameQuests = null;

//=============================================================================
// **  Rotomeca.RotomecaQuestSystem **
//=============================================================================	
/**
 * Créer la base de données des quêtes
 */
 Rotomeca.RotomecaQuestSystem.createGameQuest = function() {
    $gameQuests = new QuestDatabase(Rotomeca.RotomecaQuestSystem.parameters.quests_database);
},

/**
 * Récupère les données de langue pour ce plugin
 * @param {string} text Clé
 * @returns {string} Texte récupérer depuis les paramètres du plugin
 */
Rotomeca.RotomecaQuestSystem.gettext = function gettext(text) {
    return Rotomeca.gettext(text, 'RotomecaQuestSystem');
}

/**
 * Récupère les paramètres de langue pour ce plugin
 * @param {string} text Clé
 * @param {string} param Clé du paramètre
 * @returns {string} valeur récupérée depuis les paramètres du plugin
 */
 Rotomeca.RotomecaQuestSystem.lang_param = function lang_param(text, param) {
    return Rotomeca.lang_param(text, param, false, 'RotomecaQuestSystem');
}

//=============================================================================
// **  PluginManager **
//=============================================================================	
PluginManager.registerCommand(plugin_name, "Update", data => {
    if (data.async) $gameParty._quests.updateQuestsAsync();
    else $gameParty._quests.updateQuests();
});	

PluginManager.registerCommand(plugin_name, "Add", data => {
    $questIsAdded.val = QuestDatabase.tryAddQuestToParty(data.id);
});	

PluginManager.registerCommand(plugin_name, "Validate", data => {
    return $gameParty._quests.validateQuest(data.id);//$gameQuests.validateQuest(data.id);
});	

PluginManager.registerCommand(plugin_name, "ValidateStep", data => {
    return $gameParty._quests.validateQuestStep(data.id, data.stepId);//$gameQuests.validateQuest(data.id);
});	

PluginManager.registerCommand(plugin_name, "Fail", data => {
    return $gameParty._quests.failQuest(data.id);
});	

PluginManager.registerCommand(plugin_name, "FailStep", data => {
    return $gameParty._quests.failQuestStep(data.id, data.stepId);//$gameQuests.validateQuest(data.id);
});	

PluginManager.registerCommand(plugin_name, "Create", data => {
    $gameQuests.addCreated(JSON.stringify([data.Quest]));
});	

PluginManager.registerCommand(plugin_name, "CreateQuests", data => {
    $gameQuests.addCreated(data.Quests); 
});	

PluginManager.registerCommand(plugin_name, "DisableQuestMenu", data => {
    Rotomeca.RotomecaQuestSystem.isQuestEnabled = false;
});	

PluginManager.registerCommand(plugin_name, "EnableQuestMenu", data => {
    Rotomeca.RotomecaQuestSystem.isQuestEnabled = true;
});	

//=============================================================================
// **  ScrptingHelper **
//=============================================================================	
/**
 * Vérifie si une quête se trouve dans la base de données
 * @param {number} id Id de la quête à vérifier 
 * @returns {boolean} Si vrai, la quête est dans la base de données
 */
function $questExist(id) {
    return $gameQuests.quests[id] == true;
}

/**
 * Vérifie si l'équippe possède une quête
 * @param {number} id Id de la quête à vérifier
 * @returns {boolean} Si vrai, l'équipe possède la quête
 */
function $questHave(id) {
    return $questExist(id) && $gameParty._quests.have(id);
}

/**
 * Vérifie si une quête est validée
 * @param {number} id Id de la quête à vérifier
 * @returns {boolean} Si vrai, la quête est validée
 */
function $questValidate(id) {
    return $questHave(id) && $gameParty._quests.succed_quests[id] == true;
}

/**
 * Vérifie si une quête est échouée
 * @param {number} id Id de la quête à vérifier
 * @returns {boolean} Si vrai, la quête est échouée
 */
function $questFailed(id) {
    return $questHave(id) && $gameParty._quests.failed_quests[id] == true;
}

/**
 * Vérifie si une quête est en cours
 * @param {number} id Id de la quête à vérifier
 * @returns {boolean} Si vrai, la quête est en cours
 */
function $questInProgress(id) {
    return $questHave(id) && !$questValidate(id) && !$questFailed(id);
}

/**
 * Retourne la valeurs retournée par la commande "Add"
 * @returns {boolean | undefined}
 */
function $questIsAdded()
{
    return $questIsAdded.val;
}

//=============================================================================
// **  RotomecaQuestSteps **
//=============================================================================	
/**
 * Représentation et fonctions lié aux étapes d'une quête
 */
class RotomecaQuestSteps {

    /**
     * Construction d'une étape
     * @param {number} id id de l'étape
     * @param {boolean} isHidden SI l'étape est cachée ou non
     */
    constructor(id, isHidden = false)
    {
        this.init().setup(id, isHidden);
    }

    /**
     * Initialise les variables de la classe
     * @returns {RotomecaQuestSteps} Chaînage
     */
    init() {
        /**
         * Id de l'étape
         * @type {number}
         */
        this.id = 0;
        /**
         * Texte affiché
         * @type {string}
         */
        this.text = '';
        /**
         * Etapes débloqués lorsque cette étape est validée !
         * @type {Array<number>}
         */
        this.nextSteps = [];
        /**
         * Si l'étape est cachée ou non
         * @type {boolean}
         */
        this.hiddenStep = false;
        /**
         * Valeur de la variable lié à l'étape
         * @type {number}
         */
        this.value = 0;
        /**
         * Objectif de l'étape
         * @type {number}
         */
        this.max = 0;
        /**
         * Function qui récupère la valeur de l'étape
         * @type {Function}
         */
        this.getValue = null
        /**
         * Function appelée lors de {@link RotomecaQuestSteps.prototype.update}
         * @type {Function}
         */
        this.onUpdate = null;
        /**
         * Vérifie si l'étape est validée
         * @type {Function}
         */
        this.validateStep = null
        /**
         * Vérifie si l'étape est échouée
         * @type {Function}
         */
        this.failedStep = null
        /**
         * L'étape est validée
         * @type {boolean}
         */
        this.isValid = false;
        /**
         * L'étape est échouée
         * @type {boolean}
         */
        this.isFailed = false;
        /**
         * Quête parente
         * @type {RotomecaQuest}
         */
        this.parent = null;
        /**
         * Etape finie ou non
         * @type {boolean}
         */
        this._finished = false;
        return this;
    }

    /**
     * Met à jours les valeurs de la classe
     * @param {number} id Id de l'étape 
     * @param {boolean} isHidden Etape caché ou non
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setup(id, isHidden) {
        this.id = id;
        this.hiddenStep = isHidden == 'true';
        return this;
    }

    /**
     * Associe une quête à cette étape
     * @param {RotomecaQuest} parent Quête qui contient cette étape 
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setParent(parent)
    {
        this.parent = parent;
        return this;
    }

    /**
     * Met à jours l'étape
     * @returns {RotomecaQuestSteps} Chaînage
     */
    update()
    {
        //Si l'étape n'est pas finie et que l'étape n'est pas cachée
        if (!this._finished && !this.hiddenStep)
        {
            //On récupère la valeur
            if (this.getValue !== null) this.value = this.getValue(this);

            //On vérifie si la quête est validée
            if (!this.isFailed && !this.isValid && this.validateStep !== null) this.isValid = this.validateStep(this);

            //On vérifie si la qupete est échouée
            if (!this.isFailed && !this.isValid && this.failedStep !== null) this.isFailed = this.failedStep(this);

            if (this.isValid) //Si valide
            {
                Rotomeca.triggerEvent('rotomeca.quest.step.validate', this);

                if (this.nextSteps.length > 0 && this.parent)
                {
                    for (let index = 0; index < this.nextSteps.length; ++index) {
                        const element = this.nextSteps[index];
                        const next_index = this.parent.getStepIndexById(element);
                        this.parent.steps[next_index].hiddenStep = false;
                    }
                }

                this._finished = true;
            }

            if (this.isFailed) // Si échouée
            {
                Rotomeca.triggerEvent('rotomeca.quest.step.failed', this);
                this._finished = true;
            }

            if (this.onUpdate !== null) this.onUpdate(this);
        }

        return this;
    }

    /**
     * Augmente la valeur interne
     * @param {number} val Valeur à ajouter
     * @returns {RotomecaQuestSteps} Chaînage
     */
    addValue(val) {
        return this.updateValue(this.value + val);
    }

    /**
     * Diminue la valeur interne
     * @param {number} val Valeur à retirer
     * @returns {RotomecaQuestSteps} Chaînage
     */
    removeValue(val) {
        return this.updateValue(this.value - val);
    }

    /**
     * Met à jour la valeur interne
     * @param {number} val Nouvelle valeur
     * @returns {RotomecaQuestSteps} Chaînage
     */
    updateValue(val) {
        this.value = val;

        if (this.value > this.max) this.value = this.max;
        else if (this.value < 0) this.value = 0;

        return this;
    }

    /**
     * Ajoute des étapes à débloqués
     * @param {Array<Number>} steps Tableau d'id d'étapes
     * @returns {RotomecaQuestSteps} Chaînage
     */
    addSteps(steps) {
        this.nextSteps = [...this.nextSteps, ...steps];
        return this;
    }

    /**
     * Force la validation de l'étape
     * @returns {RotomecaQuestSteps} Chaînage
     */
    validate()
    {
        this.isValid = true;
        this.isFailed = false;
        return this.update();
    }

    /**
     * Force l'echec de l'étape
     * @returns {RotomecaQuestSteps} Chaînage
     */
    failed()
    {
        this.isValid = false;
        this.isFailed = true;
        return this.update();
    }

    /**
     * Affiche l'étape
     * @returns {RotomecaQuestSteps} Chaînage
     */
    unhidden()
    {
        this.hiddenStep = false;
        return this;
    }

    /**
     * Associe une fonction qui va chercher la valeur en cours de l'étape
     * @param {Function} checker Function qui va chercher la valeur de l'étape
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setValueChecker(checker) {
        this.getValue = checker;
        return this;
    }

    /**
     * Associe une fonction qui vérifie si l'étape est validée ou non
     * @param {Fonction} checker 
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setValidateChecker(checker) {
        this.validateStep = checker;
        return this;
    }

    /**
     * Associe une fonction qui vérifie si l'étape est échoué ou non
     * @param {Function} checker 
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setFailedChecker(checker) {
        this.failedStep = checker;
        return this;
    }

    /**
     * Actions à faire lorsque {@link RotomecaQuestSteps.prototype.update} est appelé
     * @param {Function} func 
     * @returns {RotomecaQuestSteps} Chaînage 
     */
    setOnUpdate(func) {
        this.onUpdate = func;
        return this;
    }

    /**
     * Met à jours l'objectif de la quête
     * @param {number} max Nouvel objectif
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setMax(max) {
        this.max = max;
        return this;
    }

    /**
     * Met à jours le texte affiché
     * @param {string} txt 
     * @returns {RotomecaQuestSteps} Chaînage
     */
    setText(txt) {
        this.text = txt;
        return this;
    }

    /**
     * Récupère une forme sérializable de cet objet
     * @returns {{id:number, state:number, value:number, hidden:boolean}}
     */
    save() {
        return {
            id:this.id,
            state:(this.isValid ? 1 : (this.isFailed ? 2 : 0)),
            value:this.value,
            hidden:this.hiddenStep
        };
    }

    /**
     * Récupère les données de {@link RotomecaQuest.prototype.save} et les associe aux données de cet objet
     * @param {{id:number, state:number, value:number, hidden:boolean}} saved_step Données chargés
     * @returns {RotomecaQuestSteps} Chaînage
     */
    load(saved_step) {
        switch (saved_step.state) {
            case 1:
                this.isValid = true;
                break;

            case 2:
                this.isFailed = true;
                break;
        
            default:
                break;
        }

        this.value = saved_step.value;
        this.hiddenStep = saved_step.hidden;

        return this;
    }

}

/**
 * Créer une étape de type "variable"
 * @see Game_Variable - {@link $gameVariables}
 * @param {number} id Id de l'étape
 * @param {number} globalVariableId Id de la variable
 * @param {number} max Valeur à atteindre
 * @param {boolean} isHidden Etape cachée ou non
 * @param {string} text Si vide, on affiche le nom de la variable
 * @returns {RotomecaQuestSteps} Etape de type "Variable" 
 */
RotomecaQuestSteps.variable = (id, globalVariableId, max, isHidden = false, text = '') => {
    return new RotomecaQuestSteps(id, isHidden)
    .setMax(max)
    .setValueChecker((step) => {
        return $gameVariables.value(globalVariableId);
    })
    .setValidateChecker((step) => {
        return step.value >= step.max;
    })
    .setOnUpdate((step) => {
        if (text === '')
        {
            const txt = $dataSystem.variables[globalVariableId] ?? '';
            step.text = `${txt === '' ? '' : `${txt} : `}${step.value}/${step.max}`;
        }
        else step.text = `${text} : ${step.value}/${step.max}`;
    });
};

/**
 * Créer une étape qui est validée lorsqu'un interrupteur est activé
 * @see Game_Switch - {@link $gameSwitches}
 * @param {number} id Id de l'étape 
 * @param {number} globalSwitchId Id de l'interrupteur
 * @param {boolean} isHidden Etape cachée ou non
 * @param {string} text Si vide, on affiche le nom de l'interrupteur
 * @returns {RotomecaQuestSteps} Etape de type "Interrupteur"  
 */
RotomecaQuestSteps.switch = (id, globalSwitchId, isHidden = false, text = '') => {
    return new RotomecaQuestSteps(id, isHidden)
    .setMax(1)
    .setValidateChecker((step) => {
        return $gameSwitches.value(globalSwitchId) ? true : false;
    })
    .setOnUpdate((step) => {
        if (text === '') step.text = $dataSystem.switches[globalSwitchId] ?? '';
        else step.text = `${text}`;
    });
};

/**
 * Créer une étape qui dans le fond, est comme {@link RotomecaQuestSteps.switch}, mais qui indique un texte de localisation.
 * @param {number} id Id de l'étape 
 * @param {number} globalSwitchId Id de l'interrupteur
 * @param {string} location_name Nom de l'endroit où aller
 * @param {boolean} isHidden Etape cachée ou non
 * @returns {RotomecaQuestSteps} Etape de type "Interrupteur/Localisation"  
 */
RotomecaQuestSteps.go_to = (id, globalSwitchId, location_name, isHidden = false) => {
    return RotomecaQuestSteps.switch(id, globalSwitchId, isHidden, `${Rotomeca.RotomecaQuestSystem.gettext('LOCATION')} : ${location_name}`);
};

/**
 * Créer une étape qui dans le fond, est comme {@link RotomecaQuestSteps.switch}, mais qui indique de parler à un personnage.
 * @param {number} id Id de l'étape 
 * @param {number} globalSwitchId Id de l'interrupteur
 * @param {string} personName Nom de la personne à aller parler
 * @param {boolean} isHidden Etape cachée ou non
 * @returns {RotomecaQuestSteps} Etape de type "Interrupteur/Parler"  
 */
RotomecaQuestSteps.talk_to = (id, globalSwitchId, personName, isHidden = false) => {
    return RotomecaQuestSteps.switch(id, globalSwitchId, isHidden, `${Rotomeca.RotomecaQuestSystem.gettext('PERSON')} : ${personName}`);
};

/**
 * Créer une étape qui necessite d'avoir x trucs (Données depuis la BDD)
 * @param {number} id Id de l'étape 
 * @param {Function} getVariableFunction Récupère la valeur de l'étape
 * @param {number} variableId Id de la variable
 * @param {number} max Nombre de truc minimum à avoir
 * @param {boolean} isHidden Etape cachée ou non
 * @param {string} text Text affiché avant le décompte
 * @returns {RotomecaQuestSteps} Etape de type "Truc"  
 */
RotomecaQuestSteps.base_item = (id, getVariableFunction, variableId, max, isHidden = false, text = '') => {
    return new RotomecaQuestSteps(id, isHidden)
    .setMax(max)
    .setValueChecker((step) => {
        return getVariableFunction(variableId);
    })
    .setValidateChecker((step) => {
        return step.value >= step.max;
    })
    .setOnUpdate((step) => {
        if (text === '') step.text = `${step.value}/${step.max}`;
        else step.text = `${text} : ${step.value}/${step.max}`;
    });
};

/**
 * Créer une étape qui nécéssite de tuer des monstres
 * @param {number} id Id de l'étape 
 * @param {number} id_enemy Id du monstre dans la BDD 
 * @param {number} how_many Nombre de monstres à tuer 
 * @param {boolean} isHidden Etape cachée ou non
 * @returns {RotomecaQuestSteps} Etape de type "Tuer monster" 
 */
RotomecaQuestSteps.kill_enemy = (id, id_enemy, how_many, isHidden = false) =>
{
    return new RotomecaQuestSteps(id, isHidden)
    .setMax(how_many)
    .setValueChecker((step) => {
        if (step.monster_count_created !== true)
        {
            step.monster_count = 0;
            Rotomeca.addEventListener('Monster.Killed', (ennemy) => {
                if (ennemy.enemyId() === id_enemy) ++step.monster_count;
            });
            step.monster_count_created = true;
        }
        return step.monster_count;
    })
    .setValidateChecker((step) => {
        return step.value >= step.max;
    })
    .setOnUpdate((step) => {
        step.text = `${step.value} ${$dataEnemies[id_enemy].name} ${Rotomeca.RotomecaQuestSystem.gettext('KILL_MONSTER')} ${step.max}`;
    });
};

/**
 * Créer une étape ou il faut récupérer x objet(s)
 * @param {number} id Id de l'étape
 * @param {number} id_item Id de l'objet dans la BDD
 * @param {number} how_many Combien d'objet à trouver ?
 * @param {boolean} isHidden Etape cachée ou non
 * @returns {RotomecaQuestSteps} Etape de type "Objet" 
 */
RotomecaQuestSteps.get_items = (id, id_item, how_many, isHidden = false) =>
{
    return RotomecaQuestSteps.base_item(id, (itemId) => $gameParty._items[itemId] ?? 0, id_item, how_many, isHidden, $dataItems[id_item].name);
};

/**
 * Créer une étape ou il faut récupérer x armure(s)
 * @param {number} id Id de l'étape
 * @param {number} id_armor Id de l'armure dans la BDD
 * @param {number} how_many Combien d'armure à trouver ?
 * @param {boolean} isHidden Etape cachée ou non
 * @returns {RotomecaQuestSteps} Etape de type "Armure" 
 */
RotomecaQuestSteps.get_armor = (id, id_armor, how_many, isHidden = false) =>
{
    return RotomecaQuestSteps.base_item(id, (itemId) => $gameParty.allArmors().filter(x => x.id === itemId).length, id_armor, how_many, isHidden, $dataArmors[id_armor].name);
};

/**
 * Créer une étape ou il faut récupérer x arme(s)
 * @param {number} id Id de l'étape
 * @param {number} id_weapon Id de l'arme dans la BDD
 * @param {number} how_many Combien d'armes à trouver ?
 * @param {boolean} isHidden Etape cachée ou non
 * @returns {RotomecaQuestSteps} Etape de type "Arme" 
 */
RotomecaQuestSteps.get_weapon = (id, id_weapon, how_many, isHidden = false) =>
{
    return RotomecaQuestSteps.base_item(id, (itemId) => $gameParty.allWeapons().filter(x => x.id === itemId).length, id_weapon, how_many, isHidden, $dataWeapons[id_weapon].name);
};

//=============================================================================
// **  RotomecaQuestReward **
//=============================================================================	

class RotomecaQuestReward {
    constructor(type, id, amount)
    {
        this.init().setup(type, id, amount);
    }

    init() {
        this.reward_type = null;
        this.reward_amount = 0;
        this.reward_id = 0;
        this._rewards_actions = [];
        return this;
    }

    setup(type, id, amount) {
        this.reward_type = type;

        if ((this.reward_type ?? null) === null) throw 'Vous devez définir un type de récompense !';

        this.reward_id = id;
        this.reward_amount = parseInt(amount ?? 0);

        return this;
    }

    addAction(action)
    {
        this._rewards_actions.push(action);
        return this;
    }

    getReward() {
        switch (this.reward_type) {
            case RotomecaQuestReward.types.variable:
                return this._variableReward();

            case RotomecaQuestReward.types.switch:
                return this._switchReward();

            case RotomecaQuestReward.types.gold:
                return this._goldReward();  

            case RotomecaQuestReward.types.item:
                return this._item_reward();  

            case RotomecaQuestReward.types.armor:
                return this._armor_reward();  

            case RotomecaQuestReward.types.weapon:
                return this._weapon_reward();  

            case RotomecaQuestReward.types.quest:
                return this._questReward();  
                
            case RotomecaQuestReward.types.custom:
                return this._custom_reward();  
        
            default:
                throw 'Type de récompense inconnue ! Utilisez RotomecaQuestReward.types.custom plutôt.';
        }
    }

    _questReward()
    {
        QuestDatabase.tryAddQuestToParty(this.reward_id);
        return this;
    }

    _variableReward() {
        Rotomeca.interpreter.command122([this.reward_id, this.reward_id, 0, 0, this.reward_amount]);
        return this;
    }
    _switchReward() {
        Rotomeca.interpreter.command121([this.reward_id, this.reward_id, 0]);
        return this;
    }
    _goldReward() {
        Rotomeca.interpreter.command125([0, 0, this.reward_amount]);
        return this;
    }
    _item_reward() {
        Rotomeca.interpreter.command126([this.reward_id, 0, 0, this.reward_amount]);
        return this;
    }
    _armor_reward() {
        Rotomeca.interpreter.command128([this.reward_id, 0, 0, this.reward_amount]);
        return this;
    }
    _weapon_reward() {
        Rotomeca.interpreter.command127([this.reward_id, 0, 0, this.reward_amount]);
        return this;
    }
    _custom_reward() {

        for (let index = 0; index < this._rewards_actions.length; ++index) {
            const element = this._rewards_actions[index];
            element(this);
        }

        return this;
    }
}

RotomecaQuestReward.types = {
    variable:Symbol(),
    switch:Symbol(),
    gold:Symbol(),
    item:Symbol(),
    armor:Symbol(),
    weapon:Symbol(),
    quest:Symbol(),
    custom:Symbol()
}

//=============================================================================
// **  RotomecaQuest **
//=============================================================================	
class RotomecaQuest {
    constructor(id, name, desc, category = RotomecaQuest.defaults_categories.main)
    {
        this.init().setup(id, name, desc, category);
    }

    init() {
        this.id = 0;
        this.name = '';
        this.desc = '';
        this.creator = '';
        this.location = '';
        this.status = RotomecaQuest.status.progress;
        this.steps = [];
        this.rewards = [];
        this.category = RotomecaQuest.defaults_categories.main;
        return this;
    }

    setup(id, name, desc, category) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.category = category;
        return this;
    }

    getStepIndexById(id) {
        return this.steps.findIndex(x => x.id === id);
    }

    updateProgress(state) {
        this.status = state;
        return this;
    }

    setLocation(location) {
        this.location = location;
        return this;
    }

    setCreator(creator) {
        this.creator = creator;
        return this;
    }

    addStep(step) {
        this.steps.push(step);
        return this;
    }

    addReward(reward){
        this.rewards.push(reward);
        return this;
    }

    setRewards()
    {
        for (let index = 0; index < this.rewards.length; ++index) {
            const element = this.rewards[index];
            element.getReward();
        }

        this.rewards = null;
        this.steps = null;

        return this;
    }

    update(force = false)
    {
        if (this.isInProgress() || force)
        {
            if (!force) this.check_status(true);

            if (this.isDone())
            {
                this.setRewards();
                Rotomeca.triggerEvent('quest.done', this);
            }
            else if (this.isFailed())
            {
                Rotomeca.triggerEvent('quest.failed', this);
            }
        }


        return this;
    }

    check_status(update = true){

        if (this.isInProgress())
        {
            if (update) var hasUnvalidElement = false;
            for (let index = 0; index < this.steps.length; ++index) {
                const element = this.steps[index];

                if (element.hiddenStep) continue;

                if (update) this.steps[index].update();

                if (element.isFailed) return this.updateProgress(RotomecaQuest.status.failed);
                else if (element.isValid === false)
                {
                    if (update) 
                    { 
                        if (!hasUnvalidElement) hasUnvalidElement = true;
                    }
                    else return this;
                }
            }

            if (this.steps.filter(x => x.isValid === true).length === this.steps.length) this.updateProgress(RotomecaQuest.status.done);
        }

        return this;
    }

    isDone() {
        return this.status === RotomecaQuest.status.done;
    }

    isFailed() {
        return this.status === RotomecaQuest.status.failed;
    }

    isInProgress() {
        return this.status === RotomecaQuest.status.progress;
    }

    save() {
        let saved_datas = {
            id:this.id,
            status:(this.isDone() ? 1 : (this.isFailed() ? 2 : 0)),
            rewarded:this.rewards === null,
            steps:[]
        };

        if (this.steps !== null && this.steps.length > 0)
        {
            saved_datas.steps = [...this.steps.map(x => x.save())];
        }

        return saved_datas;
    }

    load(save_datas)
    {
        switch (save_datas.status) {
            case 1:
                this.status = RotomecaQuest.status.done;
                break;
            case 2:
                this.status = RotomecaQuest.status.failed;
                break;
            case 0:        
            default:
                this.status = RotomecaQuest.status.progress;
                break;
        }

        if (save_datas.rewarded)
        {
            this.steps = null;
            this.rewards = null;
        }
        else if (save_datas.steps.length > 0)
        {
            for (const key in save_datas.steps) {
                if (Object.hasOwnProperty.call(save_datas.steps, key)) {
                    const element = save_datas.steps[key];
                    const index = this.getStepIndexById(element.id);
                    this.steps[index].load(element);
                }
            }
        }

        return this;
    }
}  

RotomecaQuest.status = {
    'progress':Symbol(),
    'done':Symbol(),
    'failed':Symbol()
}

RotomecaQuest.defaults_categories = {
    main:Symbol(),
    side:Symbol()
}

//=============================================================================
// **  QuestDatabase **
//=============================================================================	

class QuestDatabase {
    constructor(database) {
        this.init().setup(database);
    }

    init() {
        this.quests = {};
        return this;
    }

    setup(database) {
        database = JSON.parse(database);

        let temporary_step = null;
        let temporary_quest = null;
        let temporary_reward_type = null;
        for (let index = 0; index < database.length; ++index) {
            const raw_quest = JSON.parse(database[index]);

            temporary_quest = new RotomecaQuest(index + 1, raw_quest['Quest Name'], raw_quest['Quest desc'], (raw_quest['Main quest'] == 'true' ? RotomecaQuest.defaults_categories.main : RotomecaQuest.defaults_categories.side))
                .setCreator(raw_quest['Giver'])
                .setLocation(raw_quest['Location']);

            if (raw_quest['Rewards'] !== '') {
                const raw_rewards = JSON.parse(raw_quest['Rewards']);

                for (let i = 0; i < raw_rewards.length; ++i) {
                    const reward = JSON.parse(raw_rewards[i]);
                    switch (reward['type']) {
                        case 'Gold':
                            temporary_reward_type = RotomecaQuestReward.types.gold;
                            break;

                        case 'Variable':
                            temporary_reward_type = RotomecaQuestReward.types.variable;
                            break;

                        case 'Switch':
                            temporary_reward_type = RotomecaQuestReward.types.switch;
                            break;        

                        case 'Item':
                            temporary_reward_type = RotomecaQuestReward.types.item;
                            break;   

                        case 'Armor':
                            temporary_reward_type = RotomecaQuestReward.types.armor;
                            break;   

                        case 'Weapon':
                            temporary_reward_type = RotomecaQuestReward.types.weapon;
                            break;   

                        case 'Quest':
                            temporary_reward_type = RotomecaQuestReward.types.quest;
                            break;   
    
                        case 'Custom':
                            temporary_reward_type = RotomecaQuestReward.types.custom;
                            break;   
                        default:
                            break;
                    }
                    temporary_quest.addReward(new RotomecaQuestReward(temporary_reward_type, reward['id'], reward.amount));
                }

            }

            if (raw_quest['Steps'] !== '')
            {
                const raw_steps = JSON.parse(raw_quest['Steps']);

                for (let i = 0; i < raw_steps.length; ++i) {
                    const step = JSON.parse(raw_steps[i]);
                    
                    switch (step.type) {
                        case 'Variable':
                            temporary_step = RotomecaQuestSteps.variable(i, step['Game Data Id'], step['Amount'], step['Is Hidden'], step['Step desc']);
                            break;

                        case 'Location':
                            temporary_step = RotomecaQuestSteps.go_to(i, step['Game Data Id'], step['Step desc'], step['Is Hidden']);
                            break;

                        case 'Talking':
                            temporary_step = RotomecaQuestSteps.talk_to(i, step['Game Data Id'], step['Step desc'], step['Is Hidden']);
                            break;

                        case 'Switch':
                            temporary_step = RotomecaQuestSteps.switch(i, step['Game Data Id'], step['Is Hidden'], step['Step desc']);
                            break;

                        case 'Ennemy':
                            temporary_step = RotomecaQuestSteps.kill_enemy(i, step['Game Data Id'], step['Amount'], step['Is Hidden']);
                            break;    
                            
                        case 'Items':
                            temporary_step = RotomecaQuestSteps.get_items(i, step['Game Data Id'], step['Amount'], step['Is Hidden']);
                            break;

                        case 'Weapons':
                            temporary_step = RotomecaQuestSteps.get_weapon(i, step['Game Data Id'], step['Amount'], step['Is Hidden']);
                            break;

                        case 'Armors':
                            temporary_step = RotomecaQuestSteps.get_armor(i, step['Game Data Id'], step['Amount'], step['Is Hidden']);
                            break;

                        case 'Custom':
                            temporary_step = Rotomeca.triggerEvent(`Quest.GetCustomStep.Quest_${index + 1}_Step_${i + 1}`);
                            break;
    

                        default:
                            break;
                    }

                    if (step['Next Step(s)'] !== '')
                    {
                        temporary_step.addSteps(JSON.parse(step["Next Step(s)"]).map(x => JSON.parse(x) - 1));
                    }

                    temporary_quest.addStep(temporary_step.setParent(temporary_quest));
                    temporary_step = null;
                }
            }

            this.quests[index + 1] = temporary_quest;
            temporary_quest = null;
        }

        return this;
    }

    get(id) {
        return this.quests[id];
    }

    addCreated(arrayOfQuests){
        const tmp = this.quests;
        this.quests = {};
        return this.setup(arrayOfQuests)._addCreated(this.quests, tmp);
    }

    _addCreated(newQuests, currentQuests)
    {
        let obj = {};
        const lastIndex = Object.keys(currentQuests).map(x => parseInt(x)).pop() + 1;
        let index = lastIndex;
        for (const key in newQuests) {
            if (Object.hasOwnProperty.call(newQuests, key)) {
                const element = newQuests[key];
                obj[index] = element;
                obj[index].id = index++;
            }
        }
        this.quests = Object.assign(obj, currentQuests);
        return this;
    }

    /**
     * 
     * @param {RotomecaQuest} quest 
     */
    add(quest){
        this.quests[quest.id] = quest;
        return this;
    }

    addRange(quests) {
        for (const key in quests) {
            if (Object.hasOwnProperty.call(quests, key)) {
                const element = quests[key];
                this.add(element);
            }
        }
        return this;
    }

    static addQuestToParty(id){
        $gameParty._quests.add($gameQuests.quests[id]);
    }

    static tryAddQuestToParty(id) {
        let added = true;

        if ($gameQuests.quests[id] === undefined) this.addQuestToParty(id);
        else added = false;

        return added;
    }
}

//=============================================================================
// **  QuestBook **
//=============================================================================	
class QuestBook {
    constructor()
    {
        this.main_quests = [];
        this.side_quests = [];
        this.failed_quests = [];
        this.succed_quests = [];
    }

    save()
    {
        return {
            main:this._save(this.main_quests),
            side:this._save(this.side_quests),
            failed:this._save(this.failed_quests),
            success:this._save(this.succed_quests),
        }
    }

    _save(quests) {
        return quests.map(x => x.save());
    }

    static load(saved_book)
    {
        let book = new QuestBook();
        book.main_quests = QuestBook._load(saved_book.main);
        book.side_quests = QuestBook._load(saved_book.side);
        book.failed_quests = QuestBook._load(saved_book.failed);
        book.succed_quests = QuestBook._load(saved_book.success);

        return book;
    }

    static _load(saved_quests) {
        let retour = [];
        let array = saved_quests.filter(x => x !== null).map(x => $gameQuests.get(x.id).load(x));
        for (const key in array) {
            if (Object.hasOwnProperty.call(array, key)) {
                const element = array[key];
                retour[element.id] = element;
            }
        }

        return retour;
    }

    isValid(id) {
        return this.have(id) && this.succed_quests[id] == true;
    }

    isFailed(id) {
        return this.have(id) && this.failed_quests[id] == true;
    }

    isInProgress(id) {
        return !this.isValid(id) && !this.isFailed();
    }

    isMainQuest(id) {
        return this.have(id) && this.main_quests[id] == true;
    }

    stepQuestExist(id, stepId) {
        return this.have(id) && this.getQuest(id).steps[stepId] == true;
    }

    /**
     * 
     * @param {number} id 
     * @returns {RotomecaQuest}
     */
    getQuest(id) {
        for (const member in this) {
            if (Object.hasOwnProperty.call(this, member)) 
            {
                if (this[member][id] !== undefined && this[member][id] !== null) return this[member][id];
            }
        }

        return null;
    }

    validateQuest(id) {
        if (this.have(id))
        {
            const quest = (this.isMainQuest(id) ? this.main_quests[id] : this.side_quests[id]).updateProgress(RotomecaQuest.status.done).update(true);
            this.update_category();
            return quest;
        }
        
        return false;
    }

    validateQuestStep(questId, stepId) {
        const stepIndex = this.quests[questId].getStepIndexById(stepId);

        if (this.stepQuestExist(id, stepIndex)) 
        {
            const step = this.getQuest(id).steps[stepIndex].validate();
            this.update();
            return step;
        }
        return false;
    }

    failQuest(id) {
        if (this.have(id))
        {
            const quest = (this.isMainQuest(id) ? this.main_quests[id] : this.side_quests[id]).updateProgress(RotomecaQuest.status.failed).update(true);
            this.update_category();
            return quest;
        }
        
        return false;
    }

    failQuestStep(questId, stepId) {
        const stepIndex = this.quests[questId].getStepIndexById(stepId);

        if (this.stepQuestExist(id, stepIndex))
        {
            const step = this.getQuest(id).steps[stepIndex].failed();
            this.update();
            return step;
        }
        return false;
    }

    have(id) {
        for (const member in this) {
            if (Object.hasOwnProperty.call(this, member)) 
            {
                if (this[member][id] !== undefined && this[member][id] !== null) return true;
            }
        }

        return false;
    }

    /**
     * 
     * @param {RotomecaQuest} quest 
     */
    add(quest) {
        if (quest.isDone()) this.succed_quests[quest.id] = quest;
        else if (quest.isFailed()) this.failed_quests[quest.id] = quest;
        else if (quest.category === RotomecaQuest.defaults_categories.main) this.main_quests[quest.id] = quest;
        else if (quest.category === RotomecaQuest.defaults_categories.side) this.side_quests[quest.id] = quest;
        else throw "Impossible d'ajouter la quête !";
    }

    async update_category_async()
    {
        let wait_all = [new Promise((ok, nok) => {
            this._update_category_main();
            ok(true);
        }),
        new Promise((ok, nok) => {
            this._update_category_side();
            ok(true);
        })];

        await Promise.allSettled(wait_all);
    }

    async update_async() {
        await Promise.allSettled([...this._update_main_async(), ...this._update_side_async()]);
        await this.update_category_async();
    }

    update() {
        return this._update_main()._update_side().update_category();
    }

    _update_main() {
        for (const key in this.main_quests) {
            if (Object.hasOwnProperty.call(this.main_quests, key)) {
                this.main_quests[key].update();               
            }
        }

        return this;
    }

    _update_side() {
        for (const key in this.side_quests) {
            if (Object.hasOwnProperty.call(this.side_quests, key)) {
                this.side_quests[key].update();               
            }
        }

        return this;
    }

    _update_main_async() {
        let array_of_promises = [];
        for (const key in this.main_quests) {
            if (Object.hasOwnProperty.call(this.main_quests, key)) {
                array_of_promises.push(new Promise((ok, nok) => {
                    this.main_quests[key].update();    
                    ok(true);
                }));           
            }
        }
        return array_of_promises;
    }

    _update_side_async() {
        let array_of_promises = [];
        for (const key in this.side_quests) {
            if (Object.hasOwnProperty.call(this.side_quests, key)) {
                array_of_promises.push(new Promise((ok, nok) => {
                    this.side_quests[key].update();    
                    ok(true);
                }));           
            }
        }
        return array_of_promises;
    }

    update_category() {
        return this._update_category_main()._update_category_side();
    }

    _update_category_main() {
        for (const key in this.main_quests) {
            if (Object.hasOwnProperty.call(this.main_quests, key)) {
                if (this.main_quests[key].isDone())
                {
                    this.succed_quests[key] = this.main_quests[key];
                    delete this.main_quests[key];
                }
                else if (this.main_quests[key].isFailed())
                {
                    this.failed_quests[key] = this.main_quests[key];
                    delete this.main_quests[key];
                }
            }
        }
        return this;
    }

    _update_category_side() {
        for (const key in this.side_quests) {
            if (Object.hasOwnProperty.call(this.side_quests, key)) {
                if (this.side_quests[key].isDone())
                {
                    this.succed_quests[key] = this.side_quests[key];
                    delete this.side_quests[key];
                }
                else if (this.side_quests[key].isFailed())
                {
                    this.failed_quests[key] = this.side_quests[key];
                    delete this.side_quests[key];
                }
            }
        }
        return this;
    }
}

//=============================================================================
// **  Game_Party **
//=============================================================================	

const alias_rotomeca_Game_Party_prototype_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    this._quests = new QuestBook();
    alias_rotomeca_Game_Party_prototype_initialize.call(this);
};

const alias_rotomeca_Game_Party_prototype_initAllItems = Game_Party.prototype.initAllItems;
Game_Party.prototype.initAllItems = function () {
    alias_rotomeca_Game_Party_prototype_initAllItems.call(this);
    let default_quests = Rotomeca.RotomecaQuestSystem.parameters['Starting quests'] || '';

    if (default_quests !== '')
    {
        default_quests = JSON.parse(default_quests).map(x => JSON.parse(x));

        for (let index = 0; index < default_quests.length; ++index) {
            const element = default_quests[index];
            if ($gameQuests.quests[element] !== undefined) this._quests.add($gameQuests.quests[element]);
        }
    }
};

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

Game_Party.prototype.updateQuests = function() {
    this._quests.update();
}

Game_Party.prototype.updateQuestsAsync = async function() {
    await this._quests.update_async();
}

if (Rotomeca.RotomecaQuestSystem.parameters.auto_update)
{
    const alias_rotomeca_Game_Party_prototype_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip)
    {
        alias_rotomeca_Game_Party_prototype_gainItem.call(this, item, amount, includeEquip);
        $gameParty.updateQuestsAsync();
    }
}

//=============================================================================
// **  Game_Interpreter **
//=============================================================================	

if (Rotomeca.RotomecaQuestSystem.parameters.auto_update){
    
    //Variable updated by command
    const alias_rotomeca_Game_Interpreter_prototype_command122 = Game_Interpreter.prototype.command122;
    Game_Interpreter.prototype.command122 = function(params) {
        alias_rotomeca_Game_Interpreter_prototype_command122.call(this, params);
        $gameParty.updateQuestsAsync();
        return true;
    };
    
    //Switch
    const alias_rotomeca_Game_Interpreter_prototype_command123 = Game_Interpreter.prototype.command123;
    Game_Interpreter.prototype.command123 = function(...args)
    {
        alias_rotomeca_Game_Interpreter_prototype_command123.call(this, ...args);
        $gameParty.updateQuestsAsync();
        return true;
    }
}

//=============================================================================
// **  Game_Battler **
//=============================================================================	

const alias_rotomeca_Game_Battler_prototype_performCollapse = Game_Battler.prototype.performCollapse;
Game_Battler.prototype.performCollapse = function()
{
    alias_rotomeca_Game_Battler_prototype_performCollapse.call(this);
    if (this.isEnemy() && this.isDead()) Rotomeca.triggerEvent('Monster.Killed', this);
}

if (Rotomeca.RotomecaQuestSystem.parameters.auto_update) {
    const alias_rotomeca_Game_Battler_prototype_onBattleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function() {
        alias_rotomeca_Game_Battler_prototype_onBattleEnd.call(this);
        $gameParty.updateQuestsAsync();
    }
}

//=============================================================================
// **  Scene_Title **
//=============================================================================	
const alias_rotomeca_Scene_Title_prototype_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function()
{
    Rotomeca.RotomecaQuestSystem.createGameQuest();
    alias_rotomeca_Scene_Title_prototype_commandNewGame.call(this);
}

//=============================================================================
// **  Scene_Load **
//=============================================================================	

const alias_rotomeca_Scene_Load_prototype_executeLoad = Scene_Load.prototype.executeLoad;
Scene_Load.prototype.executeLoad = function(savefileId)
{
    Rotomeca.RotomecaQuestSystem.createGameQuest();
    alias_rotomeca_Scene_Load_prototype_executeLoad.call(this, savefileId);
}

const alias_rotomeca_Scene_Load_prototype_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
    alias_rotomeca_Scene_Load_prototype_onLoadSuccess.call(this);
    $gameParty._quests = QuestBook.load($gameParty._quests);
};

//=============================================================================
// **  Scene_Save **
//=============================================================================	

const alias_rotomeca_Scene_Save_prototype_executeSave = Scene_Save.prototype.executeSave;
Scene_Save.prototype.executeSave = function(savefileId)
{
    Rotomeca.RotomecaQuestSystem.tmp = $gameParty._quests;
    $gameParty._quests = $gameParty._quests.save();
    alias_rotomeca_Scene_Save_prototype_executeSave.call(this,savefileId);
}

const alias_rotomeca_Scene_Save_prototype_onSaveSuccess = Scene_Save.prototype.onSaveSuccess;
Scene_Save.prototype.onSaveSuccess = function() {
    alias_rotomeca_Scene_Save_prototype_onSaveSuccess.call(this);
    $gameParty._quests = Rotomeca.RotomecaQuestSystem.tmp;
}

//=============================================================================
// **  Scene_Menu **
//=============================================================================	

Window_MenuCommand.prototype.isQuestEnabled = function() {
    return Rotomeca.RotomecaQuestSystem.isQuestEnabled === true;
};

const alias_rotomeca_Window_MenuCommand_prototype_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	alias_rotomeca_Window_MenuCommand_prototype_addOriginalCommands.call(this);
    if (this.needsCommand("quest")) {
        const enabled = this.isQuestEnabled();
        this.addCommand(Rotomeca.RotomecaQuestSystem.parameters.quest_text, "quest", enabled);
    }
};

Rotomeca.addEventListener('Scene_Menu.createCommandWindow.after', (scene, commands) => {
     commands.setHandler("quest", (() => {SceneManager.push(Scene_Quest);}).bind(scene));
});

//=============================================================================
// **  Window_MenuQuestCommand **
//=============================================================================	
function Window_MenuQuestCommand() {
    this.initialize(...arguments);
}

Window_MenuQuestCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_MenuQuestCommand.prototype.constructor = Window_MenuQuestCommand;

Window_MenuQuestCommand.prototype.initialize = function (rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_MenuQuestCommand.prototype.makeCommandList = function() {
    this.addOriginalCommands();
};

Window_MenuQuestCommand.prototype.addOriginalCommands = function(){
    this.addCommand("Principales", "main", $gameParty._quests.main_quests.filter(x => (x ?? null) !== null).length > 0);
    this.addCommand("Secondaires", "side", $gameParty._quests.side_quests.length > 0);
    this.addCommand("Finies", "done", $gameParty._quests.succed_quests.length > 0);
    this.addCommand("Echouées", "failed", $gameParty._quests.failed_quests.length > 0);
}

//=============================================================================
// **  Window_QuestSelect **
//=============================================================================	

function Window_QuestSelect() {
    this.initialize(...arguments);
}

Window_QuestSelect.prototype = Object.create(Window_Command.prototype);
Window_QuestSelect.prototype.constructor = Window_QuestSelect;

Window_QuestSelect.prototype.initialize = function (rect, quests) {
    this._quests = quests;
    Window_Command.prototype.initialize.call(this, rect);
};

Window_QuestSelect.prototype.makeCommandList = function() {
    Window_Command.prototype.makeCommandList.call(this);
    this.addOriginalCommands();
};

Window_QuestSelect.prototype.addOriginalCommands = function(){
    for (const key in this._quests) {
        if (this._quests[key] !== null && Object.hasOwnProperty.call(this._quests, key)) {
            const element = this._quests[key];
            this.addCommand(element.name, element.id, true);
        }
    }
}

//=============================================================================
// **  Window_QuestBase **
//=============================================================================	

function Window_QuestBase() {
    this.initialize(...arguments);
}

Window_QuestBase.prototype = Object.create(Window_Scrollable.prototype);
Window_QuestBase.prototype.constructor = Window_QuestBase;

Window_QuestBase.prototype.initialize = function (rect, parent, quests) {
    this._parent = parent;
    this._index = parent._index; 
    this._quests = quests;
    Window_Scrollable.prototype.initialize.call(this, rect);
    this.paint();
};

Window_QuestBase.prototype.paint = function() {
    Window_Scrollable.prototype.paint.call(this);
    this.createContents();
    try {
        this.drawItem();
    } catch (error) {
        
    }
    this._refresh();
};

Window_QuestBase.prototype.refresh = function() {
    this._index = this._parent._index; 
    this.update();
    this.paint();
}

Window_QuestBase.prototype._refresh = function() {

}

Window_QuestBase.prototype.drawItem = function() {
    this._draw(this._quests[parseInt(this._parent._list[this._index].symbol)])
}

Window_QuestBase.prototype._draw = function(current_quest) 
{
    //Somethings
}

//=============================================================================
// **  Window_QuestMain **
//=============================================================================	

function Window_QuestMain() {
    this.initialize(...arguments);
}

Window_QuestMain.prototype = Object.create(Window_QuestBase.prototype);
Window_QuestMain.prototype.constructor = Window_QuestMain;

Window_QuestMain.prototype.initialize = function (rect, parent, quests) {
    Window_QuestBase.prototype.initialize.call(this, rect, parent, quests);
};

Window_QuestMain.prototype._draw = function(current_quest)
{
    Window_QuestBase.prototype._draw.call(this);
    this._draw_name(current_quest.name);
    this._draw_location(current_quest.location);//creator
    this._draw_giver(current_quest.creator);
}

Window_QuestMain.prototype._draw_name = function(name) {
    const x = 0;
    const y = 36;
    const mw = Graphics.width - Graphics.width / 4;
    this.drawText('Quête : ' + name,x, y, mw);
}

Window_QuestMain.prototype._draw_giver = function(giver) {
    const x = (Graphics.width - Graphics.width / 4) - 24 - this.textWidth(giver);
    const y = 0;
    const mw = (Graphics.width - Graphics.width / 4) / 2;
    this.drawText(giver, x, y, mw);
}

Window_QuestMain.prototype._draw_location = function(location) {
    const x = 0;
    const y = 0;
    const mw = (Graphics.width - Graphics.width / 4) / 2;
    this.drawText(location, x, y, mw);
}

//=============================================================================
// **  Window_QuestDesc **
//=============================================================================	

function Window_QuestDesc() {
    this.initialize(...arguments);
}

Window_QuestDesc.prototype = Object.create(Window_QuestBase.prototype);
Window_QuestDesc.prototype.constructor = Window_QuestDesc;

Window_QuestDesc.prototype.initialize = function (rect, parent, quests) {
    Window_QuestBase.prototype.initialize.call(this, rect, parent, quests);
};

Window_QuestDesc.prototype._draw = function(current_quest)
{
    Window_QuestBase.prototype._draw.call(this);
    this._draw_desc(current_quest.desc);
}

Window_QuestDesc.prototype._draw_desc = function(desc) {
    const x = 0;
    const y = -this._scrollBaseY;
    this.drawTextEx(desc, x, y, this.textWidth(desc));
}

Window_QuestDesc.prototype.overallHeight = function() {
    try {
        return this.textSizeEx(this._quests[parseInt(this._parent._list[this._index].symbol)].desc).height;
    } catch (error) {
        return 0;
    }
};

//=============================================================================
// **  Window_QuestSteps **
//=============================================================================	

function Window_QuestSteps() {
    this.initialize(...arguments);
}

Window_QuestSteps.prototype = Object.create(Window_QuestBase.prototype);
Window_QuestSteps.prototype.constructor = Window_QuestSteps;

Window_QuestSteps.prototype.initialize = function (rect, parent, quests) {
    Window_QuestBase.prototype.initialize.call(this, rect, parent, quests);
};

Window_QuestSteps.prototype.current_quest = function() {
    return this._quests[parseInt(this._parent._list[this._index].symbol)];
};

Window_QuestSteps.prototype._draw = function(current_quest)
{
    Window_QuestBase.prototype._draw.call(this);
    this._draw_steps(current_quest.steps);
}

Window_QuestSteps.prototype._draw_steps = function(quest_steps) {
    let corrector = 0;
    const x = 0;
    const y = -this._scrollBaseY;
    const mw = (Graphics.width - Graphics.width / 4) / 2 - 24;
    const steps = quest_steps.sort((a, b) => {
        if (a.isValid === b.isValid) return 0;

        return a.isValid && !b.isValid ? 1 : -1;
    });

    this.drawText(`${Rotomeca.RotomecaQuestSystem.gettext('STEP')}${steps.length > 1 && Rotomeca.RotomecaQuestSystem.lang_param('STEP', 'INCLUDE:S') ? 's' : ''} : `, x,0, mw);
    for (let index = 0; index < steps.length; ++index) {
        const element = steps[index];
        if (element.hiddenStep) {
            ++corrector;
            continue;
        };
        this.resetTextColor();
        if (element.isValid) this.changeTextColor('green');
        this.drawText(element.text, x,y + (index + 1 - corrector) * this.lineHeight(), mw);
    }
}

Window_QuestSteps.prototype.overallHeight = function() {
    try {
        if (this.current_quest && this.current_quest().steps) return (this.current_quest().steps.length + 1) * this.lineHeight();
        else return 0;
    } catch (error) {
        return 0;
    }
};

//=============================================================================
// **  Window_QuestRewards **
//=============================================================================	

function Window_QuestRewards() {
    this.initialize(...arguments);
}

Window_QuestRewards.prototype = Object.create(Window_QuestBase.prototype);
Window_QuestRewards.prototype.constructor = Window_QuestRewards;

Window_QuestRewards.prototype.initialize = function (rect, parent, quests) {
    Window_QuestBase.prototype.initialize.call(this, rect, parent, quests);
};

Window_QuestRewards.prototype.current_quest = function() {
    return this._quests[parseInt(this._parent._list[this._index].symbol)];
};

Window_QuestRewards.prototype._draw = function(current_quest)
{
    Window_QuestBase.prototype._draw.call(this);
    this._draw_rewards(current_quest.rewards);
}

Window_QuestRewards.prototype._draw_rewards = function(quest_rewards) {
    let corrector = 0;
    const x = 0;
    const y = -this._scrollBaseY;
    const mw = (Graphics.width - Graphics.width / 4) / 2 - 24;
    const rewards = quest_rewards;

    this.drawText(`${Rotomeca.RotomecaQuestSystem.gettext('REWARD')}${rewards.length > 1 && Rotomeca.RotomecaQuestSystem.lang_param('REWARD', 'INCLUDE:S') ? 's' : ''} : `, x,y, mw);
    for (let index = 0; index < rewards.length; ++index) {
        const element = rewards[index];
        this._draw_reward(element, x, y + (index + 1 - corrector) * this.lineHeight(), mw);
    }
}

/**
 * Affiche une recompense dans le livre de quête
 * @param {RotomecaQuestReward} reward 
 * @param {number} x 
 * @param {number} y 
 * @param {number} mw 
 */
Window_QuestRewards.prototype._draw_reward = function(reward, x, y, mw){
    switch (reward.reward_type) {
        case RotomecaQuestReward.types.gold:
            this.drawIcon(169, x, y);
            this.drawText(`x${reward.reward_amount}`, x + 32, y, mw - 32);
            break;

        case RotomecaQuestReward.types.armor:
            this.drawIcon($dataArmors[reward.reward_id].iconIndex, x, y);
            this.drawText(`${$dataArmors[reward.reward_id].name}x${reward.reward_amount}`, x + 32, y, mw - 32);
            break;

        case RotomecaQuestReward.types.weapon:
            this.drawIcon($dataWeapons[reward.reward_id].iconIndex, x, y);
            this.drawText(`${$dataWeapons[reward.reward_id].name}x${reward.reward_amount}`, x + 32, y, mw - 32);
            break;

        case RotomecaQuestReward.types.item:
            this.drawIcon($dataItems[reward.reward_id].iconIndex, x, y);
            this.drawText(`${$dataItems[reward.reward_id].name}x${reward.reward_amount}`, x + 32, y, mw - 32);
            break;

        case RotomecaQuestReward.types.quest:
            this.drawIcon($gameQuests.get(reward.reward_id).category === RotomecaQuest.defaults_categories.main ? 229 : 230, x, y);
            this.drawText($gameQuests.get(reward.reward_id).name, x + 32, y, mw - 32);
            break;

        default:
            break;
    }
};

Window_QuestRewards.prototype.overallHeight = function() {
    try {
        return (this.current_quest().rewards.length + 1) * this.lineHeight();
    } catch (error) {
        return 0;
    }
};


//=============================================================================
// **  Window_Quest **
//=============================================================================	
function Window_Quest() {
    this.initialize(...arguments);
}

Window_Quest.prototype = Object.create(Window_QuestBase.prototype);
Window_Quest.prototype.constructor = Window_Quest;

Window_Quest.prototype.initialize = function (rect, command_window, parent, quests) {
    this._windows = [];
    this._parentObject = parent;
    this._index_changed = false;
    Window_QuestBase.prototype.initialize.call(this, rect, command_window, quests);
};

Window_Quest.prototype.refresh = function() {
    this._index_changed = this._index !== this._parent._index;
    Window_QuestBase.prototype.refresh.call(this);
};

Window_Quest.prototype._refresh = function() {  
    Window_QuestBase.prototype._refresh.call(this);
    for (let index = 0; index < this._windows.length; ++index) {
        const element = this._windows[index];
        if (this._index_changed) element.scrollTo(0, 0);
        element.refresh();
    }
    
}

Window_Quest.prototype.add = function(_class, rect)
{
    this._windows.push(new _class(rect, this._parent, this._quests));
    this._parentObject.addWindow(this._windows[this._windows.length - 1]);
}

//=============================================================================
// **  Scene_Quest **
//=============================================================================	
function Scene_Quest() {
    this.initialize(...arguments);
}

Scene_Quest.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Quest.prototype.constructor = Scene_Quest;

Scene_Quest.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    this.setup();
};

Scene_Quest.prototype.setup = function() {
    if (Rotomeca.RotomecaQuestSystem.parameters.update_in_menu) $gameParty.updateQuests();
    return this;
};

Scene_Quest.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
};

Scene_Quest.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};

Scene_Quest.prototype.commandWindowRect = function() {
    const ww = Graphics.width / 2;
    const wh = 80;
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.commandQuestSelectRect = function() {
    const ww = Graphics.width / 4;
    const wh = Graphics.height - 80;
    const wx = 0;
    const wy = 80;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.commandQuestRect = function() {
    const ww = Graphics.width - Graphics.width / 4;
    const wh = Graphics.height - 80;
    const wx = Graphics.width / 4;
    const wy = 80;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.commandQuestMainRect = function() {
    const ww = Graphics.width - Graphics.width / 4;
    const wh = 200;
    const wx = Graphics.width / 4;
    const wy = 80;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.commandQuestDescRect = function() {
    const ww = Graphics.width - Graphics.width / 4;
    const wh = 200;
    const wx = Graphics.width / 4;
    const wy = 160;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.commandQuestStepsRect = function() {
    const ww = (Graphics.width - Graphics.width / 4) / 2;
    const wh = 240;
    const wx = Graphics.width / 4;
    const wy = 360;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.commandQuestRewardsRect = function() {
    const ww = (Graphics.width - Graphics.width / 4) / 2;
    const wh = 240;
    const wx = (Graphics.width / 4) * 2.5;
    const wy = 360;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.createCommandWindow = function()
{
    const rect = this.commandWindowRect();
    const commandWindow = new Window_MenuQuestCommand(rect);
    commandWindow.setHandler("main", this.commandMain.bind(this));
    commandWindow.setHandler("side", this.commandSide.bind(this));
    commandWindow.setHandler("done", this.commandDone.bind(this));
    commandWindow.setHandler("failed", this.commandFailed.bind(this));
    commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(commandWindow);
    this._commandWindow = commandWindow;
}

Scene_Quest.prototype._command = function(quests, command_name) {
    const rect = this.commandQuestSelectRect();
    const commandWindow = new Window_QuestSelect(rect, quests);
    // for (const key in quests) {
    //     if (Object.hasOwnProperty.call(quests, key)) {
    //         const element = quests[key];
    //         commandWindow.setHandler(element.id, () => {});
    //     }
    // }
    commandWindow.setHandler("cancel", this.onCommandCancel.bind(this));
    this.addWindow(commandWindow);
    this['_window_' + command_name] = commandWindow;
    this.show_quest(quests);
};

Scene_Quest.prototype.show_quest = function(quests){
    const rect = this.commandQuestRect();
    let window = new Window_Quest(rect, this['_window_' + this._current_command], this, quests);
    this.addWindow(window);
    window.add(Window_QuestMain, this.commandQuestMainRect());
    window.add(Window_QuestDesc, this.commandQuestDescRect());
    window.add(Window_QuestSteps, this.commandQuestStepsRect());
    window.add(Window_QuestRewards, this.commandQuestRewardsRect());
    this._current_window_quest = window;
    console.log(this);
}

Scene_Quest.prototype.onCommandCancel = function() {
    this['_window_' + this._current_command].deselect();
    this['_window_' + this._current_command].close();
    this._commandWindow.activate();
};

Scene_Quest.prototype.commandMain = function() {
    this._current_command = 'main';
    this._command($gameParty._quests.main_quests, this._current_command);
};

Scene_Quest.prototype.commandSide = function() {
    this._current_command = 'side';
    this._command($gameParty._quests.side_quests, this._current_command);
};

Scene_Quest.prototype.commandDone = function() {
    this._current_command = 'done';
    this._command($gameParty._quests.succed_quests, this._current_command);
};

Scene_Quest.prototype.commandFailed = function() {
    this._current_command = 'failed';
    this._command($gameParty._quests.failed_quests, this._current_command);
};

Scene_Quest.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (this._current_window_quest !== undefined) this._current_window_quest.refresh(); 
};
