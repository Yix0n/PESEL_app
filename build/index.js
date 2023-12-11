"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const easterEggs_1 = __importDefault(require("./easterEggs"));
const validate_1 = __importDefault(require("./validate"));
const generate_1 = __importDefault(require("./generate"));
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
askQuestion();
function askQuestion() {
    rl.question("Co chcesz dziś zrobić?\n1. Validate\n2. Generate\n >", (res) => __awaiter(this, void 0, void 0, function* () {
        switch (res.toLocaleLowerCase()) {
            case "1": {
                rl.question("Jaki masz PESEL?\n> ", (pesel) => __awaiter(this, void 0, void 0, function* () {
                    (0, easterEggs_1.default)(pesel);
                    new validate_1.default(pesel);
                }));
                break;
            }
            case "2": {
                rl.question("Podaj date urodzenia (DD.MM.YYYY)\n> ", (date) => __awaiter(this, void 0, void 0, function* () {
                    rl.question("Podaj swoją płeć (M|K)", (sex) => __awaiter(this, void 0, void 0, function* () {
                        (0, easterEggs_1.default)(date);
                        new generate_1.default(date, sex);
                    }));
                }));
                break;
            }
            default: {
                console.log("Niepoprawny input");
                askQuestion();
                break;
            }
        }
    }));
}
exports.default = askQuestion;
