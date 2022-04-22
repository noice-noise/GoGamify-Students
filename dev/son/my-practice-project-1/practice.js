const button = document.getElementById("button");
const message = document.getElementById("message");

button.addEventListener("click", (event) => {
  console.log("Hello to console log!");
  message.textContent = "Hello also, human!";
});
