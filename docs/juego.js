const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 5

console.log(btnEmpezar.id);

// swal('Hola')

class Juego {
    constructor(){
        this.inicializar();
        this.generarSecuencia();
        
        setTimeout(() =>{
            this.siguienteNivel();
        }, 650)
    }

    inicializar(){
        this.toggleBtnEmpezar();
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.nivel = 1;
        this.colores = {
            celeste: celeste,
            violeta: violeta,
            naranja: naranja,
            verde: verde
        }
    }

    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
          btnEmpezar.classList.remove('hide')
        }else{
          btnEmpezar.classList.add('hide')
        }
      }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }
    
    siguienteNivel(){
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAcolor(numero){
        switch (numero){
            case 0:
                return 'celeste'
            
            case 1:
                return 'violeta'
            
            case 2:
                return 'naranja'
            
            case 3:
                return 'verde'            
        }
    }

    transformarcolorANumero(color){
        switch (color){
            case 'celeste':
                return 0
            
            case 'violeta':
                return 1
            
            case 'naranja':
                return 2
            
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++){
            let color = this.transformarNumeroAcolor(this.secuencia[i]);
            console.log(color);
            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick(){
        let self = this;
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        let self = this;
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)

    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarcolorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subNivel]){
            this.subNivel++
            if (this.subNivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL +1)){
                    //Gano
                    this.ganoElJuego()
                }else {
                    setTimeout(this.siguienteNivel.bind(this),1200)
                }
            }
        } else {
            //Perdio
            this.perdioElJuego()
        }
    }

    ganoElJuego(){
        swal('Felicitaciones', 'Ganaste el Juego', 'success')
        .then(() => {
            this.inicializar();
        })
    }

    perdioElJuego(){
        swal('Lo siento', 'Lo lamento, perdiste :(', 'error')
        .then(() => {
            this.eliminarEventosClick();
            this.inicializar();
        })
    }

}

function empezarJuego() {
    // alert('Start') 
    window.juego = new Juego()
}

