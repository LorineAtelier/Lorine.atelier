    // Récupère le panier existant ou en crée un vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour enregistrer le panier
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;

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
        updateCartCount();
        updateMiniCart();
        
const toast = document.getElementById("toast");

if (toast) {

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}
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

        <img src="${item.image}" alt="${item.title}" class="cart-image">

        <div class="cart-info">

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

// Compteur du panier
updateCartCount();

function updateMiniCart() {

    const miniCartItems = document.getElementById("mini-cart-items");

    if (!miniCartItems) return;

    let html = "";
    let total = 0;

    if (cart.length === 0) {

        html = "<p>Votre panier est vide.</p>";

    } else {

        cart.forEach(item => {

            total += item.price * item.quantity;

            html += `
                <p>${item.title} × ${item.quantity} — ${item.price * item.quantity} €</p>
            `;

        });

        html += `<hr>`;
        html += `<p><strong>Total : ${total} €</strong></p>`;

    }

    miniCartItems.innerHTML = html;

}

// Mini-panier
const cartLink = document.getElementById("cart-link");
const miniCart = document.getElementById("mini-cart");

updateMiniCart();

if (cartLink && miniCart) {

    cartLink.addEventListener("click", (event) => {

        event.preventDefault();

        miniCart.classList.toggle("open");

    });

}







