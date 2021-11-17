import { getOrganizeTree } from '@/api/permission/organize'
import { getDepartmentSelector } from '@/api/permission/department'
import { getDictionaryType } from '@/api/systemData/dictionary'

const state = {
  companyTree: [],
  depTree: [],
  dicTree: [],
  formItemList: [],
  subTable: [],
  hasTable: false,
  relationData: {}
}

const mutations = {
  SET_COMPANY_TREE: (state, companyTree) => {
    state.companyTree = companyTree
  },
  SET_DEP_TREE: (state, depTree) => {
    state.depTree = depTree
  },
  SET_DIC_TREE: (state, dicTree) => {
    state.dicTree = dicTree
  },
  UPDATE_FORMITEM_LIST(state, list) {
    state.formItemList = list
  },
  UPDATE_SUB_TABLE(state, subTable) {
    state.subTable = subTable
  },
  SET_TABLE(state, val) {
    state.hasTable = val
  },
  UPDATE_RELATION_DATA(state, val) {
    state.relationData = val
  }
}

const actions = {
  getCompanyTree({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.companyTree.length) {
        getOrganizeTree().then(res => {
          commit('SET_COMPANY_TREE', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.companyTree)
      }
    })
  },
  getDepTree({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.depTree.length) {
        getDepartmentSelector().then(res => {
          commit('SET_DEP_TREE', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.depTree)
      }
    })
  },
  getDicTree({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.dicTree.length) {
        getDictionaryType().then(res => {
          commit('SET_DIC_TREE', res.data.list)
          resolve(res.data.list)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.dicTree)
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}