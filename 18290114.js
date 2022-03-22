
var gl;
var locationOfTheta;
var theta;
var isDirClockwise = false;
var delay = 100;
var r = 0.0;
var g = 0.0;
var b = 0.0;
var myFragment = vec3(r, g, b);
var locationOfColor;





window.onload= function main() {

  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  //gl = canvas.getContext("webgl");
  gl = WebGLUtils.setupWebGL(canvas);
 

  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
   




  var program = initShaders(gl,"vertex-shader","fragment-shader");

    gl.useProgram( program );

      var myButton = document.getElementById("DirectionButton"); 
      myButton.addEventListener("click",function() {isDirClockwise = !isDirClockwise;});

      //changing speed
      document.getElementById("slide").onchange = function() {delay = this.value;};



    var vertices = new Float32Array( 
          [    //Y 
             -0.6  , 0.4 , -0.4  ,-0.1  , -0.5  , 0.4, 
             -0.5  , 0.4 , -0.4  ,-0.1  , -0.35 , 0.0,
             -0.3  ,-0.1 , -0.35 , 0.0  , -0.2  , 0.4,
             -0.2  , 0.4 , -0.1  , 0.4  , -0.3  ,-0.1,
             -0.35 , 0.0 , -0.4  ,-0.1  , -0.4  ,-0.4,  //FOOT OF Y
             -0.4  ,-0.4 , -0.35 , 0.0  , -0.3  ,-0.4,
             -0.3  ,-0.4 , -0.3  ,-0.1  , -0.35 , 0.0,  

             

             // R 

              0.1 ,0.4 , 0.1 ,-0.4 , 0.2 ,-0.4,
              0.1 ,0.4 , 0.2 , 0.4 , 0.2 ,-0.4,
              0.2 ,0.4 , 0.2 , 0.3 , 0.5 , 0.4,
              0.5 ,0.4 , 0.2 , 0.3 , 0.5 , 0.3,
              0.5 ,0.3 , 0.4 , 0.3 , 0.5 , 0.0,
              0.5 ,0.0 , 0.4 , 0.3 , 0.4 , 0.0,
              0.4 ,0.0 , 0.2 , 0.0 , 0.4 , 0.1,
              0.4 ,0.1 , 0.2 , 0.1 , 0.2 , 0.0,
              0.2 ,0.0 , 0.4 ,-0.4 , 0.3 , 0.0,
              0.3 ,0.0 , 0.4 ,-0.4 , 0.5 ,-0.4
                             ]); 
                
   
          locationOfColor = gl.getUniformLocation(program, "myFragment");

          // Add event listener on keydown
          document.addEventListener('keydown', (event) => 
          {
            var button = event.key;
            var code = event.code;
            if(button == 'r')
            {   
              
               if(r > 0.0){

                r = r - 0.1; 
                console.log(r);
               }    
            }

            if (button == 'R') 
            {     
              
              if(r < 1.0)
              {
                r = r + 0.1; 
              }  
            }

            if (button == 'b')
            {
              
              if(b > 0.0){
                b = b - 0.1; 
               }
            }

            if (button == 'B') 
            {
             
              if(b < 1.0)
              {
                b = b + 0.1;
              }               
            }
            if(button == 'g')
            {
              
              if (g > 0.0) 
              {
                g = g - 0.1;
              }
            }

            if(button == 'G')
            {
              
              if(g < 1.0)
              {
                g = g + 0.1;
              }
            }
          }, false);


    var bufferId = gl.createBuffer(); //STANDART GL FUNCTION
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); 

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 ); // we are using 2 dimension
    gl.enableVertexAttribArray( vPosition );

    locationOfTheta = gl.getUniformLocation(program, "theta");
    theta=0;
    gl.uniform1f(locationOfTheta, theta);
    render();

} 


function render()
{
  // Set clear color to black, fully opaque
  setTimeout(function() {
      requestAnimFrame(render);
      gl.clearColor(1.0, 0.1, 0.1, 0.9); //R,G,B,Opacity value,fully opaque
     
    ////////////////////////////////////////

      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT); // now you can see the color
      theta += (isDirClockwise ? -0.1 : 0.1);
      gl.uniform1f(locationOfTheta, theta);
      myFragment = vec3(r,g,b);
      gl.uniform3fv(locationOfColor, myFragment); //coloring

      gl.drawArrays( gl.TRIANGLES, 0, 51 );

  }, delay);

}

