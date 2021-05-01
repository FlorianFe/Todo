
<script>

// gives Vue the chance to rerender first
const nextTick = (func) => { setTimeout(func, 0) }

export default {
  name: 'AddTodoDialog',
  components: 
  {

  },
  data: () =>
  {
    return {
        opened: false,
        todoToConstruct: {
            name: '',
            description: '',
            tasks: []
        },
        inputError: ""
    }
  },
  mounted() 
  {
    window.addEventListener("keypress", (e) =>
    {
        if(!this.opened) return

        const ENTER_CODE = "Enter"
        
        if(e.code === ENTER_CODE)
        {
            this.createTodo()
        }
    });
  },
  methods:
  {
    resetInput()
    {
        this.inputError = ""
        this.todoToConstruct = {
            name: '',
            description: '',
            tasks: []
        }
    },
    open()
    {
        this.resetInput() 
        this.opened = true

        nextTick(() => 
        { 
            this.$refs.nameField.focus() 
        })
    },
    close()
    {
        this.opened = false
    },
    createTodo()
    {
        this.inputError = ""

        if(this.$refs.nameField.value.length <= 0) 
        {
            this.inputError = "Name Field is mandatory!"
            this.$refs.nameField.focus()
            return
        }

        this.opened = false
    }
  }
}

</script>

<template>
    <v-dialog v-model="opened" scrollable max-width="500px">
        <v-card>
            <v-card-title>Adding a new Todo</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
                <v-text-field
                    label="Name"
                    ref="nameField"
                    v-model="todoToConstruct.name"
                ></v-text-field>
                <v-text-field 
                    v-model="todoToConstruct.description" 
                    label="Description (optional)"
                ></v-text-field>

                <v-alert v-if="inputError.length > 0"
                    border="right"
                    colored-border
                    type="error"
                    elevation="2"
                > 
                    {{inputError}}
                </v-alert>

            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-btn color="primary" text @click="close()">
                Close
            </v-btn>
            <v-btn color="primary" text @click="createTodo()">
                Save
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
    