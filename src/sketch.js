export const sketch = `
// Define the signed distance function (SDF) of your object here
float surfaceDistance(vec3 p) {
    p*= 0.7;
    p += 0.03*noise(p*8.0+time);
    float d = sphere(p, 0.2);
	return d;
}

// Here you can define how your object at point p will be colored.
vec3 shade(vec3 p, vec3 normal) {
    float wrap = 1.2;
    vec3 lightDirection = vec3(0., 1., 0.);
    float light = (dot(lightDirection, normal) + wrap) / (1. + wrap);
    vec3 color = vec3(1.0, 1.0, 1.0);
    vec3 o = color*light;
    vec3 r = getRayDirection();
    float lt = 2.0-9.0*abs(dot(r, normal));
    o += normal*0.146 + lt*0.68;
    // o+= (1.0-light)*0.2*noise(p*2000.0+time);
    vec3 gammaCorrection = pow(o, vec3(1./2.));
	return gammaCorrection;
}

`;
