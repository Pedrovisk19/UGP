'use client'

import * as React from 'react'
import type { ToastProps } from './toast'

const TOAST_LIMIT = 3
const TOAST_TIMEOUT = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type State = { toasts: ToasterToast[] }
type Action =
  | { type: 'ADD'; toast: ToasterToast }
  | { type: 'REMOVE'; id: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case 'REMOVE':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) }
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((l) => l(memoryState))
}

type ToastOptions = Omit<ToasterToast, 'id'>

function toast({ ...props }: ToastOptions) {
  const id = genId()
  const remove = () => dispatch({ type: 'REMOVE', id })

  dispatch({
    type: 'ADD',
    toast: {
      id,
      ...props,
    },
  })

  setTimeout(remove, TOAST_TIMEOUT)
  return { id, remove }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const idx = listeners.indexOf(setState)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])
  return {
    ...state,
    toast,
    dismiss: (id: string) => dispatch({ type: 'REMOVE', id }),
  }
}

export { useToast, toast }