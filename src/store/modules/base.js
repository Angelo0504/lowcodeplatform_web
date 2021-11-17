import { getDictionaryAll } from '@/api/systemData/dictionary'
import { UserListAll, getUserSelector } from '@/api/permission/user'
import { getPositionListAll, getPositionSelector } from '@/api/permission/position'

const state = {
  dictionaryList: [],
  userList: [],
  userTree: [],
  positionList: [],
  positionTree: [],
}

const mutations = {
  SET_DICTIONARY_LIST: (state, dictionaryList) => {
    state.dictionaryList = dictionaryList
  },
  SET_USER_LIST: (state, userList) => {
    state.userList = userList
  },
  SET_USER_TREE: (state, userTree) => {
    state.userTree = userTree
  },
  SET_POSITION_LIST: (state, positionList) => {
    state.positionList = positionList
  },
  SET_POSITION_TREE: (state, positionTree) => {
    state.positionTree = positionTree
  },
}

const actions = {
  getDictionaryAll({ commit }) {
    return new Promise((resolve, reject) => {
      getDictionaryAll().then(res => {
        commit('SET_DICTIONARY_LIST', res.data.list)
        resolve(res.data.list)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDictionaryData({ state, dispatch }, info) {
    return new Promise(async resolve => {
      let list = [],
        data = [],
        json = []
      if (!state.dictionaryList.length) {
        list = await dispatch('getDictionaryAll')
      } else {
        list = state.dictionaryList
      }
      if (info.sort) {
        data = list.filter(o => o.enCode === info.sort)[0]
        if (!info.id) {
          json = data.dictionaryList
        } else {
          let rowData = [];
          if (!data.isTree) {
            rowData = data.dictionaryList.fliter(v => v.id == info.id)
          } else {
            function findData(list) {
              for (let i = 0; i < list.length; i++) {
                const e = list[i];
                if (e.id == info.id) {
                  rowData[0] = e
                  break
                }
                if (e.children && e.children.length) {
                  findData(e.children)
                }
              }
            }
            findData(data.dictionaryList)
          }
          if (rowData.length) {
            json = rowData[0];
          } else {
            json = {
              id: "",
              fullName: ""
            };
          }
        }
      }
      resolve(json)
    })
  },
  getPositionList({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.positionList.length) {
        getPositionListAll().then(res => {
          commit('SET_POSITION_LIST', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.positionList)
      }
    })
  },
  getPositionTree({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.positionTree.length) {
        getPositionSelector().then(res => {
          commit('SET_POSITION_TREE', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.positionTree)
      }
    })
  },
  getUserTree({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.userTree.length) {
        getUserSelector().then(res => {
          commit('SET_USER_TREE', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.userTree)
      }
    })
  },
  getUserList({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.userList.length) {
        UserListAll().then(res => {
          commit('SET_USER_LIST', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.userList)
      }
    })
  },
  getUserInfo({ state, dispatch }, id) {
    return new Promise(async resolve => {
      let list = []
      if (!state.userList.length) {
        list = await dispatch('getUserList')
      } else {
        list = state.userList
      }
      let item = list.filter(o => o.id === id)[0]
      // let name = item.realName + '/' + item.account
      resolve(item || {})
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}