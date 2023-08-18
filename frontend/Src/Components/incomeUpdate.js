import {SidebarUtils} from "../services/sidebar-utils.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeUpdate {
    constructor() {
        this.categoryId = sessionStorage.getItem('Id');
        this.currentCategoryName = sessionStorage.getItem('Name');
        this.newCategoryName = document.getElementById('categoryName');
        this.btnUpdateCategory = document.getElementById('updateCategory');
        new SidebarUtils();
        this.processCategoryUpdate();
    }


    processCategoryUpdate() {
        this.newCategoryName.placeholder = this.currentCategoryName;
        this.btnUpdateCategory.addEventListener('click', () => {
            this.updateCategoryName(this.newCategoryName.value, this.categoryId);
        });
    }

    async updateCategoryName(catName, catId) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income/' + catId, 'PUT', {
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