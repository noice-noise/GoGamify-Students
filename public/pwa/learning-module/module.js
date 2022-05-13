console.log("Module script executed.");

export const initLoader = async () => {
  const preferences = JSON.parse(window.localStorage.getItem("preferences"));

  if (preferences.fontFamily) {
    console.log("Font pref is ", preferences.fontFamily);
    setFont(preferences.fontFamily);
  } else {
    console.log("No fontFamily prefs");
  }
};

const setFont = (targetFont) => {
  console.log("Changing fontFamily to ", targetFont);
};

initLoader();
