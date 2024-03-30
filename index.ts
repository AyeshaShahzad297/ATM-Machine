#! usr/bin/env node
import inquirer from "inquirer";
let myBalance: number = 10000;
let myPin: number = 1234;
let firstPrompt = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Please enter your pin number:"
    }
]);
if (firstPrompt.pin === myPin) {
    let options = await inquirer.prompt([
        {
            name: "choices",
            type: "list",
            message: "Please select one of these options: ",
            choices: ["Withdrawal", "Balance Inquiry", "Transfer Money", "Deposit"]
        }
    ]);
    if (options.choices === "Withdrawal") {
        let withdrawalAmount = await inquirer.prompt([
            {
                name: "amount",
                type: "list",
                message: "Select one of the following options:",
                choices: ["Fast Cash", "Other Amount"]
            }
        ])
        if (withdrawalAmount.amount === "Fast Cash") {
            let fastCashAmount = await inquirer.prompt([
                {
                    name: "cash",
                    type: "list",
                    message: "Select an amount to withdraw: ",
                    choices: [1000, 2000, 5000, 10000]
                }
            ]);
            let newBalance = myBalance -= fastCashAmount.cash;
            console.log(`Operation Successful! Your remaining balance is ${newBalance}$.`);
        } else {
            let withdrawalAmount = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount you want withdraw: "
                }
            ]);
            if (withdrawalAmount.amount > myBalance) {
                console.log("Operation Failed! Your withdrawal amount exceeds your current balance.");
            } else {
                let remainingBalance = myBalance -= withdrawalAmount.amount;
                console.log(`Operation Successful! Your remaining balance is ${remainingBalance}$.`);
            }
        }
    } else if (options.choices === "Balance Inquiry") {
        console.log(`Your current balance is ${myBalance}$`);
    } else if (options.choices === "Transfer Money") {
        let transferMoney = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Please enter 14 digits account number you want to send money to:"
            },
            {
                name: "money",
                type: "number",
                message: "Enter the amount you want to send:"
            }
        ]);
        if ((transferMoney.accountNumber).toString().length === 14 && transferMoney.money < myBalance) {
            console.log(`Operation Successful! You have sent ${transferMoney.money}$ to account number: ${transferMoney.accountNumber}.\nYour remaining balance is ${myBalance -= transferMoney.money}$.`);
        } else if (transferMoney.money > myBalance) {
            console.log("Operation Failed! Insufficient Balance.");
        } else {
            console.log("Operation Failed! You entered incorrect account number.");
        }
    } else {
        let depositAmount = await inquirer.prompt([
            {
                name: "deposit",
                type: "number",
                message: "Please enter the amount you want to deposit:"
            }
        ]);
        let addedBalance = myBalance += depositAmount.deposit;
        console.log(`Operation Successful! Your new balance is ${addedBalance}$.`)
    }
} else {
    console.log("Incorrect pin number.");
}