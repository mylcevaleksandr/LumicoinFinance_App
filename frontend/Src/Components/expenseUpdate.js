import {SidebarUtils} from "../services/sidebar-utils.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class ExpenseUpdate {
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
            const result = await CustomHttp.request(config.host + '/categories/expense/' + catId, 'PUT', {
                "title": catName
            });
            if (result) {
                location.href = '#/expense';
            }
        } catch (error) {
            return console.log(error);
        }
    }
}