import {Form} from "./Components/form.js";
import {Auth} from "./services/auth.js";
import {Main} from "./Components/main.js";
import {Income} from "./Components/income.js";
import {Expense} from "./Components/expense.js";
import {IncomeOutcome} from "./Components/incomeOutcome.js";
import {IncomeCreate} from "./Components/incomeCreate.js";
import {IncomeUpdate} from "./Components/incomeUpdate.js";
import {ExpenseUpdate} from "./Components/expenseUpdate.js";
import {ExpenseCreate} from "./Components/expenseCreate.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById("content");
        this.stylesElement = document.getElementById("Styles");
        this.titleElement = document.getElementById("title");
        this.profileElement = document.getElementById("profile");
        this.profileFullNameElement = document.getElementById("profile-full-name");
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
                    new Main();
                }
            },
            {
                route: "#/income",
                title: "Доходы",
                template: "Templates/income.html",
                styles: "Styles/income.css",
                load: () => {
                    new Income();
                }
            },
            {
                route: "#/expense",
                title: "Расходы",
                template: "Templates/expense.html",
                styles: "Styles/payments.css",
                load: () => {
                    new Expense();
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
                    new IncomeCreate();
                }
            },
            {
                route: "#/income-update",
                title: "Редактирование Категории Доходов",
                template: "Templates/income_update.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new IncomeUpdate();
                }
            },
            {
                route: "#/expense-create",
                title: "Создание Категории Расходов",
                template: "Templates/expense_create.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new ExpenseCreate();
                }
            },
            {
                route: "#/expense-update",
                title: "Редактирование Категории Расходов",
                template: "Templates/expense_update.html",
                styles: "Styles/correct.min.Styles",
                load: () => {
                    new ExpenseUpdate();
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

        // const userInfo = Auth.getUserInfo();
        // const accessToken = localStorage.getItem(Auth.accessTokenKey);
        // if (userInfo && accessToken) {
        //     this.profileElement.style.display = 'flex';
        //     this.profileFullNameElement.innerText = userInfo.fullName;
        // } else {
        //     this.profileElement.style.display = 'none';
        // }

        newRoute.load();
    }
}