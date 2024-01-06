"use strict";
class SectionHeader extends HTMLSection {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super();
        // REGISTER FORM - PREVENT DEFAULT 
        this.handleEvent = (event) => event.preventDefault();
        this.barsIcon = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('nav');
        this.crossIcon = document.querySelector('.close-menu');
        this.allNavLinks = Array.from(document.querySelectorAll('.nav-link'));
        this.cartIcon = document.querySelector('.cart');
        this.loginBtn = document.querySelector('.login-button');
        this.loginWindow = document.querySelector('.login-window');
        this.closeLoginBtn = document.querySelector('.login-close');
        this.registerNowBtn = document.querySelector('.register-now-btn');
        this.notMemberDiv = document.querySelector('.not-member');
        this.registerNowDiv = document.querySelector('.register-now');
        this.registerFOrm = document.querySelector('.register-form');
        this.registerNowLink = document.querySelector('.register-now-link');
        this.loginLeft = document.querySelector('.login-left');
        this.loginRight = document.querySelector('.login-right');
        this.afterPageLoaded(this.updateCartQuantity.bind(this));
        (_a = this.barsIcon) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.openMenu.bind(this));
        (_b = this.crossIcon) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.closeMenu.bind(this));
        this.closeMenuOnClick();
        (_c = this.cartIcon) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.relocateTo('cart.html'));
        (_d = this.loginBtn) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.openLoginWindow.bind(this));
        (_e = this.closeLoginBtn) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.closeLoginWindow.bind(this));
        (_f = this.registerNowBtn) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.showRegisterForm.bind(this));
        (_g = this.registerNowLink) === null || _g === void 0 ? void 0 : _g.addEventListener('click', this.loginOnPhone.bind(this));
        (_h = this.registerFOrm) === null || _h === void 0 ? void 0 : _h.addEventListener('submit', this.handleEvent.bind(this));
    }
    // OPEN MENU ON PHONE
    openMenu() {
        if (this.navMenu && this.crossIcon && this.barsIcon) {
            this.addClass(this.navMenu, 'nav-active');
            this.addClass(this.barsIcon, 'hidden');
            this.addClass(this.crossIcon, 'active');
        }
    }
    // CLOSE MENU ON PHONE
    closeMenu() {
        if (this.navMenu && this.crossIcon && this.barsIcon) {
            this.removeClass(this.navMenu, 'nav-active');
            this.removeClass(this.barsIcon, 'hidden');
            this.removeClass(this.crossIcon, 'active');
        }
    }
    // CLOSE MENU ON PHONE
    closeMenuOnClick() {
        for (const x of this.allNavLinks) {
            x.addEventListener('click', this.closeMenu.bind(this));
        }
    }
    // OPEN LOGIN WINDOW
    openLoginWindow() {
        if (this.loginWindow) {
            this.addClass(this.loginWindow, 'login-window-active');
        }
    }
    // CLOSE LOGIN WINDOW
    closeLoginWindow() {
        if (this.loginWindow && this.registerNowDiv && this.notMemberDiv && this.loginLeft && this.loginRight) {
            this.removeClass(this.loginWindow, 'login-window-active');
            this.removeClass(this.registerNowDiv, 'active-flex');
            this.removeClass(this.notMemberDiv, 'hidden');
            this.removeClass(this.loginLeft, 'hidden');
            this.removeClass(this.loginRight, 'active-flex');
        }
    }
    // SHOW REGISTER FORM
    showRegisterForm() {
        if (this.registerNowDiv && this.notMemberDiv) {
            this.addClass(this.registerNowDiv, 'active-flex');
            this.addClass(this.notMemberDiv, 'hidden');
        }
    }
    // LOGIN WINDOW - ON PHONE
    loginOnPhone() {
        if (this.loginLeft && this.loginRight) {
            this.addClass(this.loginLeft, 'hidden');
            this.addClass(this.loginRight, 'active-flex');
        }
    }
}
const sectionHeader = new SectionHeader();
