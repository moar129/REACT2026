"use strict";
class VATCalculator {
    calculate(amount) {
        return amount * 1.25;
    }
}
const vat = new VATCalculator();
console.log(vat.calculate(100)); // Output: 125
