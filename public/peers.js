export const peer = new Peer()
export let gameConn = null;

var idInput = document.getElementById("id");
var connectButton = document.getElementById("connect-button");
if(connectButton)
connectButton.addEventListener('click', join);

function join() {

    gameConn = peer.connect(idInput.value);   
    gameConnListeners()                 
 };


peer.on('connection', function(conn) { 

    if(gameConn) return
    gameConn = conn;
    console.log("someone connected to me")
    gameConnListeners()
});

peer.on('open', function(id) {
    if(!connectButton){
        let peerId = document.createElement('h2');
        peerId.innerText = id
        document.body.appendChild(peerId)
    }
});


function gameConnListeners(){

    gameConn.on('open', function() { 
        if(!connectButton){
            document.body.removeChild(document.querySelector('h2'))
            lovacListener()
            gameConn.on('data',function(data){
                plijen = data
                draw()
                if(lovac.x == plijen.x && lovac.y == plijen.y) end()
            })
        }else{
            document.body.removeChild(document.getElementById('connect'))
            plijenListener()
            gameConn.on('data',function(data){
                lovac = data
                draw()
                if(lovac.x == plijen.x && lovac.y == plijen.y) end()
            })
        }
        document.getElementById("flex").style.display = "flex";
        draw()

    });


}

///////////game/////////

let lovac = { x: 5, y: 10 }
let plijen = { x: 15, y: 10 }

 const gameBoard = document.getElementById("game")

 function draw() {
    gameBoard.innerHTML = ''
      let lovacElement = document.createElement('div')
      lovacElement.style.gridRowStart = lovac.y
      lovacElement.style.gridColumnStart = lovac.x
      lovacElement.style.backgroundColor =  "red"
      gameBoard.appendChild(lovacElement)

      let plijenElement = document.createElement('div')
      plijenElement.style.gridRowStart = plijen.y
      plijenElement.style.gridColumnStart = plijen.x
      plijenElement.style.backgroundColor =  "blue"
      gameBoard.appendChild(plijenElement)

  }

  function lovacListener(){
    window.addEventListener('keydown', e => {
        switch (e.key) {
          case 'ArrowUp':
            lovac = {x: lovac.x, y:lovac.y-1}
            break;
          case 'ArrowDown':
            lovac = {x: lovac.x, y:lovac.y+1}
            break
          case 'ArrowLeft':
            lovac = {x: lovac.x-1, y:lovac.y}
            break
          case 'ArrowRight':
            lovac = {x: lovac.x+1, y:lovac.y}
            break
        }
        draw()
        gameConn.send(lovac)
        if(lovac.x == plijen.x && lovac.y == plijen.y) end()
      })
  }


function plijenListener(){
    window.addEventListener('keydown', e => {
        switch (e.key) {
          case 'ArrowUp':
            plijen = {x: plijen.x, y:plijen.y-1}
            break;
          case 'ArrowDown':
            plijen = {x: plijen.x, y:plijen.y+1}
            break
          case 'ArrowLeft':
            plijen = {x: plijen.x-1, y:plijen.y}
            break
          case 'ArrowRight':
            plijen = {x: plijen.x+1, y:plijen.y}
            break
        }
        draw()
        gameConn.send(plijen)
        if(lovac.x == plijen.x && lovac.y == plijen.y) end()
      })
}

function end(){
    alert("lovac je pobijedio")
     lovac = { x: 5, y: 10 }
     plijen = { x: 15, y: 10 }
     draw()
}
