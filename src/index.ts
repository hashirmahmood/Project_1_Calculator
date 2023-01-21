import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import chalk from "chalk";

const sleep = async () => {
  return new Promise((res) => {
    setTimeout(res, 3000);
  });
};
const displayAnimation = async () => {
  const x = chalkAnimation.rainbow("Welcome to Hashir's CLI calculator");
  await sleep();
  x.stop();
};

// validate function
const validate = (input: number) => {
  if (isNaN(input) === true) {
    return "Invalid input, press UP arrow key and enter number again ";
  } else {
    return true;
  }
};

const runAgain = async (condition: boolean) => {
  const choice = await inquirer.prompt([
    {
      name: "x",
      message: chalk.cyanBright("Do you want to use calculator again?"),
      type: "list",
      choices: ["Yes", "No"],
    },
  ]);
  if (choice.x === "Yes") {
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

const takeInput = async () => {
  await displayAnimation();
  let condition: boolean = true;
  do {
    console.clear();
    const inputs = await inquirer.prompt([
      {
        name: "num1",
        message: chalk.cyanBright("Enter your 1st number:"),
        type: "number",
        validate: validate,
      },
      {
        name: "num2",
        message: chalk.cyanBright("Enter your 2nd number"),
        type: "number",
        validate: validate,
      },
      {
        name: "Op",
        message: chalk.cyan("Select operation"),
        type: "list",
        choices: ["+", "-", "x", "/"],
      },
    ]);
    switch (inputs.Op) {
      case "+":
        console.log(chalk.green(`Result: ${inputs.num1 + inputs.num2}`));
        break;
      case "-":
        console.log(chalk.green(`Result: ${inputs.num1 - inputs.num2}`));
        break;
      case "x":
        console.log(chalk.green(`Result: ${inputs.num1 * inputs.num2}`));
        break;
      case "/":
        console.log(chalk.green(`Result: ${inputs.num1 / inputs.num2}`));
        break;
      default:
        break;
    }
    condition = await runAgain(condition);
  } while (condition === true);
};
await takeInput();
