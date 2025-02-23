import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */
interface Notification {
    send(message: string): void;
}

class BaseNotification implements Notification {
    send(message: string): void {
        console.log(`%cBase Notification: %c${message}`, COLORS.cyan, COLORS.orange);
    }
}

abstract class NotificationDecorator implements Notification { 
    protected notification: Notification;

    constructor(notification: Notification) {
        this.notification = notification;
    }

    send(message: string): void {
        this.notification.send(message);
    }
}
class SMSDecorator extends NotificationDecorator {
    private sendSMS(message: string): void {
        console.log(`%cSending notification through SMS: %c${message}`, COLORS.green, COLORS.red);
    }
    override send(message: string): void {
        super.send(message);
        this.sendSMS(message);
    }
}
class EmailDecorator extends NotificationDecorator {
    private sendEmail(message: string): void {
        console.log(`%cSending notification through Email: %c${message}`, COLORS.violet, COLORS.yellow);
    }
     override send(message: string): void {
        super.send(message);
        this.sendEmail(message);
    }
}

function main() {
   let notification: Notification = new BaseNotification();
    notification = new SMSDecorator(notification);
    notification = new EmailDecorator(notification);
    notification.send('Alert: System is down');
}
main();