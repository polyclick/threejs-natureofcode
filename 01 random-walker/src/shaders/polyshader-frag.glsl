uniform vec3 color;
uniform float time;

void main() {
  float alpha = abs(cos(time)) * 0.9;
  gl_FragColor = vec4(color, 0.1 + alpha);
}