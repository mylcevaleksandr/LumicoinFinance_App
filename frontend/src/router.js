import {Form} from "./components/form.js";
import {Auth} from "./services/auth.js";
import {Start} from "./components/start.js";
import {Categories} from "./components/categories.js";
import {IncomeOutcome} from "./components/incomeOutcome.js";
import {Update} from "./components/update.js";
import {Create} from "./components/create.js";
import {IncomeOutcomeOperations} from "./components/incomeOutcomeOperations.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById("content");
        this.stylesElement = document.getElementById("styles");
        this.titleElement = document.getElementById("title");
        this.routes = [
            {
                route: "#/signup",
                title: "Регистрация",
                template: "templates/signup.html",
                styles: "",
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: "#/login",
                title: "Вход в систему",
                template: "templates/login.html",
                styles: "",
                load: () => {
                    new Form('login');
                }
            },
            {
                route: "#/main",
                title: "Главная",
                template: "templates/main.html",
                styles: "",
                load: () => {
                    new Start();
                }
            },
            {
                route: "#/income",
                title: "Доходы",
                template: "templates/categories.html",
                styles: "",
                load: () => {
                    new Categories("income");
                }
            },
            {
                route: "#/expense",
                title: "Расходы",
                template: "templates/categories.html",
                styles: "",
                load: () => {
                    new Categories("expense");
                }
            },
            {
                route: "#/income-outcome",
                title: "Доходы и Расходы",
                template: "templates/income_outcome.html",
                styles: "",
                load: () => {
                    new IncomeOutcome();
                }
            },
            {
                route: "#/income-create",
                title: "Создание Категории Доходов",
                template: "templates/exin_create.html",
                styles: "",
                load: () => {
                    new Create("income");
                }
            },
            {
                route: "#/expense-create",
                title: "Создание Категории Расходов",
                template: "templates/exin_create.html",
                styles: "",
                load: () => {
                    new Create("expense");
                }
            },
            {
                route: "#/income-update",
                title: "Редактирование Категории Доходов",
                template: "templates/exin_update.html",
                styles: "",
                load: () => {
                    new Update("income");
                }
            },
            {
                route: "#/expense-update",
                title: "Редактирование Категории Расходов",
                template: "templates/exin_update.html",
                styles: "",
                load: () => {
                    new Update("expense");
                }
            },
            {
                route: "#/income-outcome-update",
                title: "Редактирование Категории Расходов и Доходов",
                template: "templates/income_outcome_update.html",
                styles: "",
                load: () => {
                    new IncomeOutcomeOperations('update');
                }
            },
            {
                route: "#/income-outcome-create",
                title: "Создание Категории Расходов и Доходов",
                template: "templates/income_outcome_create.html",
                styles: "",
                load: () => {
                    new IncomeOutcomeOperations('create');
                }
            },
        ];
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = "#/login";
            return;
        }
        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = "#/login";
            return;
        }

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute("href", newRoute.styles);
        this.titleElement.innerText = newRoute.title;
        newRoute.load();
    }
}