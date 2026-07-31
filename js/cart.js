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
