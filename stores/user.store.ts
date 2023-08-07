import { defineStore } from 'pinia'

export const deviceStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        userInfos: {},
    }),
    actions: {
        setUserAuthentication(value: boolean){
            this.isAuthenticated = value;
        }
    },
})

export default deviceStore;