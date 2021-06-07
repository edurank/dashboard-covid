const URL = "https://teachablemachine.withgoogle.com/models/PI5WkIKYD/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(512, 320, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

var tempo;

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            
        if(prediction[i].className == "sem-mascara" && prediction[i].probability.toFixed(2) >= 0.80){
            tempo = setTimeout(function(){
                registrarAviso();
            }, 3000);
            $(document).ready(function() {
                $("#comsemMask").css("background-color","#a60013");
                $('#comsemMask').text('Sem máscara');
            });
        } else if(prediction[i].className == "com-mascara" && prediction[i].probability.toFixed(2) >= 0.80){
            clearTimeout(tempo);
            $(document).ready(function() {
                $("#comsemMask").css("background-color","blue");
                $('#comsemMask').text('Com máscara');
            });
        } else if(prediction[i].className == "nao-detectado" && prediction[i].probability.toFixed(2) >= 0.80){
            clearTimeout(tempo);
            $(document).ready(function() {
                $("#comsemMask").css("background-color","blue");
                $('#comsemMask').text('Nada detectado');
            });
        }
    }
}