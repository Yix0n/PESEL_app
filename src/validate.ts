export default function (pesel:string):IValidateRes {
    if(pesel.length !== 11) {
        return {
            type: EvalidType.error,
            content: "Niepoprawna długość PESEL"
        }
    }
    if(!validateControlSum(pesel, Number(pesel[10]))) {
        return {
            type: EvalidType.error,
            content: "Nieprawidłowy pesel"
        }
    }
    let data = getDataFromPesel(pesel);

    return {
        type: EvalidType.done,
        content: `${data.day}.${Number(data.century)%20}.${getYearFromCentury(Number(data.century), Number(data.year))} || Płeć : ${getGender(Number(data.sex))}`
    }
    
}

function getDataFromPesel(pesel: string): Idata {
    return {
        year: `${pesel[0]}${pesel[1]}`,
        century: `${pesel[2]}${pesel[3]}`,
        day: `${pesel[4]}${pesel[5]}`,
        sex: Number(pesel[9]),
        control: Number(pesel[10])
    }
}

function validateControlSum(pesel: string, constrolSumPesel: number) {
    let constrolSum = 0;

    const weight = [1,3,7,9,1,3,7,9,1,3]

    for(let i = 0; i < pesel.length - 1 ; i++){
        constrolSum += weight[i] * Number(pesel[i])
    }
    constrolSum %= 10;
    constrolSum = (10 - constrolSum) % 10
    console.log(constrolSum, constrolSumPesel)
    return constrolSum == constrolSumPesel;
}

function getGender (sex: number):string {
    return sex % 2 == 0 ? "Samica" : "Samiec";
}

function getYearFromCentury(month:number, year: number) {
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

interface Idata {
    year: string,
    century: string,
    day: string,
    sex: number,
    control: number
}

interface IValidateRes {
    type: EvalidType,
    content: string
}

enum EvalidType {
    error= "ERROR",
    done= "DONE"
}