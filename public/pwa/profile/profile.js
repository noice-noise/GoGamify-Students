const body = document.querySelector("body");
const appearanceForm = document.getElementById("appearanceForm");
const profileThemeSelect = document.getElementById("profileThemeSelect");

let currentTheme;

profileThemeSelect.addEventListener("change", (e) => {
  console.log(e);
  console.log("currentTheme", currentTheme);
  const targetTheme = profileThemeSelect.value;
  setTheme(targetTheme);
});

appearanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.action);

  fetch(e.target.action, {
    method: "post",
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // TODO get message from POST student/profile/theme response
      alert("Preferences saved successfully.");
    });
});

const init = () => {
  console.log("Loading");
  fetch("/student/profile/theme", {
    method: "get",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      const preferences = data;

      preferences.forEach((item) => {
        if (item.theme !== undefined) {
          setTheme(item.theme);
        }
      });
    });
};

const setTheme = (targetTheme) => {
  body.classList.add(targetTheme);
  currentTheme === undefined ? null : body.classList.remove(currentTheme);
  currentTheme = targetTheme;
  console.log("Current Theme", currentTheme);
};

init();
