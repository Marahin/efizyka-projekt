function refresh_values(){
	acceleration = $("#text_acceleration").val();
	initial_velocity = $("#text_initial_velocity").val();
  initial_height = $("#text_initial_height").val();
  /* remember that the angle should be measured in RADIANS, not in degrees (conversion below) */
  angle = $("#text_angle").val() * (Math.PI/180);
  steps = $("#steps").val() - 1;
  flight_time = get_flight_time();
  alert = $("#alert");
  alert.hide();
  if ( 0 >= flight_time ){
    alert.attr('class', 'alert-box alert');
    alert.html("Niestety, ale piłka nawet nie drgnęła (czas lotu - 0 ms).")
    alert.show();
  }
  else if ( 0 >= get_max_height() ){
    alert.attr('class', 'alert-box alert');
    alert.html("Niestety, ale piłka od razu spadła na ziemię (maksymalna wysokość - 0m).")    
  }
  else if ( 1 >= steps ){
    alert.attr('class', 'alert-box alert');
    alert.html("Ustawiłeś za mało punktów wyliczeniowych (wymagane przynajmniej dwa, aby wykres się pokazał). Uruchamiam wykres z 20 punktami.");
  }
  else{
    clear_chart();
    fill_chart();
    print_results();
  }
}

function clear_chart(){
  if ( typeof myLineChart !== "undefined" ){
    myLineChart.destroy(); 
    clear_chart_data();
  }
}

function fill_chart(){
  average_height=0;
  var step = Math.round( 1000 * flight_time/steps)/1000;
  for(ms=0.0; ms < flight_time; ms+=step){
    add_data( y(ms), x(ms) );
    average_height+=y(ms);
    console.log("Y(" + ms + "): " + y(ms) + ", x(" + ms + "): " + x(ms));
  }
  add_data(0, x(flight_time));
  console.log("Y(" + ms + "): 0, x(" + ms + "): " + x(ms));
  myLineChart = new Chart(ctx).Line(data, options);
}



/* dirty chart.js workaround */
function add_data(y,x){
  data.labels.push(x);
  data.datasets[0].data.push(y);
}

function print_results(){
  /* static flight time, range */
	$("#results_flight_time").html( get_flight_time() + " sek" );
  $("#results_range").html( get_range() + " m");
  /* velocity measurement */
  /* height measurement */
  $("#results_average_height").html( get_average_height(steps+1) + " m");
  $("#results_max_height").html( get_max_height() + " m");
}