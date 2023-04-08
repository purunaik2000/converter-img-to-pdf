const { sendResponse } = require('../help/response');
const db = require('../mysql/query');
const multipart = require('lambda-multipart-parser');
const { uploadFile } = require('../aws/upload');
const {authentication} = require('../help/auth');
const Pdfkit = require('pdfkit');
const fs = require('fs');

module.exports.upload = async (event) => {
    try {
        // const decoded = await authentication(event.headers.Authorization);
        // if(!decoded) return sendResponse(400, false, 'Login first');
        // let data = await multipart.parse(event);
        // for (let image of data.files) if (!image.contentType.includes('image')) return sendResponse(400, false, 'Please upload images only');
        // const images = await db.do('insert into image (name, userid) values ?', [[[Date.now(), event.pathParameters.userId]]]);
        // const values = [];
        // for (let img of data.files) {
        //     let url = await uploadFile(img).catch(err=>console.log(err));
        //     values.push([img.filename, images.insertId, url]);
        // }
        // await db.do('insert into image_url (name, imageid, url) values ?', [values]);
        let doc = new Pdfkit;
        doc.pipe(fs.createWriteStream('new_pdf.pdf'))
        doc.image('https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/1680933328904Screenshot%20%2852%29.png', {
            fit: [500, 400],
            align: 'center',
            valign: 'center'
        });
        doc.addPage().image('https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/1680933328904Screenshot%20%2852%29.png',{
            fit: [500, 400],
            align: 'center',
            valign: 'center'
        });
        // doc.image('https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/1680870966905Screenshot%20%2852%29.png', {
        //     fit: [500, 400],
        //     align: 'center',
        //     valign: 'center'
        // });
        doc.end();
        return sendResponse(201, true, 'Success');
    } catch (error) {
        sendResponse(500, false, error.message);
    }
}