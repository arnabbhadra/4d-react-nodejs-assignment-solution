//Function to check date format
export function checkDateFormat(dateInput) {
    //date format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    // Check for date format
    if (!regex.test(dateInput)) {
      return false;
    }
    const date = new Date(dateInput);
    const [year, month, day] = dateInput.split('-');
    return date.getFullYear() == year && (date.getMonth() + 1) == month && date.getDate() == day;
}

export function isDateInDateRange(dateCheck, startDate, endDate){
    dateCheck = new Date(dateCheck);
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return dateCheck >= startDate && dateCheck <= endDate;
}