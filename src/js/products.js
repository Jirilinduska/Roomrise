"use strict";
class SectionProducts extends HTMLSection {
    constructor() {
        var _a, _b;
        super();
        // Find items by category in array
        this.findCategoryInArray = (btn, className, section, array, category, generateHTML) => {
            if (btn.classList[1] === className) {
                if (section) {
                    section.innerHTML = '';
                }
                const filteredCategory = this.filterArray(array, 'category', category);
                for (const item of filteredCategory) {
                    generateHTML(item);
                }
            }
        };
        this.filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
        this.arrayFromLS = this.getArrayFromLS('ShoppingItems');
        this.sectionForItems = document.querySelector('.filtered');
        this.filterBtnMobile = document.querySelector('.filter-mobile');
        this.closeFilterMobile = document.querySelector('.filter-close');
        this.filterDIV = document.querySelector('.filter');
        this.afterPageLoaded(this.generateByHash.bind(this));
        this.filterItems();
        (_a = this.filterBtnMobile) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.showFilterOnMobile.bind(this));
        (_b = this.closeFilterMobile) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.hideFilterMobile.bind(this));
        this.closeFilterOnClick();
    }
    // Generate (innerHTML)
    generateProductsHTML(oneItem) {
        const newItem = this.createNewDiv('filtered-item');
        newItem.innerHTML =
            `
            <div class="item-image">
                <img src="${oneItem.img}" alt="">
            </div>
            <div class="item-info">
                <h4>${oneItem.title}</h4>
                <p class="item-price">${oneItem.price} €</p>
            </div>
        `;
        if (this.sectionForItems) {
            this.sectionForItems.appendChild(newItem);
        }
        newItem.addEventListener('click', () => {
            this.relocateTo(`preview.html#${oneItem.id}`);
        });
    }
    // Generate 'Show all'
    generateAllProducts() {
        this.sectionForItems && (this.sectionForItems.innerHTML = '');
        const filterAllBtn = document.querySelector('.filter-all');
        this.addClass(filterAllBtn, 'clicked-btn');
        for (const x of this.arrayFromLS) {
            this.generateProductsHTML(x);
        }
    }
    // Filter category (filter buttons)
    filterItems() {
        for (const oneBtn of this.filterBtns) {
            oneBtn.addEventListener('click', () => {
                for (const x of this.filterBtns) {
                    this.removeClass(x, 'clicked-btn');
                }
                if (this.sectionForItems) {
                    if (oneBtn.classList[1] === 'filter-all') {
                        this.generateAllProducts();
                        this.addClass(oneBtn, 'clicked-btn');
                    }
                }
                if (this.sectionForItems) {
                    this.findCategoryInArray(oneBtn, 'filter-bathroom', this.sectionForItems, this.arrayFromLS, 'Bathroom', this.generateProductsHTML.bind(this));
                    this.addClass(oneBtn, 'clicked-btn');
                }
                if (this.sectionForItems) {
                    this.findCategoryInArray(oneBtn, 'filter-bedroom', this.sectionForItems, this.arrayFromLS, 'Bedroom', this.generateProductsHTML.bind(this));
                    this.addClass(oneBtn, 'clicked-btn');
                }
                if (this.sectionForItems) {
                    this.findCategoryInArray(oneBtn, 'filter-kitchen', this.sectionForItems, this.arrayFromLS, 'Kitchen', this.generateProductsHTML.bind(this));
                    this.addClass(oneBtn, 'clicked-btn');
                }
                if (this.sectionForItems) {
                    this.findCategoryInArray(oneBtn, 'filter-lights', this.sectionForItems, this.arrayFromLS, 'Lamps', this.generateProductsHTML.bind(this));
                    this.addClass(oneBtn, 'clicked-btn');
                }
                if (this.sectionForItems) {
                    this.findCategoryInArray(oneBtn, 'filter-livingroom', this.sectionForItems, this.arrayFromLS, 'LivingRoom', this.generateProductsHTML.bind(this));
                    this.addClass(oneBtn, 'clicked-btn');
                }
            });
        }
    }
    // Generate category by url hash
    generateByHash() {
        const currentHash = this.checkHash();
        if (currentHash === '') {
            this.generateAllProducts();
        }
        else {
            const filterCat = this.filterArray(this.arrayFromLS, 'category', currentHash);
            for (const x of filterCat) {
                this.generateProductsHTML(x);
            }
        }
    }
    // Show filter on mobile
    showFilterOnMobile() {
        if (this.filterDIV) {
            this.addClass(this.filterDIV, 'filter-active');
        }
    }
    // Open filter on mobile
    hideFilterMobile() {
        if (this.filterDIV) {
            this.removeClass(this.filterDIV, 'filter-active');
        }
    }
    // Close filter on mobile
    closeFilterOnClick() {
        for (const x of this.filterBtns) {
            x.addEventListener('click', this.hideFilterMobile.bind(this));
        }
    }
}
const sectionProducs = new SectionProducts();
