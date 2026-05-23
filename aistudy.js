basicBtn.addEventListener("click", () => {
isPremium = false;
    document.getElementById("premiumStyle").disabled = true; //switch css
    document.getElementById("basicStyle").disabled = false; 
    basicBtn.style.display = "none"; //toggle buttons
    premiumBtn.style.display = "flex";

});
const rumourBtn = document.getElementById("rumour");
const toast=document.getElementById("rcard");
const thirdPage = document.getElementById("third");
const homePage = document.getElementById("homePage");
const exam= document.getElementById("exam");

rumourBtn.addEventListener("click", () => {
    if (!isPremium) {
        toast.classList.add("show");
        setTimeout(() => {
            rcard.classList.remove("show");
        }, 2500);

        return;
    }

    homePage.style.display = "none";
    thirdPage.style.display = "block";
    setTimeout(() => {
    thirdPage.classList.add("show");
    }, 10);

});

exam.addEventListener("click", () => {
    if (!isPremium) {
        toast.classList.add("show");
        setTimeout(() => {
            rcard.classList.remove("show");
        }, 2500);

        return;
    }

    homePage.style.display = "none";
    thirdPage.style.display = "block";
    setTimeout(() => {
    thirdPage.classList.add("show");
    }, 10);

});