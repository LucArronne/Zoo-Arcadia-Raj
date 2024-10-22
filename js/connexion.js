const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", ckeckCredentials);

function ckeckCredentials(){
   // appel Api en bdd// 
   if (mailInput.value === "administrateur@mail.fr" && passwordInput.value === "123" || mailInput.value === "Employé@mail.fr" && passwordInput.value === "345" || mailInput.value === "vétérinaire@mail.fr" && passwordInput.value === "567"){

window.location.replace("/");
}
else{
    mailInput.classList.add ("Identifiants incorrects");
    passwordInput.classList.add ("Identifiants incorrects");
    alert("Identifiants incorrects");
}
}
