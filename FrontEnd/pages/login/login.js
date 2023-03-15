import {logIn} from "../scripts/script.js"



const btn = document.querySelector(".btn")
const inpmail = document.querySelector(".inpmail")
const inpmdp = document.querySelector(".inpmdp")
const errorMsg = document.getElementById("error-msg")

let intervalId
btn.addEventListener("click", async(e) => {
    e.preventDefault()
    const mail = inpmail.value
    const mdp = inpmdp.value
    const res = await logIn(mail, mdp)
    if (res === "Erreur dans l’identifiant ou le mot de passe") {
        if (intervalId) {
            clearInterval(intervalId)
        }
        errorMsg.textContent = res
        errorMsg.classList.add("show")
        intervalId = setInterval(() => {
            errorMsg.classList.remove("show")
        }, 4000);
    } else {
        errorMsg.classList.remove("show")
    }
})

