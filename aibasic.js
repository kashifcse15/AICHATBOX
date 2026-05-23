const basicBtn = document.getElementById("basicBtn");
const premiumBtn = document.getElementById("premiumBtn");
const premiumCard = document.getElementById("premiumCard");
const premiumPass = document.getElementById("premiumPass");
const unlockBtn = document.getElementById("unlockBtn");
const closePremium = document.getElementById("closePremium");

let isPremium = false;

premiumBtn.addEventListener("click", () => {
    premiumCard.style.display = "flex";
});

unlockBtn.addEventListener("click", () => {
    if (premiumPass.value === "1234") {
    isPremium = true;
        document.getElementById("basicStyle").disabled = true; //switch CSS
        document.getElementById("premiumStyle").disabled = false;
        premiumBtn.style.display = "none"; //toggle buttons
        basicBtn.style.display = "flex";
        premiumCard.style.display = "none"; //Hide card

    }
    else {
        alert("Wrong Password");
    }

});

closePremium.addEventListener("click", () => {
    premiumCard.style.display = "none";
});