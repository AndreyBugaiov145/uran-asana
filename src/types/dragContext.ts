export interface DragContext {
  relatedContext: {
    [key: string]: any
  }
  draggedContext: {
    element: {
      [key: string]: any
    }
  }
}
