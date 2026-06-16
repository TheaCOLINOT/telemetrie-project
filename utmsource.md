===================================================================
TRACKING UTM SOURCE
===================================================================

OBJECTIF
--------
Savoir d'où viennent les visiteurs du site, notamment depuis les
réseaux sociaux (Instagram, TikTok, Facebook, etc.), afin de mesurer
l'efficacité des campagnes marketing.


CE QUI A ETE FAIT
-----------------

1. src/lib/utm.js  (nouveau fichier)
   - captureUTM() : lit les paramètres UTM dans l'URL au chargement
     de la page (?utm_source=instagram&utm_medium=social&...)
     et les sauvegarde en sessionStorage pour qu'ils restent
     disponibles pendant toute la session (panier, checkout, etc.)
   - getStoredUTM() : récupère les UTM sauvegardés depuis n'importe
     quel endroit de l'app
   - isSocialSource() : détecte si la source est un réseau social
     (facebook, instagram, twitter/x, linkedin, tiktok, youtube,
     pinterest, snapchat)
   - SOCIAL_SOURCES : liste des sources sociales reconnues

2. src/lib/analytics.js  (modifié)
   - Chaque event envoyé à Umami inclut désormais automatiquement
     les UTM stockés (utm_source, utm_medium, etc.) grâce à
     getStoredUTM() appelé dans track()
   - Ajout de l'event "utm_visit" : déclenché à l'arrivée d'un
     visiteur portant des UTM, pour avoir un event dédié dans
     le dashboard Umami

3. src/App.jsx  (modifié)
   - Ajout du composant <UTMTracker /> qui s'exécute une seule fois
     au premier chargement de l'app
   - Il appelle captureUTM() pour lire + stocker les params UTM
   - Si utm_source est présent, il envoie l'event "utm_visit"


COMMENT ÇA MARCHE EN PRATIQUE
------------------------------

Un lien posté sur Instagram ressemblerait à :
  https://monsite.com?utm_source=instagram&utm_medium=social&utm_campaign=soldes_ete

Quand quelqu'un clique :
  1. captureUTM() lit "utm_source=instagram" dans l'URL
  2. Ces données sont sauvegardées en sessionStorage
  3. L'event "utm_visit" est envoyé à Umami avec utm_source=instagram
  4. Tous les events suivants (product_view, add_to_cart, order_complete...)
     incluent aussi utm_source=instagram automatiquement

Dans le dashboard Umami, on peut donc filtrer par utm_source pour
voir combien de ventes viennent d'Instagram vs TikTok vs Facebook.


EXEMPLES DE LIENS UTM PAR RESEAU SOCIAL
-----------------------------------------
Instagram :  ?utm_source=instagram&utm_medium=social&utm_campaign=nom_campagne
TikTok :     ?utm_source=tiktok&utm_medium=social&utm_campaign=nom_campagne
Facebook :   ?utm_source=facebook&utm_medium=social&utm_campaign=nom_campagne
LinkedIn :   ?utm_source=linkedin&utm_medium=social&utm_campaign=nom_campagne
Email :      ?utm_source=newsletter&utm_medium=email&utm_campaign=nom_campagne
Google Ads : ?utm_source=google&utm_medium=cpc&utm_campaign=nom_campagne


PARAMETRES UTM SUPPORTES
--------------------------
utm_source   : la plateforme (instagram, tiktok, facebook...)
utm_medium   : le canal (social, email, cpc, organic...)
utm_campaign : nom de la campagne
utm_term     : mot-clé (surtout pour les ads)
utm_content  : variante de contenu (A/B test d'un visuel par ex.)

===================================================================
