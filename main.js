status = "";
objects = [];

function setup() {
    canvas = createCanvas(420, 340);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    synth = window.speechSynthesis;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    utterThis = new SpeechSynthesisUtterance("object mentioned found");
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
}

function gotResult() {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 420, 340);
    if(status != "")
        {
            objectDetector.detect(video, gotResult);

            for (i =0; i < objects.lenght; i++) {
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
                synth.speak(utterThis);
            }
        }
}
