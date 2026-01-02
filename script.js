// Account setup
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const accountStatus = document.getElementById("accountStatus");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("signupUser").value;
    const pass = document.getElementById("signupPass").value;
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    accountStatus.textContent = "Account created successfully!";
    signupForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    if (user === localStorage.getItem("user") && pass === localStorage.getItem("pass")) {
      accountStatus.textContent = `Logged in as ${user}`;
      document.getElementById("upload").hidden = false;
    } else {
      accountStatus.textContent = "Invalid credentials!";
    }
  });
}

// Upload with delete option
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const masonry = document.getElementById("masonry");

if (uploadForm) {
  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const files = Array.from(fileInput.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const figure = document.createElement("figure");
        figure.className = "card";

        if (file.type.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = ev.target.result;
          figure.appendChild(img);
        } else if (file.type.startsWith("video/")) {
          const vid = document.createElement("video");
          vid.controls = true;
          vid.src = ev.target.result;
          figure.appendChild(vid);
        }

        const caption = document.createElement("figcaption");
        caption.textContent = file.name;
        figure.appendChild(caption);

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          masonry.removeChild(figure);
        });
        figure.appendChild(delBtn);

        masonry.appendChild(figure);
      };
      reader.readAsDataURL(file);
    });

    uploadForm.reset();
  });
}