//=============================================================================
// RotomecaMog.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V1.0.0) Divers extensions pour les plugins de MOGHUNTER 
 * @author Rotomeca
 * @url https://github.com/Rotomeca/RPG-Maker-MZ-plugins
 * @orderAfter RotomecaCore
 * 
 * @help
 * Site de MogHunter : https://mogplugins.wordpress.com
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.RotomecaMogExt = true;

var Rotomeca = Rotomeca || {}; 

//=============================================================================
// *** MOG_ATB_Gauge ***
//=============================================================================
  
if (Imported.MOG_ATB_Gauge === true)
{
	ImageManager.loadATBIcon = function(filename) {
		if (StorageManager.spriteExist('atb', filename)) return this.loadBitmap('img/atb/', filename, 0, true);
		else return this.loadBitmap('img/atb/', 'Face_Test', 0, true);
	};	
}
