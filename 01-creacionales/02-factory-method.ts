/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
  prepare(): void;
}

class Cheeseburger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cCheeseburger", COLORS.yellow);
  }
}

class DoubleCheeseburger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cDouble Cheeseburger", COLORS.brown);
  }
}

class VeggieBurger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cVeggie Burger", COLORS.green);
  }
}

class ChickenBurger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cChicken Burger", COLORS.orange);
  }
}

abstract class Restaurant {
  abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class CheeseburgerStore extends Restaurant {
  override createHamburger(): Hamburger {
    return new Cheeseburger();
  }
}

class DoubleCheeseburgerStore extends Restaurant {
  override createHamburger(): Hamburger {
    return new DoubleCheeseburger();
  }
}

class VeggieBurgerStore extends Restaurant {
  override createHamburger(): Hamburger {
    return new VeggieBurger();
  }
}

class ChickenBurgerStore extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenBurger();
  }
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt(
    "What type of burger do you want? (1) Cheeseburger (2) Double Cheeseburger (3) Veggie Burger (4) Chicken Burger"
  );

  switch (burgerType) {
    case "1":
      restaurant = new CheeseburgerStore();
      break;
    case "2":
      restaurant = new DoubleCheeseburgerStore();
      break;
    case "3":
      restaurant = new VeggieBurgerStore();
      break;
    case "4":
      restaurant = new ChickenBurgerStore();
      break;
    default:
      throw new Error("Invalid burger type");
  }

  restaurant.orderHamburger();
}

main();
