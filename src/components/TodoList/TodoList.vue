
<script>

import { getTodoList, deleteTodo } from '../../requests/todo_list/todo_list'
import AddTodoDialog from './AddTodoDialog/AddTodoDialog'
import filterTodosBySearchWord from './filterTodosBySearchWord'

export default {
  name: 'TodoList',
  components: { AddTodoDialog },
  data: () =>
  {
    return {
      todoList: [],
      offline: false,
      searchWord: ''
    }
  },
  methods:
  {
    openAddTodoDialog()
    {
      this.$refs.addTodoDialog.open()
    },
    getFilteredTodos()
    {
      return filterTodosBySearchWord(this.todoList, this.searchWord)
    },
    async check(e, todoId) 
    {
      e.cancelBubble = true;

      try
      {
        await deleteTodo(todoId)
        this.todoList = await getTodoList()
      }
      catch(e)
      {
        console.warn(e)
        this.offline = true
      }
    },
  },
  async created() 
  {
    try
    {
      this.todoList = await getTodoList()
    }
    catch(e)
    {
      console.warn(e)
      this.offline = true
    }
  }
}

</script>


<style scoped>

#app 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#search-container
{
  margin: 10px;
  width: 100%;
}

#main-container
{
  max-width: 800px;
}

</style>


<template>
  <v-container id="main-container">

    <AddTodoDialog ref="addTodoDialog"></AddTodoDialog>

    <v-row class="text-center">
      <v-col
        class="mb-5"
      >
        <v-row justify="center">

            <template v-if="offline">
              
              <v-alert 
                border="right"
                colored-border
                type="error"
                elevation="2"
              > 
                It looks like our service is offline
              </v-alert>
              
            </template>

            <template v-else>

              <v-btn
                fab color="primary"
                dark fixed bottom right
                @click="openAddTodoDialog()"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <div id="search-container">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  ref="searchField"
                  v-model="searchWord"
                  outlined
                  clearable
                ></v-text-field>
              </div>

              <v-expansion-panels accordion>
                <v-expansion-panel 
                  v-for="todo in getFilteredTodos()" 
                  v-bind:key="todo.id"
                >
                  <v-expansion-panel-header>
                    <v-flex xs3>
                      <v-checkbox @click="check($event, todo.id)"></v-checkbox>
                    </v-flex>
                    {{todo.name}}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list-item two-line v-for="task in todo.tasks" v-bind:key="task.id">
                      <v-list-item-content>
                        <v-list-item-title>{{ task.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            
            </template>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>