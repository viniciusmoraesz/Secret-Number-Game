// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";

// ? = for igual a / : = senao

let listaDeNumerosSorteados = [];
let numero_limite = 100;
let numero_secreto = gerarNumeroAleatorio();
let tentativas = 1;

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2})
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto"); 
    exibirTextoNaTela("p","Escolha um número entre 1 e 100");
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
  let numero_escolhido = parseInt(Math.random() * numero_limite + 1);
  let quantidade_elementos_lista = listaDeNumerosSorteados.length;

  if(quantidade_elementos_lista==numero_limite){
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numero_escolhido)){
    return gerarNumeroAleatorio();
  }
  else {
    listaDeNumerosSorteados.push(numero_escolhido);
    console.log(listaDeNumerosSorteados)
    return numero_escolhido;
  }
}

function verificarChute() {
    let chute = document.querySelector("input").value;


    if (chute == numero_secreto) {           
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela("h1", "Você acertou!");
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} `;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else {
        if(chute > numero_secreto){
            exibirTextoNaTela("p", "O número secreto é menor");
        }
         else {
            exibirTextoNaTela("p", "O número secreto é maior");
        }
        exibirTextoNaTela("h1", "Você errou! Tente novamente")
        // tentativas = tentativas + 1;
        tentativas ++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numero_secreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}


