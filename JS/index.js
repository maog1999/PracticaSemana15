const btnAgregar = document.getElementById('btnAgregar');
const nombreNInput = document.getElementById('nombreNInput');
const teleNInput = document.getElementById('teleNInput');
const btnNuevoContacto = document.getElementById('btnNuevoContacto');
const btnCerrar = document.getElementById('btnCerrar');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const auth = firebase.auth();

//Containers
const modalContainer = document.getElementById('modalContainer');
const contactosContainer = document.getElementById('contactosContainer');

let userAct = null;

auth.onAuthStateChanged(
    (user) =>{
        if(user !==null){
            database.ref('Usuarios/' + user.uid).once('value',
                (data) =>{
                    let userFB = data.val();
                    userAct = userFB.id;
                    cargarContactos();
                }
            )
        }else{
            window.location.href="login.html";
        }
    }
);

cargarContactos = () =>{
    database.ref('Contactos/'+userAct).on('value',function(data){
        //console.log(userAct);
        contactosContainer.innerHTML='';
        data.forEach(
            newContacto =>{
                let infoContacto = newContacto.val();
                let contacto = new Contacto(infoContacto);
                contactosContainer.appendChild(contacto.draw());
            }
        )
    })
}

btnAgregar.addEventListener('click', ()=>{
    modalContainer.style.display = "flex";
});

btnCerrar.addEventListener('click', ()=>{
    modalContainer.style.display = "none";
});
btnNuevoContacto.addEventListener('click', ()=>{
    if(nombreNInput === "" || teleNInput === ""){
        alert('Completar todos los campos');

    }else{
        database.ref();

        let nombre2 = nombreNInput.value;
        let telefono2 = teleNInput.value;
        let refe = database.ref('Contactos/'+ userAct).push();

        let newContact = {
            id : refe.key,
            userId : userAct,
            nombre : nombre2,
            telefono : telefono2,
        }
        refe.set(newContact);
        nombreNInput.value = "";
        teleNInput.value = "";
    }
});


btnCerrarSesion.addEventListener('click', () =>{
    auth.signOut().then(
        () =>{
            userAct = null;
            window.location.href = "login.html";
        }
    ).catch(
        (error) =>{
            alert(error.message);
        }
    )
})
