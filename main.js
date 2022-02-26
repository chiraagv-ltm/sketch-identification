function preload(){
    classifier=ml5.imageClassifier("DoodleNet");

}

function setup(){
canvas=createCanvas(500,300);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth=window.speechSynthesis;
}

function clear_canvas(){
    background("white");
}
 
function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);

    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
    document.getElementById("label").innerHTML="Label : "+results[0].label;
    document.getElementById("confidence").innerHTML="Confidence : "+ Math.floor(results[0].confidence*100)+"%";
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

