import {filterSubmission, fileParser, insertSubmissionsInBulk} from "./../services/service.js";
//Controller to upload and parser employee information
export async function upLoadFileAndParse(req, res){
    try{
      if (!req.file) {
        return res.status(400).send({message: 'Error in File upload'});
      }
      // read file parse into json array
      const results = await fileParser(req.file.path);
      //insert data into list
      const submissions = await insertSubmissionsInBulk(req.submissions, results);
      return res.json(submissions);
    }
    catch(error){
      return res.status(400).send({message: error.message});
    }
  }
// controller to search with advance filter  
export function searchSubmissions(req, res){
    try{
      //extracting search text 
      const searchField = req.query.search_text;
      if(!searchField){
        return res.json(req.submissions);
      }
      // filter based on the search text
      const filteredSubmissions = filterSubmission(req.submissions, searchField);
      return res.json(filteredSubmissions);
    }
    catch(error){
      return res.status(400).send({message: error.message});
    }
  }
