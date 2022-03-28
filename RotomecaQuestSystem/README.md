# RotomecaQuestSystem

=== Rotomeca Quest System ===

Author   -   Rotomeca /
Version  -   0.9.0

------------------------------

Ajoute un système de quête au jeu.

Utilisez le paramètre 'Quêtes' pour ajouter des quêtes à votre jeu.
L'id de la quête correspond au nombre en face de la quête.

Commandes : 
- Désactiver le menu de quête
 => Désactive le menu de quête dans le menu

- Activer le menu de quête
 => Active le menu de quête dans le menu

- MAJ
 => Met à jours l'avancement de toute les quêtes obtenu
   => Le paramètres 'Asynchrone' permet d'activer ou non la fin de la commande avant de faire d'autre chose

- Valider/Echouer
 => Valide ou échoue une quête
   => Le paramètre 'id' correspond à l'id de la quête

- Valider une étape/Echouer une étape
 => Valide ou échoue une étape/un objectif d'une quête
   => Le paramètre 'id' correspond à l'id de la quête qui possède l'étape
   => Le paramètre 'Id de l'étape' correspond à l'id de l'étape (le nombre devant la liste des étapes d'une quête)

- Ajouter
 => Ajoute une quête au livre de quête
   => Le paramètre 'Id' correspond à l'id de la quête dans la base de données

Commandes conditionnels : 
Lorsque vous faites une branche conditionnel, choisssez 'script' et écrivez : 
- $questExist(id) 
 => Vérifie si une quête éxiste dans la base de données
   => id : Id de la quête dans la base de données
   => Renvoie vrai (true) si elle existe, faux (false) sinon

- $questHave(id)
 => Vérifie si une quête est dans le livre de quête
   => id : Id de la quête dans la base de données
   => Renvoie vrai (true) si elle y est, faux (false) sinon
- $questValidate(id)/$questFailed(id)/$questInProgress(id)
 =>Vérifie si une quête dans le livre de quête est validée, échouée ou en cours
   => id : Id de la quête dans la base de données
   => Renvoie vrai (true) si elle est validée, échouée ou en cours, faux (false) sinon

- $questIsAdded()
 => A utiliser après la commande Ajouter
   => Renvoie vrai (true) si la quête n'est pas dans le livre de quête, faux (false) sinon.

-----------------------------------------------------------------------------------------------------------
Ce qu'il reste à faire : 
 - Notifications
 - Traduction du @help anglais
