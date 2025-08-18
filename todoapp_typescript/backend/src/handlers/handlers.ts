export async function get_todos  (request:any,h:any){
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