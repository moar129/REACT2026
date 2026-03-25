import BankAccount from "./BankAccount";

class OverdraftAccount extends BankAccount {
    overdraftInterest: number;
    overdraftLimit: number;
    constructor(firstName: string, lastName: string, rateOfIntrest: number, ssn: number, overdraftInterest: number, overdraftLimit: number) 
    {
        super(firstName, lastName, rateOfIntrest, ssn);
        this.overdraftInterest = overdraftInterest;
        this.overdraftLimit = overdraftLimit;
    }
    checkLimit(): boolean {
        return this.balance >= -this.overdraftLimit;
    }
}

export default OverdraftAccount;