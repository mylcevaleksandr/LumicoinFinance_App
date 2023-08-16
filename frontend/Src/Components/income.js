import {Auth} from "../services/auth.js";
import {ButtonUtils} from "../services/button-utils.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Income {
    constructor() {
        Auth.processUnauthorizedResponse();
        this.incomeCards = document.getElementById('incomeCards');
        this.cardCreate = document.getElementById('cardCreate');
        this.allUpdateButtons = [];
        this.deleteConfirm = document.getElementById('deleteConfirm');
        this.allDeleteButtons = [];
        new ButtonUtils();
        this.getCategories();
    }

    getTemplateCard(title, id) {
        let div = document.createElement('div',);
        div.className = 'col';
        div.id = `${id}`;
        div.innerHTML = `
                <div class="card border border-secondary-subtle rounded">
                    <div class="card-body">
                        <h3  class="card-title">${title}</h3>
                        <div>
                            <a href="#/income-update" class="btn btn-primary" data-id="${id}">Редактировать</a>
                            <button class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#exampleModalCenter" data-id="${id}">Удалить
                            </button>
                        </div>
                    </div>
                </div>
        `;
        return div;
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

    processCategoryUpdate() {
        this.allUpdateButtons = Array.from(document.querySelectorAll('a[data-id]'));
        this.allUpdateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
              localStorage.setItem('incomeId',categoryId)
            });
        });
    }

    async deleteCategory(categoryId) {
        console.log(categoryId);
        try {
            const result = await CustomHttp.request(config.host + '/categories/income/' + categoryId, 'DELETE');
            if (result) {
                location.href = '#/income';
            }
        } catch (error) {
            return console.log(error);
        }
    }


    async getCategories() {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income',);
            if (result) {
                this.postLayout(result);
            }
        } catch (error) {
            return console.log(error);
        }
    }

    postLayout(result) {
        if (result) {
            const layout = result.map(item => this.getTemplateCard(item.title, item.id));
            layout.forEach(card => this.incomeCards.insertBefore(card, this.cardCreate));
        }
        this.processCategoryDelete();
        this.processCategoryUpdate()
    }
}