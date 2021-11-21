varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime * 0.5;

    vec2 uv = vUv;
    vec2 repeat = vec2(6.0, 12.0);
    uv.y += uv.x * 0.15;
    uv = fract(uv * repeat + vec2(0.0, time));

    vec4 color = texture2D(uTexture, uv);

    gl_FragColor = color;
}