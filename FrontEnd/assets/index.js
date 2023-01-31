const gallery = document.querySelector(".gallery")
import {callAPI, postWork} from "../pages/scripts/script.js"
const variable = await callAPI();
console.log(variable);
const tag1 = document.querySelector("#tag1")
const tag2 = document.querySelector("#tag2")
const tag3 = document.querySelector("#tag3")
const tag4 = document.querySelector("#tag4")


console.log(tag1.checked)
console.log(tag2.checked)
console.log(tag3.checked)
console.log(tag4.checked)

document.querySelector(".form22").addEventListener("change", () => {
    if (tag1.checked) {
        callFu(tag1.value) 
    }
    if (tag2.checked) {
        callFu(tag2.value) 
    }
    if (tag3.checked) {
        callFu(tag3.value) 
    }
    if (tag4.checked) {
        callFu(tag4.value) 
    }
})

function callFu(val) {
    gallery.innerHTML = ""
    variable.map(data => {
        if (data.category.name === val) {     
            gallery.innerHTML +=
            `
                    <figure class="imggalll">
                        <img crossorigin="anonymous" src="${data.imageUrl}" alt="${data.title}">
                        <figcaption>${data.title}</figcaption>
                    </figure>
        `
        } if(val === "tous") {
            gallery.innerHTML +=
            `
                    <figure class="imggalll">
                        <img crossorigin="anonymous" data-id=${data.id} src="${data.imageUrl}" alt="${data.title}">
                        <figcaption>${data.title}</figcaption>
                    </figure>
        `
        }
    })
}



callFu("tous")

const user = JSON.parse(localStorage.getItem("user"))
const modifGal = document.querySelector(".modifGal")
const edition = document.querySelector(".edition")
if (user.userId == 1) {
    edition.style.display = "flex"
    modifGal.style.display = "flex"
}

let old = 0;
document.addEventListener("scroll", (e) => {
    console.log("boo")
    console.log(scrollY)
    if (scrollY < old) {
        edition.style.transform = "translateY(0%)"
    } else {
        edition.style.transform = "translateY(-100%)"
    }
    old = scrollY
})

const galphoto = document.querySelector(".galphoto")
const modal = document.querySelector(".modal")
modifGal.addEventListener("click", () => {
    setTimeout(() => {
        modal.style.display = "flex"
    }, 1);
    galphoto.innerHTML = ""
    variable.map(data => {
    galphoto.innerHTML +=
            `
                    <div class='imagegall' data-id=${data.id}>
                    <img src="./assets/icons/ben.svg" class="corbenDalas">
                        <img class="imageedit" crossorigin="anonymous" id="imagegal${data.id}" src="${data.imageUrl}" alt="${data.title}">
                        <figcaption>éditer</figcaption>
                    </div>
        `
    })
    
    const corbenDalas = document.querySelectorAll(".corbenDalas")
    console.log(user.token)

    const auto = `Bearer ${user.token}`

    corbenDalas.forEach(corben => {
        corben.addEventListener("click", async(e) => {
                const headers = {
                    'Authorization': auto
                 };
                console.log(e.target.parentElement.dataset.id)
                const del = await fetch("http://localhost:5678/api/works/"+e.target.parentElement.dataset.id, {
                    method : "DELETE",
                    headers: headers
                })
                
            })
        });
        console.log(corbenDalas)
        corbenDalas.forEach(imagegall => {
        console.dir(imagegall);
});
})


const close = document.querySelectorAll(".close")

close.forEach(element => {
    element.addEventListener("click", (e) => {
        e.stopPropagation()
        galphoto.innerHTML = ""
        modal.style.display = "none"
    })
});

const modalcard = document.querySelector(".modalcard")
const modalcard2 = document.querySelector(".modalcard2")


document.addEventListener("click", (e) => {
    if (!modalcard.contains(e.target) && modal.style.display == "flex" && !modalcard2.contains(e.target)) {
        galphoto.innerHTML = ""
        modal.style.display = "none"
    }
})

const inpfile = document.querySelector("#inpfile")
const preview = document.querySelector(".preview")
const chooseImage = document.querySelector(".chooseImage")
const ajouterPhoto = document.querySelector(".ajouterPhoto")
const size = document.querySelector(".size")
const contfile = document.querySelector(".contfile")

inpfile.addEventListener("change", (e) => {
    if (e.target.files[0]) { 
        console.log(e.target.files[0])
        preview.style.display = "block"
        chooseImage.style.display = "none"
        ajouterPhoto.style.display = "none"
        size.style.display = "none"
        contfile.style.padding = "0"
        preview.style.backgroundImage = "url("+URL.createObjectURL(e.target.files[0])+")";
    }
})

const modalBtn = document.querySelector(".modalBtn")

modalBtn.addEventListener("click", () => {
    modalcard.style.display = "none"
    modalcard2.style.display = "flex"
})


const titreinp = document.querySelector(".titreinp")
const cateinp = document.querySelector(".cateinp")


const formmodal2 = document.querySelector(".formmodal2")
const btnvalid = document.querySelector(".btnvalid")


async function AddPost(titre, cate) {
    await postWork(inpfile.files[0], titre, cate);
  }
  
  let titre;
  let cate;  
  let file;  
  let clickEventAdded = false;
  
  formmodal2.addEventListener("change", () => {
    titre = titreinp.value;
    cate = cateinp.value;
    file = inpfile.files[0];
    if (titre && cate && file && !clickEventAdded) {
      btnvalid.style.backgroundColor = "#1D6154";
      btnvalid.addEventListener("click", () => AddPost(titre, cate));
      clickEventAdded = true;
    } else {
      btnvalid.removeEventListener("click", AddPost);
      btnvalid.style.backgroundColor = "#A7A7A7";
      clickEventAdded = false;
    }
  });
  