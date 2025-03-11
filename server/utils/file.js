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
// function to read txt file and convert it into Array
const convertFromTxt = function (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }

            //read the file and split into text
            let lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

            // array to store the extracted information (initialized with empty array)
            const results = [];
            let result = null;
            const lineCount = lines.length;
            // Loop over each line ignoring the header
            for( let index = 1; index<lineCount; index++){
                const line = lines[index];
                // extract the information
                const parts = line.split(/\s+/).filter(part => part !== '');
                if (parts.length >= 11) {
                    // Extract the employee information
                    const firstName = parts[0];
                    const lastName = parts[1];
                    const employeeID = parts[2];
                    const phoneNumber = parts[3] + ' ' + parts[4] + parts[5];
                    const salary = parts[6];
                    const startDate = parts[7];
                    const supervisorEmail = parts[8];
                    const codeCenter = parts[9];
                    const projectCode = parts[10];

                    // Create an employee object and push it to the array
                    const item = {
                        'First Name': firstName,
                        'Last Name': lastName,
                        'Employee ID': employeeID,
                        'Phone Number': phoneNumber,
                        'Salary': salary,
                        'Start Date': startDate,
                        'Supervisor Email': supervisorEmail,
                        'Cost Center': codeCenter,
                        'Project Code': projectCode
                    };
                    results.push(item)
                }
                else{
                    reject(Error('Some data is missing. Please check the file'))
                }
            };
            // resolve the result
            resolve(results);
        })
    })
}
export { convertFromCSV, convertFromTxt }