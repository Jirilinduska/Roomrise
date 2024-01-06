class SectionPreview extends HTMLSection {
    arrayFromLS: ShoppingItem[]
    section: HTMLElement | null
    imagePreviewModal: HTMLElement | null
    imagePreviewEl: HTMLImageElement | null
    closePreviewModal: HTMLElement | null
    successDiv: HTMLElement | null
    errorDiv: HTMLElement | null

    constructor(){
        super()
        this.arrayFromLS = this.getArrayFromLS('ShoppingItems')
        this.section = document.querySelector('.preview')
        this.imagePreviewModal = document.querySelector('.image-preview')
        this.imagePreviewEl = document.querySelector('.image img')
        this.closePreviewModal = document.querySelector('.image-close')
        this.successDiv = document.querySelector('.added')
        this.errorDiv = document.querySelector('.already-in')


        this.afterPageLoaded(this.generatePreviewHTML.bind(this))
        this.closePreviewModal?.addEventListener('click', this.closePreviewImg.bind(this))
    }

    // Generate (innerHTML) + quantity, add to cart functions...
    generatePreviewHTML(){

        const currentHash = this.checkHash()
        const currentItem = this.findInArray(this.arrayFromLS, 'id', currentHash)
        document.title = `${currentItem[0].title} - Room Rise`
        const newItem = this.createNewDiv('preview-wrapper')

        let currentQ: number = 1 

        if(this.section) {
            this.section.innerHTML = ''
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
        `

        if(this.section) {
            this.section.prepend(newItem)
        }

        // Preview image
        const previewImg = newItem.querySelector('.preview-image')?.addEventListener('click', () => this.showPreviewImg(currentItem[0]))

        // Quantity
        const quantityParagraph = newItem.querySelector('.quantity') as HTMLParagraphElement

        // Add quantity
        const addQuantityBtn = newItem.querySelector('.add-q')?.addEventListener('click', () => {
            currentQ++
            this.addText(quantityParagraph, currentQ.toString())
        })

        // Remove quantity
        const removeQuantityBtn = newItem.querySelector('.remove-q')?.addEventListener('click', () => {
            
            if(currentQ === 1) {
                currentQ = 1
                this.addText(quantityParagraph, currentQ.toString())
            } else {
                currentQ--
                this.addText(quantityParagraph, currentQ.toString())
            }
        })


        // ADD TO CART (LS)
        const addToCartBtn = newItem.querySelector('.add-to-cart')?.addEventListener('click', () => {
            
            const cartArray = this.getArrayFromLS('RoomRiseCart')


            const newItemToCart = new ItemInCart(currentItem[0].title, currentItem[0].price, currentItem[0].categoryTitle, currentItem[0].id, currentItem[0].img, currentQ)
                
            const existsInCart = cartArray.some( (item: ItemInCart) => item.id === newItemToCart.id)

            if (!existsInCart) {
                cartArray.push(newItemToCart)
                if(this.successDiv) {
                    this.showMsg(currentItem[0].title, this.successDiv, 'added-active', '.added-title', currentQ)
                }
            } else {
                if(this.errorDiv) {
                    this.showMsg(currentItem[0].title, this.errorDiv, 'added-active', '.already-in-title')
                }
            }
            
            this.updateArrayToLS('RoomRiseCart', cartArray)
            this.updateCartQuantity()
        })

        // Relocate Back
        const backToPreview = newItem.querySelector('.back-to-previous')?.addEventListener('click', () => this.relocateTo(`products.html#${currentItem[0].category}`) )
    }

    showPreviewImg(x: ShoppingItem){
        if(this.imagePreviewEl && this.imagePreviewModal) {
            this.imagePreviewEl.src = x.img
            this.addClass(this.imagePreviewModal, 'active-flex')
        }
    }

    closePreviewImg(){
        if(this.imagePreviewModal) {
            this.removeClass(this.imagePreviewModal, 'active-flex')
        }
    }

    // Show success x error message (add to cart btn)
    showMsg(itemTitleValue: string, htmlEl: HTMLElement, className: string, spanClass: string, quantity?: number) {
        if(htmlEl) {
            this.addClass(htmlEl, className)
            const itemTitle = document.querySelector(spanClass) as HTMLSpanElement

            if(quantity) {
                itemTitle.textContent = `${itemTitleValue} (${quantity}x) `
            } else {
                itemTitle.textContent = itemTitleValue
            }
            

            setTimeout(() => {
                if(htmlEl) {
                    this.removeClass(htmlEl, className)
                }
            }, 2250);
        }
    }


}

const sectionPreview = new SectionPreview()