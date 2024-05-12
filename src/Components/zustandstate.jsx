import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from './storage';

export const useBearStore = create(persist((set, get) => ({
    data: [],
    ActiveTodos: 0,
    DeletedTodos: 0,
    addData: (x) => set((state) => { return { data: [...state.data, x], ActiveTodos: state.ActiveTodos + 1 } }),
    completeData: (index) => set((state) => {
        const updatedTODOList = [...state.data];
        updatedTODOList[index] = { ...updatedTODOList[index], Completed: !updatedTODOList[index].Completed };
        return { data: updatedTODOList, ActiveTodos: state.ActiveTodos <= 0 ? 0 : state.ActiveTodos - 1 };
    }),
    deleteData: (index) => set((state) => {
        const updatedTODOList = [...state.data];
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        var futureTimestamp = Math.floor(futureDate.getTime());
        updatedTODOList[index] = { ...updatedTODOList[index], isDeleted: true, deletionDate: futureTimestamp };
        return { data: updatedTODOList, DeletedTodos: state.DeletedTodos + 1, ActiveTodos: state.ActiveTodos <= 0 ? 0 : state.ActiveTodos - 1 };
    }),
    revertDeleteData: (index) => set((state) => {
        const updatedTODOList = [...state.data];
        const timestamp = Math.floor(Date.now() / 1000)
        updatedTODOList[index] = { ...updatedTODOList[index], isDeleted: false, Completed: false, deletionDate: null, creationDate: timestamp };
        return { data: updatedTODOList, DeletedTodos: state.DeletedTodos <= 0 ? 0 : state.DeletedTodos - 1, ActiveTodos: state.ActiveTodos + 1 };
    }),
    hiddenData: (index) => set((state) => {
        const updatedTODOList = [...state.data];
        updatedTODOList[index] = { ...updatedTODOList[index], isHidden: true };
        return { data: updatedTODOList, DeletedTodos: state.DeletedTodos <= 0 ? 0 : state.DeletedTodos - 1, };
    }),

}), {
    name: 'list-storage',
    storage: createJSONStorage(() => zustandStorage),
},
))