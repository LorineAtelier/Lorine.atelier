// Récupère le panier existant ou en crée un vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour enregistrer le panier
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
