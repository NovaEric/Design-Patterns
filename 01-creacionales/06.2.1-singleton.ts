import { COLORS } from "../helpers/colors.ts";
import { configManager } from "./06.2.1-config-manager.ts";

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
configManager.setConfig('123', '123');
configManager.setConfig('456', '456');
configManager.setConfig('789', '789');
console.log(`%c${configManager.getConfig('456')}`, COLORS.blue);
console.log(`%c${configManager.getConfig('123')}`, COLORS.purple);
console.log(`%c${configManager.getConfig('789')}`, COLORS.green);
console.log(`%c${JSON.stringify(configManager.getAllConfig())}`, COLORS.red);
console.log(configManager.getAllConfig());
