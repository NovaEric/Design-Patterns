/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): void;
}

abstract class BaseHandler implements Handler {
    private nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: string): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
}

class BasicSupport extends BaseHandler {
   override handle(request: string): void {
        if (request === 'basic') {
            console.log(`%cFixing ${request} issue`, COLORS.cyan);
        } else {
            console.log(`%cPassing to next handler`, COLORS.yellow);
            super.handle(request);
        }
    }
}

class AdvancedSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'advanced') {
            console.log(`%cFixing ${request} issue`, COLORS.brown);
        } else {
            console.log(`%cPassing to next handler`, COLORS.pink);
            super.handle(request);
        }
    }
}

class ExpertSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'expert') {
            console.log(`%cFixing ${request} issue`, COLORS.green);
        } else {
            console.log(`%cCould not resolve issue`, COLORS.red);
        }
    }
}

function main() {
    const basic = new BasicSupport();
    const advanced = new AdvancedSupport();
    const expert = new ExpertSupport();

    basic.setNext(advanced).setNext(expert);

    basic.handle('basic');
    basic.handle('advanced');
    basic.handle('expert');
    basic.handle('unknown');
}

main();