const signUpForm = document.getElementById("signup-form");

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirm_password").value;

  if (password != confirmpassword) {
    alert("Please make sure passwords should be same");
  }

  if (password === confirmpassword) {
    const accessToken = generateAccessToken();

    alert("Sign up successful");
    localStorage.setItem("name", name);
    localStorage.setItem("Email", email);
    localStorage.setItem("Password", password);
    localStorage.setItem("Acess Token", accessToken);
  
   
     
  }
  window.location.href = "http://127.0.0.1:5501/index.html";
});

function generateAccessToken() {
  const tokenArray = new Uint8Array(16);
  window.crypto.getRandomValues(tokenArray);
  return Array.from(tokenArray, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  
}
