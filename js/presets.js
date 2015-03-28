function Preset(name, acceleration, info){
  this.acceleration = parseFloat( acceleration );
  this.name = name;
  this.info = info;
}

function fill_presets(){
  $.each(
    [
      moon = new Preset( "Księżyc", 1.622, "Gdyby Armstrong rzucał piłką..." ),
      sun = new Preset( "Słońce", 274, "Gdyby tylko można było rzucić piłką na Słońcu..."),
      mercury = new Preset( "Merkury", 3.701, "Druga planeta w naszym układzie, licząc od Słońca."),
      venus = new Preset( "Wenus", 8.87, "Czyli jak rzucają Panie."),
      earth = new Preset( "Ziemia", 9.80665, "Nasz dom!"),
      mars = new Preset( "Mars", 3.69, "Marsjański łazik też potrzebuje zabawy." ),
      jupiter = new Preset( "Jowisz", 24.79, "Gdybyśmy rzucali z pozycji równika, ale... na Jowiszu?" ),
      saturn = new Preset( "Saturn", 10.44, ""),
      uranus = new Preset( "Uran", 8.69, ""),
      neptun = new Preset( "Neptun", 10.71, ""),
      pluto = new Preset( "Pluton", 0.66, "Planeta karłowata, dziewiąty w kolejności obiekt od Słońca.")

    ], function(index,value){
      $(".top-bar-section .right .has-dropdown .dropdown").append("<li class=\"preset-item\" accel=\"" + value.acceleration + "\"><a href=\"#\">" + value.name + "</a></li>");
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
    alert_container.delay(750).slideUp("slow");
    $("#text_acceleration").val( parseFloat( $(this).attr("accel") ) );
  });
}
