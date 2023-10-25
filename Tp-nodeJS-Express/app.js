const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Charger les données depuis un fichier JSON (products.json)
const productsData = require('./products.json');

// Page d'accueil (liste des produits)
app.get('/products', (req, res) => {
    res.render('products', { products: productsData });
});

// Page de création de produit (similaire à la page de création de client)
app.get('/create-product', (req, res) => {
    res.render('create-product');
});

// Créer un nouveau produit (similaire à la création de client)
app.post('/create-product', (req, res) => {
    const newProduct = {
        id: uuidv4(),
        titre: req.body.titre,
        prix: req.body.prix,
        stock: req.body.stock,
    };

    productsData.push(newProduct);

    // Enregistrez les données mises à jour dans le fichier JSON
    fs.writeFileSync('./products.json', JSON.stringify(productsData, null, 2));

    res.redirect('/products');
});

// Afficher un produit par son ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = productsData.find(product => product.id === productId);

    if (product) {
        res.render('product-details', { product });
    } else {
        res.status(404).json({ message: 'Produit non trouvé' });
    }
});
// Charger les données depuis un fichier JSON (clients.json)
const clientsData = require('./clients.json');

// Page d'accueil (liste des clients)
app.get('/clients', (req, res) => {
    res.render('clients', { clients: clientsData });
});

// Page de création de client
app.get('/create-client', (req, res) => {
    res.render('create-client');
});

// Créer un nouveau client
app.post('/create-client', (req, res) => {
    const newClient = {
        id: uuidv4(),
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone
    };

    clientsData.push(newClient);

    // Enregistrez les données mises à jour dans le fichier JSON
    fs.writeFileSync('./clients.json', JSON.stringify(clientsData, null, 2));

    res.redirect('/clients');
});

// Afficher un client par son ID
app.get('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const client = clientsData.find(client => client.id === clientId);

    if (client) {
        res.render('client-details', { client });
    } else {
        res.status(404).json({ message: 'Client non trouvé' });
    }
});

// Charger les données depuis un fichier JSON (commandes.json)
const commandesData = require('./commandes.json');

// Page d'accueil (liste des commandes)
app.get('/commandes', (req, res) => {
    res.render('commandes', { commandes: commandesData });
});

// Afficher une commande par son ID
app.get('/commandes/:id', (req, res) => {
    const commandeId = req.params.id;
    const commande = commandesData.find(commande => commande.id === commandeId);

    if (commande) {
        res.render('commande-details', { commande });
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

// Afficher un client par son ID
app.get('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const client = clientsData.find(client => client.id === clientId);

    if (client) {
        res.render('client-details', { client });
    } else {
        res.status(404).json({ message: 'Client non trouvé' });
    }
});

app.post('/commandes', (req, res) => {
    const clientId = req.body.clientId; // ID du client
    const produits = req.body.produits; // Liste de produits à commander

    // Créez la commande avec l'ID du client et les produits
    const nouvelleCommande = {
        id: uuidv4(),
        client: clientsData.find(client => client.id === clientId),
        produits: produits,
    };

    commandesData.push(nouvelleCommande);

    // Enregistrez les données mises à jour dans le fichier JSON
    fs.writeFileSync('./commandes.json', JSON.stringify(commandesData, null, 2));

    res.json(nouvelleCommande);
});

app.get('/commandes/:id', (req, res) => {
    const commandeId = req.params.id;
    const commande = commandesData.find(commande => commande.id === commandeId);

    if (commande) {
        res.render('commande-details', { commande });
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

app.get('/passer-commande', (req, res) => {
    // Vous pouvez inclure ici la logique pour obtenir la liste des produits à afficher dans le formulaire
    res.render('commande-form', { clients: clientsData, produits: productsData });
});

app.post('/commandes', (req, res) => {
    const clientId = req.body.clientId;
    const produits = Array.isArray(req.body.produits) ? req.body.produits : [req.body.produits]; // Assurez-vous que les produits sont dans un tableau

    const nouvelleCommande = {
        id: uuidv4(),
        client: clientsData.find(client => client.id === clientId),
        produits: produits.map(produitId => productsData.find(produit => produit.id === produitId)),
    };

    commandesData.push(nouvelleCommande);

    // Enregistrez les données mises à jour dans le fichier JSON
    fs.writeFileSync('./commandes.json', JSON.stringify(commandesData, null, 2));

    res.redirect('/commandes');
});

app.get('/commandes/:id', (req, res) => {
    const commandeId = req.params.id;
    const commande = commandesData.find(commande => commande.id === commandeId);

    if (commande) {
        res.render('commande-details', { commande });
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});


app.listen(3000, () => {
    console.log('Serveur en cours d\'exécution sur le port 3000');
});
