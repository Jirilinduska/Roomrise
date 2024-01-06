"use strict";
class SectionPreview extends HTMLSection {
    constructor() {
        var _a;
        super();
        this.arrayFromLS = this.getArrayFromLS('ShoppingItems');
        this.section = document.querySelector('.preview');
        this.imagePreviewModal = document.querySelector('.image-preview');
        this.imagePreviewEl = document.querySelector('.image img');
        this.closePreviewModal = document.querySelector('.image-close');
        this.successDiv = document.querySelector('.added');
        this.errorDiv = document.querySelector('.already-in');
        this.afterPageLoaded(this.generatePreviewHTML.bind(this));
        (_a = this.closePreviewModal) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.closePreviewImg.bind(this));
    }
    // Generate (innerHTML) + quantity, add to cart functions...
    generatePreviewHTML() {
        var _a, _b, _c, _d, _e;
        const currentHash = this.checkHash();
        const currentItem = this.findInArray(this.arrayFromLS, 'id', currentHash);
        document.title = `${currentItem[0].title} - Room Rise`;
        const newItem = this.createNewDiv('preview-wrapper');
        let currentQ = 1;
        if (this.section) {
            this.section.innerHTML = '';
        }
        newItem.innerHTML =
            `
            <div class="preview-image">
                <img src="${currentItem[0].img}" alt="preview-item">
            </div>

            <div class="preview-info">
                <span class="back-to-previous"> <- back to ${currentItem[0].categoryTitle.toLowerCase()}</span>
                <p class="preview-category">${currentItem[0].categoryTitle}</p>
                <p class="preview-title">${currentItem[0].title}</p>
                <p class="preview-desc">${currentItem[0].desc}</p>
        
                <div class="preview-price">

                    <span class="price">${currentItem[0].price} €</span>

                    <div class="preview-btns">

                        <div class="quantity-btns">
                            <button class="remove-q">-</button>
                            <p class="quantity">${currentQ}</p>
                            <button class="add-q">+</button>
                        </div>

                        <button class="add-to-cart"><ion-icon name="bag-add-outline"></ion-icon> Add To Cart</button>

                    </div>

                </div>
            </div>
        `;
        if (this.section) {
            this.section.prepend(newItem);
        }
        // Preview image
        const previewImg = (_a = newItem.querySelector('.preview-image')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.showPreviewImg(currentItem[0]));
        // Quantity
        const quantityParagraph = newItem.querySelector('.quantity');
        // Add quantity
        const addQuantityBtn = (_b = newItem.querySelector('.add-q')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            currentQ++;
            this.addText(quantityParagraph, currentQ.toString());
        });
        // Remove quantity
        const removeQuantityBtn = (_c = newItem.querySelector('.remove-q')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            if (currentQ === 1) {
                currentQ = 1;
                this.addText(quantityParagraph, currentQ.toString());
            }
            else {
                currentQ--;
                this.addText(quantityParagraph, currentQ.toString());
            }
        });
        // ADD TO CART (LS)
        const addToCartBtn = (_d = newItem.querySelector('.add-to-cart')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
            const cartArray = this.getArrayFromLS('RoomRiseCart');
            const newItemToCart = new ItemInCart(currentItem[0].title, currentItem[0].price, currentItem[0].categoryTitle, currentItem[0].id, currentItem[0].img, currentQ);
            const existsInCart = cartArray.some((item) => item.id === newItemToCart.id);
            if (!existsInCart) {
                cartArray.push(newItemToCart);
                if (this.successDiv) {
                    this.showMsg(currentItem[0].title, this.successDiv, 'added-active', '.added-title', currentQ);
                }
            }
            else {
                if (this.errorDiv) {
                    this.showMsg(currentItem[0].title, this.errorDiv, 'added-active', '.already-in-title');
                }
            }
            this.updateArrayToLS('RoomRiseCart', cartArray);
            this.updateCartQuantity();
        });
        // Relocate Back
        const backToPreview = (_e = newItem.querySelector('.back-to-previous')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => this.relocateTo(`products.html#${currentItem[0].category}`));
    }
    showPreviewImg(x) {
        if (this.imagePreviewEl && this.imagePreviewModal) {
            this.imagePreviewEl.src = x.img;
            this.addClass(this.imagePreviewModal, 'active-flex');
        }
    }
    closePreviewImg() {
        if (this.imagePreviewModal) {
            this.removeClass(this.imagePreviewModal, 'active-flex');
        }
    }
    // Show success x error message (add to cart btn)
    showMsg(itemTitleValue, htmlEl, className, spanClass, quantity) {
        if (htmlEl) {
            this.addClass(htmlEl, className);
            const itemTitle = document.querySelector(spanClass);
            if (quantity) {
                itemTitle.textContent = `${itemTitleValue} (${quantity}x) `;
            }
            else {
                itemTitle.textContent = itemTitleValue;
            }
            setTimeout(() => {
                if (htmlEl) {
                    this.removeClass(htmlEl, className);
                }
            }, 2250);
        }
    }
}
const sectionPreview = new SectionPreview();
