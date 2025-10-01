/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/index.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
    visitRollerCoaster(ride: RollerCoaster): void;
    visitHauntedHouse(ride: HauntedHouse): void;
    visitFerrisWheel(ride: FerrisWheel): void;
}

interface Attraction {
    accept(visitor: Visitor): void;
    getPrice(): number;
}

class RollerCoaster implements Attraction {
    private price: number = 50;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitRollerCoaster(this);
    }
}

class HauntedHouse implements Attraction {
    private price: number = 30;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitHauntedHouse(this);
    }
}

class FerrisWheel implements Attraction {
    private price: number = 20;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }
}

class ChildVisitor implements Visitor {
    visitRollerCoaster(ride: RollerCoaster): void {
        const discountPrice = ride.getPrice() * 0.5; // 50% de descuento
        console.log(`%cPrecio para niño en Montaña Rusa: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }

    visitHauntedHouse(ride: HauntedHouse): void {
        const discountPrice = ride.getPrice() * 0.7; // 30% de descuento
        console.log(`%cPrecio para niño en Casa del Terror: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }

    visitFerrisWheel(ride: FerrisWheel): void {
        const discountPrice = ride.getPrice() * 0.6; // 40% de descuento
        console.log(`%cPrecio para niño en Rueda de la Fortuna: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }
}

class AdultVisitor implements Visitor {
    visitRollerCoaster(ride: RollerCoaster): void {
        const discountPrice = ride.getPrice(); 
        console.log(`%cPrecio para adulto en Montaña Rusa: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }

    visitHauntedHouse(ride: HauntedHouse): void {
        const discountPrice = ride.getPrice(); 
        console.log(`%cPrecio para adulto en Casa del Terror: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }

    visitFerrisWheel(ride: FerrisWheel): void {
        const discountPrice = ride.getPrice(); 
        console.log(`%cPrecio para adulto en Rueda de la Fortuna: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }
}

class SeniorVisitor implements Visitor {
    visitRollerCoaster(ride: RollerCoaster): void {
        const discountPrice = ride.getPrice() * 0.8; // 20% de descuento
        console.log(`%cPrecio para adulto mayor en Montaña Rusa: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }

    visitHauntedHouse(ride: HauntedHouse): void {
        const discountPrice = ride.getPrice() * 0.6; // 40% de descuento
        console.log(`%cPrecio para adulto mayor en Casa del Terror: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }

    visitFerrisWheel(ride: FerrisWheel): void {
        const discountPrice = ride.getPrice() * 0.7; // 30% de descuento
        console.log(`%cPrecio para adulto mayor en Rueda de la Fortuna: %c$${discountPrice}`, COLORS.cyan, COLORS.green);
    }
}

function main() {
    const attractions: Attraction[] = [
        new RollerCoaster(),
        new HauntedHouse(),
        new FerrisWheel(),
    ];

    const visitors: Visitor[] = [
        new ChildVisitor(),
        new AdultVisitor(),
        new SeniorVisitor(),
    ];

    console.log(`%c--- Precios de Roller Coaster con Descuentos --- ${ new RollerCoaster().getPrice()}`, COLORS.yellow);
    console.log(`%c--- Precios de Haunted House con Descuentos --- ${ new HauntedHouse().getPrice()}`, COLORS.yellow);
    console.log(`%c--- Precios de Ferris Wheel con Descuentos --- ${ new FerrisWheel().getPrice()}`, COLORS.yellow);

    for (const visitor of visitors) {
        for (const attraction of attractions) {
            attraction.accept(visitor);
        }
        console.log('---------------------------');
    }
}

main();