
function v0x(){
	return Math.cos(angle) * initial_velocity ;
}

function v0y(){
	return Math.sin(angle) * initial_velocity ;
}

function x(t){
	return Math.round( 10 * v0x() * t ) / 10 ;
}

function y(t){
	return Math.round( 10 * (initial_velocity * t * Math.sin(angle) - ( acceleration / 2 ) * t * t )) /10;
}

function get_ascension_time(){
	return (v0y() / acceleration) ;
}
function get_max_height(){
	return y( get_ascension_time() );
}

function get_flight_time(){
	return Math.round( 100 * (2 * initial_velocity * Math.sin(angle))/acceleration )/100;
}

function get_range(){
	return ( (initial_velocity * initial_velocity) / acceleration ) * Math.sin(2 * angle) ;
}