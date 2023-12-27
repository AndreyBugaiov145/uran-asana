import {DoneGroup,InProgressGroup,QAGroup,BacklogGroup} from '../const/group.js'

export const tasks =  [
        {id: 1, title: 'Task 1', priority: 2, groupId: 1,description:'1With supporting text below as a natural lead-in to additional content.'},
        {id: 2, title: 'Task 2', priority: 0, groupId: 2,description:'2With supporting text below as a natural lead-in to additional content.'},
        {id: 3, title: 'Task 3', priority: 1, groupId: 3,description:'3With supporting text below as a natural lead-in to additional content.'},
        {id: 4, title: 'Task 4', priority: 1, groupId: 3,description:'4With supporting text below as a natural lead-in to additional content.'},
        {id: 5, title: 'Task 5', priority: 1, groupId: 3,description:'5With supporting text below as a natural lead-in to additional content.'},
        {id: 6, title: 'Task 6', priority: 2, groupId: 3,description:'6With supporting text below as a natural lead-in to additional content.'},
        {id: 7, title: 'Task 7', priority: 0, groupId: 3,description:'7With supporting text below as a natural lead-in to additional content.'},
        {id: 9, title: 'Task 8', priority: 1, groupId: 3,description:'8With supporting text below as a natural lead-in to additional content.'},
    ]

export const taskGroupsData =  [
    {id: 1, title: BacklogGroup},
    {id: 2, title: InProgressGroup},
    {id: 3, title: QAGroup},
    {id: 4, title: DoneGroup}
]