//=============================================================================
// RotomecaNotificationsSystem.js
//=============================================================================
/*:fr
 * @target MZ
 * @plugindesc (V0.0.0) Permet d'afficher des notifications (ex: objets gagnés etc....)
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @base RotomecaCore
 * 
 * @help  
 * =============================================================================
 * ### Rotomeca Notifications System ###
 * Author   -   Rotomeca
 * Version  -   0.0.0
 * Updated  -   03/04/2023
 * =============================================================================
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaNotificationsSystem = true;

var Rotomeca = Rotomeca || {}; 

(() => {

//=============================================================================
// ** Constantes
//=============================================================================
const plugin_name = 'RotomecaNotificationsSystem';
const notification_timeout = 1;

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** RotomecaNotificationManager
//=============================================================================
class RotomecaNotificationManager extends RotomecaBaseClass {

    constructor() {
       this._init();
    }

    _init() {
        this.queue = new IndexedRotomecaStack();
        return this;
    }

    add(notification) {
        this.queue.add(notification);
        return this;
    }

    dequeue() {
        return this.queue.pop()
    }

    delete(notificationId) {
        this.queue.deleteCond(x => x.id === notificationId);
        return this;
    }

}

//=============================================================================
// ** ARotomecaNotificationBase
//=============================================================================
class ARotomecaNotificationBase extends RotomecaBaseClass {
    constructor(id, text, timeout = notification_timeout) {
        if (this.constructor === ARotomecaNotificationBase) {
            throw new RotomecaError({erroredItem:this, otherInfos:[id, text, timeout]}, '[ARotomecaNotificationBase]Impossible d\'instancier une classe abstraite !');
        }

        this._init()._setup(id, text, timeout);
    }

    _init() {
        this.id = 0;
        this.text = String.empty;
        this.timeout = notification_timeout;
        return this;
    }

    _setup(id, text, timeout) {
        this.id = id;
        this.text = text;
        this.timeout = timeout;
        return this;
    }

    show() {
        if (this.constructor === ARotomecaNotificationBase) {
            throw new RotomecaError({erroredItem:this}, '[ARotomecaNotificationBase/show]Impossible d\'instancier une classe abstraite !');
        }
        return this;
    }

    showTemporaly(customTimeout = null){
        this.show();
        return setTimeout(() => {
            this.hide();
        }, customTimeout ?? this.timeout);
    }

    hide() {
        if (this.constructor === ARotomecaNotificationBase) {
            throw new RotomecaError({erroredItem:this}, '[ARotomecaNotificationBase/show]Impossible d\'instancier une classe abstraite !');
        }
        return this;
    }
}

})();