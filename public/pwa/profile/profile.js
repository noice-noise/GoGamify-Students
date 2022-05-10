const body = document.querySelector("body");
const appearanceForm = document.getElementById("appearanceForm");
const profileThemeSelect = document.getElementById("profileThemeSelect");

const preferences = JSON.parse(window.localStorage.getItem("preferences"));
let currentTheme = preferences.theme;

profileThemeSelect.addEventListener("change", (e) => {
  const targetTheme = profileThemeSelect.value;
  previewTheme(targetTheme);
});

appearanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await fetch(e.target.action, {
    method: "post",
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      window.localStorage.removeItem("isLocalStorageSet");
      alert(data?.message);
    })
    .catch((err) => {
      console.log(err);
      alert("An error occurred.");
    });
});

const previewTheme = (targetTheme) => {
  body.classList.add(targetTheme);
  currentTheme === undefined ? null : body.classList.remove(currentTheme);
  currentTheme = targetTheme;
  console.log("Current Theme", currentTheme);
};
