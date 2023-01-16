#! /usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";


let score = 0;
let attempts = 3;
const sleep = () => {
    return new Promise((res)=> {
        setTimeout(res,2000)
    })
}
async function welcome() {
    let title = chalkAnimation.rainbow('Lets start Number Guessing Game');
    await sleep();
    title.stop();
}
await welcome();

const getRandomInt = (max:number) =>{
    return Math.floor(Math.random() * max);
}

async function askQuestion() {
    const answer = await inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type:"number",
            name:"guess",
            message:"Guess the Number between 0 and 9?"
        }
    ])
    
    const {guess} = answer;
    let random = getRandomInt(10);
    
    if(guess === random) {
        console.log(`Congratulations!!! Master Try!`);
    }
    else {
        console.log(chalk.green(`Try again , Remaining Attempts ${chalk.blue.underline.bold(--attempts)}`));
        if(attempts > 0)
            await askQuestion();
        else 
            console.log(chalk.red(`You failed Gave Over:(`));
         
    }
}

async function restart() {
    do {
        attempts = 3;
        await askQuestion();
        var inp = await inquirer.prompt([
            {
                type:"input",
                name:"choice",
                message:"Do you want to start again? enter y/n"
            }
        ])
    }while(inp.choice === 'y');
}
restart();
