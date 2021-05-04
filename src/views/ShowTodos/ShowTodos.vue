
<script>

import { getTodoList, deleteTodo } from '@/requests/todo_list/todo_list'
import filterTodosBySearchWord from './filterTodosBySearchWord'
import debounce from 'lodash/debounce'

const DEBOUNCE_TIME = 750

export default {
  name: 'ShowTodos',
  components: { },
  data: () =>
  {
    return {
      todoList: [],
      searchWord: '',
      showEmptySearchResultAlert: false,
      tasksDialog: false,
      selectedTodoIndex: 0
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
      }
    },
    async check(e, todoId) 
    {
      e.cancelBubble = true;

      await this.remove(todoId)
    },
    openTasksDialog(todoIndex)
    {
      this.tasksDialog = true
      this.selectedTodoIndex = todoIndex
    },
    closeTasksDialog()
    {
      this.tasksDialog = false
    },
    onSearchFieldInput(inputValue)
    {
      this.showEmptySearchResultAlert = false

      if(inputValue == null)
      {
        this.searchWord = ""
      }
      else
      {
        this.searchWord = inputValue
      }
    },
    debounceInput: debounce(function() 
    {
      if(this.searchWord.length > 0 && this.getFilteredTodos().length === 0)
      {
        this.showEmptySearchResultAlert = true
      }
    }, DEBOUNCE_TIME)
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

#no-search-match-alert
{
  width: 100%;
  margin: 30px;
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

.task
{
  margin: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.clickable
{
  cursor: pointer;
}

.list-enter-active, 
.list-leave-active 
{
  transition: all 0.75s;
}

.list-enter, .list-leave-to 
{
  opacity: 0;
  transform: translateX(-200px);
}

.fade-enter-active
{
  transition: opacity 0.75s;
}

.fade-leave-active
{
  transition: opacity 0s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>


<template>
  <v-row class="text-center">
    <v-col
      class="mb-5"
    >
      <v-row justify="center">

        <v-dialog
          v-model="tasksDialog"
          v-if="todoList.length > 0"
          width="500"
        >
          <v-card>
            <v-card-title class="headline">
              {{todoList[selectedTodoIndex].name}}
            </v-card-title>

            <v-card-text align="left">
              {{todoList[selectedTodoIndex].description}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
              
              <br>
              <div class="task" align="left" v-for="task in todoList[selectedTodoIndex].tasks" :key="task.id">
                <big>{{task.name}}</big><br>
                <small class="sub">{{task.description}}</small>
              </div>  
            </v-card-text>
    
            <v-divider></v-divider>
    
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="closeTasksDialog()"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
            @input="onSearchFieldInput($event); debounceInput($event)"
            outlined
            clearable
          ></v-text-field>
        </div>

        <transition 
          name="fade"
        >
          <v-alert 
            id="no-search-match-alert"
            v-show="showEmptySearchResultAlert"
            border="right"
            colored-border
            type="info"
            elevation="2"
          > 
            No todos are matching the search request 
            <br><br>
            <router-link to="/add_todo/">
              <v-btn 
                color="primary"
              >
                Create a new todo
              </v-btn>
            </router-link>
            <br><br>
          </v-alert> 
        </transition>
          

        <transition-group 
          id="transition-group" 
          name="list" 
          tag="p"
        >
          <v-card
            v-for="(todo, todoIndex) in getFilteredTodos()" 
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
                    <v-row class="clickable" @click="openTasksDialog(todoIndex)" align="center" justify="center">
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
          </v-card>
        </transition-group>
      </v-row>
    </v-col>
  </v-row>
</template>