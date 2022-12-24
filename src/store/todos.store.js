// counter.store.js
import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import {addList, addToDo, changeComplete, getList, removeFolder, removeToDo} from "../services/api";

class TodosStore {
    lists = [];
    currentToDo = null;
    itemToRemove = null;

    constructor() {
        makeObservable(this, {
            count: observable,
            increment: action.bound,
            decrement: action.bound
        })
    }

    async updateList() {
        this.lists = await getList()
    };

    async handleAddList(name, emoji) {
        await addList(name, emoji)
        await this.updateList();
    }

    async handleAddToDo(newToDoTitle) {
        this.currentToDo.todos.push({title: newToDoTitle, completed: false});
        await addToDo(this.currentToDo.folderId, newToDoTitle)
    }

    async handleChecked (todo, flag) {
        const indexToDoToBeChanged = this.currentToDo.todos.indexOf(todo);
        this.currentToDo.todos[indexToDoToBeChanged].completed = flag;
        await changeComplete(this.currentToDo.todoId, flag)
    }

    async handleRemoveToDo (todo) {
        const { todoId } = todo;
        const indexToDoToBeChanged = this.currentToDo.todos.indexOf(todo);
        this.currentToDo.todos.splice(indexToDoToBeChanged, 1);
        await removeToDo(todoId)
    }

    async handleRemoveFolder() {
        await removeFolder(this.itemToRemove.folderId);
        await this.updateList();
        this.itemToRemove = null;
    }

    async setItemToRemove(item) {
        this.itemToRemove = item;
    }

}

// Instantiate the counter store.
const counterStore = new TodosStore();
// Create a React Context with the counter store instance.
export const TodosStoreContext = React.createContext(counterStore);
export const useTodosStore = () => React.useContext(TodosStoreContext)
