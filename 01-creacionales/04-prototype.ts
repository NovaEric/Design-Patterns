/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

import { COLORS } from "../helpers/colors.ts";

class Document {
    public title: string;
    private content: string;
    public author: string;

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    clone(): Document {
        return new Document(this.title, this.content, this.author);
    }

    displayInfo(): void {
        console.log(`
            Title: ${this.title}
            Content: ${this.content}
            Author: ${this.author}`);
    }
}

function main() {
    console.log('\n%cDocument Prototype 1', COLORS.cyan);
    const document = new Document('Design Patterns', 'Creational Patterns', 'GOF');
    document.displayInfo();
    
    const documentClone = document.clone();
    documentClone.title = 'Design Patterns Clone';
    
    console.log('\n%cDocument Prototype 2', COLORS.green);
    documentClone.displayInfo();
}

main();