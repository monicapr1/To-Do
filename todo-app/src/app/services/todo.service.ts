import { Injectable } from '@angular/core';
import { To } from '../interfaces/to';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://localhost:3000/todos';

  constructor() { }

  getTodos(): Promise<To[]> {
    return fetch(this.baseUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
        return []; // Devuelve un array vacío si hay un error
      });
  }

  createTodo(title: string): Promise<To> {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
        return null; // Devuelve null si hay un error
      });
  }

  updateTodo(id: number, title: string, completed: boolean): Promise<To> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, completed })
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
        return null; // Devuelve null si hay un error
      });
  }

  deleteTodo(id: number): Promise<void> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Todo deleted successfully');
      })
      .catch(error => console.error('Error:', error));
  }
}
