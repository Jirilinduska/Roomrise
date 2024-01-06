class SectionHeader extends HTMLSection {
    private barsIcon: HTMLElement | null
    private crossIcon: HTMLElement | null
    private navMenu: HTMLElement | null
    private cartIcon: HTMLElement | null
    private allNavLinks: HTMLElement[]
    private loginBtn: HTMLElement | null
    private loginWindow: HTMLElement | null
    private closeLoginBtn: HTMLElement | null
    private registerNowBtn: HTMLElement | null
    private notMemberDiv: HTMLElement | null
    private registerNowDiv: HTMLElement | null
    private registerFOrm: HTMLElement | null
    private registerNowLink: HTMLElement | null
    private loginLeft: HTMLElement | null
    private loginRight: HTMLElement | null

    constructor(){
        super()

        this.barsIcon = document.querySelector('.hamburger')
        this.navMenu = document.querySelector('nav')
        this.crossIcon = document.querySelector('.close-menu')
        this.allNavLinks = Array.from(document.querySelectorAll('.nav-link'))
        this.cartIcon = document.querySelector('.cart')
        this.loginBtn = document.querySelector('.login-button')
        this.loginWindow = document.querySelector('.login-window')
        this.closeLoginBtn = document.querySelector('.login-close')
        this.registerNowBtn = document.querySelector('.register-now-btn')
        this.notMemberDiv = document.querySelector('.not-member')
        this.registerNowDiv = document.querySelector('.register-now')
        this.registerFOrm = document.querySelector('.register-form')
        this.registerNowLink = document.querySelector('.register-now-link')
        this.loginLeft = document.querySelector('.login-left')
        this.loginRight = document.querySelector('.login-right')




        this.afterPageLoaded(this.updateCartQuantity.bind(this))
        this.barsIcon?.addEventListener('click', this.openMenu.bind(this))
        this.crossIcon?.addEventListener('click', this.closeMenu.bind(this))
        this.closeMenuOnClick()
        this.cartIcon?.addEventListener('click', () => this.relocateTo('cart.html'))
        this.loginBtn?.addEventListener('click', this.openLoginWindow.bind(this))
        this.closeLoginBtn?.addEventListener('click', this.closeLoginWindow.bind(this))
        this.registerNowBtn?.addEventListener('click', this.showRegisterForm.bind(this))
        this.registerNowLink?.addEventListener('click', this.loginOnPhone.bind(this))
        this.registerFOrm?.addEventListener('submit', this.handleEvent.bind(this))
    }

    // OPEN MENU ON PHONE
    openMenu(){
        if(this.navMenu && this.crossIcon && this.barsIcon) {
            this.addClass(this.navMenu, 'nav-active')
            this.addClass(this.barsIcon, 'hidden')
            this.addClass(this.crossIcon, 'active')
        }
    }

    // CLOSE MENU ON PHONE
    closeMenu(){
        if(this.navMenu && this.crossIcon && this.barsIcon) {
            this.removeClass(this.navMenu, 'nav-active')
            this.removeClass(this.barsIcon, 'hidden')
            this.removeClass(this.crossIcon, 'active')
        }
    }

    // CLOSE MENU ON PHONE
    closeMenuOnClick(){
        for(const x of this.allNavLinks) {
            x.addEventListener('click', this.closeMenu.bind(this))
        }
    }

        // OPEN LOGIN WINDOW
    openLoginWindow(){
        if(this.loginWindow) {
            this.addClass(this.loginWindow, 'login-window-active')
        }
    }

    // CLOSE LOGIN WINDOW
    closeLoginWindow(){
        if(this.loginWindow && this.registerNowDiv && this.notMemberDiv && this.loginLeft && this.loginRight) {
            this.removeClass(this.loginWindow, 'login-window-active')
            this.removeClass(this.registerNowDiv, 'active-flex')
            this.removeClass(this.notMemberDiv, 'hidden')
            this.removeClass(this.loginLeft, 'hidden')
            this.removeClass(this.loginRight, 'active-flex')
        }
    }

    // SHOW REGISTER FORM
    showRegisterForm(){
        if(this.registerNowDiv && this.notMemberDiv) {
            this.addClass(this.registerNowDiv, 'active-flex')
            this.addClass(this.notMemberDiv, 'hidden')
        }
    }

    // LOGIN WINDOW - ON PHONE
    loginOnPhone(){
        if(this.loginLeft && this.loginRight) {
            this.addClass(this.loginLeft, 'hidden')
            this.addClass(this.loginRight, 'active-flex')
        }
    }

    // REGISTER FORM - PREVENT DEFAULT 
    handleEvent = (event: SubmitEvent) => event.preventDefault()
}


const sectionHeader = new SectionHeader()