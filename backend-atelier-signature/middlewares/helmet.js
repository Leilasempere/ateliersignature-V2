import helmet from 'helmet';

export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // seule les sources propre a mon site sont autorisées
      scriptSrc: ["'self'", "https:"], // les scripts doivent provenir de mon site ou d'une source sécurisée
      objectSrc: ["'none'"], // interdit l'utilisation de balises <object> 
      imgSrc: ["'self'", "data:", "https:"], // autorise les images locale et depuis des sources sécurisées
      upgradeInsecureRequests: [], // force le chargement des ressource via HTTPS
    },
  },
  crossOriginEmbedderPolicy: false,  //pour pas me bloquer Stripe si true peut bloquer des ressources externe
});
