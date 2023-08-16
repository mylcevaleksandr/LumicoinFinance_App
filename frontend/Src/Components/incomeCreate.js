import {ButtonUtils} from "../services/button-utils.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeCreate {
    constructor() {
        this.categoryName = document.getElementById('createCategoryName');
        this.createCategory = document.getElementById('createCategory');
        new ButtonUtils();
        this.processCategoryCreate();
    }

    processCategoryCreate() {
        this.createCategory.addEventListener('click', () => {
            this.createCategoryName(this.categoryName.value);
        });
    }

    async createCategoryName(catName) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income', 'POST', {
                "title": catName
            });
            if (result) {
                location.href = '#/income';
            }
        } catch (error) {
            return console.log(error);
        }
    }
}