import {Form} from "./Components/form.js";
import {Auth} from "./services/auth.js";
import {Start} from "./Components/start.js";
import {Categories} from "./Components/categories.js";
import {IncomeOutcome} from "./Components/incomeOutcome.js";
import {Update} from "./Components/update.js";
import {Create} from "./Components/create.js";
import {IncomeOutcomeUpdate} from "./Components/incomeOutcomeUpdate.js";
import {IncomeOutcomeCreate} from "./Components/incomeOutcomeCreate";

export class Router {
    constructor() {
        this.contentElement = document.getElementById("content");
        this.stylesElement = document.getElementById("Styles");
        this.titleElement = document.getElementById("title");
        // this.profileElement = document.getElementById("profile");
        // this.profileFullNameElement = document.getElementById("profile-full-name");
        this.routes = [
            {
                route: "#/signup",
                title: "Регистрация",
                template: "Templates/signup.html",
                styles: "Styles/form.css",
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: "#/login",
                title: "Вход в систему",
                template: "Templates/login.html",
                styles: "Styles/form.css",
                load: () => {
                    new Form('login');
                }
            },
            {
                route: "#/main",
                title: "Главная",
                template: "Templates/main.html",
                styles: "Styles/main.css",
                load: () => {
                    new Start();
                }
            },
            {
                route: "#/income",
                title: "Доходы",
                template: "Templates/categories.html",
                styles: "Styles/income.css",
                load: () => {
                    new Categories("income");
                }
            },
            {
                route: "#/expense",
                title: "Расходы",
                template: "Templates/categories.html",
                styles: "Styles/payments.css",
                load: () => {
                    new Categories("expense");
                }
            },
            {
                route: "#/income-outcome",
                title: "Доходы и Расходы",
                template: "Templates/income_outcome.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new IncomeOutcome();
                }
            },
            {
                route: "#/income-create",
                title: "Создание Категории Доходов",
                template: "Templates/income_create.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new Create("income");
                }
            },
            {
                route: "#/expense-create",
                title: "Создание Категории Расходов",
                template: "Templates/expense_create.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new Create("expense");
                }
            },
            {
                route: "#/income-update",
                title: "Редактирование Категории Доходов",
                template: "Templates/income_update.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new Update("income");
                }
            },
            {
                route: "#/expense-update",
                title: "Редактирование Категории Расходов",
                template: "Templates/expense_update.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new Update("expense");
                }
            },
            {
                route: "#/income-outcome-update",
                title: "Редактирование Категории Расходов и Доходов",
                template: "Templates/income_outcome_update.html",
                styles: "",
                load: () => {
                    new IncomeOutcomeUpdate();
                }
            },
            {
                route: "#/income-outcome-create",
                title: "Создание Категории Расходов и Доходов",
                template: "Templates/income_outcome_create.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new IncomeOutcomeCreate();
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