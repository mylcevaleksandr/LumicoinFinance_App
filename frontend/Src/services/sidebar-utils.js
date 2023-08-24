import {Auth} from "./auth.js";
import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class SidebarUtils {
    constructor() {
        this.btnIncome = document.getElementById('btnIncome');
        this.btnPayments = document.getElementById('btnPayments');
        this.sidebarSum = document.getElementById('sidebarSum');
        this.userFullName = document.getElementById('sidebarUser');
        this.userLogout = document.getElementById('sidebarLogout');
        this.user = Auth.getUserInfo();
        this.btnMain = document.getElementById('btnMain');
        this.svgMain = document.getElementById('svgMain');
        this.btnIncomeOutcome = document.getElementById('btnIncomeOutcome');
        this.svgIncomeOutcome = document.getElementById('svgIncomeOutcome');
        this.btnToggle = document.getElementById('btnToggle');
        this.svgToggle = document.getElementById('svgToggle');
        this.processSidebar();
        this.processBtn();
        this.showBalance();

    }


    processBtn() {
        [this.btnMain, this.btnIncomeOutcome].forEach((btn) => {
            btn.classList.remove('btn-primary', 'text-light');
            btn.classList.add('btn-light');
            this.svgIncomeOutcome.style.fill = '#052C65';
            this.svgMain.style.fill = '#052C65';
        });
        [this.btnIncome, this.btnPayments,].forEach((btn) => {
            btn.classList.remove('bg-primary', 'text-light');
        });
        if (window.location.hash === "#/main") {
            this.btnMain.classList.remove('btn-light');
            this.btnMain.classList.add('btn-primary', 'text-light');
            this.svgMain.style.fill = 'white';
        }
        if (window.location.hash === "#/income-outcome" || window.location.hash === "#/income-outcome-update") {
            this.btnIncomeOutcome.classList.remove('btn-light');
            this.btnIncomeOutcome.classList.add('btn-primary', 'text-light');
            this.svgIncomeOutcome.style.fill = 'white';
        }

        this.btnToggle.addEventListener('click', () => {
            this.btnToggle.classList.toggle('btn-primary');
            this.btnToggle.classList.toggle('text-light');
            this.svgToggle.classList.toggle('svg_toggle');
        });

        if (window.location.hash === "#/income" || window.location.hash === "#/income-update" || window.location.hash === "#/income-create") {
            this.btnIncome.classList.remove('btn-light');
            this.btnIncome.classList.add('bg-primary', 'text-light');
        }
        if (window.location.hash === "#/expense" || window.location.hash === "#/expense-update" || window.location.hash === "#/expense-create") {
            this.btnPayments.classList.remove('btn-light');
            this.btnPayments.classList.add('bg-primary', 'text-light');
        }


    }


    processSidebar() {
        if (this.user) {
            this.userFullName.innerText = this.user.fullName;
        }
        this.userLogout.onclick = function () {
            Auth.logout();
        };
    }

    async showBalance() {
        try {
            const result = await CustomHttp.request(config.host + '/balance',);
            if (result.balance) {
                this.sidebarSum.innerText = result.balance;
            }
        } catch (error) {
            return console.log(error);
        }
    }
}