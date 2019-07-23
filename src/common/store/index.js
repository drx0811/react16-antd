
import {createStore} from "redux";
import { combineReducers } from 'redux';

function changer(state={title:null,},action,){
    switch (action.type){
        case "SETTITLE"://case可以有很多,
			// console.log(action.value)
			return {
				...state,
				title: action.value,
            };
        default:
            return state
    }
}

function home(state = {}, action) {
    switch (action.type) {
		case 'RECEIVE_NAV':
			return {
				...state,   //三个点是展开符
				a: action.a // 或别的值
			}
		case 'RECEIVE_BOOK':
			return Object.assign({}, state, action.value ); // 这样保证传来的 action.value是个对象
		default:
			return state;
	}
}
// function mapStateToProps(state) {
//     return {
//         title:state.title,
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         onChange:(action)=>dispatch(action)
//     }
// }

const rootReducer = combineReducers({
	changer,
    home//首页相关  connect里state 就有这个属性，是个对象，这个对象又有两个属性a和b
});
export let store=createStore(rootReducer);
// export {mapStateToProps,mapDispatchToProps,store}