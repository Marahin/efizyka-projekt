function Preset(name, acceleration, info){
  this.acceleration = parseFloat( acceleration );
  this.name = name;
  this.info = info;
}

function fill_presets(){
  $.each(
    [
      moon = new Preset( "Księżyc", 1.622, "Gdyby Armstrong rzucał piłką..." ),
      mars = new Preset( "Mars", 3.69, "Marsjański łazik też potrzebuje zabawy." ),
      sun = new Preset( "Słońce", 274, "Gdyby tylko można było rzucić piłką na Słońcu..."),
      earth = new Preset( "Ziemia", 9.80665, "Nasz dom!"),
      jupiter = new Preset( "Jowisz", 24.79, "Gdybyśmy rzucali z pozycji równika, ale... na Jowiszu?" )
    ], function(index,value){
      $(".top-bar-section .right .has-dropdown .dropdown").append("<li class=\"preset-item\" accel=\"" + value.acceleration + "\">" + value.name + "</li>");
    }
  );
  $(".preset-item").click(function(){
    //alert($(this).attr("accel") );
  	var alert_container = $("#alert");
    if ( alert_container.is(":visible") ){
      alert_container.hide();
    }
    alert_container.html( "Wczytano ustawienie pomyślnie!" ).attr("class", "alert-box success round");
    if ( alert_container.is(":hidden") ){
      alert_container.slideDown("slow");
    }
    alert_container.delay(550).slideUp("slow");
    $("#text_acceleration").val( parseFloat( $(this).attr("accel") ) );
  });
}
