//1aEzDJzPiZjePpBC - password
import Hapi from '@hapi/hapi'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Inert from '@hapi/inert'
import './types/hapiMongoPatch.ts'; 
// import { Request, ResponseToolkit } from '@hapi/hapi';
import HapiMongoDB from 'hapi-mongodb';
import { ObjectId } from "mongodb";
import JoiImport from 'joi';
//@ts-ignore
import joiObjectId from 'joi-objectid';
// impor./types/joi-objectid
import bcrypt from "bcrypt"
import Path from 'path'
// const Path = require('path');
// Mutates Joi to add `objectId` method
joiObjectId(JoiImport);

// Now you can use `JoiImport.objectId()`
const Joi = JoiImport;

// type category = "personal" | "work" | "household"
export default Joi;

/// <reference path="./types/hapi-mongodb.d.ts" />

/// <reference path="./types/joi-objectid.d.ts" />
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const init = async () => {

    const server = Hapi.server({
        port: 3005,
        host: 'localhost',
        routes: {
                cors: {
                    origin: ['http://localhost:3005'], 
                    headers: ['Accept', 'Content-Type', 'Authorization', 'If-None-Match'],
                    additionalHeaders: ['X-Requested-With'],
                    exposedHeaders: ['Content-Disposition'],
                    credentials: true
                },
                files: {
                    relativeTo: Path.join(__dirname, '../../dist')
                }
            }
    });
    
    await server.register([{
        plugin: HapiMongoDB,
        options: {
          url: 'mongodb://localhost:27017/latest_db',
          settings: {
              useNewUrlParser: true,
              useUnifiedTopology: true
          },
          decorate: true
        }
    },{
        plugin: Inert,
        options:{}
}]);
    
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
        method: 'GET',
        path: '/files/css/{param*}',
        handler: {
            directory: {
                path: './css/',
                listing: true,
                defaultExtension:'css'
            }
        }
    });
    
    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: { 
                path: Path.join(__dirname, '../../dist/assets/'), 
                index: ['index.html']
            }
        }
    });
    
    
    server.route({
        method: '*',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../../dist'), 
                index: ['index.html']
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/files/tsx/{param*}',
        handler: {
            directory: {
                path: './tsx/',
                listing: true,
                defaultExtension:'tsx'
            }
        }
    });
    
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
    // server.route({
    //     method:"GET",
    //     path:'/{filename}',
    //     options: {
    //         validate: {
    //             params: Joi.object({
    //                 filename: Joi.string().required(),
    //             })
    //         }
    //     },
    //     handler: async (request,h)=>{

    //     }
    // })
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
        path: '/signup',
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
        method: 'POST',
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
                const founduserinfo = await request.mongo.db.collection('users').find({ email: payload.email }).toArray()
                bcrypt.compare(payload.password, founduserinfo[0].password, function(err, result) {
                        console.log("result",result)
                    if (result === true){
                        console.log("login successful",founduserinfo)
                    }
                });
                // return undefined
                return (founduserinfo[0]!==undefined)?founduserinfo[0]:"No user with this email found"
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
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
//involvement ki kami h
//q of route.