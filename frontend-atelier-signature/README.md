# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# L’Atelier Signature  
Plateforme web de formation en esthétique – Projet personnel (MVP)

L’Atelier Signature est une application web permettant l’achat de formations en ligne dans le domaine de l’esthétique.  
Le projet propose un parcours complet : consultation des formations, paiement sécurisé via Stripe, envoi automatique d’un support PDF via Brevo, et gestion des commandes côté administrateur.

Ce MVP a été conçu en full-stack (React + Node.js / Express + MySQL) et déployé sur Render et AlwaysData.

---

## Fonctionnalités principales

### Côté client
- Inscription / connexion  
- Consultation du catalogue des formations  
- Affichage de la fiche détaillée d’une formation  
- Paiement sécurisé via Stripe Checkout  
- Réception automatique d’un PDF de formation par email  
- Contact ultérieur par la formatrice pour planifier la session pratique

### Côté administratrice  
- Authentication par JWT  
- Gestion des formations (CRUD)  
- Visualisation des commandes  
- Suivi de l’envoi des PDF  
- Gestion des utilisateurs et validation email  

---

## Architecture du projet

### Front-end (React)
- React + Vite  
- React Router  
- Axios  
- Tailwind CSS  
- Composants réutilisables : FormationCard, BuyButton, Header, Footer, DashboardAdmin…

### Back-end (Node.js / Express)
- Architecture MVC  
- Routes → Controllers → Services  
- Sécurité : JWT, Helmet, CORS, Rate Limiter  
- Webhook Stripe (paiement validé → création commande + envoi PDF)  
- Envoi email via Brevo API (PDF base64)

### Base de données
- MySQL (AlwaysData)  
- Tables : users, formations, commandes  
- Relations :  
  - 1 utilisateur = N commandes  
  - 1 formation = N commandes  

---

##Installation & lancement

### Cloner le projet
```bash
git clone git@github.com:Leilasempere/ateliersignature-V2.git
cd ateliersignature-V2

## Back-End (Express.js)

Le back-end du projet repose sur Node.js et Express, structuré selon une architecture MVC.  
Il gère l’API REST, l’authentification, les paiements Stripe, les commandes, la communication avec MySQL, ainsi que l’envoi automatique d’emails via Brevo.

---

### Architecture des dossiers

backend/
│── controllers/
│── middlewares/
│── routes/
│── services/
│── config/
│── utils/
│── server.js
│── package.json
│── .env


---

### Installation

```bash
cd backend-atelier-signature
npm install
npm run dev


DB_HOST=xxx
DB_USER=xxx
DB_PASSWORD=xxx
DB_NAME=atelier_signature

JWT_SECRET=xxx

BREVO_API_KEY=xxx
EMAIL_FROM=xx@xx.com
EMAIL_FROM_NAME=Atelier Signature

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

CLIENT_URL=http://localhost:5173


"dependencies": {
  "axios": "^1.6.0",
  "bcrypt": "^5.1.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-rate-limit": "^6.7.0",
  "helmet": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "mysql2": "^3.4.0",
  "stripe": "^12.0.0"
}


Autnetification
POST /api/users/register
POST /api/users/login
GET  /api/users/verify?token=xxx
GET  /api/users/profile   (protégée JWT)

Formations
GET    /api/formations
GET    /api/formations/:id
POST   /api/formations        (admin)
DELETE /api/formations/:id    (admin)

Paiement Stripe 
POST /api/payments/create-checkout-session
POST /api/payments/webhook   

Commandes 
POST /api/commandes
GET  /api/commandes   // admin

Postman
GET FORMATIONS
GET http://latelier-signature.onrender.com/api/formations
[
  { "id": 1, "title": "DermaSkinGlow", "price": 990 },
  { "id": 2, "title": "Body Sculpt Duo", "price": 990 }
]

POST USERS/LOGIN
POST http://latelier-signature.onrender.com/api/users/login
Content-Type: application/json
Body:
{
  "email": "cliente@example.com",
  "password": "123456"
}
{
  "message": "Connexion réussie",
  "token": "xxxx.yyyy.zzzz"
}

POST /payments/create-checkout-session
POST http://latelier-signature.onrender.com/api/payments/create-checkout-session
Content-Type: application/json
{
  "formationId": 2,
  "userId": 1
}
{
"url": "https://checkout.stripe.com/c/pay/
cs_test_a1foDtWri4dBJ4kplKZyeXtntgU24dY52OdG0hXdsQDvHmMDz5pgWc6kIZ#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdkd
WxOYHwnPyd1blpxYHZxWjA0V2lTfH1ATV9SMX9dc0RLZmFdbldsNUA1Sm5CaVRgaGJjZmYxSlU3STxKNEc3cFE0Vl0xQ3diSjA3ZE5MM
TIyNTJkVkJQZ29Icn19YWJdV3NdaEhQX0NvNTVtM3FRU082XCcpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2F
JyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl"
}



Déploiement Back-End

Hébergement : Render

BDD : AlwaysData

Auto-déploiement : GitHub → Render

Webhook Stripe : route publique HTTPS obligatoire

Déploiement Back-End

Hébergement : Render

BDD : AlwaysData

Auto-déploiement : GitHub → Render

Webhook Stripe : route publique HTTPS obligatoire


Projet réalisé par Leila Sempere
2025 – Développeur Web / Projet personnel