import {SidebarUtils} from "../services/sidebar-utils";

export class IncomeOutcomeUpdate {
    constructor() {
        this.operationId=sessionStorage.getItem('operationId')
        new SidebarUtils();
        this.getOperation()
    }

    async  getOperation(){
        console.log(this.operationId);
    }
}

