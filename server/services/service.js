// this function apply filter on the submissions
// input: submissions and search text
import { checkDateFormat, isDateInDateRange } from './../utils/date.js'

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

export default filterSubmission