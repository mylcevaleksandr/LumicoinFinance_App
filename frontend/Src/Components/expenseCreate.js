import {SidebarUtils} from "../services/sidebar-utils.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class ExpenseCreate {
    constructor() {
        this.categoryName = document.getElementById('createCategoryName');
        this.btnCreateCategory = document.getElementById('createCategory');
        new SidebarUtils();
        this.processCategoryCreate();
    }

    processCategoryCreate() {
        this.btnCreateCategory.addEventListener('click', () => {
            this.createCategoryName(this.categoryName.value);
        });
    }

    async createCategoryName(catName) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/expense', 'POST', {
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