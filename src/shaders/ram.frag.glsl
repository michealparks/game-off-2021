uniform float time;

void main() {
  float y = gl_FragCoord.y / 80.0;

  vec3 rgb = 0.5 + 0.5 * cos(time + y + vec3(0, 2, 4));
  gl_FragColor = vec4(rgb, 1.0);
}
