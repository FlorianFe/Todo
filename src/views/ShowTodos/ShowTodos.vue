
<script>

import { getTodoList, deleteTodo } from '@/requests/todo_list/todo_list'
import filterTodosBySearchWord from './filterTodosBySearchWord'

export default {
  name: 'ShowTodos',
  components: { },
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
    getFilteredTodos()
    {
      return filterTodosBySearchWord(this.todoList, this.searchWord)
    },
    async remove(todoId) 
    {
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
    async check(e, todoId) 
    {
      e.cancelBubble = true;

      await this.remove(todoId)
    }
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
  },
}

</script>


<style scoped>

#app 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

#search-container
{
  padding: 10px;
  width: 100%;
  border-bottom: 1px ridge #dddddd;
}

#main-container
{
  max-width: 600px;
}

#transition-group
{
  width: 100%;
}

.flex-container
{
  display: flex;
}

.flex-item
{
  flex: 1;
}

.text-align-left
{
  text-align: left;
}

.sub
{
  color: #777777;
}

.list-item 
{
  display: inline-block;
  width: 100%;
  border-top: 1px ridge #dddddd;
  border-bottom: 1px ridge #dddddd;
}

.list-enter-active, 
.list-leave-active 
{
  transition: all 1s;
}

.list-enter, .list-leave-to 
{
  opacity: 0;
  transform: translateX(-200px);
}

</style>


<template>
  <v-container id="main-container">
    <v-row class="text-center">
      <v-col
        class="mb-5"
      >
        <v-row justify="center">
          <router-link to="/add_todo">
            <v-btn
              fab color="primary"
              dark fixed bottom right
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>

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

          <transition-group 
            id="transition-group" 
            name="list" 
            tag="p"
          >
            <v-card
              v-for="todo in getFilteredTodos()" 
              v-bind:key="todo.id"
              tile
              elevation="0"
              class="list-item"
            >
              <v-card-text>
                <div class="flex-container">
                  <div class="fixed-item">
                    <v-container fill-height fluid>
                      <v-row align="center" justify="center">
                          <v-col>
                            <v-checkbox @click="check($event, todo.id)"></v-checkbox>
                          </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <div class="flex-item">
                      <v-container fill-height fluid>
                      <v-row align="center" justify="center">
                          <v-col class="text-align-left">
                            <big>{{todo.name}}</big><br>
                            <small class="sub">{{todo.description}}</small>
                          </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <div class="fixed-item">
                    <v-container fill-height fluid>
                      <v-row align="center" justify="center">
                          <v-col>
                            <v-menu>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  icon
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>
                  
                              <v-list align="left">
                                <v-list-item link :to="'/edit_todo/' + todo.id">
                                  <v-list-item-icon>
                                    <v-icon>mdi-pencil</v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title>Edit</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="remove(todo.id)">
                                  <v-list-item-icon>
                                    <v-icon>mdi-delete</v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title>Delete</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>

                            </v-menu>
                          </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </div>
              </v-card-text>

              <!--
              <v-expansion-panel-content>
                <v-list-item two-line v-for="task in todo.tasks" v-bind:key="task.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ task.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-expansion-panel-content>
            -->
            </v-card>
          </transition-group>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>