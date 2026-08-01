    // Récupère le panier existant ou en crée un vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour enregistrer le panier
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Charger le panier
function loadCart() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

}

// Afficher le toast
const toast = document.getElementById("toast");

if (toast) {

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}

// Initialiser la page
function init() {

    updateCartCount();

    updateMiniCart();

}

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach((item, index) => {
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

function updateMiniCart() {

    const miniCartItems = document.getElementById("mini-cart-items");

    if (!miniCartItems) return;

    let html = "";
    let total = 0;

    if (cart.length === 0) {

        html = "<p>Votre panier est vide.</p>";

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;

           html += `
    <div class="mini-cart-item">

        <img src="${item.image}" alt="${item.title}">

        <div class="mini-cart-info">

            <strong>${item.title}</strong><br>

            ${item.type}<br>

${item.format ? item.format + "<br>" : ""}

<div class="mini-qty">

    <button class="mini-minus" data-index="${index}">−</button>

    <span>${item.quantity}</span>

    ${item.type === "Reproduction"
        ? `<button class="mini-plus" data-index="${index}">+</button>`
        : ""}

</div>

${item.price * item.quantity} €

        </div>

    </div>
`;

        });

        html += `<hr>`;
        html += `<p><strong>Total : ${total} €</strong></p>`;

        html += `
            <button id="clear-cart" class="clear-cart-btn">
                🗑️ Vider le panier
            </button>
`;

    }

    miniCartItems.innerHTML = html;

    
    // Boutons +
document.querySelectorAll(".mini-plus").forEach(button => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        cart[index].quantity++;

        refreshCart();

    });

});

    // Boutons -
document.querySelectorAll(".mini-minus").forEach(button => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        } else {

            cart.splice(index, 1);

        }

        refreshCart();

    });

});
}

// Mini-panier
const cartLink = document.getElementById("cart-link");
const miniCart = document.getElementById("mini-cart");

init();

if (cartLink && miniCart) {

    cartLink.addEventListener("click", (event) => {

        event.preventDefault();

        miniCart.classList.toggle("open");

    });

}


function refreshCart() {

    saveCart();

    updateCartCount();

    updateMiniCart();

}







