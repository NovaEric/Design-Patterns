/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

interface Location {
    display(coordinates: { x: number; y: number }): void;
}

class LocationIcon implements Location {
    private type: string;
    private iconImage: string;

    constructor(type: string, iconImage: string) {
        this.type = type;
        this.iconImage = iconImage;
    }

    display(coordinates: { x: number; y: number; }): void {
        console.log(
            `Corrdinates: ${coordinates.x}, ${coordinates.y} - Type: ${this.type} - Icon: %c[${this.iconImage}]`,
            COLORS.green
        )
    }
}
class LocationFactory {
    private icons: Record<string, LocationIcon> = {};
    
    getLocationIcon(type: string): LocationIcon {
        if (!this.icons[type]) {
            console.log(`%cCreating icon: ${type}`, COLORS.yellow);
            const iconImage = `icon-${type.toLowerCase()}.png`;
            this.icons[type] = new LocationIcon(type, iconImage);
        }
        return this.icons[type];
    }
}

class MapLocation {
    private coordinates: { x: number; y: number; };
    private icon: LocationIcon;

    constructor(x: number, y: number, icon: LocationIcon) {
        this.coordinates = { x, y };
        this.icon = icon;
    }

    display(): void {
        this.icon.display(this.coordinates);
    }
}

function main() {
    const factory = new LocationFactory();
    const locations: MapLocation[] = [];

    locations.push(new MapLocation(10, 20, factory.getLocationIcon('restaurant')));
    locations.push(new MapLocation(15, 25, factory.getLocationIcon('restaurant')));
    locations.push(new MapLocation(20, 30, factory.getLocationIcon('hospital')));
    locations.push(new MapLocation(25, 35, factory.getLocationIcon('restaurant')));
    locations.push(new MapLocation(30, 40, factory.getLocationIcon('hospital')));

    locations.forEach(location => location.display());
}

main();