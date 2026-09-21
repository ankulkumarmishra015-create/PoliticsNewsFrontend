const editor = document.getElementById("editor");

function openEditor() {
    editor.scrollIntoView({
        behavior: "smooth"
    });
}


// SAVE PROFILE

function saveProfile() {

    const name = document.getElementById("nameInput").value;
    const bio = document.getElementById("bioInput").value;
    const address = document.getElementById("addressInput").value;
    const phone = document.getElementById("phoneInput").value;
    const email = document.getElementById("emailInput").value;

    document.getElementById("showName").textContent =
        name || "Your Name";

    document.getElementById("showBio").textContent =
        bio || "Your Bio";

    document.getElementById("showAddress").textContent =
        address || "Your Address";

    document.getElementById("showPhone").textContent =
        phone || "Your Phone";

    document.getElementById("showEmail").textContent =
        email || "Your Email";


    // Save text data
    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
    localStorage.setItem("address", address);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);

    alert("Profile Saved Successfully! ✅");
}


// PROFILE PHOTO

document.getElementById("photoInput").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        document.getElementById("profilePhoto").src = reader.result;

        localStorage.setItem("profilePhoto", reader.result);
    };

    reader.readAsDataURL(file);
});


// LOAD SAVED PROFILE

window.onload = function () {

    document.getElementById("showName").textContent =
        localStorage.getItem("name") || "Your Name";

    document.getElementById("showBio").textContent =
        localStorage.getItem("bio") || "Your Bio";

    document.getElementById("showAddress").textContent =
        localStorage.getItem("address") || "Your Address";

    document.getElementById("showPhone").textContent =
        localStorage.getItem("phone") || "Your Phone";

    document.getElementById("showEmail").textContent =
        localStorage.getItem("email") || "Your Email";


    const savedPhoto = localStorage.getItem("profilePhoto");

    if (savedPhoto) {
        document.getElementById("profilePhoto").src = savedPhoto;
    }
};

// ===============================
// LIVE POLITICS NEWS
// ===============================

async function loadNews() {
    try {
        const response = await fetch(
            "https://politicsnewsbackend.onrender.com/api/news"
        );

        const articles = await response.json();

        let newsBox = document.getElementById("newsBox");

        if (!newsBox) {
            newsBox = document.createElement("div");
            newsBox.id = "newsBox";

            document.body.appendChild(newsBox);
        }

        newsBox.innerHTML = `
            <h2 style="margin:25px 0 15px;">
                📰 Latest Politics News
            </h2>
        `;

        articles.forEach(article => {

            const card = document.createElement("div");

            card.style.border = "1px solid #ddd";
            card.style.borderRadius = "12px";
            card.style.padding = "15px";
            card.style.marginBottom = "15px";
            card.style.background = "#fff";

            card.innerHTML = `
                ${
                    article.urlToImage
                    ? `<img src="${article.urlToImage}"
                         style="width:100%;max-height:220px;object-fit:cover;border-radius:10px;"
                         onerror="this.style.display='none';">`
                    : ""
                }

                <h3 style="margin:12px 0 8px;">
                    ${article.title || "No title"}
                </h3>

                <p style="color:#555;">
                    ${article.description || "No description available."}
                </p>

                <a href="${article.url}"
                   target="_blank"
                   style="display:inline-block;margin-top:10px;">
                    Read Full News →
                </a>
            `;

            newsBox.appendChild(card);
        });

    } catch (error) {
        console.error("News loading error:", error);
    }
}


// Load news when page opens
window.addEventListener("load", loadNews);