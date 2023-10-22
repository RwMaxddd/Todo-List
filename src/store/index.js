import { createStore } from 'vuex'
import todo from "./todo.js";
export default createStore({
    modules:{
        todo
    }
})