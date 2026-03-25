import IBankAccount from "./BankAccount";

abstract class BankAccount implements IBankAccount {
    static nextAccountNumber: number = 1;
    accountNumber: number;
    balance: number;
    firstName: string;
    lastName: string;
    rateOfIntrest: number;
    ssn: number;

    constructor(firstName: string, lastName: string, rateOfIntrest: number, ssn: number) {
        this.accountNumber = BankAccount.nextAccountNumber++;
        this.balance = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rateOfIntrest = rateOfIntrest;
        this.ssn = ssn;
    }

    addIntrest(fee?: number): void {
        const interest = this.balance * this.rateOfIntrest;
        if (fee) {
            this.balance -= fee;
        }
        this.balance += interest;
    }
    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        this.balance -= amount;
    }
    getBalance(): number {
        return this.balance;
    }
}

export default BankAccount;