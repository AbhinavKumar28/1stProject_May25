// const Hapi = require('@hapi/hapi');
//1aEzDJzPiZjePpBC - password
import Hapi from '@hapi/hapi'
import './types/hapiMongoPatch'; 
import { Request, ResponseToolkit } from '@hapi/hapi';
import HapiMongoDB from 'hapi-mongodb';
// const Joi = require('@hapi/joi');
// import Joi from 'joi'
// import joiObjectId from 'joi-objectid'
// import { request } from 'http';
import { ObjectId } from "mongodb";
// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
// import JoiImport from 'joi';
// import joiObjectId from 'joi-objectid';

// // Call joiObjectId with JoiImport to get the extension object
// const Joi = JoiImport.extend(joiObjectId(JoiImport));
import JoiImport from 'joi';
import joiObjectId from 'joi-objectid';
import bcrypt from "bcrypt"
// Mutates Joi to add `objectId` method
joiObjectId(JoiImport);

// Now you can use `JoiImport.objectId()`
const Joi = JoiImport;

// type category = "personal" | "work" | "household"
export default Joi;

/// <reference path="./types/hapi-mongodb.d.ts" />

// type joh= {
//         username: string;
//         password: string;
//         name: string;
//         id: string;
//     };
// type users = {
//     john:joh
// }
// const users:users = {
//     john: {
//         username: 'john',
//         password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
//         name: 'John Doe',
//         id: '2133d32a'
//     }
// };

// const validate = async (request:Request, username:keyof typeof users, password:string) => {

//     const user = users[username];
//     if (!user) {
//         return { credentials: null, isValid: false };
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     const credentials = { id: user.id, name: user.name };

//     return { isValid, credentials };
// };

// const start = async () => {

//     const server = Hapi.server({ port: 4000 });

//     await server.register(require('@hapi/basic'));

//     server.auth.strategy('simple', 'basic', { validate });

//     server.route({
//         method: 'GET',
//         path: '/',
//         options: {
//             auth: 'simple'
//         },
//         handler: function (request, h) {

//             return 'welcome';
//         }
//     });

//     await server.start();

//     console.log('server running at: ' + server.info.uri);
// };

// start();
const init = async () => {

    const server = Hapi.server({
        port: 3005,
        host: 'localhost',
        routes: {
                cors: {
                    origin: ['http://localhost:5173'], 
                    headers: ['Accept', 'Content-Type', 'Authorization'],
                    additionalHeaders: ['X-Requested-With'],
                    exposedHeaders: ['Content-Disposition'],
                    credentials: true
                }
            }
    });
    
    await server.register({
        plugin: HapiMongoDB,
        options: {
          url: 'mongodb://localhost:27017/latest_db',
          settings: {
              useNewUrlParser: true,
              useUnifiedTopology: true
          },
          decorate: true
        }
    });
    
    // server.route({
    //     method: 'GET',
    //     path: '/movies',
    //     handler: async (req, h) => {
    //         const offset = Number(req.query.offset) || 0;

    //         const students = await req.mongo.db.collection('students').find().toArray()
    //         console.log(students)
    //         return students;
    //     }
    // });

    server.route({
        method:"GET",
        path:"/list/all/todos",
        handler: async (request,h)=>{
            try {
                const todos = await request.mongo.db.collection('todoapp').find({}).toArray()
                // console.log(todos)
                // console.log(h.response(todos).code(200))
                return todos
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
        }
    })
    // server.route({
    //     method:"GET",
    //     path:"/list/household/todos",
    //     handler: async (request,h)=>{
    //         try {
    //             const todos = await request.mongo.db.collection('todoapp').find({ category: "household" }).toArray()
    //             // console.log(todos)
    //             // console.log(h.response(todos).code(200))
    //             return todos
    //         }catch (err){
    //             console.error(err)
    //             return h.response('Error fetching todos').code(500)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'PUT',
    //     path: '/todos/{objid}',
    //     options: {
    //         validate: {
    //             payload: Joi.object({
    //                 todonote: Joi.string().required(),
    //                 category: Joi.string().required().valid('work', 'personal', 'household')
    //                 }),
    //             params: Joi.object({
    //                 objid: Joi.string().required(),
    //                 // todonote:Joi.string
    //             })
    //         }
    //     },
    //     handler: async (request, h) => {
    //         const {objid}=request.params
    //         const id = new ObjectId(String(objid))
    //         // const ObjectID = request.mongo.ObjectID;

    //         const payload = request.payload as { todonote: string,category:string }

    //         const status = await request.mongo.db.collection('todoapp').updateOne({_id:id}, {$set: payload});

    //         return status;
    //     }
    // });
    
    server.route({
        method:"GET",
        path:'/list/{categories}/todos',
        options: {
            validate: {
                params: Joi.object({
                    categories: Joi.string().required(),
                    // todonote:Joi.string
                })
            }
        },
        handler: async (request,h)=>{
            try {
                const {categories}=request.params
                const todos = await request.mongo.db.collection('todoapp').find({ category: categories }).toArray()
                // console.log(todos)
                // console.log(h.response(todos).code(200))
                return todos
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
        }
    })
    
    // server.route({
    //     method:"GET",
    //     path:"/list/personal/todos",
    //     handler: async (request,h)=>{
    //         try {
    //             const todos = await request.mongo.db.collection('todoapp').find({ category: "personal" }).toArray()
    //             // console.log(todos)
    //             // console.log(h.response(todos).code(200))
    //             return todos
    //         }catch (err){
    //             console.error(err)
    //             return h.response('Error fetching todos').code(500)
    //         }
    //     }
    // })
    
    server.route({
        method:"GET",
        path:"/list/categories",
        handler: async (request,h)=>{
            try {
                const todos = await request.mongo.db.collection('category').find({ }).toArray()
                console.log(todos)
                // console.log(h.response(todos).code(200))
                return todos
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
        }
    })
    
    // server.route({
    //     method:"GET",
    //     path:"/list/work/todos",
    //     handler: async (request,h)=>{
    //         try {
    //             const todos = await request.mongo.db.collection('todoapp').find({ category: "work" }).toArray()
    //             // console.log(todos)
    //             // console.log(h.response(todos).code(200))
    //             return todos
    //         }catch (err){
    //             console.error(err)
    //             return h.response('Error fetching todos').code(500)
    //         }
    //     }
    // })
    
    // Add a new todonote to the database
    server.route({
        method: 'POST',
        path: '/categoriesInsert',
        options: {
            validate: {
            payload: Joi.object({
                category: Joi.string().required()
                }),
            },
        },
        handler: async (request, h) => {

            const payload = request.payload as { category:string}
            
            const status = await request.mongo.db.collection('category').insertOne(payload);
            console.log("Inserted:", status.insertedId);

            return {
                _id: status.insertedId,
                category: payload.category
            };
        }
    });
    
    server.route({
        method: 'POST',
        path: '/Signup',
        options: {
            validate: {
            payload: Joi.object({         
                name:Joi.string().required(),
                email:Joi.string().required(),
                password: Joi.string().required()
                }),
            },
        },
        handler: async (request, h) => {
            
            const payload = request.payload as {
                name:string,
                email:string,
                password:string
            }
            const saltRounds = 10
            // type ai=
            let a={} as {
                name:string,
                email:string,
                password:string|object
            }

            let status:any=[]
            // let b=
            bcrypt.hash(payload.password, saltRounds, async function(err, hashedPassword) {
                        console.log(payload.password)
                        a={...payload,password:hashedPassword}
                        
                        status = await request.mongo.db.collection('users').insertOne(a);
                        console.log("Inserted:", status.insertedId);
                    });
            
            return {
                _id: status.insertedId,
                name:payload.name,
                email:payload.email,
                password: payload.password
            };
        }
    });
    

    server.route({
        method: 'GET',
        path: '/login',
        options: {
            validate: {
            payload: Joi.object({         
                // name:Joi.string().required(),
                email:Joi.string().required(),
                password: Joi.string().required()
                }),
            },
        },
        handler: async (request, h) => {

            const payload = request.payload as {
                // name:string,
                email:string,
                password:string
            }
            const saltRounds = 10
            // type ai=
            let a={} as {
                // name:string,
                email:string,
                password:string|object
            }
            try {
                const hashedpassword = await request.mongo.db.collection('users').find({ email: payload.email }).toArray()
                bcrypt.compare(payload.password, hashedpassword[0].password, function(err, result) {
                    if (result === true){
                        
                        console.log("login successful")
                        return hashedpassword

                    }
                });
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
            // Load hash from your password DB.
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });
//             bcrypt.hash(payload.password, saltRounds, async function(err, hashedPassword) {
//                         console.log(payload.password)
//                         a={...payload,password:hashedPassword}
//                         const status = await request.mongo.db.collection('users').insertOne(a);
//                         console.log("Inserted:", status.insertedId);
            
//                     });
            
//             return {
//                 // _id: status.insertedId,
//                 name:payload.name,
//                 email:payload.email,
//                 password: payload.password
//             };
        }
    });
    
    server.route({
        method: 'POST',
        path: '/todosInsert',
        options: {
            validate: {
            payload: Joi.object({
                todonote: Joi.string().required(),
                category: Joi.string().required()
                }),
            },
        },
        handler: async (request, h) => {

            const payload = request.payload as { todonote: string, category:string}
            
            const status = await request.mongo.db.collection('todoapp').insertOne(payload);
            console.log("Inserted:", status.insertedId);

            return {
                _id: status.insertedId,
                todonote: payload.todonote,
                category: payload.category
            };
        }
    });
    
    
    // Update the details of a todonote
    server.route({
        method: 'PUT',
        path: '/todos/{objid}',
        options: {
            validate: {
                payload: Joi.object({
                    todonote: Joi.string().required(),
                    category: Joi.string().required()
                    }),
                params: Joi.object({
                    objid: Joi.string().required(),
                    // todonote:Joi.string
                })
            }
        },
        handler: async (request, h) => {
            const {objid}=request.params
            const id = new ObjectId(String(objid))
            // const ObjectID = request.mongo.ObjectID;

            const payload = request.payload as { todonote: string,category:string }

            const status = await request.mongo.db.collection('todoapp').updateOne({_id:id}, {$set: payload});

            return status;
        }
    });
    
    // Delete a todonote from the database
    server.route({
        method: 'DELETE',
        path: '/todos/{objid}',
        options: {
            validate: {
                params: Joi.object({
                    objid: Joi.string().required(),
                    // todonote:Joi.string
                })
            }
        },
        handler: async (request, h) => {
            const {objid}=request.params
            const id = new ObjectId(String(objid))
            // const ObjectID = request.mongo.ObjectID;

            const payload = request.payload

            const status = await request.mongo.db.collection('todoapp').deleteOne({_id: id});

            return status;
        }
    });
    
    
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();
//category no repeat check before making 
//delete a category
//edit a category
//selecting a category should be mandatory
//remove category restrictions for only 3 categories