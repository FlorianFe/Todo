
<script>

import { remove } from 'ramda'

const toEnglishOrdinalNumber = (decimal) =>
{
    if(decimal <= 0) 
        throw new Error("ordering number must be positive")
    
    if(decimal > 3 && decimal < 21) 
        return `${decimal}th`
  
    switch (decimal % 10)
    {
        case 1:  
            return `${decimal}st`
        case 2:  
            return `${decimal}nd`
        case 3:  
            return `${decimal}rd`
        default: 
            return `${decimal}th`
    }
}

const generateNextTaskId = (todo) =>
{
    if(todo.tasks.length > 0)
    {
        const lastTaskIndex = todo.tasks.length - 1
        const lastTask = todo.tasks[lastTaskIndex]

        return lastTask.id + 1
    }
    else
    {
        return 1
    }
}

export default {
    name: 'TodoEditor',
    props: 
    { 
        todo: 
        {
            type: Object,
            default: () => 
            ({
                name: '',
                description: '',
                tasks: []
            })
        }
    },
    data: () =>
    {
        return {
            inputErrorMessage: "",
            valid: true
        }
    },
    methods:
    {
        focusTodoNameField()
        {
            this.$refs.nameField.focus() 
        },
        addTask()
        {
            this.todo.tasks.push(
            {
                id: generateNextTaskId(this.todo),
                name: '',
                description: ''
            })
        },
        deleteTaskById(id)
        {
            const indexToRemove = this.todo.tasks
                .map((task) => task.id)
                .indexOf(id)

            this.todo.tasks = remove(indexToRemove, 1, this.todo.tasks)
        },
        validateAndSetFocus()
        {
            const hasTodoAName = (this.todo.name.length > 0)
            const doesEveryTaskHaveAName = this.todo.tasks.every(task => task.name.length > 0)

            const onInputInInvalidTextField = () => 
            {
                this.valid = true
                this.inputErrorMessage = ''
            }

            if(!hasTodoAName)
            {
                const invalidTextField = this.$refs.nameField

                invalidTextField.focus()
                invalidTextField.$el.addEventListener('input', onInputInInvalidTextField, { once : true})
                
                this.valid = false
                this.inputErrorMessage = `The "Name"-Field of a Todo is mandatory`

                return this.valid
            }

            if(!doesEveryTaskHaveAName)
            {
                const validationOfTaskNames = this.todo.tasks.map((task) => task.name.length > 0)
                const indexOfFirstInvalidTask = validationOfTaskNames.indexOf(false)
                const invalidTextField = this.$refs.taskNameFields[indexOfFirstInvalidTask]

                invalidTextField.focus()
                invalidTextField.$el.addEventListener('input', onInputInInvalidTextField, { once : true})

                this.valid = false
                this.inputErrorMessage = `The ${toEnglishOrdinalNumber(indexOfFirstInvalidTask + 1)} Task is missing a name`

                return this.valid
            }

            this.valid = true
            this.inputErrorMessage = ``

            return this.valid
        },
        getTodo() 
        {
            return this.todo;
        }
    }
}

</script>

<style scoped>

h2
{
  text-align: left;
  font-weight: normal;
}

.full-width
{
  width: 100%;
}

.task-card
{
  padding: 15px;
  margin-bottom: 30px;
}

</style>


<template>
    <div>
        <v-text-field
            label="Name"
            ref="nameField"
            v-model="todo.name"
            ></v-text-field>
            <v-text-field 
            label="Description (optional)"
            v-model="todo.description"
        ></v-text-field>

        <br>

        <h2>Tasks</h2>

        <br>

        <v-card 
            class="task-card" 
            v-for="task in todo.tasks" 
            v-bind:key="task.id"
        >
            <v-text-field
                label="Name"
                v-model="task.name"
                ref="taskNameFields"
            ></v-text-field>
            <v-text-field 
                label="Description (optional)"
                v-model="task.description"
            ></v-text-field>
            <div class="text-right">
                <v-btn @click="deleteTaskById(task.id)" align="right">
                    Delete Task
                </v-btn>
            </div>
        </v-card>

        <v-btn 
            class="full-width"
            color="primary"
            @click="addTask()"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <br><br>

        <v-alert 
            v-if="!valid"
            border="right"
            colored-border
            type="error"
            elevation="2"
        > 
            {{inputErrorMessage}}
        </v-alert>
    </div>
</template>