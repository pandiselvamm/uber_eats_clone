import { createStore } from 'redux'
import reducer from './reducers/index'

export default function configureStore(initalState) {
    return createStore(reducer, initalState);
}