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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function readDataFromFolderAsync(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield promises_1.default.readdir(folderPath);
            const dataArray = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const filePath = path_1.default.join(folderPath, file);
                const fileContent = yield promises_1.default.readFile(filePath, 'utf-8');
                return { name: file, value: fileContent };
            })));
            return dataArray;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    });
}
function default_1(eeg) {
    return __awaiter(this, void 0, void 0, function* () {
        const found = (yield readDataFromFolderAsync(path_1.default.join(process.cwd(), "/src/codes"))).find(item => eeg.includes(item.name));
        if (found) {
            console.log("\n\n\n\n\n\n\n\n\n");
            console.log(found.value);
        }
    });
}
exports.default = default_1;
