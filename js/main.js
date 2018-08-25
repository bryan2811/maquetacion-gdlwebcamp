(function(){
    "use strict";

    var regalo = document.querySelector('#regalo');

    document.addEventListener('DOMContentLoaded', function(){
        
        var mapa = document.getElementById('mapa');
        if (mapa) {
            var map = L.map('mapa').setView([10.502813, -66.918663], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([10.502813, -66.918663]).addTo(map)
            .bindPopup('GDLWebCamp 2018<br> Boletos ya disponibles')
            .openPopup()
            //.bindTooltip('Un Tooltip')
            //.openTooltip();
        }

        // Campos Datos Usuario

        var nombre = document.querySelector('#nombre');
        var apellido = document.querySelector('#apellido');
        var email = document.querySelector('#email');


        // Campos Pases

        var pase_dia = document.querySelector('#pase_dia');
        var pase_dosdias = document.querySelector('#pase_dosdias');
        var pase_completo = document.querySelector('#pase_completo');



        // Botones y Divs

        var calcular = document.querySelector('#calcular');
        var errorDiv = document.querySelector('#error');
        var botonRegistro = document.querySelector('#btnRegistro');
        var lista_productos = document.querySelector('#lista-productos');
        var suma = document.querySelector('#suma-total');

        // Extras

        var camisas = document.querySelector('#camisa_evento');
        var etiquetas = document.querySelector('#etiquetas');
     
        if (document.getElementById('calcular')) {
            

        calcular.addEventListener('click', calcularMontos);
        
        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);

        function validarCampos(){
            if(this.value == '') {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Este campo es obligatorio";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }else {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }
        
        function validarMail(){
            //indexOf va a buscar en un array o cadena el caracter que le pases
            if (this.value.indexOf("@") > -1) {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            } else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Debe tener al menos un @";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
        }
        


        function calcularMontos(event){
            event.preventDefault();
            if (regalo.value === '') {
                alert("Debes elegir un regalo");
                regalo.focus();
            } else {
                /** ESTE CÓDIGO HACE VARIAS COSAS >>>>parseInt(pase_dia.value, 10) || 0,<<<<
                
                UNO.>> parseInt va a convertir el valor del <input> a numero (debido a que es un input que el usuario escribe, será string) o cadena, es decir, si ponen 20, no viene como 20, sino '20', parseInt lo convierte a un número que javascript pueda leer.

                DOS.>> La parte del ,10, ese 10 es la base, es decir, conviértelo a base 10, que son los números del 0 al 9.

                TRES.>> la 3ra parte es la de:  || 0, en caso de que un usuario escriba HOLA nuestro código va a revisar, encontrar que estos no son números y cambiar el texto HOLA por un 0.
                de esta forma, si el usuario escribe algo no deseado, evitamos errores, como querer hacer la operación con letras en lugar de números **/
                
                var boletosDia = parseInt(pase_dia.value, 10)|| 0,
                    boletos2Dias = parseInt(pase_dosdias.value, 10)|| 0,
                    boletoCompleto = parseInt(pase_completo.value, 10)|| 0,
                    cantCamisas = parseInt(camisas.value, 10)|| 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10)|| 0;

                var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                
                var listadoProductos = [];

                if(boletosDia >= 1) {
                    listadoProductos.push(boletosDia + " Pases por día");
                }
                if(boletos2Dias >= 1) {
                    listadoProductos.push(boletos2Dias + " Pases por 2 días");
                }
                if(boletoCompleto >= 1) {
                    listadoProductos.push(boletoCompleto + " Pases Completos");
                }
                if(cantCamisas >= 1) {
                    listadoProductos.push(cantCamisas + " Camisas");
                }
                if(cantEtiquetas >= 1) {
                    listadoProductos.push(cantEtiquetas + " Etiquetas");
                }

                //El innerHTML antes del for es por si cambian de cantidad asi no reescribe todo, sino solamente el editado
                lista_productos.style.display = "block";
                lista_productos.innerHTML = '';
                for(var i = 0; i< listadoProductos.length; i++){
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                }

                suma.innerHTML = ("$ ") + totalPagar.toFixed(2);


            }
        }

        function mostrarDias(){
            var boletosDia = parseInt(pase_dia.value, 10)|| 0,
                boletos2Dias = parseInt(pase_dosdias.value, 10)|| 0,
                boletoCompleto = parseInt(pase_completo.value, 10)|| 0;

                var diasElegidos = [];

                if (boletosDia > 0) {
                    diasElegidos.push('viernes');
                } 
                if (boletos2Dias > 0) {
                    diasElegidos.push('viernes','sabado');
                }
                if (boletoCompleto > 0) {
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                }
                for(var i = 0; i< diasElegidos.length; i++){
                    document.getElementById(diasElegidos[i]).style.display = 'block';
                }
        }

        }






    }); //DOM CONTENT LOADED
})();




//JQUERY

$(function () {
    //Menu Fijo

    //Con jQuery puedes saber la medida de la ventana gráfica:
    var windowHeight = $(window).height();
    var barraAltura = $('.barra').innerHeight();


    $(window).scroll(function() { 
        var scroll = $(window).scrollTop();
        
        //Validacion
        if (scroll > windowHeight) {
            $('.barra').addClass('fixed');
            $('body').css({'margin-top': barraAltura+'px'});
        } else {
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top': '0px'});
        }
    });

    //Menu Responsive

    $('.menu-movil').on('click', function () {
        $('.navegacion-principal').slideToggle();
    });

    //Lettering

    $('.nombre-sitio').lettering();

    //Programa de conferencias
    
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click', function () {
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();
        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);
        return false;
    });

    //Animaciones para los números (Mientras vemos PHP)

    $('.resumen-evento li p').append('0');

    $('.resumen-evento').mouseenter(function() {
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1500);
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1500);

    });
    

    //Cuenta regresiva

    $('.cuenta-regresiva').countdown('2018/12/30 10:00:00', function(event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });
});