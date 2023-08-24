import {Auth} from "../services/auth.js";
import {SidebarUtils} from "../services/sidebar-utils.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {ButtonUtils} from "../services/button-utils.js";

export class Income {
    constructor() {
        this.incomeCards = document.getElementById('incomeCards');
        this.cardCreate = document.getElementById('cardCreate');
        Auth.processUnauthorizedResponse();
        new SidebarUtils();
        this.getCategories();
    }

    getTemplateCard(title, id) {
        let div = document.createElement('div',);
        div.className = 'col';
        div.id = `${id}`;
        div.innerHTML = `
                <div class="card border border-secondary-subtle rounded">
                    <div class="card-body">
                        <h3 data-titleId="${id}"  class="card-title">${title}</h3>
                        <div>
                            <a href="#/income-update" class="btn btn-primary" data-id="${id}">Редактировать</a>
                            <button class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#modalCenter" data-id="${id}">Удалить
                            </button>
                        </div>
                    </div>
                </div>
        `;
        return div;
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
            new ButtonUtils();
        }
    }
}