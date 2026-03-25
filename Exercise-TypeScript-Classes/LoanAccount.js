import BankAccount from "./BankAccount.js";
class LoanAccount extends BankAccount {
    principal;
    constructor(firstName, lastName, rateOfIntrest, ssn, principal) {
        super(firstName, lastName, rateOfIntrest, ssn);
        this.principal = principal;
    }
}
export default LoanAccount;
