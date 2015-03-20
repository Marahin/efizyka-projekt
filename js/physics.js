
function v0x(){
	return Math.cos(angle) * initial_velocity ;
}

function v0y(){
	return Math.sin(angle) * initial_velocity ;
}

function vy(t){
  return ( v0y() - (parseInt(acceleration) * t) );
}

function vx(t){
  return v0x(); /* the x axis velocity is constant and equals to vox */
}

function obj_velocity(t){
  return Math.sqrt( Math.pow(v0x(), 2) + Math.pow(vy(t), 2) );
}

function x(t){
	return Math.round( 100 * v0x() * t ) / 100 ;
}

function y(t){
	return Math.round( 100 * (initial_velocity * t * Math.sin(angle) - ( acceleration / 2 ) * t * t )) /100;
}

function get_ascension_time(){
	return ( v0y() / parseInt(acceleration) );
}
function get_max_height(){
	return y( get_ascension_time() );
}

function get_flight_time(){
	return Math.round( 1000 * (2 * initial_velocity * Math.sin(angle))/acceleration )/1000;
}

function get_range(){
	return Math.round ( 100 *( (initial_velocity * initial_velocity) / acceleration ) * Math.sin(2 * angle) ) / 100 ;
}

function get_average_height(steps){
  return Math.round( 100 * average_height/steps)/100;
}

function get_average_velocity(steps){
  return Math.round( 100 * average_velocity/steps )/100;
}