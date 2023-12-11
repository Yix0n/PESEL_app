import askQuestion from ".";

export default class {

    readonly weight = [1,3,7,9,1,3,7,9,1,3]

    constructor(pesel: string){
        if(pesel.length !== 11) {
            console.log("Niepoprawna długość PESEL");
            return;
        }
        if(!this.validateControlSum(pesel, Number(pesel[10]))) { console.log("Nieprawidłowy Pesel"); return }
        let data = this.getDataFromPesel(pesel)

        console.log(`Data urodzenia: ${data.day}.${Number(data.century)%20}.${this.getYearFromCentury(Number(data.century), Number(data.year))} || Płeć : ${this.getGender(Number(data.sex))}`)
    }

    public getDataFromPesel(pesel: string): Idata {
        return {
            year: `${pesel[0]}${pesel[1]}`,
            century: `${pesel[2]}${pesel[3]}`,
            day: `${pesel[4]}${pesel[5]}`,
            sex: Number(pesel[9]),
            control: Number(pesel[10])
        }
    }

    private validateControlSum (pesel: string, controlSumPesel: number): boolean {
        let constrolSum = 0;

        for(let i = 0; i < pesel.length - 1 ; i++){
            constrolSum += this.weight[i] * Number(pesel[i])
        }
        constrolSum %= 10;
        constrolSum = (10 - constrolSum) % 10
        console.log(constrolSum, controlSumPesel)
        return constrolSum == controlSumPesel;
    }

    private getGender(sex:number): string {
        return sex % 2 == 0 ? "Samica" : "Samiec";
    }

    private getYearFromCentury(month:number, year: number) {
        let century = Math.floor(month / 20);
        switch(century) {
            case 0: {
                //1900-1999
                year += 1900
                break;
            } 
            case 1: {
                //2000-2099
                year += 2000
                break;
            }
            case 2: {
                //2100-2199
                year += 2100
                break;
            } 
            case 3: {
                //2200-2299
                year += 2200
                break;
            }
            case 4: {
                //1800-1899
                year += 1800
                break;
            }
            default: {
                console.log("Nieprawidłowe dane")
                break
            }
        }
        return year;
    }
}


interface Idata {
    year: string,
    century: string,
    day: string,
    sex: number,
    control: number
}