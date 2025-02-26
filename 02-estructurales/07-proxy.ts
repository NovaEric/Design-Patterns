/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player{
    name: string;
    level: number;
    constructor(name: string, level: number){
        this.name = name;
        this.level = level;
    }
}

interface Room {
    enter(player: Player): void;
}

class SecretRoom implements Room {
    enter(player: Player): void {
        console.log(`%c${player.name} %cha entrado en la habitación secreta`, COLORS.blue, COLORS.white);
    }
}

class MagicPortal implements Room {
    private room: SecretRoom;
    constructor(room: SecretRoom){
        this.room = room;
    }
    enter(player: Player): void {
        if(player.level >= 10){
            this.room.enter(player);
        }else{
            console.log(`%c${player.name} %cno tiene el nivel suficiente para entrar en la habitación secreta`, COLORS.red, COLORS.white);
        }
    }
}

function main(){
    const player = new Player('John Doe', 5); 
    const player2 = new Player('Jane Doe', 15);
    const secretRoom = new SecretRoom();
    const magicPortal = new MagicPortal(secretRoom);
    magicPortal.enter(player);
    magicPortal.enter(player2);
}

main();