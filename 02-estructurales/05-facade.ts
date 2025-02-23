import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
    on() {
        console.log('%cProyector encendido', COLORS.cyan)    }
    off() {
        console.log('%cProyector apagado', COLORS.yellow)    }
}

class SoundSytem {
    on() {
        console.log('%cSistema de sonido encendido', COLORS.cyan);
    }
    off() {
        console.log('%cSistema de sonido apagado', COLORS.yellow);
    }
}

class VideoPlayer {
    on() {
        console.log('%cReproductor de vídeo encendido', COLORS.cyan);
    }
    off() {
        console.log('%cReproductor de vídeo apagado', COLORS.yellow);
    }
    play(movie: string) {
        console.log(`Reproduciendo %c${movie}`, COLORS.pink);
    }
    stop() {
        console.log('%cReproducción detenida', COLORS.yellow);
    } 
}

class PopCornMachine {
    on() {
        console.log('%cMáquina de palomitas encendida', COLORS.cyan);
    }
    off() {
        console.log('%cMáquina de palomitas apagada', COLORS.yellow);
    }
    pop() {
        console.log('%cHaciendo palomitas', COLORS.orange)    }
}

interface HomeTheaterFacadeOptioins {
    projector: Projector;
    soundSystem: SoundSytem;
    videoPlayer: VideoPlayer;
    popCornMachine: PopCornMachine;
}
class HomeTheaterFacade {
    private projector: Projector;
    private soundSystem: SoundSytem;
    private videoPlayer: VideoPlayer;
    private popCornMachine: PopCornMachine;

    constructor(options: HomeTheaterFacadeOptioins) {   
        this.projector = options.projector;
        this.soundSystem = options.soundSystem;
        this.videoPlayer = options.videoPlayer;
        this.popCornMachine = options.popCornMachine;
    }

    watchMovie(movie: string) {
        console.log(`%cPreparando todo para ver película: %c${movie}`, COLORS.green, COLORS.pink);
        this.projector.on();
        this.soundSystem.on();
        this.videoPlayer.on();
        this.popCornMachine.on();
        this.popCornMachine.pop();
        this.videoPlayer.play(movie);
    }

    endMovie() {
        console.log('%cPreparando para finalizar película', COLORS.red);
        this.projector.off();
        this.soundSystem.off();
        this.videoPlayer.stop();
        this.videoPlayer.off();
        this.popCornMachine.off();
    }
}
function main() {
    const projector = new Projector();
    const soundSystem = new SoundSytem();
    const videoPlayer = new VideoPlayer();
    const popCornMachine = new PopCornMachine();

    const homeTheater = new HomeTheaterFacade({
        projector,
        soundSystem,
        videoPlayer,
        popCornMachine
    });

    homeTheater.watchMovie('The Lord of the Rings');
    homeTheater.endMovie();
}
main();