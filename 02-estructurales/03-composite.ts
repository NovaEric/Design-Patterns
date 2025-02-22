/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystemComponent {
    showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
    constructor(private name: string) {
        this.name = name;
    }

    showDetails(indent: string = ''): void {
        console.log(`${indent}File: ${this.name}`);
    }
}

class Folder implements FileSystemComponent {
    private children: FileSystemComponent[] = [];

    constructor(private name: string) {
        this.name = name;
    }

    add(component: FileSystemComponent): void {
        this.children.push(component);
    }

    showDetails(indent: string = ''): void {
        console.log(`${indent}Folder: ${this.name}`);
        indent += '  ';
        for (const child of this.children) {
            child.showDetails(indent);
        }
    }
}

function main() {
    const folder1 = new Folder('Folder 1');
    const file1 = new File('File 1');
    folder1.add(file1);
    folder1.add(new File('File 2'));

    const folder2 = new Folder('Folder 2');
    folder2.add(new File('File 3'));
    folder2.add(new File('File 4'));

    const folder3 = new Folder('Folder 3');
    folder3.add(file1);
    folder1.add(folder3);

    const root = new Folder('Root');
    root.add(folder1);
    root.add(folder2);

    root.showDetails();
}

main();