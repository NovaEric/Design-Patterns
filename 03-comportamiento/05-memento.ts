/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

class GameMemento {

    private level: number;
    private health: number;
    private position: { x: number; y: number };

    constructor(level: number, health: number, position: { x: number; y: number }) {
        this.level = level;
        this.health = health;
        this.position = position;
    }

    getLevel() {
        return this.level;
    }

    getHealth() {
        return this.health;
    }

    getPosition() {
        return this.position;
    }
}

class Game {
    private level: number;
    private health: number;
    private position: { x: number; y: number };

    constructor() {
        this.level = 1;
        this.health = 100;
        this.position = { x: 0, y: 0 };
    }

    play():void {
        // Simula el progreso del juego
        this.level += 1;
        this.health -= 10;
        this.position.x += 5;
        this.position.y += 5;
        console.log(`Playing... Level: ${this.level}, Health: ${this.health}, Position: (${this.position.x}, ${this.position.y})`);
    }

    save(): GameMemento {
        return new GameMemento(this.level, this.health, { ...this.position });
    }

    restore(memento: GameMemento): void {
        this.level = memento.getLevel();
        this.health = memento.getHealth();
        this.position = memento.getPosition();
        console.log(`\n%cGame restored to... 
            %cLevel: ${this.level}, Health: ${this.health}, Position: (${this.position.x}, ${this.position.y})`, COLORS.orange, COLORS.white);
    }
}

class GameHistory {
    private mementos: GameMemento[] = [];

    save(memento: GameMemento): void {
        this.mementos.push(memento);
        console.log(`%cGame state saved!`, COLORS.green);
    }

    restore(index: number): GameMemento | null {
        if (index < 0 || index >= this.mementos.length) {
            console.log(`%cInvalid index!`, COLORS.red);
            return null;
        }
        return this.mementos[index];
    }
}

function main() {
    const game = new Game();
    const history = new GameHistory();

    history.save(game.save()); // Guardar el estado inicial

    // Simular el juego y guardar estados
    game.play();
    history.save(game.save());

    game.play();
    history.save(game.save());
}

main();