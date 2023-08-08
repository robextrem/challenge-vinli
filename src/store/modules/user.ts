import { defineStore } from 'pinia'
import axios from 'axios'
import User from '../../types/User'
import Store from '../../types/Organization'

export const useUserStore = defineStore('user',{
  state: () => ({
    user: null as User|null,
    store: null as Store|null
  }),
  actions: {
    getUser() {
      return this.user
    },
    getStore() {
      return this.store
    },
    async signOut() {
      this.deleteUser()
      this.user= null
    },
    async selectStore(index:number){
      return this.store =(this.user)?this.user.orgs[index]:null
    },
    async signIn(email:string, password:string) {
      await axios({
        url: `${import.meta.env.VITE_APP_API_URL}/v1/sessions`,
        method: 'post',
        data: {
          session:{
            email: email.toLowerCase(),
            password: password
          }
        },
      }).then(async (response)=>{
        this.user = response.data.session
        this.selectStore(0)
      })
      return this.user
    },
    async hasSession() {
      try{
        const response = await axios({
          url: `${import.meta.env.VITE_APP_API_URL}/v1/sessions/_current`,
          method: 'get',
        })
        this.user = response.data.session?response.data.session:null
        this.selectStore(0)
        console.log("Ya tiene session")
      }catch(e){
        console.log("Unauthorized")
      }finally{
        return this.user?true:false
      }
    },
    async deleteUser() {
      if(this.user){
        await axios({
          url: `${import.meta.env.VITE_APP_API_URL}/v1/sessions/_current`,
          method: 'delete',
        })
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: import.meta.env.VITE_APP_STORAGE_KEY,
        storage: (import.meta.env.VITE_APP_STORAGE == "local")?localStorage:sessionStorage
      },
    ],
  },
})
