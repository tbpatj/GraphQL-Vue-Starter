export default function dataReducer(state, action) {
  switch (action.type) {
    case "setUserFromToken": {
      return {
        ...state,
        myUser: action.data,
      };
    }
    case "setAnimationState": {
      console.log("set anim", action.data);
      return {
        ...state,
        animation: { ...state.animation, state: action.data },
      };
    }
    case "setPlayers":
      return { ...state, players: action.data };
    default:
      return { ...state };
  }
}
