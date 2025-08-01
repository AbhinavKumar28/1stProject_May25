// const Hapi = require('@hapi/hapi');
//1aEzDJzPiZjePpBC - password
import Hapi from '@hapi/hapi'
import './types/hapiMongoPatch'; 
// const Joi = require('@hapi/joi');
import Joi from 'joi'
import joiObjectId from 'joi-objectid'
joiObjectId(Joi)
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
        plugin: require('hapi-mongodb'),
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
    
    // Add a new todonote to the database
    server.route({
        method: 'POST',
        path: '/todosInsert',
        options: {
            validate: {
            payload: Joi.object({
                todonote: Joi.string().required(),
                }),
            },
        },
        handler: async (request, h) => {

            const payload = request.payload as { todonote: string }
            console.log(payload)
            const status = await request.mongo.db.collection('todoapp').insertOne(payload);
            return status;
        }
    });
    
    // // Get a single movie
    // server.route({
    //     method: 'GET',
    //     path: '/movies/{id}',
    //     handler: async (request, h) => {
    //         const id = request.params.id
    //         const ObjectID = request.mongo.ObjectID;

    //         const movie = await request.mongo.db.collection('movies').findOne({_id: new ObjectID(id)},{projection:{title:1,plot:1,cast:1,year:1, released:1}});
            
    //         return movie;
    //     }
    // });
    
    // // Update the details of a movie
    // server.route({
    //     method: 'PUT',
    //     path: '/movies/{id}',
    //     options: {
    //         validate: {
    //             params: Joi.object({
    //                 id: Joi.objectId()
    //             })
    //         }
    //     },
    //     handler: async (request, h) => {
    //         const id = request.params.id
    //         const ObjectID = request.mongo.ObjectID;

    //         const payload = request.payload

    //         const status = await request.mongo.db.collection('movies').updateOne({_id: ObjectID(id)}, {$set: payload});

    //         return status;

    //     }
    // });
    
    // // Delete a movie from the database
    // server.route({
    //     method: 'DELETE',
    //     path: '/movies/{id}',
    //     options: {
    //         validate: {
    //             params: Joi.object({
    //                 id: Joi.objectId()
    //             })
    //         }
    //     },
    //     handler: async (request, h) => {

    //         const id = request.params.id
    //         const ObjectID = request.mongo.ObjectID;

    //         const payload = request.payload

    //         const status = await request.mongo.db.collection('movies').deleteOne({_id: ObjectID(id)});

    //         return status;
    //     }
    // });
    
    // // Search for a movie
    // server.route({
    //     method: 'GET',
    //     path: '/search',
    //     handler: async(request, h) => {
    //         const query = request.query.term;

    //         const results = await request.mongo.db.collection("movies").aggregate([
    //             {
    //                 $searchBeta: {
    //                     "search": {
    //                         "query": query,
    //                         "path":"title"
    //                     }
    //                 }
    //             },
    //             {
    //                 $project : {title:1, plot: 1}
    //             },
    //             {  
    //                 $limit: 10
    //             }
    //             ]).toArray()
    
    //         return results;
    //     }
    // });
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();