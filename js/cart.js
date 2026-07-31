    // Récupère le panier existant ou en crée un vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour enregistrer le panier
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const addButton = document.getElementById("add-to-cart");

if (addButton) {

    addButton.addEventListener("click", () => {

       const title = document.querySelector(".product-info h1").textContent.trim();

        let type = "Original";
        let format = "";
        let price = 45;

        if (document.getElementById("reproduction").classList.contains("active")) {

            type = "Reproduction";

            const select = document.getElementById("format");

            format = select.options[select.selectedIndex].text;

            price = Number(select.value);
        }

      const image = document.querySelector(".product-image img").src;
      const existingItem = cart.find(item =>
    item.title === title &&
    item.type === type &&
    item.format === format
);

if (existingItem) {

    existingItem.quantity++;

} else {

    cart.push({
    title,
    type,
    format,
    price,
    quantity: 1,
    image
});

}

        
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

            total += item.price * item.quantity;

            html += `
                <div class="cart-item">
                    <h2>${item.title}</h2>

          <p>${item.type}</p>

                    ${item.format ? `<p>${item.format}</p>` : ""}

                    <p class="quantity-controls">

                    <button class="qty-minus" data-index="${index}">−</button>

                    <span>${item.quantity}</span>

                    <button class="qty-plus" data-index="${index}">+</button>

        </p>

                    <p class="price">${item.price * item.quantity} €</p>

                    <button class="remove-item" data-index="${index}">
                        Supprimer
                    </button>
                </div>
            `;

        });

        html += `<h2>Total : ${total} €</h2>`;

        cartContainer.innerHTML = html;

    }

    // Boutons supprimer
const removeButtons = document.querySelectorAll(".remove-item");

removeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        cart.splice(index, 1);

        saveCart();

        location.reload();

    });

});

}

// Boutons +
document.querySelectorAll(".qty-plus").forEach(button => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        cart[index].quantity++;

        saveCart();

        location.reload();

    });

});

// Boutons -
document.querySelectorAll(".qty-minus").forEach(button => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        } else {

            cart.splice(index, 1);

        }

        saveCart();

        location.reload();

    });

});




