import { peer,gameConn } from "./peers.js"

const videoButton = document.getElementById('video-button');
videoButton.addEventListener('click',nazovi)
let call = null;

async function nazovi(){
    const hisVideo = document.getElementById("on")
    const mediaStream = await media()
    call = peer.call(gameConn.peer, mediaStream)
    call.on('stream', function(stream) {
    hisVideo.srcObject = stream;
    videoButton.style.display = "none"
  });

}

peer.on('call', async function(call) {
    const hisVideo = document.getElementById("on")
    const mediaStream = await media()
    call.answer(mediaStream);
    call.on('stream', function(stream) {
      hisVideo.srcObject = stream;
      videoButton.style.display = "none"
    });
  
  });

async function media(){
    const video =  document.getElementById('ja')
  
   const constraints = {
       audio: false,
       video: true
   };
   
   const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
   video.srcObject = mediaStream
   return mediaStream
    
  }