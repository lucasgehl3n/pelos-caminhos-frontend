import { defineStore } from 'pinia'


export const deviceStore = defineStore('device', {
    state: () => ({ 
        isMobile: false,
        isDesktop: true,
    }),
})

export default deviceStore;