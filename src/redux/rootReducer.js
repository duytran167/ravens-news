// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import user from './user/user.reducer'

const rootReducer = {
  auth,
  navbar,
  layout,
  user
}

export default rootReducer
