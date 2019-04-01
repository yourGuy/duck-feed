import update from "immutability-helper/index";
import {reducer as formReducer} from "redux-form";
import {
    FEED_SAVED,
    SHOW_FORM
} from './actions';

const initStates = {
    showForm: false,
    showThankYouMessage: false
}

function duckFeedApp(state = initStates, action) {
    switch (action.type) {
        case FEED_SAVED:
            return update(state, {showForm: {$set: false}, showThankYouMessage: {$set: true}})
        case SHOW_FORM:
            return update(state, {showForm: {$set: true}, showThankYouMessage: {$set: false}})
        default:
            return state;
    }
}
const reducers = {
    duckFeedApp,
    form: formReducer
};

export default reducers;


