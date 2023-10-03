import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
		token: null,
		menus: null,
	},
	getters: {
		
		getToken: state => {
			return state.token
		},
		
		getMenus: state => {
			return state.menus
		},
	},
	mutations: {
		setToken: (state, newToken) =>{
			state.token = newToken;
		},
		clearToken: (state) =>{
			state.token = null;
		},
		setMenus: (state, menus) =>{
			state.menus = menus;
		},
		clearMenus: (state) =>{
			state.menus = null;
		},
	}
})
