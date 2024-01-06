"use strict";
class SectionFeatured extends HTMLSection {
    constructor() {
        super();
        this.arrayFromLS = this.getArrayFromLS('ShoppingItems');
        this.afterPageLoaded(this.getFeaturedItems.bind(this));
    }
    // GENERATE HTML
    generateFeaturedItemsHTML(object) {
        const section = document.querySelector('.featured-wrapper');
        const newItem = this.createNewDiv('featured-item');
        newItem.innerHTML =
            `
            <div class="item-image">
                <img src="${object.img}" alt="">
            </div>
    
            <div class="item-info">
                <h4>${object.title}</h4>
                <p>${object.price} €</p>
            </div>
        `;
        section.appendChild(newItem);
        newItem.addEventListener('click', () => {
            this.relocateTo(`preview.html#${object.id}`);
        });
    }
    // GET 4 RANDOM ITEMS FROM ARRAY 
    getFeaturedItems() {
        const newArray = [];
        while (newArray.length < 4) {
            const randomIndex = Math.floor(Math.random() * this.arrayFromLS.length);
            const randomItem = this.arrayFromLS[randomIndex];
            if (!newArray.includes(randomItem)) {
                newArray.push(randomItem);
            }
        }
        for (const x of newArray) {
            this.generateFeaturedItemsHTML(x);
        }
    }
}
const sectionFeatured = new SectionFeatured();
