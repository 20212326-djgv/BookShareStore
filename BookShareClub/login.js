function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
}
