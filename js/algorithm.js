function refresh_values(){
	acceleration = $("#text_acceleration").val();
	initial_velocity = $("#text_initial_velocity").val();
	angle = $("#text_angle").val() / 180;
  flight_time = get_flight_time();
	fill_chart();
	print_flight_time();
}

function fill_chart(){
  penis = 0;
  for(ms=0.0; ms <= flight_time; ms+=0.5){
    /* the function down there, dirty little function. */
    add_data( y(ms), x(ms) );
    console.log ( "MS: " + ms + " | y(ms): " + y(ms) + " | x(ms): " + x(ms) + " | " + penis);
    penis++;
  }
  add_data(0, x(flight_time));
  var myLineChart = new Chart(ctx).Line(data, options);
}
/* this is a very dirty workaround to the issue, where chart.js has problems with dynamicaly allocating new labels. i have no idea why does that happen, and yet, this is shite. */
  
function add_data(y,x){
  data.labels.push(x);
  data.datasets[0].data.push(y);
}

function print_flight_time(){
	$("#results_flight_time").html( "Lot trwał " + get_flight_time() + " s" );
}