const headerToFieldMapper = function(item){
    const mapper = {
        'First Name': 'firstName',
        'Last Name': 'lastName',
        'Employee ID': 'employeeId',
        'Phone Number':'phoneNumber',
        'Salary': 'salary',
        'Start Date':'startDate',
        'Supervisor Email': 'supervisorEmail',
        'Cost Center': 'costCenter',
        'Project Code': 'projectCode'        
    }
    const field = Object.keys(item);
    const data = {}
    for(let key of field){
        if(!mapper[key]){
            throw Error(`Column is not acceptable: ${key}`);
        }
        data[mapper[key]] = item[key];
    }
    return data;
} 

export {headerToFieldMapper};