import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class ButtonUtils {

    constructor() {
        this.window = window.location.href.split('/').slice(-1);
        this.allUpdateButtons = [];
        this.deleteConfirm = document.getElementById('deleteConfirm');
        this.allDeleteButtons = [];
        this.processCategoryDelete();
        this.processCategoryUpdate();
    }


    processCategoryDelete() {

        this.allDeleteButtons = Array.from(document.querySelectorAll('button[data-id]'));
        this.allDeleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                this.deleteConfirm.addEventListener('click', () => {
                    this.deleteCategory(categoryId);
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

    processCategoryUpdate() {
        this.allUpdateButtons = Array.from(document.querySelectorAll('a[data-id]'));
        this.allUpdateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                const categoryName = document.querySelector(`[data-titleId="${categoryId}"]`).innerText;
                sessionStorage.setItem('Id', categoryId);
                sessionStorage.setItem('Name', categoryName);
            });
        });
    }
}