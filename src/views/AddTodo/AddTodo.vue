
<script>

import TodoEditor from '@/components/TodoEditor/TodoEditor.vue'
import { postTodo } from '@/requests/todo_list/todo_list'


export default {
  name: 'AddTodo',
  components: {
    TodoEditor
  },
  mounted() 
  {
    this.$refs.todoEditor.focusTodoNameField() 
  },
  methods:
  {
    close()
    {
      this.$router.push('/')
    },
    createTodo()
    {
      const todoEditor = this.$refs.todoEditor
      const todoToConstruct = todoEditor.getTodo()
      const isTodoValid = todoEditor.validateAndSetFocus()

      if(isTodoValid)
      {
        postTodo(todoToConstruct)
          .then(() =>
          {
            this.$router.push('/')
          })
      }
    }
  }
}

</script>

<style scoped>

#main-container
{
  max-width: 600px;
}

</style>

<template>
  <v-card class="add-todo-card">
    <v-card-title>Add a new Todo</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <TodoEditor ref="todoEditor"></TodoEditor>
    </v-card-text>
    <v-divider></v-divider>
    
    <v-card-actions>
      <v-btn left color="#777777" dark text @click="close()">
        Close
      </v-btn>
      <v-spacer/>
      <v-btn right color="primary" text @click="createTodo()">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
