import { DoneGroup, InProgressGroup, QAGroup, BacklogGroup } from '@/const/group'

export interface Task {
  id: number
  title: string
  priority: number
  groupId: number
  description: string
}

export interface TaskGroupData {
  id: number
  title: typeof BacklogGroup | typeof InProgressGroup | typeof QAGroup | typeof DoneGroup
  searchStr?: string
}

export interface TaskGroupDataWithTasks extends TaskGroupData {
  tasks: Task[]
}
