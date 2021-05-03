
<script>

import TodoEditor from '@/components/TodoEditor/TodoEditor.vue'
import { postTodo } from '@/requests/todo_list/todo_list'


export default {
  name: 'AddTodo',
  components: {
    TodoEditor
  },
  data: () =>
  {
    return {
      inputError: ""
    }
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
      this.inputError = ""

      /*
      if(this.$refs.nameField.value.length <= 0) 
      {
        this.inputError = "Name Field is mandatory!"
        this.$refs.todoEditor.focusTodoNameField() 
        return
      }
      */

      const todoEditor = this.$refs.todoEditor
      const todoToConstruct = todoEditor.getTodo()

      postTodo(todoToConstruct)
        .then(() =>
        {
          this.$router.push('/')
        })
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
  <v-container id="main-container">
    <v-card class="add-todo-card">
      <v-card-title>Adding a new Todo</v-card-title>
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
  </v-container>
</template>