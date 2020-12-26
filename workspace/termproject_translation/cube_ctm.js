
var canvas;
var gl;

var NumVertices  = 0;

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var program;
var condition = true;


var cursor = 0; 
var quadNum = 19;
var total_quad = 0;

var count = 0;

var ni =0;

var vertices = [

    vec3(-0.1,0.1,0.1), //1
    vec3(-0.1,0.15,0.1), //2
    vec3(0.1,0.15,0.1), //3
    vec3(0.1,0.1,0.1), //4
    vec3(-0.1,0.1,-0.1),  //5 
    vec3(-0.1,0.15,-0.1),//6
    vec3(0.1,0.15,-0.1),//7 
    vec3(0.1,0.1,-0.1),//8 hair

    vec3(-0.1,-0.1,0.1), //1
    vec3(-0.1,0.1,0.1), //2
    vec3(0.1,0.1,0.1), //3
    vec3(0.1,-0.1,0.1), //4
    vec3(-0.1,-0.1,-0.1),  //5 
    vec3(-0.1,0.1,-0.1),//6
    vec3(0.1,0.1,-0.1),//7 
    vec3(0.1,-0.1,-0.1),//8 head

    vec3(-0.06,0.04,0.12), //1
    vec3(-0.06,0.06,0.12), //2
    vec3(-0.04,0.06,0.12), //3
    vec3(-0.04,0.04,0.12), //4
    vec3(-0.06,0.04,-0.12),  //5 
    vec3(-0.06,0.06,-0.12),//6
    vec3(-0.04,0.06,-0.12),//7 
    vec3(-0.04,0.04,-0.12),//8 left eye

    vec3(0.06,0.04,0.12), //1
    vec3(0.06,0.06,0.12), //2
    vec3(0.04,0.06,0.12), //3
    vec3(0.04,0.04,0.12), //4
    vec3(0.06,0.04,-0.12),  //5 
    vec3(0.06,0.06,-0.12),//6
    vec3(0.04,0.06,-0.12),//7 
    vec3(0.04,0.04,-0.12),//8 right eye

    vec3(0.03,-0.058,0.12), //1
    vec3(0.03,-0.06,0.12), //2
    vec3(-0.03,-0.06,0.12), //3
    vec3(-0.03,-0.058,0.12), //4
    vec3(0.03,-0.058,-0.12),  //5 
    vec3(0.03,-0.06,-0.12),//6
    vec3(-0.03,-0.06,-0.12),//7 
    vec3(-0.03,-0.058,-0.12),//8 mouth

    vec3(-0.2,-0.5,0.1),
    vec3(-0.2,-0.1,0.1),
    vec3(0.2,-0.1,0.1),
    vec3(0.2,-0.5,0.1),
    vec3(-0.2,-0.5,-0.1),
    vec3(-0.2,-0.1,-0.1),
    vec3(0.2,-0.1,-0.1),
    vec3(0.2,-0.5,-0.1), // body

    vec3(-0.3,-0.2,0.1),
    vec3(-0.3,-0.1,0.1),
    vec3(-0.2,-0.1,0.1),
    vec3(-0.2,-0.2,0.1),
    vec3(-0.3,-0.2,-0.1),
    vec3(-0.3,-0.1,-0.1),
    vec3(-0.2,-0.1,-0.1),
    vec3(-0.2,-0.2,-0.1), // left arm

    vec3(-0.275,-0.1,0.1),
    vec3(-0.225,-0.4,0.1),
    vec3(-0.225,-0.4,0.1),
    vec3(-0.225,-0.1,0.1),
    vec3(-0.275,-0.1,-0.1),
    vec3(-0.275,-0.4,-0.1),
    vec3(-0.225,-0.4,-0.1),
    vec3(-0.225,-0.1,-0.1), // left hand

    vec3(0.3,-0.2,0.1),
    vec3(0.3,-0.1,0.1),
    vec3(0.2,-0.1,0.1),
    vec3(0.2,-0.2,0.1),
    vec3(0.3,-0.2,-0.1),
    vec3(0.3,-0.1,-0.1),
    vec3(0.2,-0.1,-0.1),
    vec3(0.2,-0.2,-0.1), // right arm

    vec3(0.275,-0.1,0.1),
    vec3(0.225,-0.4,0.1),
    vec3(0.225,-0.4,0.1),
    vec3(0.225,-0.1,0.1),
    vec3(0.275,-0.1,-0.1),
    vec3(0.275,-0.4,-0.1),
    vec3(0.225,-0.4,-0.1),
    vec3(0.225,-0.1,-0.1), // right hand

    vec3(-0.2,-0.55,0.1),
    vec3(-0.2,-0.5,0.1),
    vec3(0.2,-0.5,0.1),
    vec3(0.2,-0.55,0.1),
    vec3(-0.2,-0.55,-0.1),
    vec3(-0.2,-0.5,-0.1),
    vec3(0.2,-0.5,-0.1),
    vec3(0.2,-0.55,-0.1), // pants body

    vec3(-0.2,-0.65,0.1),
    vec3(-0.2,-0.55,0.1),
    vec3(-0.01,-0.55,0.1),
    vec3(-0.01,-0.65,0.1),
    vec3(-0.2,-0.65,-0.1),
    vec3(-0.2,-0.55,-0.1),
    vec3(-0.01,-0.55,-0.1),
    vec3(-0.01,-0.65,-0.1), // pants left

    vec3(0.01,-0.65,0.1),
    vec3(0.01,-0.55,0.1),
    vec3(0.2,-0.55,0.1),
    vec3(0.2,-0.65,0.1),
    vec3(0.01,-0.65,-0.1),
    vec3(0.01,-0.55,-0.1),
    vec3(0.2,-0.55,-0.1),
    vec3(0.2,-0.65,-0.1), // pants right

    vec3(-0.18,-0.7,0.1),
    vec3(-0.18,-0.65,0.1),
    vec3(-0.03,-0.65,0.1),
    vec3(-0.03,-0.7,0.1),
    vec3(-0.18,-0.7,-0.1),
    vec3(-0.18,-0.65,-0.1),
    vec3(-0.03,-0.65,-0.1),
    vec3(-0.03,-0.7,-0.1), // left leg

    vec3(-0.18,-0.85,0.1),
    vec3(-0.18,-0.7,0.1),
    vec3(-0.03,-0.7,0.1),
    vec3(-0.03,-0.85,0.1),
    vec3(-0.18,-0.85,-0.1),
    vec3(-0.18,-0.7,-0.1),
    vec3(-0.03,-0.7,-0.1),
    vec3(-0.03,-0.85,-0.1), // left socks

    vec3(0.18,-0.7,0.1),
    vec3(0.18,-0.65,0.1),
    vec3(0.03,-0.65,0.1),
    vec3(0.03,-0.7,0.1),
    vec3(0.18,-0.7,-0.1),
    vec3(0.18,-0.65,-0.1),
    vec3(0.03,-0.65,-0.1),
    vec3(0.03,-0.7,-0.1), // right leg

    vec3(0.18,-0.85,0.1),
    vec3(0.18,-0.7,0.1),
    vec3(0.03,-0.7,0.1),
    vec3(0.03,-0.85,0.1),
    vec3(0.18,-0.85,-0.1),
    vec3(0.18,-0.7,-0.1),
    vec3(0.03,-0.7,-0.1),
    vec3(0.03,-0.85,-0.1), // right socks

    vec3(-0.18,-0.9,0.1),
    vec3(-0.18,-0.85,0.1),
    vec3(-0.03,-0.85,0.1),
    vec3(-0.03,-0.9,0.1),
    vec3(-0.18,-0.9,-0.1),
    vec3(-0.18,-0.85,-0.1),
    vec3(-0.03,-0.85,-0.1),
    vec3(-0.03,-0.9,-0.1), // left shoes

    vec3(0.18,-0.9,0.1),
    vec3(0.18,-0.85,0.1),
    vec3(0.03,-0.85,0.1),
    vec3(0.03,-0.9,0.1),
    vec3(0.18,-0.9,-0.1),
    vec3(0.18,-0.85,-0.1),
    vec3(0.03,-0.85,-0.1),
    vec3(0.03,-0.9,-0.1) // right shoes
];
var vertices2 = [
    vec3(-0.1,0.1,0.1), //1
    vec3(-0.1,0.15,0.1), //2
    vec3(0.1,0.15,0.1), //3
    vec3(0.1,0.1,0.1), //4
    vec3(-0.1,0.1,-0.1),  //5 
    vec3(-0.1,0.15,-0.1),//6
    vec3(0.1,0.15,-0.1),//7 
    vec3(0.1,0.1,-0.1),//8 hair

    vec3(-0.1,-0.1,0.1), //1
    vec3(-0.1,0.1,0.1), //2
    vec3(0.1,0.1,0.1), //3
    vec3(0.1,-0.1,0.1), //4
    vec3(-0.1,-0.1,-0.1),  //5 
    vec3(-0.1,0.1,-0.1),//6
    vec3(0.1,0.1,-0.1),//7 
    vec3(0.1,-0.1,-0.1),//8 head

    vec3(-0.06,0.04,0.12), //1
    vec3(-0.06,0.06,0.12), //2
    vec3(-0.04,0.06,0.12), //3
    vec3(-0.04,0.04,0.12), //4
    vec3(-0.06,0.04,-0.12),  //5 
    vec3(-0.06,0.06,-0.12),//6
    vec3(-0.04,0.06,-0.12),//7 
    vec3(-0.04,0.04,-0.12),//8 left eye

    vec3(0.06,0.04,0.12), //1
    vec3(0.06,0.06,0.12), //2
    vec3(0.04,0.06,0.12), //3
    vec3(0.04,0.04,0.12), //4
    vec3(0.06,0.04,-0.12),  //5 
    vec3(0.06,0.06,-0.12),//6
    vec3(0.04,0.06,-0.12),//7 
    vec3(0.04,0.04,-0.12),//8 right eye

    vec3(0.03,-0.058,0.12), //1
    vec3(0.03,-0.06,0.12), //2
    vec3(-0.03,-0.06,0.12), //3
    vec3(-0.03,-0.058,0.12), //4
    vec3(0.03,-0.058,-0.12),  //5 
    vec3(0.03,-0.06,-0.12),//6
    vec3(-0.03,-0.06,-0.12),//7 
    vec3(-0.03,-0.058,-0.12),//8 mouth

    vec3(-0.2,-0.5,0.1),
    vec3(-0.2,-0.1,0.1),
    vec3(0.2,-0.1,0.1),
    vec3(0.2,-0.5,0.1),
    vec3(-0.2,-0.5,-0.1),
    vec3(-0.2,-0.1,-0.1),
    vec3(0.2,-0.1,-0.1),
    vec3(0.2,-0.5,-0.1), // body

    vec3(-0.3,-0.2,0.1),
    vec3(-0.3,-0.1,0.1),
    vec3(-0.2,-0.1,0.1),
    vec3(-0.2,-0.2,0.1),
    vec3(-0.3,-0.2,-0.1),
    vec3(-0.3,-0.1,-0.1),
    vec3(-0.2,-0.1,-0.1),
    vec3(-0.2,-0.2,-0.1), // left arm

    vec3(-0.275,-0.1,0.1),
    vec3(-0.225,-0.4,0.1),
    vec3(-0.225,-0.4,0.1),
    vec3(-0.225,-0.1,0.1),
    vec3(-0.275,-0.1,-0.1),
    vec3(-0.275,-0.4,-0.1),
    vec3(-0.225,-0.4,-0.1),
    vec3(-0.225,-0.1,-0.1), // left hand

    vec3(0.3,-0.2,0.1),
    vec3(0.3,-0.1,0.1),
    vec3(0.2,-0.1,0.1),
    vec3(0.2,-0.2,0.1),
    vec3(0.3,-0.2,-0.1),
    vec3(0.3,-0.1,-0.1),
    vec3(0.2,-0.1,-0.1),
    vec3(0.2,-0.2,-0.1), // right arm

    vec3(0.275,-0.1,0.1),
    vec3(0.225,-0.4,0.1),
    vec3(0.225,-0.4,0.1),
    vec3(0.225,-0.1,0.1),
    vec3(0.275,-0.1,-0.1),
    vec3(0.275,-0.4,-0.1),
    vec3(0.225,-0.4,-0.1),
    vec3(0.225,-0.1,-0.1), // right hand

    vec3(-0.2,-0.55,0.1),
    vec3(-0.2,-0.5,0.1),
    vec3(0.2,-0.5,0.1),
    vec3(0.2,-0.55,0.1),
    vec3(-0.2,-0.55,-0.1),
    vec3(-0.2,-0.5,-0.1),
    vec3(0.2,-0.5,-0.1),
    vec3(0.2,-0.55,-0.1), // pants body

    vec3(-0.2,-0.65,0.1),
    vec3(-0.2,-0.55,0.1),
    vec3(-0.01,-0.55,0.1),
    vec3(-0.01,-0.65,0.1),
    vec3(-0.2,-0.65,-0.1),
    vec3(-0.2,-0.55,-0.1),
    vec3(-0.01,-0.55,-0.1),
    vec3(-0.01,-0.65,-0.1), // pants left

    vec3(0.01,-0.65,0.1),
    vec3(0.01,-0.55,0.1),
    vec3(0.2,-0.55,0.1),
    vec3(0.2,-0.65,0.1),
    vec3(0.01,-0.65,-0.1),
    vec3(0.01,-0.55,-0.1),
    vec3(0.2,-0.55,-0.1),
    vec3(0.2,-0.65,-0.1), // pants right

    vec3(-0.18,-0.7,0.1),
    vec3(-0.18,-0.65,0.1),
    vec3(-0.03,-0.65,0.1),
    vec3(-0.03,-0.7,0.1),
    vec3(-0.18,-0.7,-0.1),
    vec3(-0.18,-0.65,-0.1),
    vec3(-0.03,-0.65,-0.1),
    vec3(-0.03,-0.7,-0.1), // left leg

    vec3(-0.18,-0.85,0.1),
    vec3(-0.18,-0.7,0.1),
    vec3(-0.03,-0.7,0.1),
    vec3(-0.03,-0.85,0.1),
    vec3(-0.18,-0.85,-0.1),
    vec3(-0.18,-0.7,-0.1),
    vec3(-0.03,-0.7,-0.1),
    vec3(-0.03,-0.85,-0.1), // left socks

    vec3(0.18,-0.7,0.1),
    vec3(0.18,-0.65,0.1),
    vec3(0.03,-0.65,0.1),
    vec3(0.03,-0.7,0.1),
    vec3(0.18,-0.7,-0.1),
    vec3(0.18,-0.65,-0.1),
    vec3(0.03,-0.65,-0.1),
    vec3(0.03,-0.7,-0.1), // right leg

    vec3(0.18,-0.85,0.1),
    vec3(0.18,-0.7,0.1),
    vec3(0.03,-0.7,0.1),
    vec3(0.03,-0.85,0.1),
    vec3(0.18,-0.85,-0.1),
    vec3(0.18,-0.7,-0.1),
    vec3(0.03,-0.7,-0.1),
    vec3(0.03,-0.85,-0.1), // right socks

    vec3(-0.18,-0.9,0.1),
    vec3(-0.18,-0.85,0.1),
    vec3(-0.03,-0.85,0.1),
    vec3(-0.03,-0.9,0.1),
    vec3(-0.18,-0.9,-0.1),
    vec3(-0.18,-0.85,-0.1),
    vec3(-0.03,-0.85,-0.1),
    vec3(-0.03,-0.9,-0.1), // left shoes

    vec3(0.18,-0.9,0.1),
    vec3(0.18,-0.85,0.1),
    vec3(0.03,-0.85,0.1),
    vec3(0.03,-0.9,0.1),
    vec3(0.18,-0.9,-0.1),
    vec3(0.18,-0.85,-0.1),
    vec3(0.03,-0.85,-0.1),
    vec3(0.03,-0.9,-0.1) // right shoes
    
    
];

var vertices3 = [
    vec3(-0.1,0.1,0.1), //1
    vec3(-0.1,0.15,0.1), //2
    vec3(0.1,0.15,0.1), //3
    vec3(0.1,0.1,0.1), //4
    vec3(-0.1,0.1,-0.1),  //5 
    vec3(-0.1,0.15,-0.1),//6
    vec3(0.1,0.15,-0.1),//7 
    vec3(0.1,0.1,-0.1),//8 hair

    vec3(-0.1,-0.1,0.1), //1
    vec3(-0.1,0.1,0.1), //2
    vec3(0.1,0.1,0.1), //3
    vec3(0.1,-0.1,0.1), //4
    vec3(-0.1,-0.1,-0.1),  //5 
    vec3(-0.1,0.1,-0.1),//6
    vec3(0.1,0.1,-0.1),//7 
    vec3(0.1,-0.1,-0.1),//8 head

    vec3(-0.06,0.04,0.1), //1
    vec3(-0.06,0.06,0.1), //2
    vec3(-0.04,0.06,0.1), //3
    vec3(-0.04,0.04,0.1), //4
    vec3(-0.06,0.04,-0.1),  //5 
    vec3(-0.06,0.06,-0.1),//6
    vec3(-0.04,0.06,-0.1),//7 
    vec3(-0.04,0.04,-0.1),//8 left eye

    vec3(0.06,0.04,0.1), //1
    vec3(0.06,0.06,0.1), //2
    vec3(0.04,0.06,0.1), //3
    vec3(0.04,0.04,0.1), //4
    vec3(0.06,0.04,-0.1),  //5 
    vec3(0.06,0.06,-0.1),//6
    vec3(0.04,0.06,-0.1),//7 
    vec3(0.04,0.04,-0.1),//8 right eye

    vec3(0.03,-0.058,0.1), //1
    vec3(0.03,-0.06,0.1), //2
    vec3(-0.03,-0.06,0.1), //3
    vec3(-0.03,-0.058,0.1), //4
    vec3(0.03,-0.058,-0.1),  //5 
    vec3(0.03,-0.06,-0.1),//6
    vec3(-0.03,-0.06,-0.1),//7 
    vec3(-0.03,-0.058,-0.1),//8 mouth

    vec3(-0.2,-0.5,0.1),
    vec3(-0.2,-0.1,0.1),
    vec3(0.2,-0.1,0.1),
    vec3(0.2,-0.5,0.1),
    vec3(-0.2,-0.5,-0.1),
    vec3(-0.2,-0.1,-0.1),
    vec3(0.2,-0.1,-0.1),
    vec3(0.2,-0.5,-0.1), // body

    vec3(-0.3,-0.2,0.1),
    vec3(-0.3,-0.1,0.1),
    vec3(-0.2,-0.1,0.1),
    vec3(-0.2,-0.2,0.1),
    vec3(-0.3,-0.2,-0.1),
    vec3(-0.3,-0.1,-0.1),
    vec3(-0.2,-0.1,-0.1),
    vec3(-0.2,-0.2,-0.1), // left arm

    vec3(-0.275,-0.1,0.1),
    vec3(-0.225,-0.4,0.1),
    vec3(-0.225,-0.4,0.1),
    vec3(-0.225,-0.1,0.1),
    vec3(-0.275,-0.1,-0.1),
    vec3(-0.275,-0.4,-0.1),
    vec3(-0.225,-0.4,-0.1),
    vec3(-0.225,-0.1,-0.1), // left hand

    vec3(0.3,-0.2,0.1),
    vec3(0.3,-0.1,0.1),
    vec3(0.2,-0.1,0.1),
    vec3(0.2,-0.2,0.1),
    vec3(0.3,-0.2,-0.1),
    vec3(0.3,-0.1,-0.1),
    vec3(0.2,-0.1,-0.1),
    vec3(0.2,-0.2,-0.1), // right arm

    vec3(0.275,-0.1,0.1),
    vec3(0.225,-0.4,0.1),
    vec3(0.225,-0.4,0.1),
    vec3(0.225,-0.1,0.1),
    vec3(0.275,-0.1,-0.1),
    vec3(0.275,-0.4,-0.1),
    vec3(0.225,-0.4,-0.1),
    vec3(0.225,-0.1,-0.1), // right hand

    vec3(-0.2,-0.55,0.1),
    vec3(-0.2,-0.5,0.1),
    vec3(0.2,-0.5,0.1),
    vec3(0.2,-0.55,0.1),
    vec3(-0.2,-0.55,-0.1),
    vec3(-0.2,-0.5,-0.1),
    vec3(0.2,-0.5,-0.1),
    vec3(0.2,-0.55,-0.1), // pants body

    vec3(-0.2,-0.65,0.1),
    vec3(-0.2,-0.55,0.1),
    vec3(-0.01,-0.55,0.1),
    vec3(-0.01,-0.65,0.1),
    vec3(-0.2,-0.65,-0.1),
    vec3(-0.2,-0.55,-0.1),
    vec3(-0.01,-0.55,-0.1),
    vec3(-0.01,-0.65,-0.1), // pants left

    vec3(0.01,-0.65,0.1),
    vec3(0.01,-0.55,0.1),
    vec3(0.2,-0.55,0.1),
    vec3(0.2,-0.65,0.1),
    vec3(0.01,-0.65,-0.1),
    vec3(0.01,-0.55,-0.1),
    vec3(0.2,-0.55,-0.1),
    vec3(0.2,-0.65,-0.1), // pants right

    vec3(-0.18,-0.7,0.1),
    vec3(-0.18,-0.65,0.1),
    vec3(-0.03,-0.65,0.1),
    vec3(-0.03,-0.7,0.1),
    vec3(-0.18,-0.7,-0.1),
    vec3(-0.18,-0.65,-0.1),
    vec3(-0.03,-0.65,-0.1),
    vec3(-0.03,-0.7,-0.1), // left leg

    vec3(-0.18,-0.85,0.1),
    vec3(-0.18,-0.7,0.1),
    vec3(-0.03,-0.7,0.1),
    vec3(-0.03,-0.85,0.1),
    vec3(-0.18,-0.85,-0.1),
    vec3(-0.18,-0.7,-0.1),
    vec3(-0.03,-0.7,-0.1),
    vec3(-0.03,-0.85,-0.1), // left socks

    vec3(0.18,-0.7,0.1),
    vec3(0.18,-0.65,0.1),
    vec3(0.03,-0.65,0.1),
    vec3(0.03,-0.7,0.1),
    vec3(0.18,-0.7,-0.1),
    vec3(0.18,-0.65,-0.1),
    vec3(0.03,-0.65,-0.1),
    vec3(0.03,-0.7,-0.1), // right leg

    vec3(0.18,-0.85,0.1),
    vec3(0.18,-0.7,0.1),
    vec3(0.03,-0.7,0.1),
    vec3(0.03,-0.85,0.1),
    vec3(0.18,-0.85,-0.1),
    vec3(0.18,-0.7,-0.1),
    vec3(0.03,-0.7,-0.1),
    vec3(0.03,-0.85,-0.1), // right socks

    vec3(-0.18,-0.9,0.1),
    vec3(-0.18,-0.85,0.1),
    vec3(-0.03,-0.85,0.1),
    vec3(-0.03,-0.9,0.1),
    vec3(-0.18,-0.9,-0.1),
    vec3(-0.18,-0.85,-0.1),
    vec3(-0.03,-0.85,-0.1),
    vec3(-0.03,-0.9,-0.1), // left shoes

    vec3(0.18,-0.9,0.1),
    vec3(0.18,-0.85,0.1),
    vec3(0.03,-0.85,0.1),
    vec3(0.03,-0.9,0.1),
    vec3(0.18,-0.9,-0.1),
    vec3(0.18,-0.85,-0.1),
    vec3(0.03,-0.85,-0.1),
    vec3(0.03,-0.9,-0.1) // right shoes
    
    
];
var ronaldoColors = [
    [ 1.0, 0, 0, 1.0 ], //hair  
    [ 1.0, 0.925, 0.706, 1.0 ], //head  
    [ 0.0, 0.0, 0.0, 1.0 ], // left eye  
    [ 0.0, 0.0, 0.0, 1.0 ], // right eye
    [ 0.0, 0.0, 0.0, 1.0 ], // mouth
    [ 1.0, 0.0, 0.0, 1.0 ],  // body
    [ 1.0, 0.0, 0.0, 1.0 ],  // left arm
    [ 1.0, 0.925, 0.706, 1.0 ],  // left hand
    [ 1.0, 0.0, 0.0, 1.0 ],  // right arm
    [ 1.0, 0.925, 0.706, 1.0 ],  // right hand
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants body
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants left
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants right
    [ 1.0, 0.925, 0.706, 1.0 ], // left leg  
    [ 0.0, 0.0, 0.0, 0.0 ], // left socks 
    [ 1.0, 0.925, 0.706, 1.0 ], // right leg  
    [ 0.0, 0.0, 0.0, 0.0 ], // right socks  
    [ 1.0, 0, 0, 1.0 ], // left shoes 
    [ 1.0, 0, 0, 1.0 ] // right shoes 
];

var messiColors = [
    [ 1.0, 0, 0, 1.0 ], //hair  
    [ 1.0, 0.925, 0.706, 1.0 ], //head  
    [ 0.0, 0.0, 0.0, 1.0 ], // left eye  
    [ 0.0, 0.0, 0.0, 1.0 ], // right eye
    [ 0.0, 0.0, 0.0, 1.0 ], // mouth
    [ 1.0, 1.0, 0.0, 1.0 ],  // body
    [ 1.0, 0.0, 0.0, 1.0 ],  // left arm
    [ 1.0, 0.925, 0.706, 1.0 ],  // left hand
    [ 1.0, 0.0, 0.0, 1.0 ],  // right arm
    [ 1.0, 0.925, 0.706, 1.0 ],  // right hand
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants body
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants left
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants right
    [ 1.0, 0.925, 0.706, 1.0 ], // left leg  
    [ 0.0, 0.0, 0.0, 0.0 ], // left socks 
    [ 1.0, 0.925, 0.706, 1.0 ], // right leg  
    [ 0.0, 0.0, 0.0, 0.0 ], // right socks  
    [ 1.0, 0, 0, 1.0 ], // left shoes 
    [ 1.0, 0, 0, 1.0 ] // right shoes 
];

var messiColors2 = [
    [ 1.0, 1.0, 0, 1.0 ], //hair  
    [ 1.0, 0.925, 0.706, 1.0 ], //head  
    [ 0.0, 0.0, 1.0, 1.0 ], // left eye  
    [ 0.0, 0.0, 0.0, 1.0 ], // right eye
    [ 0.0, 0.0, 0.0, 1.0 ], // mouth
    [ 1.0, 1.0, 0.0, 1.0 ],  // body
    [ 1.0, 0.0, 0.0, 1.0 ],  // left arm
    [ 1.0, 0.925, 0.706, 1.0 ],  // left hand
    [ 1.0, 0.0, 0.0, 1.0 ],  // right arm
    [ 1.0, 0.925, 0.706, 1.0 ],  // right hand
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants body
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants left
    [ 0.0, 0.0, 0.0, 0.0 ],  // pants right
    [ 1.0, 0.925, 0.706, 1.0 ], // left leg  
    [ 0.0, 0.0, 0.0, 0.0 ], // left socks 
    [ 1.0, 0.925, 0.706, 1.0 ], // right leg  
    [ 0.0, 0.0, 0.0, 0.0 ], // right socks  
    [ 1.0, 0, 0, 1.0 ], // left shoes 
    [ 1.0, 0, 0, 1.0 ] // right shoes 
]
var vertexColors = [];

var player_indices = [
    1,0,3,
    3,2,1,
    2,3,7,
    7,6,2,
    3,0,4,
    4,7,3,
    6,5,1,
    1,2,6,
    4,5,6,
    6,7,4,
    5,4,0,
    0,1,5 // quad index
];

var indices = [];

var intervalId;

var points = [];
var colors = [];
var index = [];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.20, 0.30, 0.50, 0.50 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    thetaLoc = gl.getUniformLocation(program,"theta");
    
    window.addEventListener("keydown",c2);

    
    intervalId = setInterval(render,10);
}

function ronaldo_click(){

    for(var i=0; i<vertices.length; i++){
        points.push(vertices[i]);
    }
    for(var i=0;i<ronaldoColors.length;i++){
        for(j=0;j<8;j++){
            colors.push(ronaldoColors[i]);
        }
    }
    for(var i=count*quadNum;i<(count+1)*quadNum;i++){
        for(j=0;j<36;j++){
            index.push(player_indices[j]+(i*8));
        }
    }
    // for(var i=count*quadNum;i<(count+1)*quadNum;i++){
    //     for(j=0;j<36;j++){
    //         index.push(player_indices[j]+(i*8));
    //     }
    // }
    console.log(points);
    console.log(colors);
    console.log(index);
    console.log(player_indices);
    count++;
    cursor = cursor + (8*quadNum);
    NumVertices = NumVertices + 36*quadNum;
    // console.log("ronaldo");
    // total_quad += quadNum; 
    // NumVertices = (36*total_quad);
    // indices = [];
    // console.log(quadNum*count);
    // console.log(total_quad);
    // for(i=quadNum*count; i<total_quad; i++){ 
    //     for(j=0; j<36; j++){
    //         ni = player_indices[j] + (8*i);
    //         indices.push(ni);
    //     }
    // } // set index  

    // console.log(indices);

    // vertexColors=[];
    // for(i=0; i<total_quad; i++){
    //     for(j=0; j<8; j++){
    //         vertexColors.push(ronaldoColors[i]);
    //     }
    // } // set color

    // console.log(vertexColors);

    // for(var i=0; i<vertices.length; i++){
    //     points.push(vertices[i]);
    //     colors.push(vertexColors[i]);
    // } // push real vertex, color

    // console.log(points);
    // console.log(colors);
    
    // for(var i=0;i<indices.length;i++){
    //     index.push(indices[i]);
    // } // push index

    // console.log(index);
    
    // playerNum += (quadNum*8);
    // count++;
    // clearInterval(intervalId);
    // intervalId = setInterval(render,10);

}
function messi_click(){
    for(var i=0; i<vertices2.length; i++){
        points.push(vertices2[i]);
    }
    for(var i=0;i<messiColors.length;i++){
        for(j=0;j<8;j++){
            colors.push(messiColors[i]);
        }
    }
    for(var i=count*quadNum;i<(count+1)*quadNum;i++){
        for(j=0;j<36;j++){
            index.push(player_indices[j]+(i*8));
        }
    }
    // for(var i=count*quadNum;i<(count+1)*quadNum;i++){
    //     for(j=0;j<36;j++){
    //         index.push(player_indices[j]+(i*8));
    //     }
    // }
    
    count++;
    cursor = cursor + (8*quadNum);
    NumVertices = NumVertices + 36*quadNum;
    console.log(points);
    console.log(colors);
    console.log(index);
    
    console.log(player_indices);
    console.log(NumVertices);
    // console.log("messi");
    // total_quad += quadNum; //38
    // NumVertices = (36*total_quad);
    // console.log(quadNum*count);
    // console.log(total_quad);
    // indices = [];
    // for(i=quadNum*count; i<total_quad; i++){  //i=19 ; i<38
    //     for(j=0; j<36; j++){
    //         ni = player_indices[j] + (8*i);
    //         indices.push(ni);
    //     }
    // } // set index  

    // console.log(indices);

    // vertexColors=[];
    // for(i=0; i<total_quad; i++){
    //     for(j=0; j<8; j++){
    //         vertexColors.push(messiColors[i]);
    //     }
    // } // set color

    // console.log(vertexColors);

    // for(var i=0; i<vertices2.length; i++){
    //     points.push(vertices2[i]);
    //     colors.push(vertexColors[i]);
    // } // push real vertex, color

    // console.log(points);
    // console.log(colors);
    
    // for(var i=0;i<indices.length;i++){
    //     index.push(indices[i]);
    // } // push index

    // console.log(index);
    
    // playerNum += (quadNum*8);
    // count++;
    // clearInterval(intervalId);
    // intervalId = setInterval(render,10);
    

}

function messi_click2(){
    for(var i=0; i<vertices3.length; i++){
        points.push(vertices3[i]);
    }
    for(var i=0;i<messiColors2.length;i++){
        for(j=0;j<8;j++){
            colors.push(messiColors2[i]);
        }
    }
    for(var i=count*quadNum;i<(count+1)*quadNum;i++){
        for(j=0;j<36;j++){
            index.push(player_indices[j]+(i*8));
        }
    }
    console.log(points);
    console.log(colors);
    console.log(index);
    count++;
    cursor = cursor + (8*quadNum);
    NumVertices = NumVertices + 36*quadNum;
    // console.log("messi");
    // total_quad += quadNum; //38
    // NumVertices = (36*total_quad);
    // console.log(quadNum*count);
    // console.log(total_quad);
    // indices = [];
    // for(i=quadNum*count; i<total_quad; i++){  //i=19 ; i<38
    //     for(j=0; j<36; j++){
    //         ni = player_indices[j] + (8*i);
    //         indices.push(ni);
    //     }
    // } // set index  

    // console.log(indices);

    // vertexColors=[];
    // for(i=0; i<total_quad; i++){
    //     for(j=0; j<8; j++){
    //         vertexColors.push(messiColors[i]);
    //     }
    // } // set color

    // console.log(vertexColors);

    // for(var i=0; i<vertices2.length; i++){
    //     points.push(vertices2[i]);
    //     colors.push(vertexColors[i]);
    // } // push real vertex, color

    // console.log(points);
    // console.log(colors);
    
    // for(var i=0;i<indices.length;i++){
    //     index.push(indices[i]);
    // } // push index

    // console.log(index);
    
    // playerNum += (quadNum*8);
    // count++;
    // clearInterval(intervalId);
    // intervalId = setInterval(render,10);
    

}
function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(index), gl.STATIC_DRAW)

    gl.drawElements(gl.TRIANGLES,NumVertices,gl.UNSIGNED_BYTE,0);

}


function c2(){        
    if(condition){
        // 왼쪽 화살표 이벤트
        if(event.keyCode == '37'){
            for (var i=cursor-(quadNum*8); i<points.length; i++){
                points[i][0] = points[i][0]-0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
            
        }
        // 위 화살표 이벤트
        if(event.keyCode == '38'){
            for (var i=cursor-(quadNum*8); i<points.length; i++){
                points[i][1] = points[i][1]+0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
        }
        // 오른쪽 화살표 이벤트
        if(event.keyCode == '39'){
            for (var i=cursor-(quadNum*8); i<points.length; i++){
                points[i][0] = points[i][0]+0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
        }
        // 아래 화살표 이벤트
        if(event.keyCode == '40'){
            for (var i=cursor-(quadNum*8); i<points.length; i++){
                points[i][1] = points[i][1]-0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
        }
    }
    


};