import {Auth} from "../services/auth.js";
import {ButtonUtils} from "../services/button-utils.js";
import {Chart} from "chart.js/auto";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Main {
    constructor() {
        this.incomeChart = document.getElementById('incomeChart');
        this.paymentsChart = document.getElementById('paymentsChart');
        this.today = document.getElementById('today');
        this.week = document.getElementById('week');
        this.month = document.getElementById('month');
        this.year = document.getElementById('year');
        this.all = document.getElementById('all');
        Auth.processUnauthorizedResponse();
        new ButtonUtils();
        // this.createExpenseChart();
        this.processDateInterval();
    }


    processDateInterval() {
        const buttonsArray=  [this.today, this.week, this.month, this.year, this.all]
        // buttonsArray.forEach()
        buttonsArray.forEach((button) => {
            button.addEventListener('click', () => {
                buttonsArray.forEach((btnClassList)=>{
                    console.log(btnClassList);
                    btnClassList.classList.remove('active')
                    console.log(button);
                })
                button.classList.add('active');
                this.getCategories(button.id);
            });
        });
    }

    async getCategories(date) {
        try {
            const result = await CustomHttp.request(config.host + '/operations?period=' + date.toString(),);
            if (result) {
                this.filterData(result);
                // return result
            }
        } catch (error) {
            return console.log(error);
        }
    }

    filterData(data) {
        const incomeAmount = [];
        const incomeLabels = [];
        const expenseAmount = [];
        const expenseLabels = [];

        console.log(data);
        const income = data.filter(item => item.type.includes('income'));
        const expense = data.filter(item => item.type.includes('expense'));
        income.forEach((item => {
            incomeAmount.push(item.amount);
            incomeLabels.push(item.comment);
        }));
        expense.forEach((item => {
            expenseAmount.push(item.amount);
            expenseLabels.push(item.comment);

        }));
        this.createIncomeChart(incomeAmount, incomeLabels);
        this.createExpenseChart(expenseAmount, expenseLabels);

    }

    createIncomeChart(incomeAmount, incomeLabels) {
        let chartStatus = Chart.getChart('incomeChart');
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const pieChart = new Chart(this.incomeChart, {
            type: 'pie', // Тип диаграммы
            data: {
                labels: incomeLabels,
                datasets: [{
                    data: incomeAmount,
                    // backgroundColor: ['red', 'green', 'blue'], // Цвета для секторов
                }],
            },
        });
    }

    createExpenseChart(expenseAmount, expenseLabels) {
        let chartStatus = Chart.getChart('paymentsChart');
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const pieChart = new Chart(this.paymentsChart, {
            type: 'pie', // Тип диаграммы
            data: {
                labels: expenseLabels, // Метки для секторов
                datasets: [{
                    data: expenseAmount, // Данные для секторов
                    // backgroundColor: ['red', 'green', 'blue'], // Цвета для секторов
                }],
            },
        });
    }


}