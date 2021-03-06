uniform float time;
varying vec2 vUv;

void main() {
  vec3 rgb = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0, 2, 4));
  gl_FragColor = vec4(rgb, 1.0);
}
