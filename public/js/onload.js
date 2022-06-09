console.log("Onload script executed.");

const body = document.querySelector("body");

/***
 * @param isLocalStorageSet set to true of current localStorage data are up-to-date
 */
const isLocalStorageSet = window.localStorage.getItem("isLocalStorageSet");

/**
 * initLoader initialize the loader to update user preferences data
 */
export const initLoader = async () => {
  if (!isLocalStorageSet) {
    console.log("localStorage not set, setting localStorage...");

    await fetch("/student/profile/preferences", {
      method: "get",
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        const preferences = data;

        window.localStorage.setItem("isLocalStorageSet", true);
        window.localStorage.setItem("preferences", JSON.stringify(preferences));

        setTheme(preferences.theme);
      })
      .then(() => {
        body.classList.toggle("hidden");
        console.log("Done, localStorage set...");
      })
      .catch((err) => {
        console.log("onload err", err);
        body.classList.toggle("hidden");
      });
  } else {
    const preferences = JSON.parse(window.localStorage.getItem("preferences"));
    setTheme(preferences.theme);
    body.classList.toggle("hidden");
  }
};

const setTheme = (targetTheme) => {
  console.log("Theme updated to", targetTheme);
  body.classList.add(targetTheme);
};

initLoader();
