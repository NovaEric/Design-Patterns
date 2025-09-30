/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
    notify(videoTitle: string): void;
}

class YouTubeChannel {
    private subscribers: Observer[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    subscribe(observer: Observer): void {
        this.subscribers.push(observer);
        console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.orange);
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
        console.log(`Un suscriptor se ha dado de baja del canal %c${this.name}`, COLORS.red);
    }

    uploadVideo(videoTitle: string): void {
        console.log(`El canal %c${this.name} ha subido un nuevo video: %c${videoTitle}`, COLORS.blue, COLORS.yellow);
        this.notifySubscribers(videoTitle);
    }

    private notifySubscribers(videoTitle: string): void {
        for (const subscriber of this.subscribers) {
            subscriber.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    notify(videoTitle: string): void {
        console.log(`Hola %c${this.name}, se ha subido un nuevo video: %c${videoTitle}`, COLORS.green, COLORS.yellow);
    }
}

function main() {
    const techChannel = new YouTubeChannel("Tech Reviews");
    const alice = new Subscriber("Alice");
    const bob = new Subscriber("Bob");
    const charlie = new Subscriber("Charlie");
    
    techChannel.subscribe(alice);
    techChannel.subscribe(bob);

    techChannel.uploadVideo("Review del nuevo smartphone");
    techChannel.unsubscribe(bob);
    techChannel.subscribe(charlie);
    techChannel.uploadVideo("Unboxing de la laptop más reciente");
}

main();