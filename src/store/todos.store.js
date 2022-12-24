// counter.store.js
import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import {addList, addToDo, changeComplete, getList, removeFolder, removeToDo} from "../services/api";

class TodosStore {
    @observable lists = [];
    @observable currentToDo = null;
    @observable itemToRemove = null;

    constructor() {
        makeObservable(this)
    }

    @action.bound
    async updateList() {
        this.lists = await getList()
    };

    @action.bound
    async handleAddList({name, emoji}) {
        await addList(name, emoji)
        await this.updateList();
    }

    @action.bound
    async handleAddToDo(newToDoTitle) {
        this.currentToDo.todos.push({title: newToDoTitle, completed: false});
        await addToDo(this.currentToDo.folderId, newToDoTitle)
    }

    @action.bound
    async handleChecked (todo, flag) {
        const indexToDoToBeChanged = this.currentToDo.todos.indexOf(todo);
        this.currentToDo.todos[indexToDoToBeChanged].completed = flag;
        await changeComplete(this.currentToDo.todoId, flag)
    }

    @action.bound
    async handleRemoveToDo (todo) {
        const { todoId } = todo;
        const indexToDoToBeChanged = this.currentToDo.todos.indexOf(todo);
        this.currentToDo.todos.splice(indexToDoToBeChanged, 1);
        await removeToDo(todoId)
    }

    @action.bound
    async handleRemoveFolder() {
        await removeFolder(this.itemToRemove.folderId);
        await this.updateList();
        this.itemToRemove = null;
    }

    @action.bound
    setItemToRemove(item) {
        this.itemToRemove = item;
    }

    @action.bound
    setCurrentToDo (item) {
        this.currentToDo = item;
    }

}

const counterStore = new TodosStore();
export const TodosStoreContext = React.createContext(counterStore);
export const useTodosStore = () => React.useContext(TodosStoreContext)
