var firebaseConfig = {
    apiKey: "AIzaSyBBFqtQDB_9TB5LDpbzSefxj4_fx6-ICvA",
    authDomain: "jojo-stands.firebaseapp.com",
    projectId: "jojo-stands",
    databaseURL: "https://jojo-stands-default-rtdb.firebaseio.com",
    storageBucket: "jojo-stands.appspot.com",
    messagingSenderId: "887020834345",
    appId: "1:887020834345:web:9a66108faaa1bb5986d638",
    measurementId: "G-1C2GD9SBRY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    document.getElementById("Input8").value='';
    document.getElementById("Input9").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var poderDestructivo = document.getElementById("Input3").value;
    var velocidad = document.getElementById("Input4").value;
    var rango = document.getElementById("Input5").value;
    var persistencia = document.getElementById("Input6").value;
    var precision = document.getElementById("Input7").value;
    var potencialDeDesarrollo = document.getElementById("Input8").value;
    var tipo = document.getElementById("Input9").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var stand = {
            id, //matricula:id
            nombre,
            poderDestructivo,
            velocidad,
            rango,
            persistencia,
            precision,
            potencialDeDesarrollo,
            tipo,
        }

        //console.log(alumno);

        firebase.database().ref('Stands/' + id).update(stand).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Stands');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 **/
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(stand){
    
    if(stand!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = stand.id;
        cell2.innerHTML = stand.nombre; 
        cell3.innerHTML = stand.poderDestructivo;
        cell4.innerHTML = stand.velocidad; 
        cell5.innerHTML = stand.rango;
        cell6.innerHTML = stand.persistencia;
        cell7.innerHTML = stand.precision;
        cell8.innerHTML = stand.potencialDeDesarrollo;
        cell9.innerHTML = stand.tipo;
        cell10.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${stand.id})">Eliminar</button>`;
        cell11.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+stand.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Stands/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Stands/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(stand){
    if(stand!=null)
    {
        document.getElementById("Input1").value=stand.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=stand.nombre;
        document.getElementById("Input3").value=stand.poderDestructivo;
        document.getElementById("Input4").value=stand.velocidad;
        document.getElementById("Input5").value=stand.rango;
        document.getElementById("Input6").value=stand.persistencia;
        document.getElementById("Input7").value=stand.precision;
        document.getElementById("Input8").value=stand.potencialDeDesarrollo;
        document.getElementById("Input9").value=stand.tipo;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Stands");
    ref.orderByChild("tipo").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(stand){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = stand.id;
    cell2.innerHTML = stand.nombre; 
    cell3.innerHTML = stand.poderDestructivo;
    cell4.innerHTML = stand.velocidad; 
    cell5.innerHTML = stand.rango;
    cell6.innerHTML = stand.persistencia;
    cell7.innerHTML = stand.precision;
    cell8.innerHTML = stand.potencialDeDesarrollo;
    cell9.innerHTML = stand.tipo;
   
}