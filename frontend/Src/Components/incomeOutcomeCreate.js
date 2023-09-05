import {SidebarUtils} from "../services/sidebar-utils.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeOutcomeCreate {
    constructor() {
        this.operationId = sessionStorage.getItem('operationId');
        this.category = null;
        this.saveIncome = document.getElementById('saveIncome');
        this.select = document.getElementById('select');
        this.selectExpense = document.getElementById('selectExpense');
        this.description = document.getElementById('description');
        this.amount = document.getElementById('amount');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        new SidebarUtils();
        this.processSelect();
        this.saveChanges();
        this.showCalendar();

    }

    getDate(date, id) {
        if (!date) {
            date = this.date.placeholder;
        }
        const newDate = date.split('-');
        if (id === 1) {
            return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
        }
        if (id === 2) {
            return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
        }
    }

    async getCategories(type) {
        if (type) {
            try {
                const result = await CustomHttp.request(config.host + "/categories/" + type);
                if (result) {
                    this.layoutOptions(result);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    processSelect() {
        let that = this;
        this.select.addEventListener('change', function () {
            that.getCategories(this.value);
        });
    }

    layoutOptions(categories) {
        this.description.innerHTML = "";
        for (let i = 0; i < categories.length; i++) {
            let optionElement = document.createElement('option');
            optionElement.value = categories[i].title;
            optionElement.id = categories[i].id;
            optionElement.innerHTML = categories[i].title;
            this.description.appendChild(optionElement);
        }
    }

    saveChanges() {
        const that = this;
        this.saveIncome.addEventListener('click', () => {
            let type = that.select.value;
            let amount = that.amount.value;
            let date = that.getDate(that.date.value, 2);
            let comment = that.comment.value;
            let catId = that.description.selectedOptions[0].id;
            this.postChanges(type, +amount, date, comment, +catId);
        });
    }

    showCalendar() {
        $(document).ready(function () {
            $('#datepickerThree').datepicker({
                format: 'dd-mm-yyyy'
            });
        });
    }

    async postChanges(type, amount, date, comment, catId) {

        try {
            const result = await CustomHttp.request(config.host + "/operations", "POST", {
                "type": type,
                "amount": amount,
                "date": date,
                "comment": comment,
                "category_id": catId
            });
            if (result) {
                sessionStorage.clear();
                window.location.href = "#/income-outcome";
            }
        } catch (e) {
            console.log(e);
        }
    }
}