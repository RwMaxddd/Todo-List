import todoAxios from "../axios/index";
export default {
    namespaced: true,
    actions:{
        getEvents(context){
            return new Promise(function(resolve, reject) {
                todoAxios.get('/events').then(res=>{
                    context.commit("loadEvents",res)
                    resolve("Event加载成功");
                }).catch(function (err){
                    console.log(err.message)
                    reject(err)
                })
            })
        },
        getTasks(context, eventObj){
            if (eventObj.id !== context.state.nowEventId){
                context.commit("updateEvent",eventObj)
                todoAxios.get(`/events/${eventObj.id}/tasks`).then(res=>{
                    context.commit("updateTasks",res)
                }).catch(function (err){
                    console.log(err.message)
                })
            }
        },
        async addEvent(context,value){
            const body = {eventName:String(value)}
            try{
                await todoAxios.post('/events',body)
                await context.dispatch('getEvents')
                return '添加成功'
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },
        async addTask(context, {status,title,detail}){
            try{
                const body = {
                    eventId:context.state.nowEventId,
                    status:status,
                    title:title,
                    detail:detail
                }
                await todoAxios.post('/tasks',body)
                await context.dispatch('updateTaskAction')
                return '添加成功'
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },

        async deleteEvent(context){
            try{
                if (context.state.nowEventId !== null){
                    const deleteId = context.state.nowEventId
                    await todoAxios.delete('/events/'+deleteId)
                    context.commit("initTasks")
                    await context.dispatch('getEvents')
                }
                return '删除事件成功'
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },
        async deleteTask(context,id){
            try{
                await todoAxios.delete(`/tasks/${id}`)
                await context.dispatch("updateTaskAction")
                return '删除成功'
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },

        async updateTaskAction(context) {
            try{
                let res = await todoAxios.get(`/events/${context.state.nowEventId}/tasks`)
                await context.commit("updateTasks",res)
                return '更新成功'
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },
        async updateTaskInformation(context,{id,title,detail}){
            try{
                const body = {
                    title:title,
                    detail:detail
                }
                await todoAxios.patch(`/tasks/${id}`,body)
                await context.dispatch("updateTaskAction")
                return '更新成功'
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },
        async updateProgress(context,{directionNum,taskId,taskStatus}){
            try{
                const progressArr = ['todo','inProgress','completed']
                let afterStatus = progressArr[progressArr.indexOf(taskStatus) + directionNum]
                const body = {
                    status:afterStatus
                }
                await todoAxios.patch(`/tasks/${taskId}`,body)
                await context.dispatch("updateTaskAction")
            }catch (err) {
                console.log(err.message)
                return Promise.reject(err)
            }
        },
    },
    mutations:{
        initTasks(state){
            state.todoTasks = []
            state.inProgressTasks = []
            state.completedTasks = []
        },
        loadEvents(state,value){
            state.nowEvent = ""
            state.nowEventId = null
            state.events = value
        },
        updateEvent(state,{id,eventName}){
            state.nowEventId = id
            state.nowEvent = eventName
        },
        updateTasks(state,tasksArr){
            state.todoTasks = tasksArr.filter(item => item.status === 'todo')
            state.inProgressTasks = tasksArr.filter(item => item.status === 'inProgress')
            state.completedTasks = tasksArr.filter(item => item.status === 'completed')
        },
    },
    state:{
        events:[],
        nowEvent:"",
        nowEventId:null,
        todoTasks:[],
        inProgressTasks:[],
        completedTasks:[]
    },
}
