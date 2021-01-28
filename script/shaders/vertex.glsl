varying vec2 vUv;
uniform float uTime;

void main() {
    vUv = uv;

    vec3 transformed = position;
    transformed.z += sin(position.x + uTime);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0); 
}