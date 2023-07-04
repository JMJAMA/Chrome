#ifdef GL_ES
precision mediump float;
#endif
  
uniform vec2 uResolution;
uniform sampler2D uTexture0;
uniform sampler2D uTexture1;
uniform float uTime;
uniform float uStartTime;
  
varying vec2 vTexCoord;

#define NUM_OCTAVES 5;

#define drawCircle(vTexCoord,pos,size,blur)smoothstep(0.,blur/uResolution.y,size-length(pos-vTexCoord));

// Simplex 2D noise
vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float snoise(vec2 v){
    const vec4 C=vec4(.211324865405187,.366025403784439,
    -.577350269189626,.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1;
    i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=mod(i,289.);
    vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))
    +i.x+vec3(0.,i1.x,1.));
    vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)),0.);
    m=m*m;
    m=m*m;
    vec3 x=2.*fract(p*C.www)-1.;
    vec3 h=abs(x)-.5;
    vec3 ox=floor(x+.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 30.*dot(m,g);
}


float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.05;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.05), sin(0.5), -sin(0.05), cos(0.50));
	for (int i = 0; i < 5; ++i) {
		v += a * snoise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

vec3 hash3( vec2 p ){
    vec3 q = vec3( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)), 
				   dot(p,vec2(419.2,371.9)) );
	return fract(sin(q)*43758.5453);
}

float iqnoise( in vec2 x, float u, float v ){
    vec2 p = floor(x);
    vec2 f = fract(x);
		
	float k = 1.0+63.0*pow(1.0-v,4.0);
	
	float va = 0.0;
	float wt = 0.0;
    for( int j=-2; j<=2; j++ )
    for( int i=-2; i<=2; i++ )
    {
        vec2 g = vec2( float(i),float(j) );
		vec3 o = hash3( p + g )*vec3(u,u,1.0);
		vec2 r = g - f + o.xy;
		float d = dot(r,r);
		float ww = pow( 1.0-smoothstep(0.0,1.414,sqrt(d)), k );
		va += o.z*ww;
		wt += ww;
    }
	
    return va/wt;
}


float map(float value, float min1, float max1, float min2, float max2) {
 return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  
  vec4 color = vec4(1.0);
  
  vec2 offset = vec2(cos(fbm(uStartTime+vTexCoord+uTime*0.125)));
  
  vec2 offset2 = vec2(tan(iqnoise(vTexCoord,1.,0.5)+uTime/10.));


  
  vec4 white=vec4(vec3(1.),1.);
  vec4 black=vec4(vec3(0.),1.);
  
  vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y)*offset2*offset;
  vec4 color0 = texture2D(uTexture0, fract(uv*1.));


  
  color=mix(color0,white,black);
 
  gl_FragColor = vec4(color);
}