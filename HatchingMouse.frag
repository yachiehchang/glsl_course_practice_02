// Author:CMH
// Title:TheGameofPixels 
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0; //data/van.jpeg
uniform sampler2D u_tex1; //patch1
uniform sampler2D u_tex2;
uniform sampler2D u_tex3;
uniform sampler2D u_tex4;
uniform sampler2D u_tex5;
uniform sampler2D u_tex6; 


float breathing=(exp(sin(u_time*2.0*3.14159/8.0)) - 0.36787944)*0.42545906412;
float mouseEffect(vec2 uv, vec2 mouse, float size)
{
    float dist=length((mouse-uv)*1.5);
    return smoothstep(size, size+0.2*(breathing+0.5), dist);  //size
}





void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

    vec2 brickSize=vec2(28.0+abs(cos(u_time*0.08))*15.0,28.0+abs(cos(u_time*0.08))*15.0);
 	vec2 uvs=uv*brickSize;//[0~6]
    vec2 ipos = floor(uvs);  // get the integer coords
    vec2 fpos = fract(uvs);  // get the fractional coords
    vec2 nuv=ipos*0.8/brickSize;

    vec4 shadeColor= texture2D(u_tex0, uv); 
    float shading = texture2D(u_tex0,nuv).g; 


   vec2 mouse=u_mouse.xy/u_resolution.xy;
   float value=mouseEffect(nuv,mouse,0.05);
   
  


  vec4 c;      

                float step = 1. / 6.;
                if( shading <= step ){   
                    c = texture2D( u_tex6, fpos);
                }
                if( shading > step && shading <= 2. * step ){
                   c = texture2D( u_tex5, fpos );
                }
                if( shading > 2. * step && shading <= 3. * step ){
                  c = texture2D( u_tex4, fpos );
                }
                if( shading > 3. * step && shading <= 4. * step ){
                   c = texture2D( u_tex3,fpos);
                }
                if( shading > 4. * step && shading <= 5. * step ){
                   c = texture2D( u_tex2, fpos);
                }
                if( shading > 5. * step ){
                   c = texture2D( u_tex1, fpos);
                }
                
     vec4 inkColor = vec4(0.0, 0.298, 1.0, 1.0);
     vec4 src = mix( mix( inkColor, vec4(1.0, 1.0, 1.0, 1.0), c.r ), c, .5 );

     vec4 mixColor = mix(shadeColor, src, value);
     gl_FragColor = mixColor;

     
}
