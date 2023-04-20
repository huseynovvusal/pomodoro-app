import { createStore } from "redux"
import { COLORS } from "../constants"

const initialState = {
  focus: 25 * 60,
  break: 5 * 60,
  color: COLORS.dark,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const store = createStore(reducer)
