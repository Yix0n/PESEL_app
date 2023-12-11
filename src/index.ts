import { createInterface } from 'readline';
import negro from "./easterEggs"
import validate from './validate';
import generate from './generate';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

askQuestion()

function askQuestion(){
    rl.question("Co chcesz dziś zrobić?\n1. Validate\n2. Generate\n >", async (res) => {
        switch(res.toLocaleLowerCase()) {
            case "1" : {
                rl.question("Jaki masz PESEL?\n> ", async (pesel) => {
                    negro(pesel)
                    new validate(pesel)
                })
                break;
            }
            case "2" : {
                rl.question("Podaj date urodzenia (DD.MM.YYYY)\n> ", async (date:string) => {
                    rl.question("Podaj swoją płeć (M|K)", async (sex:string) => {
                        negro(date)
                        new generate(date, sex);
                    })
                })
                break;
            }
            default : {
                console.log("Niepoprawny input");
                askQuestion();
                break;
            }
        }
    })
}

export default askQuestion;