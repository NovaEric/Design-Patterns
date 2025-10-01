/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/index.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */
interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cNadando rápido", COLORS.blue);
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("%cVolando sobre el agua", COLORS.cyan);
  }
}

class WalkOnLand implements MovementStrategy {
  move(): void {
    console.log("%cCaminando en tierra", COLORS.green);
  }
}

class Duck {
  private name: string;  
  private movementStrategy: MovementStrategy;

    constructor(name: string, movementStrategy: MovementStrategy) {
        this.name = name;
        this.movementStrategy = movementStrategy;

        console.log(`%c${this.name} está listo para la carrera!`, COLORS.yellow);
    }

    performMove(): void {
        console.log(`%c${this.name} se está moviendo:`, COLORS.yellow);
        this.movementStrategy.move();
    }

    setMovementStrategy(movementStrategy: MovementStrategy): void {
        this.movementStrategy = movementStrategy;
        console.log(`%c${this.name} ha cambiado su estrategia de movimiento!`, COLORS.yellow);
    }
}

function main () {
    const duck1 = new Duck("Patito 1", new SwimFast());
    const duck2 = new Duck("Patito 2", new FlyOverWater());
    const duck3 = new Duck("Patito 3", new WalkOnLand());

    duck1.performMove(); // Patito 1 está nadando rápido
    duck2.performMove(); // Patito 2 está volando sobre el agua
    duck3.performMove(); // Patito 3 está caminando en tierra

    // Cambiando la estrategia de movimiento en tiempo de ejecución
    duck3.setMovementStrategy(new SwimFast());
    duck3.performMove(); // Patito 3 ahora está nadando rápido

    duck2.setMovementStrategy(new WalkOnLand());
    duck2.performMove(); // Patito 2 ahora está caminando en tierra
}

main();