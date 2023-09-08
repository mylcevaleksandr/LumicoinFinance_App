import {Form} from "./Components/form.js";
import {Auth} from "./services/auth.js";
import {Start} from "./Components/start.js";
import {Categories} from "./Components/categories.js";
import {IncomeOutcome} from "./Components/incomeOutcome.js";
import {Update} from "./Components/update.js";
import {Create} from "./Components/create.js";
import {IncomeOutcomeOperations} from "./Components/incomeOutcomeOperations";

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
                styles: "",
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: "#/login",
                title: "Вход в систему",
                template: "Templates/login.html",
                styles: "",
                load: () => {
                    new Form('login');
                }
            },
            {
                route: "#/main",
                title: "Главная",
                template: "Templates/main.html",
                styles: "",
                load: () => {
                    new Start();
                }
            },
            {
                route: "#/income",
                title: "Доходы",
                template: "Templates/categories.html",
                styles: "",
                load: () => {
                    new Categories("income");
                }
            },
            {
                route: "#/expense",
                title: "Расходы",
                template: "Templates/categories.html",
                styles: "",
                load: () => {
                    new Categories("expense");
                }
            },
            {
                route: "#/income-outcome",
                title: "Доходы и Расходы",
                template: "Templates/income_outcome.html",
                styles: "",
                load: () => {
                    new IncomeOutcome();
                }
            },
            {
                route: "#/income-create",
                title: "Создание Категории Доходов",
                template: "Templates/exin_create.html",
                styles: "",
                load: () => {
                    new Create("income");
                }
            },
            {
                route: "#/expense-create",
                title: "Создание Категории Расходов",
                template: "Templates/exin_create.html",
                styles: "",
                load: () => {
                    new Create("expense");
                }
            },
            {
                route: "#/income-update",
                title: "Редактирование Категории Доходов",
                template: "Templates/exin_update.html",
                styles: "",
                load: () => {
                    new Update("income");
                }
            },
            {
                route: "#/expense-update",
                title: "Редактирование Категории Расходов",
                template: "Templates/exin_update.html",
                styles: "",
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
                    new IncomeOutcomeOperations('update');
                }
            },
            {
                route: "#/income-outcome-create",
                title: "Создание Категории Расходов и Доходов",
                template: "Templates/income_outcome_create.html",
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