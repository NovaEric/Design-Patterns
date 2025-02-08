/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {

        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cDragon Balls have been created!', COLORS.green);
        };
        return DragonBalls.instance;
    };

    collectBalls(): void {
        if (this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(`Ball Collected. Total balls on hand: %c${this.ballsCollected}`, COLORS.orange);
            return;
        };

        console.log('%cAll 7 balls have been collected! call Shenlong.', COLORS.green);
    };

    summonShenlong() {
        if (this.ballsCollected === 7) {
            console.log('%cSal de ahiiii, Shenlong!!!!!', COLORS.violet)
            this.ballsCollected = 0;
            return;
        }

        console.log(`%cStill needs ${ 7 - this.ballsCollected } balls to be able to make your wish.`, COLORS.red)
    }
};

function main() {

    const goku = DragonBalls.getInstance();

    goku.collectBalls();
    goku.collectBalls();
    goku.collectBalls();
    goku.collectBalls();
    goku.collectBalls();
    goku.collectBalls();
    goku.collectBalls();
    goku.collectBalls();
    goku.summonShenlong();
    
    const vegeta = DragonBalls.getInstance();
    
    vegeta.collectBalls();
    vegeta.collectBalls();
    vegeta.collectBalls();
    vegeta.collectBalls();
    vegeta.summonShenlong();
    vegeta.collectBalls();
    vegeta.collectBalls();
    vegeta.collectBalls();
    goku.summonShenlong();
    vegeta.summonShenlong();
    
};

main();