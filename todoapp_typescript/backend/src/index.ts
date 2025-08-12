// const Hapi = require('@hapi/hapi');
//1aEzDJzPiZjePpBC - password
import Hapi from '@hapi/hapi'
import './types/hapiMongoPatch'; 
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

// Mutates Joi to add `objectId` method
joiObjectId(JoiImport);

// Now you can use `JoiImport.objectId()`
const Joi = JoiImport;

type category = "personal" | "work" | "household"
export default Joi;

/// <reference path="./types/hapi-mongodb.d.ts" />

const init = async () => {

    const server = Hapi.server({
        port: 3005,
        host: 'localhost',
        routes: {
            cors: {
            origin: ['*']   
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
    server.route({
        method:"GET",
        path:"/list/household/todos",
        handler: async (request,h)=>{
            try {
                const todos = await request.mongo.db.collection('todoapp').find({ category: "household" }).toArray()
                // console.log(todos)
                // console.log(h.response(todos).code(200))
                return todos
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
        }
    })
    
    server.route({
        method:"GET",
        path:"/list/personal/todos",
        handler: async (request,h)=>{
            try {
                const todos = await request.mongo.db.collection('todoapp').find({ category: "personal" }).toArray()
                // console.log(todos)
                // console.log(h.response(todos).code(200))
                return todos
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
        }
    })
    server.route({
        method:"GET",
        path:"/list/work/todos",
        handler: async (request,h)=>{
            try {
                const todos = await request.mongo.db.collection('todoapp').find({ category: "work" }).toArray()
                // console.log(todos)
                // console.log(h.response(todos).code(200))
                return todos
            }catch (err){
                console.error(err)
                return h.response('Error fetching todos').code(500)
            }
        }
    })
    
    // Add a new todonote to the database
    server.route({
        method: 'POST',
        path: '/todosInsert',
        options: {
            validate: {
            payload: Joi.object({
                todonote: Joi.string().required(),
                category: Joi.string().required().valid('work', 'personal', 'household')
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
                    category: Joi.string().required().valid('work', 'personal', 'household')
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