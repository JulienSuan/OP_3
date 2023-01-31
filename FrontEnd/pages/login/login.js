import {logIn} from "../scripts/script.js"



const btn = document.querySelector(".btn")
const inpmail = document.querySelector(".inpmail")
const inpmdp = document.querySelector(".inpmdp")

btn.addEventListener("click", async(e) => {
    e.preventDefault()
    const mail = inpmail.value
    const mdp = inpmdp.value
    console.log(mail);
    await logIn(mail, mdp)
})


