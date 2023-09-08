import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class ButtonUtils {

    constructor() {
        this.window = window.location.href.split('/').slice(-1);
        this.allUpdateButtons = [];
        this.categoryId = null;
        this.categoryName = null;

    }


    processCategoryDelete() {
        const that = this;
        const allDeleteButtons = Array.from(document.querySelectorAll('button[data-id]'));
        allDeleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                const categoryName = document.querySelector(`[data-titleId="${categoryId}"]`).innerText;
                const deleteConfirm = document.getElementById('deleteConfirm');
                deleteConfirm.addEventListener('click', () => {
                    that.allCategories(categoryName);
                    that.deleteCategory(categoryId);
                });
            });
        });
    }

    async deleteCategory(categoryId) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/' + this.window + "/" + categoryId, 'DELETE');
            if (result) {
                location.href = "#/" + this.window;
            }
        } catch (error) {
            return console.log(error);
        }
    }

    async allDelete(categoryId) {
        try {
            const result = await CustomHttp.request(config.host + '/operations/' + categoryId, 'DELETE');
            if (result) {
            }
        } catch (error) {
            return console.log(error);
        }
    }

    processCategoryUpdate() {
        this.allUpdateButtons = Array.from(document.querySelectorAll('button[data-action]'));
        this.allUpdateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                const categoryName = document.querySelector(`[data-titleId="${categoryId}"]`).innerText;
                sessionStorage.setItem('updateId', categoryId);
                sessionStorage.setItem('updateName', categoryName);
                location.href = "#/" + this.window + "-update";
            });
        });
    }

    async allCategories(categoryName) {
        try {
            const result = await CustomHttp.request(config.host + '/operations?period=all');
            if (result) {
                this.trashCategories(categoryName, result);
            }
        } catch (error) {
            return console.log(error);
        }
    }

    trashCategories(name, all) {
        all.forEach(cat => {
            if (cat.category === name) {
                console.log(cat);
                this.allDelete(cat.id);
            }
        });
    }
}