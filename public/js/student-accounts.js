const mainList = document.getElementById("mainList");
const deleteBtn = document.querySelectorAll("a.delete");

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("dataset", btn.dataset.doc);
    const endpoint = `/student/${btn.dataset.doc}`;

    fetch(endpoint, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted successfully.");
        mainList.removeChild(btn.parentElement);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
