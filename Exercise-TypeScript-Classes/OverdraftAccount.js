import BankAccount from "./BankAccount.js";
class OverdraftAccount extends BankAccount {
    overdraftInterest;
    overdraftLimit;
    constructor(firstName, lastName, rateOfIntrest, ssn, overdraftInterest, overdraftLimit) {
        super(firstName, lastName, rateOfIntrest, ssn);
        this.overdraftInterest = overdraftInterest;
        this.overdraftLimit = overdraftLimit;
    }
    checkLimit() {
        return this.balance >= -this.overdraftLimit;
    }
}
export default OverdraftAccount;
