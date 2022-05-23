console.log("Module script executed.");

const moduleRoot = document.getElementById("moduleRoot");

const initScript = async () => {
  const preferences = await JSON.parse(
    window.localStorage.getItem("preferences")
  );
  console.log(preferences);

  if (preferences && preferences.fontFamily) {
    console.log("Font pref is ", preferences.fontFamily);
    appendClasses(preferences.fontFamily, preferences.fontSize);
  } else {
    console.log("No fontFamily prefs");
  }

  await fetchModule();
};

const appendClasses = (fontFamily, fontSize) => {
  // TailwindCSS classes
  moduleRoot.classList.add(fontFamily);
  moduleRoot.classList.add(fontSize);
};

const fetchModule = async () => {
  console.log("Fetching module...");
  await fetch("/student/p/currentPage", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("data", data);
      appendContent(data);
    });
};

const appendContent = (data) => {
  moduleRoot.innerHTML = data;
};

initScript();
