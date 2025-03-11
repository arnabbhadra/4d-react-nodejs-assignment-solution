import express from 'express';
import { upload, handleFileUploadError } from "./../middleware/fileMiddleware.js";
import { searchSubmissions, upLoadFileAndParse } from './../controllers/controller.js'
const router = express.Router();

router.post('/upload', upload.single('file'), upLoadFileAndParse, handleFileUploadError);
router.get('/submissions', searchSubmissions)
export { router };