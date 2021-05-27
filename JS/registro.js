const nombreInput = document.getElementById('nombreInput');
const telInput = document.getElementById('telInput');
const correoInput = document.getElementById('correoInput');
const passwordInput = document.getElementById('passwordInput');
const confpassInput = document.getElementById('confpassInput');
const btnRegistrar = document.getElementById('btnRegistrar');

const database = firebase.database();
const auth = firebase.auth();

var entro = false;

auth.onAuthStateChanged(
    (user) =>{
        if(user !== null){
            if(entro){
                let nuevoUser ={
                    id : user.uid,
                    nombre : nombreInput.value,
                    telefono : telInput.value,
                    email : correoInput.value,
                    password : passwordInput.value,
                };
                database.ref('Usuarios/' + nuevoUser.id).set(nuevoUser).then(
                    () =>{
                        window.location.href = "index.html"
                    }
                );
            }else{
                window.location.href = "index.html"
            }
        }
    }
);

btnRegistrar.addEventListener('click',() =>{
    entro = true;

    let contraIguales = passwordInput.value === confpassInput.value;
    let validarInputs = nombreInput.value === "" || telInput.value === "" || correoInput === "" || passwordInput === "";


    if(validarInputs){
        alert('Completar todos los campos');
    }else{
        if(contraIguales){
            auth.createUserWithEmailAndPassword(correoInput.value, passwordInput.value).then();
        }else{
            alert('Las contraseñas no coinciden');
        }
    }
});