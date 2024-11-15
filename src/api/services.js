export const getTodos = async () => {
  try {
    const response = await fetch('http://localhost:3000/todos')
    const todos = await response.json()
    return todos
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to server')
    }
    return new Error(`Could not fetch todos, ${error.message}`)
  }
}
export const updateTodos = async ({ id, updatedTodo, updatedAt }) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: updatedTodo, updatedAt: updatedAt }),
    })

    const responseJSON = await response.json()
    return responseJSON
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to server')
    }
    return new Error(`Could not update todo, ${error.message}`)
  }
}

export const createTodo = newTodo => {
  try {
    const response = fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then(response => response.json())
    return response
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to server')
    }
    return new Error(`Could not create todo, ${error.message}`)
  }
}

export const deleteTodo = id => {
  try {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => console.log('Todo deleted'))
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to server')
    }
    return new Error(`Could not update todo, ${error.message}`)
  }
}
