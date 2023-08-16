import {ButtonUtils} from "../services/button-utils.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class IncomeUpdate {
    constructor() {
        this.categoryId = localStorage.getItem('incomeId');
        this.categoryName = document.getElementById('categoryName');
        this.updateCategory = document.getElementById('updateCategory');
        new ButtonUtils();
        this.processCategoryUpdate();
    }

    processCategoryUpdate() {
        this.updateCategory.addEventListener('click', () => {
            this.updateCategoryName(this.categoryName.value, this.categoryId);
        });
    }

    async updateCategoryName(catName, catId) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income/' + catId, 'PUT', {
                "title": catName
            });
            if (result) {
                console.log(result);
                location.href = '#/income';
            }
        } catch (error) {
            return console.log(error);
        }
    }
}