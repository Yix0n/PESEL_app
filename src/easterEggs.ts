import fs from "fs/promises";
import path from "path";

async function readDataFromFolderAsync(folderPath:string) {
    try {
        const files = await fs.readdir(folderPath);

        const dataArray:IEaster[] = await Promise.all(files.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8')
            return { name:file, value:fileContent }
        }));

        return dataArray;
    } catch (err) {
        console.error(err)
        return []
    }
}

export default async function(eeg:string) {
    const found = (await readDataFromFolderAsync(path.join(process.cwd(), "/src/codes"))).find(item => eeg.includes(item.name))

    if(found) {
        console.log("\n\n\n\n\n\n\n\n\n")
        console.log(found.value)
    }
}

interface IEaster {
    name: string,
    value: string
}