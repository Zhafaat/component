let convert = document.getElementById('convert');
let voicelco = document.getElementById('voicelco');
let speech = document.getElementById('inputText');
let count = 1;
let speechText;

speech.addEventListener('change', () => {
    speechText = this.value;
    speechSynthesis.cancel();
    convert.innerHTML = "Text to Speech";
    // voicelco.innerHTML = `<img class="speaker" src="./assets/Speaker.svg" alt="Speaker">`;
});

convert.addEventListener('click', () => {
    if(speechSynthesis.speaking || speechSynthesis.pause()) {
        speechText = speech.value;
        let speechVoice = new SpeechSynthesisUtterance();
        let voices = speechSynthesis.getVoices();
        speechVoice.voice = voices[2];
        speechVoice.text = speechText;
        speechVoice.lang = 'en-US';
        speechSynthesis.speak(speechVoice);
    }

    if(count == 1){
        convert.innerHTML = 'Play';
        speechSynthesis.resume();
        setTimeout(() => {
            count = 2;
        }, 300);
    } else {
        speechSynthesis.paused;
        convert.innerHTML = 'Pause';
        count = 1;
    }

    setInterval(() => {
        if(speechSynthesis.speaking && count == 2){
            convert.innerHTML = "Text to Speech";
            count = 1;
            console.log(count)
        }
    }, 100);
})