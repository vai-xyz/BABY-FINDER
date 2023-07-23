audio="";
Status="";
objects=[];

function preload(){
    audio= loadSound("alarm_r.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocussd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";}

function modelLoaded(){
    console.log("Cocussd Is Intialized");
    Status=true; 
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
        
    }
}

function draw(){
    image(video,0,0,380,380);

    if(Status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
           fill(r,g,b);
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+"%", objects[i].x+ 15, objects[i].y+ 15);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);
           if(objects[i].label == "person"){
            document.getElementById("status").innerHTML="Status:Object Detected";
document.getElementById('baby_found').innerHTML="Baby Founded"+objects.length;
audio.stop();
           }else{
            document.getElementById("status").innerHTML="Status:Object Detected";
document.getElementById('baby_found').innerHTML="Baby not Founded"+objects.length;
audio.play();
           }

        }
    }
}

