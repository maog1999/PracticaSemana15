const correoInput2 = document.getElementById('correoInput2');
const passwordInput2 = document.getElementById('passwordInput2');
const loginBtn = document.getElementById('loginBtn');

const database = firebase.database();
const auth = firebase.auth();

auth.onAuthStateChanged(
    (user) =>{
        if(user !== null){
            window.location.href = "index.html";
        }
    }
);


loginBtn.addEventListener('click', ()=>{
    auth.signInWithEmailAndPassword(correoInput2.value, passwordInput2.value).then(
        (data) =>{
            window.location.href = "index.html";
        }
    ).catch(
        (error) => {
            alert(error.message);
        }
    )
});
