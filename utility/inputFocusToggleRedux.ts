import {connect, useDispatch} from 'react-redux'
import { TOGGLE_INPUT_FOCUS } from '../redux/actions'

// export default async function inputFocusToggleRedux(payload:string) { TOGGLE_INPUT_FOCUS( { payload: payload }) }
export default function inputFocusToggleRedux(payload:string) { 

    TOGGLE_INPUT_FOCUS( { payload: payload }) 
}

const mapStateToProps = (state:any) => ({
    INPUT_FOCUS: state.INPUT_FOCUS
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action))
})
