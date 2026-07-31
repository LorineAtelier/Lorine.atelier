alert("cart.js chargé");

// Récupère le panier existant ou en crée un vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour enregistrer le panier
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const addButton = document.getElementById("add-to-cart");

if (addButton) {

    addButton.addEventListener("click", () => {

        const title = document.querySelector(".product-info h1").textContent;

        let type = "Original";
        let format = "";
        let price = 45;

        if (document.getElementById("reproduction").classList.contains("active")) {

            type = "Reproduction";

            const select = document.getElementById("format");

            format = select.options[select.selectedIndex].text;

            price = Number(select.value);
        }

        console.log("Bouton cliqué !");
        
        cart.push({
            title,
            type,
            format,
            price
        });

        saveCart();

        window.location.href = "panier.html";

    });

}

const cartContainer = document.getElementById("cart-items");

if (cartContainer) {

    if (cart.length === 0) {

        cartContainer.innerHTML = "<p>Votre panier est vide.</p>";

    } else {

        let html = "";
        let total = 0;

        cart.forEach((item, index) => {

            total += item.price;

            html += `
                <div class="cart-item">
                    <h2>${item.title}</h2>

                    <p>${item.type}</p>

                    ${item.format ? `<p>${item.format}</p>` : ""}

                    <p class="price">${item.price} €</p>

                    <button class="remove-item" data-index="${index}">
                        Supprimer
                    </button>
                </div>
            `;

        });

        html += `<h2>Total : ${total} €</h2>`;

        cartContainer.innerHTML = html;

    }

}


