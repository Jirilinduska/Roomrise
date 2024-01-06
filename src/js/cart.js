"use strict";
class SectionCart extends HTMLSection {
    constructor() {
        var _a, _b;
        super();
        this.emptyCartSection = document.querySelector('.empty-cart');
        this.cartHasItemsSection = document.querySelector('.cart-section');
        this.cartArray = this.getArrayFromLS('RoomRiseCart');
        this.subTotalEl = document.querySelector('.cart-subtotal');
        this.totalPriceEl = document.querySelector('.total-price');
        this.thanksWindow = document.querySelector('.thanks');
        this.checkoutBtn = document.querySelector('.checkout-btn');
        this.closeThanksWindow = document.querySelector('.thanks-content button');
        this.afterPageLoaded(this.checkCartArray.bind(this));
        this.afterPageLoaded(this.generateCartItems.bind(this));
        this.afterPageLoaded(this.updateTotalPrice.bind(this));
        (_a = this.checkoutBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.showThanksMsg.bind(this));
        (_b = this.closeThanksWindow) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.closeThanksMsg.bind(this));
    }
    checkCartArray() {
        const currentCart = this.getArrayFromLS('RoomRiseCart');
        if (this.emptyCartSection && this.cartHasItemsSection) {
            if (currentCart.length >= 1) {
                this.addClass(this.emptyCartSection, 'hidden');
                this.addClass(this.cartHasItemsSection, 'active');
            }
            else if (currentCart.length === 0) {
                this.removeClass(this.emptyCartSection, 'hidden');
                this.removeClass(this.cartHasItemsSection, 'active');
            }
        }
    }
    updateTotalPrice() {
        const currentArray = this.getArrayFromLS('RoomRiseCart');
        const subTotalPrice = currentArray.reduce((sum, product) => sum + product.price * product.quantity, 0);
        if (this.subTotalEl && this.totalPriceEl) {
            this.subTotalEl.textContent = `${(subTotalPrice.toFixed(2)).toString()} €`;
            this.totalPriceEl.textContent = `${(subTotalPrice.toFixed(2)).toString()} €`;
        }
    }
    generateCartItems() {
        var _a, _b, _c;
        const cartArray = this.getArrayFromLS('RoomRiseCart');
        const section = document.querySelector('.cart-left');
        section.innerHTML = '';
        for (const x of cartArray) {
            const newItem = this.createNewDiv('cart-item');
            newItem.id = x.id;
            newItem.innerHTML =
                `
            <div class="delete-item"><ion-icon name="close-circle-outline"></ion-icon></div>

            <div class="cart-image">
                <img src="${x.img}" alt="">
            </div>
            <div class="cart-title">
                <span>${x.title}</span>
            </div>
            <div class="cart-cat">
                <span>${x.categoryTitle}</span>
            </div>

            <div class="cart-btns">
                <button class="cart-remove-q">-</button>
                <p class="cart-q">${x.quantity}</p>
                <button class="cart-add-q">+</button>
            </div>

            <div class="cart-price">
                <span>${(x.quantity * x.price).toFixed(2)} €</span>
            </div>
            `;
            section.appendChild(newItem);
            // Quantity
            const quantityParagraph = newItem.querySelector('.cart-q');
            const priceSpan = newItem.querySelector('.cart-price span');
            let currentQ = x.quantity;
            // Add quantity
            const addQuantityBtn = (_a = newItem.querySelector('.cart-add-q')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                currentQ++;
                this.addText(quantityParagraph, currentQ.toString());
                this.addText(priceSpan, `${(currentQ * x.price).toFixed(2)} €`);
                x.quantity = currentQ;
                this.updateArrayToLS('RoomRiseCart', cartArray);
                this.updateCartQuantity();
                this.updateTotalPrice();
            });
            // Remove quantity
            const removeQuantityBtn = (_b = newItem.querySelector('.cart-remove-q')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                if (currentQ === 1) {
                    currentQ = 1;
                    this.addText(quantityParagraph, currentQ.toString());
                }
                else {
                    currentQ--;
                    this.addText(quantityParagraph, currentQ.toString());
                }
                this.addText(priceSpan, `${(currentQ * x.price).toFixed(2)} €`);
                x.quantity = currentQ;
                this.updateArrayToLS('RoomRiseCart', cartArray);
                this.updateCartQuantity();
                this.updateTotalPrice();
            });
            // Remove item
            const deleteBtn = (_c = newItem.querySelector('.delete-item')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                const findItemIndex = cartArray.findIndex((object) => object.id === newItem.id);
                if (findItemIndex !== -1) {
                    cartArray.splice(findItemIndex, 1);
                    newItem.remove();
                }
                this.updateArrayToLS('RoomRiseCart', cartArray);
                this.updateCartQuantity();
                this.updateTotalPrice();
                this.checkCartArray();
            });
        }
    }
    showThanksMsg() {
        if (this.thanksWindow) {
            this.addClass(this.thanksWindow, 'active-flex');
        }
    }
    closeThanksMsg() {
        if (this.thanksWindow) {
            this.removeClass(this.thanksWindow, 'active-flex');
        }
    }
}
const sectionCart = new SectionCart();
