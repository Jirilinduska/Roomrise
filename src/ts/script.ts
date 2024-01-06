class HTMLSection {
    constructor(){}

    addClass(htmlEl: HTMLElement, className: string): void {
        htmlEl.classList.add(className)
    }

    removeClass(htmlEl: HTMLElement, className: string): void {
        htmlEl.classList.remove(className)
    }

    toggleClass(htmlEl: HTMLElement, className: string): void {
        htmlEl.classList.toggle(className)
    }

    getArrayFromLS(arrayNameLS: string){
        return JSON.parse(localStorage.getItem(arrayNameLS) || '[]')
    }

    updateArrayToLS(arrayNameLS: string, thisArray: []){
        localStorage.setItem(arrayNameLS, JSON.stringify(thisArray))
    }

    afterPageLoaded(callBack: () => void): void{
        document.addEventListener('DOMContentLoaded', () => {
            callBack()
        })
    }

    createNewDiv(newItemClassName: string): HTMLElement {
        const newItem = document.createElement('div') as HTMLElement
        this.addClass(newItem, newItemClassName)
        return newItem
    }

    relocateTo(toThisLocation: string){
        window.location.href = toThisLocation
    }

    filterArray(arrayToFilter: ShoppingItem[], itemInArray: keyof ShoppingItem, findThis: any): ShoppingItem[] {
        return arrayToFilter.filter((x) => {
            return x[itemInArray] === findThis
        })
    }

    findInArray(arrayToFilter: ShoppingItem[], itemInArray: keyof ShoppingItem, findThis: any): ShoppingItem[] {
        return arrayToFilter.filter((x) => {
            return x[itemInArray] === findThis
        })
    }

    checkHash(): string{
        return window.location.hash.substring(1)
    }

    addText(htmlEl: HTMLElement, value: string){
        htmlEl.textContent = value
    }

    // Update function for header cart icon (number of items in cart)
    updateCartQuantity(){
        const cartArray = this.getArrayFromLS('RoomRiseCart')
        const cartQuantitySpan = document.querySelector('.cart-number') as HTMLSpanElement

        const currentCartQuantity: number = cartArray.reduce((accumulator: number, currentValue: { quantity: number }) => {
            return accumulator + currentValue.quantity;
        }, 0);

        if(currentCartQuantity >= 1) {
            this.addClass(cartQuantitySpan, 'active')
            cartQuantitySpan.textContent = currentCartQuantity.toString()
        } else {
            this.removeClass(cartQuantitySpan, 'active')
        }
    }
}

class ShoppingItem {
    title: string
    desc: string
    price: number
    category: string
    id: string
    img: string
    categoryTitle: string

    constructor(title: string, desc: string, price: number, category: string, id: string, img: string, categoryTitle: string) {
        this.title = title
        this.desc = desc
        this.price = price
        this.category = category
        this.id = id
        this.img = img
        this.categoryTitle = categoryTitle

    }

    addToLS(){
        // Vytáhni pole z ls
        const existingItems = JSON.parse(localStorage.getItem('ShoppingItems') || '[]')

        // Kontrola, zda-li item už v poli existuje
        const itemExists = existingItems.some((item: ShoppingItem) => item.id === this.id)

        // Přidat do pole
        if(!itemExists) {
            existingItems.push(this)
            const updateItems = JSON.stringify(existingItems)
            localStorage.setItem('ShoppingItems', updateItems)
        }
    }
}

const allShoppingItems = [
    // BATHROOM
    new ShoppingItem('Enchanting Bath', 'Feel the luxury with our Enchanting Elegance Tutu Bathtub. Blending a touch of elegance with comfort, this bathtub brings charm and style to your bathroom. Indulge in relaxation in a unique setting where comfort meets beauty.', 249.99, 'Bathroom', 'item-01', './src/img/items/bathroom-1.jpg', 'Bathroom'),
    new ShoppingItem('Sleek Spa Oasis Set','Transform your bathroom into a luxurious spa retreat with this bathroom furniture set. Elegant design and high functionality combined in one package. Great for organization and adding a touch of modern elegance to your bathroom space.',599.99,'Bathroom','item-02','./src/img/items/bathroom-2.jpg', 'Bathroom'),

    // BEDROOM  
    new ShoppingItem('Serene Dream','Revitalize your sleep with our Serene Dream Queen Bed. Elegant design and comfortable upholstery create the perfect space for a night of rest. Wake up every morning refreshed and energized.',899.99,'Bedroom','item-03','./src/img/items/bedroom-1.jpg', 'Bedroom'),
    new ShoppingItem('LuxeSlumber Bed','Experience the epitome of luxury with the LuxeSlumber Bed, crafted for unparalleled comfort.',699.99,'Bedroom','item-04', './src/img/items/bedroom-2.jpg', 'Bedroom'),
    new ShoppingItem('Elegance Nightstand','With its modern design and clean lines, the "Elegance" nightstand brings a sophisticated look to your bedroom. Featuring two storage compartments and a durable matte finish, it is the perfect addition to any contemporary interior.',89.99,'Bedroom','item-05','./src/img/items/bedroom-3.jpg', 'Bedroom'),

    // KITCHEN
    new ShoppingItem('Stylish Kitchen','Elevate your kitchen aesthetics with our StylishCuisine Kitchen Unit. This sleek and functional solution offers ample storage space while adding a touch of modern elegance to your culinary space. Organize with flair!',699.99,'Kitchen','item-06','./src/img/items/kitchen-1.jpg', 'Kitchen'),
    new ShoppingItem('Dining Table','Enhance your kitchen or dining area with our dining table. The combination of modern design and high-quality oak finish provides the perfect space for family gatherings and dinners with friends, adding a touch of elegance to your home',399.99,'Kitchen','item-07','./src/img/items/kitchen-2.jpg', 'Kitchen'),
    new ShoppingItem('Modern Kitchen','Transform your culinary space with our contemporary kitchen setup. Featuring sleek stainless steel accents, this setup combines functionality with a touch of modern elegance. Elevate your cooking experience and redefine your kitchen aesthetics.',1299.99,'Kitchen','item-08','./src/img/items/kitchen-3.jpg', 'Kitchen'),
    new ShoppingItem('Elegance Kitchen','An elegant and functional kitchen unit featuring smooth surfaces, an integrated sink, and ample storage space. It combines style and practicality for everyday cooking and social moments.',1200,'Kitchen','item-09','./src/img/items/kitchen-4.jpg', 'Kitchen'),

    // LIGHTS
    new ShoppingItem('Glow Cascade','Immerse your space in the enchanting radiance of our Glow Cascade lamp. Its dynamic design creates a cascade of light, transforming any room into a mesmerizing display of luminosity. Perfect for adding a touch of magic to your surroundings.',79.99,'Lamps','item-10','./src/img/items/lamps-lamp-1.jpg', 'Lights'),
    new ShoppingItem('Luminance','Elevate your décor with the Designer Luminance lamp. This sophisticated piece not only illuminates your space but also serves as a stylish design element. With its contemporary aesthetics, it is more than just a lamp— it is a statement of modern elegance.',129.99,'Lamps','item-11','./src/img/items/lamps-lamp-2.jpg', 'Lights'),
    new ShoppingItem('Cozy Gleam','Experience the warmth of ambient lighting with our Cozy Gleam lamp. Designed for comfort and relaxation, it bathes your room in a soft, inviting glow. Ideal for creating a snug atmosphere that embraces you in a tranquil embrace after a long day.',49.99,'Lamps','item-12','./src/img/items/lamps-lamp-3.jpg', 'Lights'),
    new ShoppingItem('Shadow Poetry','Unveil the artistry of light and shadow with our Shadow Poetry lamp. This unique piece combines form and function, casting intriguing shadows that dance along with its illumination. A poetic addition to your space, perfect for those who appreciate the beauty of subtlety.',89.99,'Lamps','item-13','./src/img/items/lamps-lamp-4.jpg', 'Lights'),

    // LIVING ROOM
    new ShoppingItem('Elysian Comfort','Elysian Comfort Haven offers the perfect blend of style and relaxation. Sink into plush comfort as the sophisticated design enhances your living space. With its inviting embrace and contemporary charm, this sofa redefines lounging luxury for your home.',799.99,'LivingRoom','item-14','./src/img/items/living-room-sofa-1.jpg', 'Living Room'),
    new ShoppingItem('Serene Lounge','Immerse yourself in the tranquility of Serene Lounge Retreat. This sofa combines modern aesthetics with unparalleled comfort, creating a stylish centerpiece for your living area. Experience relaxation like never before.',899.99,'LivingRoom','item-15','./src/img/items/living-room-sofa-2.jpg', 'Living Room'),
    new ShoppingItem('Chic Living Stand','Elevate your living space with this stylish and functional stand designed for the modern lifestyle.',99.99,'LivingRoom','item-16','./src/img/items/living-room-table.jpg', 'Living Room'),
    new ShoppingItem('Elegance TV','Elevate your TV experience with our ModernWood TV Stand. Sleek design meets practical functionality, providing ample storage for your media essentials. Crafted from high-quality wood, it seamlessly blends into both modern and traditional interiors. Get ready for a stylish and organized entertainment space!',249.99,'LivingRoom','item-17','./src/img/items/living-room-tv-stand.jpg', 'Living Room'),
]

// add to ls
for(const x of allShoppingItems) {
    x.addToLS()
}



class ItemInCart {
    title: string
    price: number
    categoryTitle: string
    id: string
    img: string
    quantity: number

    constructor(ti: string, price: number, category: string, id: string, img: string, q: number) {
        this.title = ti
        this.price = price
        this.categoryTitle = category
        this.id = id
        this.img = img
        this.quantity = q
    }

}


