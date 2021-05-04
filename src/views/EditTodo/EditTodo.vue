
<script>

import TodoEditor from '@/components/TodoEditor/TodoEditor'
import { getTodo, updateTodo } from '@/requests/todo_list/todo_list'

export default {
  name: 'EditTodo',
  components: {
    TodoEditor
  },
  data: () =>
  ({
    todoToEdit: undefined
  }),
  mounted() 
  {
    getTodo(this.$route.params.id)
      .then(todo => {
        this.todoToEdit = todo
        console.log(this.todoToEdit)
      })
      .catch(e => 
      {
        console.warn(e)
        this.offline = true
      }) 
  },
  methods: 
  {
    close()
    {
      this.$router.push('/')
    },
    updateTodo()
    {
      const todoEditor = this.$refs.todoEditor
      const updatedTodo = todoEditor.getTodo()
      const isTodoValid = todoEditor.validateAndSetFocus()

      if(isTodoValid)
      {
        updateTodo(this.$route.params.id, updatedTodo)
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
    <v-card-title>Edit Todo</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <TodoEditor ref="todoEditor" :todo="todoToEdit"></TodoEditor>
    </v-card-text>
    <v-divider></v-divider>
    
    <v-card-actions>
      <v-btn left color="#777777" dark text @click="close()">
        Close
      </v-btn>
      <v-spacer/>
      <v-btn right color="primary" text @click="updateTodo()">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>