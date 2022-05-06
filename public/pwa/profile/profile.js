const profileSaveBtn = document.getElementById("profileSaveBtn");
const body = document.querySelector("body");

const profileThemeSelect = document.getElementById("profileThemeSelect");

let currentTheme;

profileThemeSelect.addEventListener("change", (e) => {
  console.log(e);
  console.log("currentTheme", currentTheme);
  const targetTheme = profileThemeSelect.value;
  body.classList.add(targetTheme);
  currentTheme === undefined ? null : body.classList.remove(currentTheme);
  currentTheme = targetTheme;
  console.log("new", currentTheme);
});

profileSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

const findTheme = (themeTarget) => {};
