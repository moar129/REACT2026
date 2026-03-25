import BankAccount from "./BankAccount";

class LoanAccount extends BankAccount {
    principal: number;
    constructor(firstName: string, lastName: string, rateOfIntrest: number, ssn: number, principal: number)
    {
        super(firstName, lastName, rateOfIntrest, ssn);
        this.principal = principal;
    }
}

export default LoanAccount;