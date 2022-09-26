function traerDatosCuatrimoto(){
    //--------------------GET
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type:'GET',
        dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "quadbike" );
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });
}
function traerDatosCliente(){
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type:'GET',
        dataType: 'json',
        success:function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "client" );
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });
}
function traerMensajes(){
    $.ajax({
        url: 'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message',
        type:'GET',
        dataType: 'json',
        success:function(respuesta){
            pintarDatosGeneral(respuesta.items, "messagetext", "message" );
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });
}
//-----------------------POST
function guardarCuatrimoto(){
    let guardarDatos = {
        'id': $("#id").val(),
        'brand': $("#brand").val(),
        'model': $("#model").val(),
        'category_id': $("#category_id").val(),
        'name': $("#name").val()
    };
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type:'POST',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("La cuatrimoto ha sido guardada");
            traerDatosCuatrimoto();
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });
}
function guardarCliente(){
    let guardarDatos = {
        'id': $("#id").val(),
        'name': $("#name").val(),
        'email': $("#email").val(),
        'age': $("#age").val()
    };
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type:'POST',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("El cliente ha sido guardado");
            traerDatosCliente();
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });
}
function guardarMensaje(){
    let guardarDatos = {
        'id': $("#id").val(),
        'messagetext': $("#messagetext").val()
    };
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message',
        type:'POST',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("Cliente guardado");
            traerMensajes();
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });
}
//-------------------------------------conservar variables
function guardarIdyTipo(id, tipo){
    sessionStorage.setItem('id',id);
    sessionStorage.setItem('tipo',tipo);
    location.href='detalles.html';    
//----------------------------------------------
}


function mostrarDetalles(){
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');

    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/'+tipo+'/'+tipo+'/'+id,
        type:'GET',
        dataType: 'json',
        success:function(respuesta){

            pintarDatosDetalle(respuesta.items);

            pintarEntradaDetalle(respuesta.items);

        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });

}

function pintarDatosGeneral(datos, titulo, tipoTabla){
    let htmlparainsertar = "";
    htmlparainsertar+="<tr>";
    htmlparainsertar+="<th>Datos guardados</th>";
    htmlparainsertar+="</tr>";

    for(let i=0; i<datos.length; i++ ){
        htmlparainsertar+="<tr>";
        htmlparainsertar+="<td><a href='#' onclick='guardarIdyTipo("+datos[i].id+", \""+tipoTabla+"\");'>"+datos[i][titulo]+"</a></td>";
        htmlparainsertar+="</tr>";


    }
    
    $("#resultado").empty();
    $("#resultado").append(htmlparainsertar);

}
//----------------------------actualizar
function pintarDatosDetalle(datos){
    let htmlparainsertar = "";
    htmlparainsertar+="<tr>";
    Object.keys(datos[0]).forEach(elemento => htmlparainsertar+="<th>"+ elemento+ "</th>");
    htmlparainsertar+="</tr>";

    for(let i=0; i<datos.length; i++ ){
        htmlparainsertar+="<tr>";
        Object.values(datos[i]).forEach(elemento => htmlparainsertar+="<td>"+ elemento+ "</td>");
        htmlparainsertar+="</tr>";


    }
    
    $("#resultado").empty();
    $("#resultado").append(htmlparainsertar);

}
function pintarEntradaDetalle(datos){
    let htmlparainsertar = "";
    Object.keys(datos[0]).forEach(elemento => htmlparainsertar+="<input id='"+ elemento+ "'placeholder='"+elemento+"'><br><br>");
    $("#formulario").empty();
    $("#formulario").append(htmlparainsertar);
    
}

//-----------------PUT
function actualizarDetalle(){

    let tipo = sessionStorage.getItem('tipo');

    if(tipo=="quadbike"){
        actualizarCuatrimoto();
    }else if(tipo=="message"){
        actualizarMensaje();
    }else if(tipo=="client"){
        actualizarCliente();
    }

}
function actualizarCuatrimoto(){
    let guardarDatos = {
        'id': $("#id").val(),
        'brand': $("#brand").val(),
        'model': $("#model").val(),
        'category_id': $("#category_id").val(),
        'name': $("#name").val()
    };
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type:'PUT',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("La cuatrimoto ha sido actualizada");
            mostrarDetalles();
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });

}
function actualizarMensaje(){
    let guardarDatos = {
        'id': $("#id").val(),
        'messagetext': $("#messagetext").val(),

    };
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message',
        type:'PUT',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("Mensaje actualizado");
            mostrarDetalles();
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });

}
function actualizarCliente(){
    let guardarDatos = {
        'id': $("#id").val(),
        'name': $("#name").val(),
        'email': $("#email").val(),
        'age': $("#age").val(),

    };
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type:'PUT',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("El ciente ha sido actualizado");
            mostrarDetalles();
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });

}

//----------------DELETE
function borrarDetalle(){
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    let guardarDatos ={
        'id' : id
    }
    
    $.ajax({
        url:'https://gf7d7d597b3d5bb-uxcj3ewcdn2lv1qs.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/'+tipo+'/'+tipo,
        type:'DELETE',
        contentType:'application/json',
        data: JSON.stringify(guardarDatos),
        success: function(respuesta){
            alert("Elemento eliminado");
            location.href='index.html';
        },
        error: function(respuesta, xhr){
            alert("Error de petición");
        }

    });

}
