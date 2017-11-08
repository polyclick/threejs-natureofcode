///////////////////////////////////////////////////////////////////////////////
//// MATH UTILS
///////////////////////////////////////////////////////////////////////////////
//
// utils for math, randomization, numbers, ...



// remap
//
// Given a value and an input range, map the value to an output range.
// Linearly maps the given value to a new value given an input and output
// range.  Thus if value is 50% of the way between inputMin and inputMax, then
// output value will be 50% of the way between outputMin and outputMax.
function remap(value, inputMin, inputMax, outputMin, outputMax) {
  return Math.abs(inputMin - inputMax) !== 0 ?
    ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin) : outputMin
}



// clamp
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}



// distance between two 2D points
export function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}



// radians to degrees
export function radToDeg(radians) {
  return radians * (180 / Math.PI)
}



// degrees to radians
export function degToRad(degrees) {
  return degrees * (Math.PI / 180)
}



///////////////////////////////////////////////////////////////////////////////
//// RANDOMIZATION
///////////////////////////////////////////////////////////////////////////////

// random float number between min and max, evenly distributed
//
// Randomly pick a number between min and max.
// When max wasn't given, the range automatically start from 0 to max,
// so randomFloat(4.6) returns a random number between 0 and 4.6
export function randomFloat(min, max) {
  if(!max) {
    max = min
    min = 0
  }
  return Math.random() * (max - min) + min
}



// random integer between min (included) and max (included)
//
// Randomly pick an integer between min and max.
// When max wasn't given, the range automatically start from 0 to max,
// so randomInt(5) returns a random integer between 0 and 5
export function randomInt(min, max) {
  if(!max) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}



// random element from array
export function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}



// random yes/no (true/false)
export function randomBool() {
  return Math.random() < 0.5
}



// random from two given options
export function randomToggle(one, two) {
  if(!one || !two) throw "Can't randomly choose a value, at least one of them is invalid."
  return randomBool() ? one : two
}



// random point on radius of sphere
// evenly distributed over the surface
export function randomPointAtRadius(x0, y0, z0, radius) {
  var u = Math.random()
  var v = Math.random()
  var theta = 2 * Math.PI * u
  var phi = Math.acos(2 * v - 1)

  var x = x0 + (radius * Math.sin(phi) * Math.cos(theta))
  var y = y0 + (radius * Math.sin(phi) * Math.sin(theta))
  var z = z0 + (radius * Math.cos(phi))

  return [x, y, z]
}