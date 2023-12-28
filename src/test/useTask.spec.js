import { test,assert,describe } from 'vitest'
import {  createApp } from 'vue'
import { createPinia } from 'pinia'
import { ref } from 'vue'
import { useTask } from '@/use/task'

const app = createApp()
app.use(createPinia())
app.mount(document.createElement('div'))

describe('useTask', () => {
    test('should initialize correctly',async () => {
        const taskGroups = ref([
            {
                id: 1,
                title: 'Group 1',
                tasks: [
                    { id: 1, title: 'Task 1', priority: 2, groupId: 1, description: 'Description 1' },
                    { id: 2, title: 'Task 2', priority: 1, groupId: 1, description: 'Description 2' }
                ]
            },
            {
                id: 2,
                title: 'Group 2',
                tasks: [
                    { id: 3, title: 'Task 3', priority: 3, groupId: 2, description: 'Description 3' }
                ]
            }
        ])

        const { taskCard, editMode, showTaskCard, closeTaskCard, canEditTask, orderList, filterTaskBySearchStr, setEditMode } = useTask(taskGroups)

        assert.equal(taskCard.value, null)
        assert.equal(editMode.value, false)

        setEditMode()
        showTaskCard(null, 'Group 1' , true)

        assert.equal(editMode.value, true)
        assert.equal(taskCard.value.groupName, 'Group 1')

        closeTaskCard({ id: 33, title: 'Task 33', priority: 2, groupId: 1, description: 'Description 33' }, false)
        assert.equal(taskCard.value, null)
        assert.equal(editMode.value, false)

        const result = canEditTask('Group 1')
        assert.equal(result, true)

    })

    test('orderList should sort tasks by priority', async () => {
        const taskGroups = ref([
            {
                id: 1,
                title: 'Group 1',
                tasks: [
                    { id: 1, title: 'Task 1', priority: 1, groupId: 1, description: 'Description 1' },
                    { id: 2, title: 'Task 2', priority: 2, groupId: 1, description: 'Description 2' }
                ]
            }
        ])
        const { orderList } = useTask(taskGroups)
        assert.equal(taskGroups.value[0].tasks[0].priority, 1)
        assert.equal(taskGroups.value[0].tasks[1].priority, 2)
        orderList(1)

        assert.equal(taskGroups.value[0].tasks[0].priority, 2)
        assert.equal(taskGroups.value[0].tasks[1].priority, 1)
    })

    test('showTaskCard should set taskCard and editMode correctly', async () => {
        const taskGroups = ref([
            {
                id: 1,
                title: 'Group 1',
                tasks: [
                    { id: 1, title: 'Task 1', priority: 2, groupId: 1, description: 'Description 1' },
                    { id: 2, title: 'Task 2', priority: 1, groupId: 1, description: 'Description 2' }
                ],
                searchStr: 'Task 1'
            }
        ])

        const { taskCard ,editMode , showTaskCard } = useTask(taskGroups)
        showTaskCard({ id: 1, title: 'Task 1', priority: 2, groupId: 1, description: 'Description 1' }, 'Group 1')

        assert.equal(taskCard.value.groupId, 1)
        assert.equal(taskCard.value.groupName, 'Group 1')
        assert.equal(editMode.value, false)

    })
})