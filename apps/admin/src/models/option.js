import { message } from 'antd'
import { getAuth, getOption, updateAuth, updateOption } from '../services/api'

export default {
  namespace: 'option',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {}
  },

  effects: {
    *fetchAuth({ payload }, { call, put }) {
      const response = yield call(getAuth, payload)
      yield put({
        type: 'getOption',
        payload: response
      })
      return response
    },
    *fetchOption({ payload }, { call, put }) {
      const response = yield call(getOption, payload)
      yield put({
        type: 'getOption',
        payload: response
      })
    },
    *updateAuth({ payload }, { call, put }) {
      const response = yield call(updateAuth, payload)
      const res = yield call(getAuth)
      if (response && response.code === 1) {
        yield put({
          type: 'getAuth',
          payload: res
        })
        message.success(response.message)
      } else {
        response
          ? message.error(response.message)
          : message.error('认证过期，重新登录')
      }
    },
    *updateOption({ payload }, { call, put }) {
      const response = yield call(updateOption, payload)
      const res = yield call(getOption)
      if (response && response.code === 1) {
        yield put({
          type: 'getOption',
          payload: res
        })
        message.success(response.message)
      } else {
        response
          ? message.error(response.message)
          : message.error('认证过期，重新登录')
      }
    }
  },

  reducers: {
    getOption(state, action) {
      return {
        ...state,
        data: {
          option: action.payload,
          auth: state.data.option
        }
      }
    }
  }
}
