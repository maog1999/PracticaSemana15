class Contacto{
    constructor(contacto){
        this.contacto = contacto;
    }

    draw = () =>{
        let comp = document.createElement('div');
        comp.id = "containerComp";

        let container = document.createElement('div');
        container.id = "containerBig";

        let nombre = document.createElement('p');
        nombre.innerHTML = this.contacto.nombre;

        let tele = document.createElement('p');
        tele.innerHTML = this.contacto.telefono;

        let btnEliminar = document.createElement('button');
        btnEliminar.id = "btnEliminar";
        btnEliminar.innerHTML = "eliminar";

        btnEliminar.addEventListener('click', ()=>{
            database.ref('Contactos/'+this.contacto.userId+'/'+this.contacto.id).set(null);
        })

        container.appendChild(nombre);
        container.appendChild(tele);

        comp.appendChild(container);
        comp.appendChild(btnEliminar);

        return comp;
    }
}