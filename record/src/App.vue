<template>
  <div class="app">
    <button :class="{ 'mic': !isRecording, 'stop': isRecording }" @click="toggleMic">{{ isRecording ? 'Stop' : 'Record' }}</button>
    <textarea name="transkript" class="transcript" v-model="transcript" cols="60" rows="10"></textarea>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'SpeechToText',
  setup() {
    const transcript = ref('');
    const isRecording = ref(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    onMounted(() => {
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        isRecording.value = true;
      };

      recognition.onend = () => {
        console.log('Speech recognition stopped');
        isRecording.value = false;
      };

      recognition.onresult = (event) => {
        const interimTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        console.log(interimTranscript)
        
        if (event.results[0].isFinal) {
          const finalTranscript = interimTranscript.trim();
          console.log(`Final transcript: ${finalTranscript}`);
          checkForCommand(finalTranscript);
        }
        
        transcript.value = interimTranscript;
        
      };
      
      recognition.onerror = (event) => {
        console.error(`Speech recognition error occurred: ${event.error}`);
        isRecording.value = false;
      };
      
      recognition.start();
    });
    
    const toggleMic = () => {
      if (isRecording.value) {
        recognition.stop();
      } else {
        recognition.start();
      }
    };

    const checkForCommand = (transcript) => {
      if (transcript.includes('stop recording')) {
        recognition.stop();
      } else if (transcript.includes('waktu')) {
        recognition.stop();
        alert(new Date().toLocaleTimeString());
        setTimeout(() => recognition.start(), 100);
      }
    };

    return {
      transcript,
      isRecording,
      toggleMic,
    };
  }
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #0c2430;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }
  
  .app {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .mic {
    background-color: white;
    color: black;
    border: none;
    border-radius: 10%;
    font-size: 2rem;
    padding: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin: 10px 0 0 10px;
  }
  
  .mic:hover {
    background-color: #1ed760;
  }
  
  .mic:focus {
    outline: none;
  }
  
  .stop {
    background-color: #ff2d55;
    margin-left: 20px;
    border: none;
    border-radius: 10%;
    font-size: 2rem;
    padding: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }
  
  .transcript {
    margin-top: 40px;
    font-size: 1.125rem;
    text-align: center;
    color: #a5a5a5;
    font-style: italic;
    padding-top: 1rem; /* sama dengan py-4 di Tailwind */
    padding-bottom: 1rem; /* sama dengan py-4 di Tailwind */
    padding-left: 1.5rem; /* sama dengan px-6 di Tailwind */
    padding-right: 2.5rem; /* sama dengan md:px-10 di Tailwind */
    background-color: rgba(255, 255, 255, 0.1); /* sama dengan bg-white bg-opacity-10 di Tailwind */
    transition-duration: 150ms; /* sama dengan duration-150 di Tailwind */
    border-radius: 20%;
    outline: none;
 }
</style>