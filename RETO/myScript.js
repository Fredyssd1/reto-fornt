function leerCliente(){
    //GET
        $.ajax({ 
        url : 'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'GET',
        dataType : 'json',

        success : function(clientes) {

            let cs=clientes.items;
            $("#listaClientes").empty();
            for(i=0; i<cs.length; i++ ){
                $("#listaClientes").append(cs[i].id+"<b>"+cs[i].name+"</b>"+cs[i].email+" "+cs[i].age);
                $("#listaClientes").append("<button onclick='borrarCliente("+cs[i].id+")'>Borrar</button><br>");
            }

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }

    });

}

function guardarCliente(){
    let clienteId=$("#idCliente").val();
    let clienteNombre=$("#nombreCliente").val();
    let clienteEmail=$("#emailCliente").val();
    let clienteEdad=$("#edadCliente").val();

    let dato={
        id:clienteId,
        name:clienteNombre,
        email:clienteEmail,
        age:clienteEdad

    };

    let enviarDatos=JSON.stringify(dato);

//POST
    $.ajax({ 
        url : 'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'POST',
        data:enviarDatos,
        contentType:'application/json',

        success : function(pepe) {
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#emailCliente").val("");
            $("#edadCliente").val("");
        },
        error : function(xhr, status) {
  
        },
       
    });

}

function editarCliente(){
    let clienteId=$("#idCliente").val();
    let clienteNombre=$("#nombreCliente").val();
    let clienteEmail=$("#emailCliente").val();
    let clienteEdad=$("#edadCliente").val();

    let dato={
        id:clienteId,
        name:clienteNombre,
        email:clienteEmail,
        age:clienteEdad

    };

    let enviarDatos=JSON.stringify(dato);

//PUT
    $.ajax({ 
        url : 'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'PUT',
        data:enviarDatos,
        contentType:'application/json',

        success : function(pepe) {
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#emailCliente").val("");
            $("#edadCliente").val("");
        },
        error : function(xhr, status) {

        },

        complete: function(){
            leerCliente();
        }
       
    });

}
function borrarCliente(idCliente){

    let dato={
        id:clienteId,
    };

    let enviarDatos=JSON.stringify(dato);

//DELETE
    $.ajax({ 
        url : 'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'DELETE',
        data:enviarDatos,
        contentType:'application/json',

        complete : function(pepe) {
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#emailCliente").val("");
            $("#edadCliente").val("");
        },
        error : function(xhr, status) {

        },

        complete: function(){
            leerCliente();
        }
       
    });

}