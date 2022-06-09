console.log("Module script executed.");

const moduleRoot = document.getElementById("moduleRoot");

const initScript = async () => {
  const preferences = await JSON.parse(
    window.localStorage.getItem("preferences")
  );
  console.log(preferences);

  if (preferences.fontFamily) {
    console.log("Font pref is ", preferences.fontFamily);
    appendClasses(preferences.fontFamily, preferences.fontSize);
    fetchModule();
  } else {
    console.log("No fontFamily prefs");
  }
};

const appendClasses = (fontFamily, fontSize) => {
  console.log("Changing fontFamily to ", fontFamily);
  // TailwindCSS classes
  moduleRoot.classList.add(fontFamily);
  moduleRoot.classList.add(fontSize);
  // moduleRoot.classList.add(`text-[${fontSize}]`);
};

const fetchModule = async () => {
  console.log("Fetching module...");
  await fetch("/resource/data/628200516138420680487cc6", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("data", data);
      appendContent(data.body);
    });
};

const appendContent = (data) => {
  moduleRoot.innerHTML = data;
};

initScript();
