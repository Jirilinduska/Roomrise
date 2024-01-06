class Loader extends HTMLSection {
    loader: HTMLElement | null

    constructor(){
        super()
        this.loader = document.querySelector('.loader')
        this.afterPageLoaded(this.showLoader.bind(this))
    }

    showLoader(){
        if(this.loader) {
            this.addClass(this.loader, 'active-flex')
        }
        setTimeout(() => {
            if(this.loader) {
                this.removeClass(this.loader, 'active-flex')
            }
        }, 1000);
    }
}

const loader = new Loader()