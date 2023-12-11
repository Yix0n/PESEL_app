import { randomInt } from "crypto";
import askQuestion from ".";

export default class {
    readonly weight = [1,3,7,9,1,3,7,9,1,3]

    //konstruktor jest wywoływany w indexie w linicjce 27 - new generate(date, sex);
    constructor(date:string, gender: string) {
        let [day, month,year] = date.split(".")

        let monthNumber = this.getCentury(Number(year), Number(month))
        
        this.generatePesel(gender.toUpperCase(), Number(year) % 100, Number(monthNumber), Number(day))
    }

    private generatePesel(sex:string, year:number, month:number, day:number) {
        let serial = randomInt(5000) * 2 + (sex.toUpperCase() === "M" ? 1:0)
        let pesel:string = lz(String(year), 2) + lz(String(month), 2) + lz(String(day), 2) + lz(String(serial), 4);
        let controlSum = 0;

        for(let i = 0; i < pesel.length; i++){
            controlSum += Number(pesel[i]) * this.weight[i];
        }
        
        controlSum %= 10;
        controlSum = (10 - controlSum) % 10;
        console.log(`Wygenerowany numer ${pesel}${controlSum}`);

    }

    private getCentury(year:number, month:number){
        let century = Math.floor(year /100);
        switch(century) {
            case 18 :{
                // 1800-1899
                month += 80
                break;
            }
            case 19 :{
                // 1900-1999
                // nic
                break;
            }
            case 20 :{
                // 200-2199
                month += 20
                break;
            }
            case 21 :{
                // 2200-2299
                month += 40
                break;
            }
            case 22 :{
                // 2300-2399
                month += 60
                break;
            }
        }
        return month;
    }
}

function lz(text: string, length:number){
    return String(text).padStart(length,"0");
}