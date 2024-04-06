// import { expect } from 'chai';
// import request from 'supertest';
// import app from '../app.js';
// import Article from '../models/article.js';
// import cloudinary from 'cloudinary';
// import fs from 'fs';
// import sinon from 'sinon';


// describe('Article API Tests', () => {
//     let articleId: any;

//     beforeEach(async () => {
//         await Article.deleteMany({});
//     });

//     it('should create a new article', async () => {
//         const articleData = {
//             title: 'AWS certificates explained',
//             description: 'Amazon Web Services (AWS) offers a range of certifications designed to validate individuals expertise in various aspects of cloud computing. These certifications are highly respected in the industry and can be valuable assets for professionals working with AWS services.',
//         };
    
//         const imageFile = {
//             fieldname: 'image',
//             originalname: 'test.jpg',
//             encoding: '7bit',
//             mimetype: 'image/jpeg',
//             buffer: Buffer.from('test image data'),
//         };
    
//         const response = await request(app)
//             .post('/api/article')
//             .field('title', articleData.title)
//             .field('description', articleData.description)
//             .attach('image', imageFile.buffer, imageFile.originalname);
    
//         expect(response.status).to.equal(201);
//         expect(response.body).to.have.property('message', 'Article created successfully');
//         expect(response.body).to.have.property('article');
       
//         const createdArticle = response.body.article;
       
//         expect(createdArticle).to.have.property('title', articleData.title);
//         expect(createdArticle).to.have.property('description', articleData.description);
//         expect(createdArticle).to.have.property('image').that.is.a('string');
//       });
    
//       it('should return an error if the image file is missing', async () => {
//         const articleData = {
//           title: 'Test Article',
//           tags: ['test', 'example'],
//           description: 'This is a test article.',
//         };
    
//         const response = await request(app)
//           .post('/articles')
//           .field('title', articleData.title)
//           .field('tags', articleData.tags)
//           .field('description', articleData.description);
    
//         expect(response.status).to.equal(400);
//         expect(response.body).to.have.property('error', 'Image file is missing');
//     });
    
//     it('should return an error for internal server error', async () => {
//     const cloudinaryUploadSpy = sinon.stub(cloudinary.v2.uploader, 'upload').throws(new Error('Error uploading image'));

//     const articleData = {
//         title: 'AWS certificates explained',
//         description: 'Amazon Web Services (AWS) offers a range of certifications designed to validate individuals expertise in various aspects of cloud computing. These certifications are highly respected in the industry and can be valuable assets for professionals working with AWS services.',
//     };

//     const imageFile = {
//         fieldname: 'image',
//         originalname: 'test.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         buffer: Buffer.from('test image data'),
//     };

//     const response = await request(app)
//         .post('/api/article')
//         .field('title', articleData.title)
//         .field('description', articleData.description)
//         .attach('image', imageFile.buffer, imageFile.originalname);

//     expect(response.status).to.equal(500);
//     expect(response.body).to.have.property('error', 'Internal Server Error');

//     cloudinaryUploadSpy.restore();
//     });

//     // describe('Create Article', () => {
//     //     it('should create a new article with valid input', async () => {
//     //     const articleData = {
//     //         title: 'AWS certificates explained',
//     //         description: 'Amazon Web Services (AWS) offers a range of certifications designed to validate individuals expertise in various aspects of cloud computing. These certifications are highly respected in the industry and can be valuable assets for professionals working with AWS services.',
//     //         file: fs.createReadStream('../uploads/bible.png'),
//     //     };

//     //     const res = await request(app)
//     //         .post('/api/article')
//     //         .field('title', articleData.title)
//     //         .field('description', articleData.description)
//     //         .attach('image', articleData.file);

//     //     expect(res.status).to.equal(201);
//     //     expect(res.body.message).to.equal('Article created successfully');
//     //     expect(res.body.article).to.have.property('title').equal(articleData.title);
//     //     expect(res.body.article.description).to.equal(articleData.description);

//     //     articleId = res.body.article._id;
//     //     });
//     // });

//     // describe('Get Single Article', () => {
//     //     it('should get a single article', async () => {
//     //     const article = new Article({
//     //         title: 'AWS certificates explained',
//     //         description: 'Amazon Web Services (AWS) offers a range of certifications designed to validate individuals expertise in various aspects of cloud computing. These certifications are highly respected in the industry and can be valuable assets for professionals working with AWS services.',
//     //     });
//     //     await article.save();

//     //     const res = await request(app).get(`/api/article/${article._id}`);

//     //     expect(res.status).to.equal(200);
//     //     expect(res.body.singleArticle).to.have.property('title').equal(article.title);
//     //     });
//     // });

//     // describe('Update Article', () => {
//     //     it('should update an existing article', async () => {
//     //     const updatedTitle = 'Updated Title';
//     //     const res = await request(app)
//     //         .put(`/api/article/${articleId}`)
//     //         .send({ title: updatedTitle });

//     //     expect(res.status).to.equal(200);
//     //     expect(res.body.message).to.equal('Article Updated successfully');
//     //     expect(res.body.updatedArticle.title).to.equal(updatedTitle);
//     //     });
//     // });

//     // describe('Delete Article', () => {
//     //     it('should delete an existing article', async () => {
//     //     const res = await request(app).delete(`/api/article/${articleId}`);

//     //     expect(res.status).to.equal(200);
//     //     expect(res.body.message).to.equal('Article deleted successfully');
//     //     });
//     // });
// });
