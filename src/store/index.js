import { createStore } from 'vuex'
import todo from "./todo.js";
import dialog from "./dialog";
export default createStore({
    modules:{
        todo,
        dialog
    }
})