let tempo = null;
let esperando = false;

function espera() {
  esperando = true;
  setTimeout(function() { esperando = false }, 2000);
}



while(true) {
  
  if(false) {
    espera();
    tempo = setTimeout(function() { console.log("teste") }, 3000);
    clearTimeout(tempo);
  }
}