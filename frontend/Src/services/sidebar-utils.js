import {Auth} from "./auth.js";
import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class SidebarUtils {
    constructor() {
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
        this.showBalance()
    }

    processBtn() {
        this.btnToggle.addEventListener('click', () => {
            this.btnToggle.classList.toggle('btn-primary');
            this.svgToggle.classList.toggle('svg_toggle');
        });

        if (window.location.hash === "#/income-outcome") {
            this.btnIncomeOutcome.classList.remove('btn-light');
            this.btnIncomeOutcome.classList.add('btn-primary', 'text-light');
            this.svgIncomeOutcome.style.fill = 'white';
        }
        if (window.location.hash === "#/main") {
            this.btnMain.classList.remove('btn-light');
            this.btnMain.classList.add('btn-primary', 'text-light');
            this.svgMain.style.fill = 'white';
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
            const result = await CustomHttp.request(config.host + '/balance',  );
            if (result.balance) {
                this.sidebarSum.innerText=result.balance
            }
        } catch (error) {
            return console.log(error);
        }
    }
}