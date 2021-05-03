
<script>

import { remove } from 'ramda'

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
            inputError: ""
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
        validate()
        {
            // this.$refs.nameField

            // TODO
        },
        getTodo() 
        {
            return this.todo;
        }
    }
}

</script>

<style scoped>

.btn-add-task
{
  width: 100%;
}

.task-card
{
  padding: 15px;
  margin-bottom: 30px;
}

h2
{
  text-align: left;
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

        <h2>Tasks:</h2>

        <br>

        <v-card 
        class="task-card" 
        v-for="task in todo.tasks" 
        v-bind:key="task.id"
        >
            <v-text-field
                label="Name"
                v-model="task.name"
            ></v-text-field>
            <v-text-field 
                label="Description (optional)"
                v-model="task.description"
            ></v-text-field>
            <v-btn @click="deleteTaskById(task.id)">
                Delete Task
            </v-btn>
        </v-card>

        <v-btn 
            class="btn-add-task"
            @click="addTask()"
        >
            +
        </v-btn>

        <br><br>

        <v-alert 
            v-if="inputError.length > 0"
            border="right"
            colored-border
            type="error"
            elevation="2"
        > 
            {{inputError}}
        </v-alert>
    </div>
</template>