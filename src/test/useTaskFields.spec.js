import { test,assert,describe } from 'vitest'
import { useTaskFields } from '@/use/taskFields'

describe('useTaskFields', () => {
    test('should initialize with task values', () => {
        const task = {
            title: 'Sample Title',
            description: 'Sample Description',
            priority: 42
        }

        const { title, description, priority } = useTaskFields(task)

        assert.equal(title.value, 'Sample Title')
        assert.equal(description.value, 'Sample Description')
        assert.equal(priority.value, 42)
    })

    test('should initialize with default values if task is {}', () => {
        const { title, description, priority } = useTaskFields({})

        assert.equal(title.value, '')
        assert.equal(description.value, '')
        assert.equal(priority.value, '')
    })

    test('should update values when task is updated', () => {
        const task = {
            title: 'Sample Title',
            description: 'Sample Description',
            priority: 42
        }

        const { title, description, priority } = useTaskFields({})
        title.value = task.title
        description.value = task.description
        priority.value = task.priority

        assert.equal(title.value, 'Sample Title')
        assert.equal(description.value, 'Sample Description')
        assert.equal(priority.value, 42)
    })

})