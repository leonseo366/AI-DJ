song = "";
mix = 0;
miy =0;
mdx =0;
mdy =0;
sl =0;
sr =0;

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    modelo =ml5.poseNet(video,modelLoaded);
    modelo.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("este modelo ya esta activo");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        mix = results[0].pose.leftWrist.x;
        miy = results[0].pose.leftWrist.y;
        console.log(mix + "mano izquierda en x" + miy + "mano izquierda en y");
        mdx = results[0].pose.rightWrist.x;
        mdy = results[0].pose.rightWrist.y;
        console.log(mdx + "mano derecha en x" + mdy + "mano derecha en y");
        sr = results[0].pose.keypoints[10].score;
        sl = results[0].pose.keypoints[9].score;
        console.log(sr + "puntaje derecho" + sl + "puntaje izquierdo");
    }
}
function draw(){
    image(video,0,0,600,450);
    fill("#F1DF03");
    stroke("#F1DF03");
    if(sr>0.2){
        circle(mdx,mdy,20);
        if(mdy>0 && mdy<=90){
            document.getElementById("tvl").innerHTML = "velocidad = 0.5x";
             song.rate(0.5);
        }
        else if(mdy>90 && mdy<=180){
            document.getElementById("tvl").innerHTML = "velocidad = 1x";
            song.rate(1);
        }
        else if(mdy>180 && mdy<=270){
            document.getElementById("tvl").innerHTML = "velocidad = 1.5x";
            song.rate(1.5);
        }
        else if(mdy>270 && mdy<=360){
            document.getElementById("tvl").innerHTML = "velocidad = 2x";
            song.rate(2);
        }
        else if(mdy>360){
            document.getElementById("tvl").innerHTML = "velocidad = 2.5x";
            song.rate(2.5);
        }
    }
    if(sl>0.2){
        circle(mix,miy,20);
        niy = Number(miy);
        niyd = floor(niy * 2);
        abc = niyd / 1000;
        document.getElementById("vol").innerHTML = "volumen = " + abc;
        song.setVolume(abc)
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function pause(){
    song.pause();
}
