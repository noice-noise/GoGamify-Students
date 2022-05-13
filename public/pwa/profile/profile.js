const body = document.querySelector("body");
const appearanceForm = document.getElementById("appearanceForm");
const profileThemeSelect = document.getElementById("profileThemeSelect");
const profileFontFamilySelect = document.getElementById(
  "profileFontFamilySelect"
);
const profileFontSizeSelect = document.getElementById("profileFontSizeSelect");

const preferences = JSON.parse(window.localStorage.getItem("preferences"));

let currentTheme = preferences.theme;
let currentFontFamily = preferences.fontFamily;
let currentFontSize = preferences.fontSize;

profileThemeSelect.addEventListener("change", (e) => {
  const targetTheme = profileThemeSelect.value;
  changeTheme(targetTheme);
});

profileFontFamilySelect.addEventListener("change", (e) => {
  const targetFontFamily = profileFontFamilySelect.value;
  changeFontFamily(targetFontFamily);
});

profileFontSizeSelect.addEventListener("change", (e) => {
  const targetFontSize = profileFontSizeSelect.value;
  changeFontSize(targetFontSize);
});

appearanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target);

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

const changeTheme = (targetTheme) => {
  body.classList.add(targetTheme);
  currentTheme === undefined ? null : body.classList.remove(currentTheme);
  currentTheme = targetTheme;
  console.log("Current Theme", currentTheme);
};

const setSelectedOption = (selectObj, option) => {
  const optionsArr = Array.from(selectObj.options).map((option) => {
    return option.value;
  });

  const targetIndex = optionsArr.indexOf(option);
  selectObj.selectedIndex = targetIndex;
};

const initProfile = () => {
  setSelectedOption(profileThemeSelect, currentTheme);
  setSelectedOption(profileFontFamilySelect, currentFontFamily);
  setSelectedOption(profileFontSizeSelect, currentFontSize);
};

initProfile();
