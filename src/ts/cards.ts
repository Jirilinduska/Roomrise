class SectionCards extends HTMLSection {
    cardKitchen: HTMLElement | null
    cardBedroom: HTMLElement | null

    constructor(){
        super()
        this.cardKitchen = document.querySelector('.card-kitchen')
        this.cardBedroom = document.querySelector('.card-bedroom')

        this.cardKitchen?.addEventListener('click', () =>  this.relocateTo('products.html#Kitchen'))
        this.cardBedroom?.addEventListener('click', () => this.relocateTo('products.html#Bedroom'))
    }
}

const sectionCards = new SectionCards()