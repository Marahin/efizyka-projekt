function refresh_values(){
	acceleration = parseFloat( $("#text_acceleration").val() );
	initial_velocity = parseFloat( $("#text_initial_velocity").val() );
  initial_height = parseFloat( $("#text_initial_height").val() );
  /* remember that the angle should be measured in RADIANS, not in degrees (conversion below) */
  angle = parseInt( $("#text_angle").val() );
  steps = $("#steps").val() - 1;
  alerts();
}

function alerts(){
  alert = $("#alert").html("Następujące problemy nie pozwoliły na uruchomienie wykresu: <ul>");
  alert.hide();
  var alert_show = false;
  if ( 299792458 <= initial_velocity ){
    alert.append(
      "<br/><li>Hej! Zwariowałeś? Czy w ogóle pomyślałeś co może się stać, gdy rzucisz piłką z prędkością światła? Popraw to!</li>"
    );
    alert_show = true;
  }
  if ( 90 < angle || 0 > angle ){
    alert.append(
      "<br/><li>Kąt rzutu musi być liczbą naturalną z przedziału <0,90>. Nie chcemy rzucać za siebie, bo jeszcze kogoś trafimy.</li>"
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
    alert.append(
    "<br/><li>Przyspieszenie grawitacyjne nie może równać się 0 bo... piłka będzie leciała nieskończenie daleko w górę (dopóki nie trafi na inne przyspieszenie). :)</li>" +
    "<br/><li>Nie można wyliczyć czasu lotu, ani maksymalnej wysokości, gdyż są one nieskończone (przyspieszenie = 0?).</li>"
    );
    alert_show = true;
  }
  if ( 0 >= flight_time  ){
    alert.append("<br/><li>Niestety, ale piłka nawet nie drgnęła (czas lotu - 0 ms).</li>");
    alert_show = true;
  }
  if ( 0 >= get_max_height() ){
    alert.append("<br/><li>Niestety, ale piłka od razu spadła na ziemię (maksymalna wysokość - 0m).</li>")    
    alert_show = true;
  }
  if ( 1 >= steps ){
    alert.append("<br/><li>Ustawiłeś za mało punktów wyliczeniowych (wymagane przynajmniej dwa, aby wykres się pokazał).</li>");
    alert_show = true;
  }
  if ( ! alert_show ){
    clear_chart();
    fill_chart();
    print_results();
  }
  alert.append("</ul>");
  if ( alert_show ){
    alert.attr('class', 'alert-box alert');
    alert.show();
  }
}

function fill_chart(){
  average_height=0;
  average_velocity=0;
  var step = Math.round( 1000 * flight_time/steps)/1000;
  for(ms=0.0; ms < flight_time; ms+=step){
    add_data( y(ms), x(ms) );
    average_height+=y(ms);
    average_velocity+=obj_velocity(ms);
  }
  add_data(0, x(flight_time));
  myLineChart = new Chart(ctx).Line(data, options);
}

function print_results(){
  /* static flight time, range */
	$("#results_flight_time").html( get_flight_time() + " sek" );
  $("#results_range").html( get_range() + " m");
  /* velocity measurement */
  $("#results_max_velocity").html( $("#text_initial_velocity").val() + " m/s" );
  $("#results_average_velocity").html( get_average_velocity(steps+1) + " m/s" );
  /* height measurement */
  $("#results_average_height").html( get_average_height(steps+1) + " m");
  $("#results_max_height").html( get_max_height() + " m");
}