import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowTodos from '../views/ShowTodos/ShowTodos.vue'
import AddTodo from '../views/AddTodo/AddTodo.vue'
import EditTodo from '../views/EditTodo/EditTodo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ShowTodos
  },
  {
    path: '/add_todo',
    name: 'AddTodo',
    component: AddTodo
  },
  {
    path: '/edit_todo/:id',
    name: 'EditTodo',
    component: EditTodo
  }
]

const router = new VueRouter(
{
  base: process.env.BASE_URL,
  routes
})

export default router
