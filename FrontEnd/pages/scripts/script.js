
export async function callAPI() {    
   const works = await fetch("http://localhost:5678/api/works")
   const res = await works.json()
   return res
}
export async function logIn(email, mdp) {    
   const log = await fetch("http://localhost:5678/api/users/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         email: email,
         password: mdp
       })
    })
   const res = await log.json()
   console.log(res);
   if (res.message !== "user not found") {
      localStorage.setItem("user", JSON.stringify(res))
      document.location.href = "/Portfolio-architecte-sophie-bluel/FrontEnd/index.html"; 
   } else {
      return "Erreur dans l’identifiant ou le mot de passe"
   }
}


export async function postWork(file, title, catego) {  
   const fd = new FormData();
   fd.append('image', file);
   fd.append('title', title);
   fd.append('category', catego);
   
   const user = JSON.parse(localStorage.getItem("user"))

   const auto = `Bearer ${user.token}`

   const headers = {
      'Authorization': auto
   };
   const res = await fetch("http://localhost:5678/api/works",{
      method: 'POST',
      headers: headers,
      body: fd
   });
   console.log(res);
}
