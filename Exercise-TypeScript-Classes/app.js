import OverdraftAccount from "./OverdraftAccount.js";
import LoanAccount from "./LoanAccount.js";
// Create an Overdraft account
const overdraftAcc = new OverdraftAccount("John", // firstName
"Doe", // lastName
5, // rateOfIntrest (as 0.05 for 5%)
123456789, // ssn
10, // overdraftInterest
500 // overdraftLimit
);
// Test the Overdraft account
console.log("Overdraft Account:");
console.log(`Balance: ${overdraftAcc.balance}`);
console.log(`Overdraft Limit: ${overdraftAcc.overdraftLimit}`);
console.log(`Overdraft Interest: ${overdraftAcc.overdraftInterest}`);
console.log("\n=============================================================\n");
console.log("\nAttempting to withdraw $1200...");
if (overdraftAcc.checkLimit()) {
    overdraftAcc.withdraw(1200);
    console.log(`Withdrawal successful. New balance: ${overdraftAcc.balance}`);
}
console.log("\n=============================================================\n");
// Create a Loan account
const loanAccount = new LoanAccount("Jane", "Smith", 7, // rateOfIntrest (0.07)
987654321, // ssn
10000 // principal
);
// Test the Loan account
console.log("\nLoan Account:");
console.log(`Balance: ${loanAccount.balance}`);
console.log(`Principal: ${loanAccount.principal}`);
console.log("\n=============================================================\n");
console.log("\nAdding interest...");
loanAccount.addIntrest(1200); // Adding interest to the loan account 
console.log(`New balance after adding interest: ${loanAccount.balance}`);
console.log("\n=============================================================\n");
