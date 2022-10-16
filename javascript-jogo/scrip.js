let canvas = document.querySelector("canvas")
let contexto = canvas.getContext("2d");
//CONFIGURANDO A TELA DO CANVAS
canvas.width = 1024;//Largura do canvas
canvas.height = 576;//Altura do canvas
//VARIAVEIS DE USO 
let zoom = 3.5;
let camerax = 120;
let cameray = 50
let largura = 1024;

let altura = 576;
let speed = 3

//CONFIGURAÇÃO DOS LIMITES 

const mapaLimite = []
for (let i = 0; i < limit.length; i += 70) {
    mapaLimite.push(limit.slice(i, 70 + i))

}
let num=43;//console.log(mapaLimite)
class Limite {

    static largura=num
    static altura =num
    constructor({ posicao }) {
        this.posicao = posicao
        this.largura = num
        this.altura = num
    }
    desenharLimite() {
        contexto.fillStyle = 'red',
        contexto.fillRect(this.posicao.x, this.posicao.y, this.largura, this.altura)
    }
}


const limites = []
const bordas={
    x:-450,
    y:-200
}
mapaLimite.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 1025)
            limites.push(
               new Limite({
                    posicao: {
                        x: j * Limite.largura+bordas.x,
                        y: i * Limite.altura+bordas.y
                    }
                })
            )
    })
})
console.log(limites) 







//COLOCANDO O JOGADOR
const jogador = new Image()
jogador.src = "../personagens/playerDown.png";
//CLASS DA CONFIGURAÇÃO DO JOGADOR

class ConfiguracaoJogador {
    desenharJogador() {
        contexto.drawImage(jogador,
        /*O corte*/0, 0, jogador.width / 4, jogador.height,
        /*A posição Atual-->*/canvas.width / 2 - jogador.width / 4, canvas.height / 2 - jogador.height / 2, jogador.width / 4, jogador.height,)
    }
}
//CRIAÇÃO DO JOGADOR "JOAO"
const joao = new ConfiguracaoJogador();

//IMPORTANDO O MAPA DENTRO DO CANVAS
let imagem = new Image()
imagem.src = "../personagens/map.jpg";
//CLASSE Configura Mapa é a classe que configura o status de posicao do mapa
class ConfiguraMapa {
    constructor({ posicao, velocidade, imagem }) {
        this.posicao = posicao
        this.imagem = imagem
    }
    //Metodo que desenha o mapa
    desenhar() {
        contexto.drawImage(this.imagem, camerax, cameray, largura / zoom, altura / zoom, 0, 0, largura, altura)
    }
}
//CRIANDO UM OBJETO "FUNDO" que contem as configurações de um mapa
const fundo = new ConfiguraMapa({ position: { x: 1024, y: 130 }, imagem: imagem })
//Função que retorna a animação do mapa(o objeto fundo acessa seu metodo desenhar) e do jogador(o jogador "joao" acessa seu metodo desenharJogador)
function animacao() {
    window.requestAnimationFrame(animacao)
    fundo.desenhar()
    joao.desenharJogador()
    limites.forEach(limites=>{
        limites.desenharLimite()
    })

}
animacao()//a chamada da função ANIMACAO
//Adicionando eventos nas teclas de setas
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowDown": {
            if (cameray === largura)
                cameray = largura
            else
                cameray += speed
            break;
        }
        case "ArrowUp": {
            if (cameray === 0)
                cameray = 0
            else
                cameray -= speed
            break;
        }
        case "ArrowLeft": {
            if (camerax === 0)
                camerax = 0
            else
                camerax -= speed
            break;
        }
        case "ArrowRight": {
            camerax += speed
            break;
        }
        /*  case " ": {
              zoom += 0.1;
              break;
          }
          case "Enter": {
              zoom -= 0.1;
              break
          }*/
        default:
            break;
    }

})

