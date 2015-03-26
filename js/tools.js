function refresh_values(){

  $("form#values :input[type=text]").each(function(){
    this.value = this.value.replace(",", ".");
    });

	acceleration = parseFloat( $("#text_acceleration").val() );
	initial_velocity = parseFloat( $("#text_initial_velocity").val() );
  initial_height = parseFloat( $("#text_initial_height").val() );
  /* remember that the angle should be measured in RADIANS, not in degrees (conversion below) */
  angle = parseInt( $("#text_angle").val() );
  $("#steps").val(parseInt($("#steps").val()));
  steps = $("#steps").val() - 1;
  alerts();
  $("#myChart").show();
}

function alerts(){
	var alert_show = false;
	var alert_container = $("#alert");
	alert_container.hide();
	$("#alert").html("Następujące problemy nie pozwoliły na uruchomienie wykresu: <ul>");
  if ( 299792458 <= initial_velocity ){
    alert_container.append(
      "<li>Hej! Zwariowałeś? Czy w ogóle pomyślałeś co może się stać, gdy rzucisz piłką z prędkością światła? Popraw to!</li>"
    );
    alert_show = true;
  }
  if ( 90 < angle || 0 > angle ){
    alert_container.append(
      "<li>Kąt rzutu musi być liczbą naturalną z przedziału <0,90>. Nie chcemy rzucać za siebie, bo jeszcze kogoś trafimy.</li>"
    );
    alert_show = true;
    flight_time = 0;
  }
  else{
    angle = angle * (Math.PI/180);
    /* now we can get the flight_time */
    flight_time = get_flight_time();
  }
  if ( 0 == acceleration ){
    alert_container.append(
    "<li>Przyspieszenie grawitacyjne nie może równać się 0 bo... piłka będzie leciała nieskończenie daleko w górę (dopóki nie trafi na inne przyspieszenie). :)</li>" +
    "<li>Nie można wyliczyć czasu lotu, ani maksymalnej wysokości, gdyż są one nieskończone (przyspieszenie = 0?).</li>"
    );
    alert_show = true;
  }
  if ( 0 >= flight_time  ){
    alert_container.append("<li>Niestety, ale piłka nawet nie drgnęła (czas lotu - 0 ms).</li>");
    alert_show = true;
  }
  if ( 0 >= get_max_height() ){
    alert_container.append("<li>Niestety, ale piłka od razu spadła na ziemię (maksymalna wysokość - 0m).</li>")
    alert_show = true;
  }
  if ( 2 > steps ){
    alert_container.append("<li>Ustawiłeś za mało punktów wyliczeniowych (wymagane przynajmniej dwa, aby wykres się pokazał).</li>");
    alert_show = true;
  }
  if ( ! alert_show ){
    clear_chart();
    fill_chart();
    print_results();
  }
  alert_container.append("</ul>");
  if ( alert_show ){
    alert_container.attr('class', 'alert-box alert');
    alert_container.show();
  }
}

function fill_chart(){
  average_height=0;
  average_velocity=0;
  // var step = Math.round( 1000 * flight_time/steps)/1000;
  step = flight_time/steps;
  // for(ms=0.0; ms < flight_time; ms+=step){
    //add_data( y(ms), x(ms) );
    //average_height+=y(ms);
    //average_velocity+=obj_velocity(ms);
//  }
  for(n=0; n<=steps; n++) {
    add_data( y(n * flight_time / steps), x(n * flight_time / steps) );
    average_height+=y(n * flight_time / steps);
    average_velocity+=obj_velocity(n * flight_time / steps);
  }
  // add_data(0, x(flight_time));
  //document.title=parseInt(1000000 * y(ms));
  //if( y(ms) > 0 ) add_data(y(flight_time), x(flight_time));
  myLineChart = new Chart(ctx).Line(data, options);
}

function print_results(){
  /* static flight time, range */
	$("#results_flight_time").html( Math.round(1000 * get_flight_time())/1000 + " sek" );
  $("#results_range").html( Math.round(1000 * get_range())/1000 + " m");
  /* velocity measurement */
  $("#results_max_velocity").html( initial_velocity + " m/s" );
  $("#results_min_velocity").html( Math.round(1000 * v0x())/1000 + " m/s" );
  /* super cool average velocity - thanks to kocio */
  	VavgY = v0y() / 2;
    VavgX = v0x();
    Vavg = Math.sqrt(Math.pow(VavgY, 2) + Math.pow(VavgX, 2));
  $("#results_average_velocity").html( Math.round(1000 * Vavg)/1000 + " m/s"  );
  /* height measurement */
  $("#results_average_height").html( Math.round(1000*get_average_height(steps+1))/1000 + " m");
  $("#results_max_height").html( Math.round(1000*get_max_height())/1000 + " m");
}
