window.onload = () => {
function updateUI() {
    const now = new Date();
    const hours = now.getHours();
    let greetingText = "";
    if (hours < 12) {
        greetingText = "Good Morning ☀️";
    }
    else if (hours < 18) {
         greetingText = "Good Afternoon 🌤️";
    }
    else {
        greetingText = "Good Evening 🌙";
    }

    document.getElementById("greeting").textContent = greetingText;
    document.getElementById("clock").textContent =
            `${now.toLocaleDateString()} | ${now.toLocaleTimeString()}`;

    }
    setInterval(updateUI, 1000);
    updateUI();

    const search = document.querySelector(".search");
    const text = document.getElementById("bar");
    const homePage = document.getElementById("homePage");
    const resultPage = document.getElementById("resultPage");
    const resultText = document.getElementById("resultText");
    const para = document.getElementById("searchdata");
    const historyPage = document.querySelector("#historyPage");
    const historybtn = document.querySelector("#historybtn");
    const historyList = document.querySelector(".history-list");
    const clearBtn = document.getElementById("clearHistory");
    const thirdPage = document.getElementById("third");
            //history 
    let arr =
        JSON.parse(localStorage.getItem("history")) || [];
        function renderHistory() {
        historyList.innerHTML = "";
        arr.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.classList.add("history-item");
        li.addEventListener("click", () => {
        text.value = item;
            });
        historyList.appendChild(li);
    });
}
search.addEventListener("click", async () => {
    const query = text.value.trim();
        if (query === "") {
        alert("Write something!");
        return;
    }
    resultText.innerHTML =
            `Showing results for: <span>${query}</span>`;
        homePage.style.display = "none";
        resultPage.style.display = "flex";
        resultPage.classList.add("show");
        //saving history 
arr = arr.filter(item => item !== query);
        arr.unshift(query);
        if(!isPremium && arr.length>5){
            arr.pop();
        }
        if (arr.length > 20 && isPremium) arr.pop();
        localStorage.setItem(
            "history",
            JSON.stringify(arr)
        );
        renderHistory();
        para.innerText = "Loading...";
            //Fetch
try {
            const searchUrl =
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
            const searchRes = await fetch(searchUrl);
            const searchData = await searchRes.json();
            const results = searchData?.query?.search;
            if (!results || results.length === 0) {
                para.innerText = "No results found";
                return;
            }

            const title = results[0].title;
            const extractUrl =
                `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(title)}&format=json&origin=*`;

            const extractRes = await fetch(extractUrl);
            const extractData = await extractRes.json();
            const page =
                Object.values(extractData.query.pages)[0];

            const paragraphs = page.extract
                .split("\n")
                .filter(p => p.trim() !== "")
                .slice(0, 4);

            para.innerHTML = `
                <h3>${title}</h3>
                ${paragraphs.map(p => `<p>${p}</p>`).join("")}
            `;

        }
        catch (err) {
        para.innerText = "Error fetching data";
        console.error(err);
    }

    });
  // History page
historybtn.addEventListener("click", () => {
    homePage.style.display = "none";
    historyPage.style.display = "flex";
    historyPage.classList.remove("show");
        setTimeout(() => {
            historyPage.classList.add("show");
        }, 10);
        renderHistory();
});
// clear history
clearBtn.addEventListener("click", () => {
        arr = [];
        localStorage.removeItem("history");
        renderHistory();
});
// back
function goHome() {
    resultPage.classList.remove("show");
    thirdPage.classList.remove("show");
    historyPage.classList.remove("show");
    setTimeout(() => {
    resultPage.style.display = "none";
    thirdPage.style.display = "none";
    historyPage.style.display = "none";
    homePage.style.display = "block";
    }, 400);
    }

    document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", goHome);
    });
renderHistory();

};