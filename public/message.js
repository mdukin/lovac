
import { peer,gameConn } from "./peers.js"

const text = document.getElementById("text")
const messageButton = document.getElementById('text-button');

messageButton.addEventListener('click',posalji)

let first = true;
let messageConn = null


    peer.on('connection', function (conn) {
        if(conn===gameConn) return
        if(messageConn) return
        first = false
        messageConn = conn
        messageConn.on('open' ,function(){
            messageConn.on('data',function(data){
                console.log(data)
                let message = document.createElement('div')
                message.innerText = data;
                message.style.fontWeight = "bold"
                text.appendChild(message)
            })
        })
    });


function posalji(){
    if(first){
        messageConn = peer.connect(gameConn.peer)
        first = false;

        messageConn.on('open' ,function(){
            messageConn.on('data',function(data){
                console.log(data)
                let message = document.createElement('div')
                message.innerText = data;
                message.style.fontWeight = "bold"
                text.appendChild(message)
            })
        })
    }

    let mes = document.getElementById("message").value
    messageConn.send(mes)
    let message = document.createElement('div')
    message.innerText = mes;
    text.appendChild(message)
}
