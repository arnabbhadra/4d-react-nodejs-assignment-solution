import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
export async function readFile(filePath) {
    const isExist = fs.existsSync(filePath);
    if (!isExist) {
        throw Error("File does not exists")
    }
    const content = fs.readFileSync(filePath);
    return content
}
// Function to read CSV and convert to Array
const convertFromCSV = function (filePath) {
    return new Promise((resolve, reject) => {
        let results = []
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => { resolve(results) })
            .on('error', (error) => { reject(error) });
    })
}
export { convertFromCSV }