console.log("Onload script executed.");

const body = document.querySelector("body");

/***
 * @param isLocalStorageSet set to true of current localStorage data are up-to-date
 */
const isLocalStorageSet = window.localStorage.getItem("isLocalStorageSet");

const collectionsUpdated = window.localStorage.getItem("collectionsUpdated");
console.log("collectionsUpdated", collectionsUpdated);

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

  assessCollection();
};

const setTheme = (targetTheme) => {
  console.log("Theme updated to", targetTheme);
  body.classList.add(targetTheme);
};

const linkConfettiJs = () => {
  const script = document.createElement("script");
  script.src = "/js/confetti.js";
  body.appendChild(script);
};

const handlePopupModals = (messages) => {
  linkConfettiJs();

  console.log("Popup modal...");
  const element = `
    <div class="z-50 fixed top-0 left-0 h-screen w-screen px-36 bg-black/50 py-10">
      <div class="w-full max-w-lg h-full flex flex-col gap-5 justify-center section items-center ">
      <h3 class="h2 text-primary">Congrats!</h3>
      <div>
      <img class="w-32 h-32 mx-auto" src="/assets/undraw_well_done_i2wr.svg" alt="Congrats!" />
      </div>
        <p class="h4">You've earned some collectibles!</p>
        <ul id="messageList" class="text-center flex flex-col justify-center items-center"></ul>

        <button id="popupButton" class="mt-5 button button--cta px-10">Awesome</button>

      </div>

    </div>
    `;

  const popup = document.createElement("div");
  popup.setAttribute("id", "popupModal");
  popup.innerHTML += element;
  body.appendChild(popup);

  const messageList = document.querySelector("#messageList");

  messages.forEach((message) => {
    let list = document.createElement("li");
    let icon = document.createElement("img");
    let spanIcon = document.createElement("span");
    let spanLabel = document.createElement("span");

    list.classList += "flex gap-5 justify-center items-center";
    spanLabel.classList += "flex justify-center items-center";
    icon.classList += "w-10 h-10";

    icon.src = "../collections/badges/" + message.graphic;
    spanLabel.textContent = `${message.title} (${
      message.type.charAt(0).toUpperCase() + message.type.substring(1)
    })`;

    spanIcon.appendChild(icon);
    list.appendChild(spanIcon);
    list.appendChild(spanLabel);
    messageList.appendChild(list);
  });

  document.querySelector("#popupButton").addEventListener("click", (e) => {
    stopConfetti(); // from linked confetti.js
    popup.remove();
  });
};

const assessCollection = async () => {
  const onCollectionRoute =
    window.location.href ==
    window.location.origin + "/pwa/collections/collections.html";

  if (onCollectionRoute) {
    await fetch("/student/stats/assess", {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (collectionsUpdated == "false") {
          // reload to sync rendered page and actual user data
          window.localStorage.setItem("collectionsUpdated", true);
          window.location.reload();
        } else {
          console.log("stat data", data);
          handlePopupModals(data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // set collectionsUpdated to false if the user navigates outside the collection page
    window.localStorage.setItem("collectionsUpdated", false);
  }
};

initLoader();
