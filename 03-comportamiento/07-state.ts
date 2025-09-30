/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State {

    name: string;
    insertMoney(): void;
    selectProduct(): void;
    dispenseProduct(): void;

}

class VendingMachine {

    private state: State;

    constructor() {
        this.state = new WaitingForMoneyState(this);
    }

    setState(state: State) {
        this.state = state;
        console.log(`Estado actual: %c${state.name}`, COLORS.cyan);
    }

    insertMoney() {
        this.state.insertMoney();
    }

    selectProduct() {
        this.state.selectProduct();
    }

    dispenseProduct() {
        this.state.dispenseProduct();
    }

    getStateName() {
        return this.state.name;
    }
}

class WaitingForMoneyState implements State {

    name = 'Esperando Dinero';

    constructor(private vendingMachine: VendingMachine) { }

    insertMoney(): void {
        console.log('Dinero insertado. %cPuedes seleccionar un producto.', COLORS.green);
        this.vendingMachine.setState(new SelectingProductState(this.vendingMachine));
    }

    selectProduct(): void {
        console.log('%cPrimero debes insertar dinero.', COLORS.red);
    }

    dispenseProduct(): void {
        console.log('%cPrimero debes insertar dinero y seleccionar un producto.', COLORS.red);
    }

}

class SelectingProductState implements State {

    name = 'Seleccionando Producto';

    constructor(private vendingMachine: VendingMachine) { }

    insertMoney(): void {
        console.log('%cYa has insertado dinero. %cSelecciona un producto.', COLORS.red, COLORS.green);
    }

    selectProduct(): void {
        console.log('Producto seleccionado. %cRecoge tu producto.', COLORS.green);
        this.vendingMachine.setState(new DispensingProductState(this.vendingMachine));
    }

    dispenseProduct(): void {
        console.log('%cPrimero debes seleccionar un producto.', COLORS.red);
    }

}

class DispensingProductState implements State {

    name = 'Entregando Producto';

    constructor(private vendingMachine: VendingMachine) { }

    insertMoney(): void {
        console.log('%cPor favor espera. %cEstamos entregando tu producto.', COLORS.red, COLORS.green);
    }

    selectProduct(): void {
        console.log('%cPor favor espera. %cEstamos entregando tu producto.', COLORS.red, COLORS.green);
    }

    dispenseProduct(): void {
        console.log('Producto entregado. %cGracias por tu compra.', COLORS.green);
        this.vendingMachine.setState(new WaitingForMoneyState(this.vendingMachine));
    }

}

async function main() {
    const vendingMachine = new VendingMachine();

    let selectedOption: string | null = '4';

    do {

        console.clear();
        console.log(`Selecciona una opción: %c${vendingMachine.getStateName()}`, COLORS.yellow);

        selectedOption = prompt(`
            1. Insertar Dinero
            2. Seleccionar Producto
            3. Entregar Producto
            4. Salir

            opción:
    `);

        switch (selectedOption) {
            case '1':
                vendingMachine.insertMoney();
                break;
            case '2':
                vendingMachine.selectProduct();
                break;
            case '3':
                vendingMachine.dispenseProduct();
                break;
            case '4':
                console.log('%cSaliendo...', COLORS.yellow);
                break;
            default:
                console.log('%cOpción no válida.', COLORS.red);
        }

        await sleep(3000);

    } while (selectedOption !== '4');
}

main();