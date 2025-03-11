
import { checkDateFormat, isDateInDateRange } from './../utils/date.js'
import { readFile, convertFromCSV, convertFromTxt } from '../utils/file.js';
import { headerToFieldMapper } from './../utils/utils.js'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// Function to apply filter on the submissions
// input: submissions and search text
const filterSubmission = function(submissions, searchText){
    try{
        let finalResult = [];
        // if there is no ':' then phrase search is performed (Case Sensitive)
        if(!searchText.includes(":")){
            finalResult = submissions.filter((submission)=>{
                const keys = Object.keys(submission);
                for(const key of keys){
                    if( submission[key].toString().includes(searchText)){
                        return true;
                    }
                }
                return false
            })
        }
        // here column wise search is performed
        else{
            const [field, value] = searchText.split(':');
            // check field is valid or not
            if( !Object.keys(submissions[0]).includes(field)){
                throw Error(`Invalid Field: ${field}`);
            }
            // if field is start date, perform date range filter
            else if(field === 'startDate'){
                let [startDate, endDate] = value.split("..");
                if(!checkDateFormat(startDate))
                {
                    throw Error(`Invalid date format: ${startDate}`);
                }
                if(!checkDateFormat(endDate)){
                    throw Error(`Invalid date format: ${endDate}`);
                }
                if(new Date(startDate)> new Date(endDate)){
                    throw Error("Start date is older than end date");
                }
                // check submission is in date rage
                finalResult = submissions.filter((submission)=>{
                    return isDateInDateRange(submission[field], startDate, endDate)
                })

            }
            else{
                finalResult = submissions.filter((submission)=>{
                    return submission[field].toString().includes(value)
                })          
            }
        }
        return finalResult    
    }
    catch(error){
        throw error;
    }
}

// Function to Parse file provided the file path
const fileParser = async function(filePath){
    try{
        const content = await readFile(filePath);
        const extName = path.extname(filePath);
        // read csv data and parse
        let results =[];
        // based on the extension of file parser is chosen
        if(extName == '.txt'){
            results = await convertFromTxt(filePath);
        }
        else if(extName == '.csv'){
            results = await convertFromCSV(filePath);
        }
        return results;
    }
    catch(error){
        throw error;
    }
}
const insertSubmissionsInBulk = async function(submissions,results){
    try{
        
        for(const item of results){
            const newSubmission = headerToFieldMapper(item);
            submissions.push({...newSubmission, id: uuidv4(), privacyConsent: false});
        }
        return submissions;
    }
    catch(error){
        throw error;
    }

} 
export { filterSubmission, fileParser, insertSubmissionsInBulk }