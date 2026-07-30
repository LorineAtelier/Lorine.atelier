const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");

        const target = document.getElementById(tab.dataset.target);

        target.classList.add("active");

    });

});
const format = document.getElementById("format");
const reproPrice = document.getElementById("repro-price");

if (format && reproPrice) {

    format.addEventListener("change", () => {

        reproPrice.textContent = format.value + " €";

    });

}
