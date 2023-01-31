
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
   if (res) {
      document.location.href = "/FrontEnd/index.html"
   }
   localStorage.setItem("user", JSON.stringify(res))
   return res
}


export async function postWork(file, title, catego) {  
  // const works =  await fetch("http://localhost:5678/api/works")
  // const user = JSON.parse(localStorage.getItem("user"))
   const fd = new FormData();
  //  fd.append('id', parseInt(works.length + 1));
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
