class BankAccount {
    static nextAccountNumber = 1;
    accountNumber;
    balance;
    firstName;
    lastName;
    rateOfIntrest;
    ssn;
    constructor(firstName, lastName, rateOfIntrest, ssn) {
        this.accountNumber = BankAccount.nextAccountNumber++;
        this.balance = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rateOfIntrest = rateOfIntrest;
        this.ssn = ssn;
    }
    addIntrest(fee) {
        const interest = this.balance * this.rateOfIntrest;
        if (fee) {
            this.balance -= fee;
        }
        this.balance += interest;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        this.balance -= amount;
    }
    getBalance() {
        return this.balance;
    }
}
export default BankAccount;
