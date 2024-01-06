class SectionCart extends HTMLSection{
    cartArray: ItemInCart[]
    subTotalEl: HTMLSpanElement | null
    totalPriceEl: HTMLSpanElement | null
    emptyCartSection: HTMLElement | null
    cartHasItemsSection: HTMLElement | null
    thanksWindow: HTMLElement | null
    checkoutBtn: HTMLButtonElement | null
    closeThanksWindow: HTMLButtonElement | null


    constructor(){
        super()
        this.emptyCartSection = document.querySelector('.empty-cart')
        this.cartHasItemsSection = document.querySelector('.cart-section')
        this.cartArray = this.getArrayFromLS('RoomRiseCart')
        this.subTotalEl = document.querySelector('.cart-subtotal')
        this.totalPriceEl = document.querySelector('.total-price')
        this.thanksWindow = document.querySelector('.thanks')
        this.checkoutBtn = document.querySelector('.checkout-btn')
        this.closeThanksWindow = document.querySelector('.thanks-content button')

        this.afterPageLoaded(this.checkCartArray.bind(this))
        this.afterPageLoaded(this.generateCartItems.bind(this))
        this.afterPageLoaded(this.updateTotalPrice.bind(this))
        this.checkoutBtn?.addEventListener('click', this.showThanksMsg.bind(this))
        this.closeThanksWindow?.addEventListener('click', this.closeThanksMsg.bind(this))
    }


    checkCartArray(){
        const currentCart = this.getArrayFromLS('RoomRiseCart')

        if(this.emptyCartSection && this.cartHasItemsSection) {
            if(currentCart.length >= 1) {
                this.addClass(this.emptyCartSection, 'hidden')
                this.addClass(this.cartHasItemsSection, 'active')
            } else if(currentCart.length === 0) {
                this.removeClass(this.emptyCartSection, 'hidden')
                this.removeClass(this.cartHasItemsSection, 'active')
            }
        }
    }

    updateTotalPrice(){

        const currentArray = this.getArrayFromLS('RoomRiseCart')

        const subTotalPrice: number = currentArray.reduce((sum: number, product: ItemInCart) => sum + product.price * product.quantity, 0)
 
        if(this.subTotalEl && this.totalPriceEl) {
            this.subTotalEl.textContent = `${(subTotalPrice.toFixed(2)).toString()} €`
            this.totalPriceEl.textContent = `${(subTotalPrice.toFixed(2)).toString()} €`
        }
    }

    generateCartItems(){
        const cartArray = this.getArrayFromLS('RoomRiseCart')
        const section = document.querySelector('.cart-left') as HTMLElement
        section.innerHTML = ''

        for(const x of cartArray) {

            const newItem = this.createNewDiv('cart-item')
            newItem.id = x.id

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
            `

            section.appendChild(newItem)

            // Quantity
            const quantityParagraph = newItem.querySelector('.cart-q') as HTMLParagraphElement
            const priceSpan = newItem.querySelector('.cart-price span') as HTMLSpanElement
            let currentQ = x.quantity

            // Add quantity
            const addQuantityBtn = newItem.querySelector('.cart-add-q')?.addEventListener('click', () => {
                currentQ++
                this.addText(quantityParagraph, currentQ.toString())
                this.addText(priceSpan, `${(currentQ * x.price).toFixed(2)} €`)
                x.quantity = currentQ
                this.updateArrayToLS('RoomRiseCart', cartArray)
                this.updateCartQuantity()
                this.updateTotalPrice()
            })

            // Remove quantity
            const removeQuantityBtn = newItem.querySelector('.cart-remove-q')?.addEventListener('click', () => {
            
            if(currentQ === 1) {
                currentQ = 1
                this.addText(quantityParagraph, currentQ.toString())
            } else {
                currentQ--
                this.addText(quantityParagraph, currentQ.toString())
            }

            this.addText(priceSpan, `${(currentQ * x.price).toFixed(2)} €`)
            x.quantity = currentQ
            this.updateArrayToLS('RoomRiseCart', cartArray)
            this.updateCartQuantity()
            this.updateTotalPrice()
        })

            // Remove item
            const deleteBtn = newItem.querySelector('.delete-item')?.addEventListener('click', () => {


                const findItemIndex = cartArray.findIndex( (object: ItemInCart) => object.id === newItem.id)

                if(findItemIndex !== -1) {
                    cartArray.splice(findItemIndex, 1)
                    newItem.remove()
                }

                this.updateArrayToLS('RoomRiseCart', cartArray)
                this.updateCartQuantity()
                this.updateTotalPrice()
                this.checkCartArray()
            })
        }

    }

    showThanksMsg(){
        if(this.thanksWindow) {
            this.addClass(this.thanksWindow, 'active-flex')
        }
    }

    closeThanksMsg(){
        if(this.thanksWindow){
            this.removeClass(this.thanksWindow, 'active-flex')
        }
    }

}

const sectionCart = new SectionCart()