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


import { COLORS } from '../helpers/colors.ts';

// 1. Clases del Subsistema

class CPU {
  stopOperations(): void {
    console.log('%cCPU: %cDeteniendo operaciones.', COLORS.violet, COLORS.gray);
  }

  jump(position: number): void {
    console.log(`%cCPU: %cSaltando a la posición de memoria ${position}.`, COLORS.violet, COLORS.gray);
  }

  execute(): void {
    console.log('%cCPU: %cEjecutando instrucciones.', COLORS.violet, COLORS.gray);
  }
}

class HardDrive {
  read(position: number, size: number): string {
    console.log(
      `%cHardDrive: %cLeyendo ${size} bytes desde la posición ${position}, COLORS.violet, COLORS.gray.`
    );
    return '001010001010100';
  }

  close() {
    console.log('%cHardDrive: %cDeteniendo disco duro.', COLORS.violet, COLORS.gray);
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`%cMemory: %cCargando datos en la posición ${position} ${data}.`, COLORS.violet, COLORS.gray);
  }

  free(): void {
    console.log('%cMemory: %cLiberando memoria.', COLORS.violet, COLORS.gray);
  }
}

// 2. Clase Facade - ComputerFacade
class ComputerFacade {
  
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;
  
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();  
  }

  startComputer(): void {
    console.log('\n%cIniciando la computadora...', COLORS.cyan);

    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();

    console.log('%cComputadora lista para usar.\n', COLORS.green);
  }

  shutDownComputer(): void {
    console.log('\n%cApagando la computadora...', COLORS.red);
    console.log('%cCerrando procesos y guardando datos...', COLORS.orange);

    this.cpu.stopOperations();
    this.memory.free();
    this.hardDrive.close();

    console.log('%cComputadora apagada.\n', COLORS.red);
  }
}

// 3. Código Cliente para Usar la Facade

function main() {
  const computer = new ComputerFacade();

  // Encender la computadora usando la fachada
  computer.startComputer();

  // Apagar la computadora usando la fachada
  computer.shutDownComputer();
}

main();
