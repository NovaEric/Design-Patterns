import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
    execute(): void;
}

class Light {
    public turnOn(): void {
        console.log('%cLa luz está encendida', COLORS.blue);
    }

    public turnOff(): void {
        console.log('%cLa luz está apagada', COLORS.red);
    }
}

class Fan {
    public On(): void {
        console.log('%cEl ventilador está encendido', COLORS.blue);
    }

    public Off(): void {
        console.log('%cEl ventilador está apagado', COLORS.red);
    }
}

class LightOnCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOn();
    }
}
class LightOffCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOff();
    }
}
class FanOnCommand implements Command {
    constructor(private fan: Fan) { }

    execute(): void {
        this.fan.On();
    }
}
class FanOffCommand implements Command {
    constructor(private fan: Fan) { }

    execute(): void {
        this.fan.Off();
    }
}

class RemoteControl {
    private command: Record<string, Command> = {};

    public setCommand(button: string, command: Command): void {
        this.command[button] = command;
    }

    public pressButton(button: string): void {
        if (this.command[button]) {
            this.command[button].execute();
        } else {
            console.log('%cNo hay comando asignado a este botón', COLORS.red);
        }
    }
}

function main() {
    
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();

    const lightOnCommand = new LightOnCommand(light);
    const lightOffCommand = new LightOffCommand(light);
    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOffCommand(fan);

    remoteControl.setCommand('1', lightOnCommand);
    remoteControl.setCommand('2', lightOffCommand);
    remoteControl.setCommand('3', fanOnCommand);
    remoteControl.setCommand('4', fanOffCommand);

    let sw = true;

    do {
        console.clear();
        const pressedButton = prompt(`
            Presiona un botón del control remoto:
            1. Encender luz
            2. Apagar luz
            3. Encender ventilador
            4. Apagar ventilador
            `) ?? ''

        remoteControl.pressButton(pressedButton);    

        const exit = prompt('¿Desea salir? (s/n)')?.toLowerCase();
        sw = exit === 'n' ? true : false;    

    } while (sw);
}

main();
