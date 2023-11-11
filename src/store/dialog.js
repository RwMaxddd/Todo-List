export default {
    namespaced: true,
    mutations:{
        openAddTaskDialog(state,taskType){
            state.addTaskFormVisible = true
            state.taskType = taskType
        },
        openUpdateTaskDialog(state, {title,detail,taskId}){
            state.updateTaskFormVisible = true
            state.title = title
            state.detail = detail
            state.taskId = taskId
        },
        closeDialog(state,dialogType){
            switch (dialogType){
                case 'addTask':
                    state.addTaskFormVisible = false
                    break
                case 'updateTask':
                    state.updateTaskFormVisible = false
                    break
                default:
                    break
            }
        }

    },
    state:{
        addTaskFormVisible:false,
        updateTaskFormVisible:false,
        taskType:'',
        taskId:-1,
        title:'',
        detail:''
    },
}
