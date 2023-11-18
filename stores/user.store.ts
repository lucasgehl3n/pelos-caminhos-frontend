import { defineStore } from 'pinia'
class UserInfo {
    name!: string;
    profileImage!: string;
    id!: number;
};
export const deviceStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        userInfos: new UserInfo(),
    }),
    actions: {
        setUser(value: UserInfo){
            this.isAuthenticated = true;
            this.userInfos = value;
        }
    },
    getters:{
        getUserName(state){
            return state.userInfos.name;
        },
        getImageProfile(state){
            return state.userInfos.profileImage;
        }
    }
})

export default deviceStore;