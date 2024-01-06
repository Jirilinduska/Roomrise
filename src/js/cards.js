"use strict";
class SectionCards extends HTMLSection {
    constructor() {
        var _a, _b;
        super();
        this.cardKitchen = document.querySelector('.card-kitchen');
        this.cardBedroom = document.querySelector('.card-bedroom');
        (_a = this.cardKitchen) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.relocateTo('products.html#Kitchen'));
        (_b = this.cardBedroom) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.relocateTo('products.html#Bedroom'));
    }
}
const sectionCards = new SectionCards();
