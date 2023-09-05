import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class ButtonUtils {

    constructor() {
        this.window = window.location.href.split('/').slice(-1);
        this.allUpdateButtons = [];
        this.deleteConfirm = document.getElementById('deleteConfirm');
    }


    processCategoryDelete() {
        this.allDeleteButtons = Array.from(document.querySelectorAll('button[data-id]'));
        this.allDeleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                const categoryName = document.querySelector(`[data-titleId="${categoryId}"]`).innerText;
                this.deleteConfirm.addEventListener('click', () => {
                    sessionStorage.setItem('Id', categoryId);
                    sessionStorage.setItem('deleteName', categoryName);
                    sessionStorage.setItem('deleteType', this.window.toString());
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
}