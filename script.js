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


const photoInput = document.getElementById("photoInput");

if (photoInput) {
  photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

      document.getElementById("profilePhoto").src = reader.result;

      localStorage.setItem("profilePhoto", reader.result);

    };

    reader.readAsDataURL(file);

  });
}



// LOAD SAVED PROFILE

window.onload = function () {

  const setText = (id, value) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value;
    }
  };

  setText(
    "showName",
    localStorage.getItem("name") || "Your Name"
  );

  setText(
    "showBio",
    localStorage.getItem("bio") || "Your Bio"
  );

  setText(
    "showAddress",
    localStorage.getItem("address") || "Your Address"
  );

  setText(
    "showPhone",
    localStorage.getItem("phone") || "Your Phone"
  );

  setText(
    "showEmail",
    localStorage.getItem("email") || "Your Email"
  );

  const savedPhoto = localStorage.getItem("profilePhoto");

  if (savedPhoto) {
    const profilePhoto = document.getElementById("profilePhoto");

    if (profilePhoto) {
      profilePhoto.src = savedPhoto;
    }
  }
};
// ===============================
// LIVE POLITICS NEWS
// ===============================

async function loadNews() {
  try {
    const response = await fetch(
    "https://politicsnewsbackend-1.onrender.com/api/news"
    );

    const articles = await response.json();

    const newsBox = document.getElementById("newsBox");

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
            ? `<img
                src="${article.urlToImage}"
                style="width:100%;max-height:220px;object-fit:cover;border-radius:10px;"
                onerror="this.style.display='none';"
              >`
            : ""
        }

        <h3 style="margin:12px 0 8px;">
          ${article.title || "No title"}
        </h3>

        <p style="color:#555;">
          ${article.description || "No description available."}
        </p>

        <a
          href="${article.url}"
          target="_blank"
          style="display:inline-block;margin-top:10px;"
        >
          Read Full News →
        </a>
      `;

      newsBox.appendChild(card);
    });

  } catch (error) {
    console.error("News loading error:", error);
  }
}
window.addEventListener("load", loadNews);

// ===============================
// BOTTOM NAVIGATION
// ===============================

function openSearch() {
  const newsBox = document.getElementById("newsBox");

  if (newsBox) {
    newsBox.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function openAlerts() {
  alert("🔔 No new alerts");
}

function openProfile() {
  const about = document.getElementById("aboutSection");

  if (about) {
    about.scrollIntoView({
      behavior: "smooth"
    });
  }
}
// ===============================
// ALL BUTTONS / ICONS
// ===============================

function openSearch() {
  const newsBox = document.getElementById("newsBox");

  if (newsBox) {
    newsBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function openAlerts() {
  alert("🔔 No new alerts");
}

function openProfile() {
  const profile = document.getElementById("aboutSection");

  if (profile) {
    profile.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function openStory(type) {
  const newsBox = document.getElementById("newsBox");

  if (newsBox) {
    newsBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  loadNews();
}

// ===============================
// PAGE BUTTONS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // TOP SEARCH + ALERT ICONS
  const topButtons = document.querySelectorAll(".top-icons button");

  if (topButtons.length >= 1) {
    topButtons[0].onclick = function () {
      openSearch();
    };
  }

  if (topButtons.length >= 2) {
    topButtons[1].onclick = function () {
      openAlerts();
    };
  }


  // ===============================
  // STORIES
  // ===============================

  const stories = document.querySelectorAll(".story");

  if (stories.length >= 5) {

    // India
    stories[1].onclick = function () {
      openStory("India");
    };

    // Parliament
    stories[2].onclick = function () {
      openStory("Parliament");
    };

    // Live
    stories[3].onclick = function () {
      openStory("Live");
    };

    // World
    stories[4].onclick = function () {
      openStory("World");
    };
  }


  // ===============================
  // CATEGORIES
  // ===============================

  const categories = document.querySelectorAll(".categories button");

  categories.forEach(function (button) {

    button.onclick = function () {

      categories.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const category = button.textContent.trim();

      if (category === "All") {
        openStory("All");
      }

      if (category === "Trending") {
        openStory("Trending");
      }

      if (category === "India") {
        openStory("India");
      }

      if (category === "Government") {
        openStory("Government");
      }

      if (category === "World") {
        openStory("World");
      }
    };
  });

});