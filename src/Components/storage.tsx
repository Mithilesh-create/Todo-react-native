import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

export const storage = new MMKV()
export const storageList = new MMKV({
    id: "list-storage"
})
export const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return storageList.set(name, value)
    },
    getItem: (name) => {
        const value = storageList.getString(name)
        return value ?? null
    },
    removeItem: (name) => {
        return storageList.delete(name)
    },
}
