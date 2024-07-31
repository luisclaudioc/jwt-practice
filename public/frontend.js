const form = document.getElementById("form");
const getSecret = document.getElementById('secret');
const word = document.getElementById('word');
const secretMessage = document.getElementById('secret-message')

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await axios.post('/login', { username: username, password: password });
    console.log(response)

    if (response.data.result === "success") {
        localStorage.setItem("token", response.data.token);
    } else {
        alert('Wrong credentials')
    }

})

getSecret.addEventListener("click", async function () {
    const response = await axios.post("/secret", { token: localStorage.getItem("token") })
    if (response.data.result == "success") {
      document.getElementById("secret-message").textContent = response.data.message
    } else {
      document.getElementById("secret-message").textContent = "This is a secret!"
    }
})