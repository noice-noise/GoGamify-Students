console.log("Module script executed.");

const moduleRoot = document.getElementById("moduleRoot");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const pageInfo = document.getElementById("pageInfo");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

let module;

backBtn.addEventListener("click", (e) => {});

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
      module = data;
      appendHeader(data.header);
      appendContent(data.body);
      handlePageNav();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handlePageNav = () => {
  console.log("handlepagenav");
  if (!module) {
    console.log("Error, module not defined.");
  }

  if (module.header.currentPageNumber <= 0) {
    console.log("hide back");
    backBtn.classList.add("hidden");
  } else {
    backBtn.classList.remove("hidden");
  }

  if (module.header.currentPageNumber == module.header.pages - 1) {
    console.log("show completed");
    nextBtn.textContent = "Complete Journey";
  } else {
    nextBtn.textContent = "Next";
  }
};

const appendHeader = (data) => {
  title.textContent = data?.title;
  subtitle.textContent = data?.subtitle;
  pageInfo.textContent = data
    ? `${data.currentPageNumber + 1}/${data.pages}`
    : "";
};

const appendContent = (data) => {
  moduleRoot.innerHTML = data;
};

initScript();
