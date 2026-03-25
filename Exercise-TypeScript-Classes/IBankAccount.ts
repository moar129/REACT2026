interface IBankAccount {
    accountNumber: number;
    balance: number;
    firstName: string;
    lastName: string;
    rateOfIntrest: number;
    ssn: number;

    addIntrest(fee?: number): void;
    getBalance(): number;
    deposit(amount: number): void;
    withdraw(amount: number): void;
}

export default IBankAccount;