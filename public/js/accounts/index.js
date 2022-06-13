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
        window.location.href = data.redirect;
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
