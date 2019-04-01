import axios from "axios";
const BASE_URL = "https://721la913q3.execute-api.us-east-1.amazonaws.com/prod";
import {SubmissionError} from 'redux-form'

export const FEED_SAVED = 'FEED_SAVED';
export const SHOW_FORM = 'SHOW_FORM';
export function showForm() {
    return {type: SHOW_FORM}
}
export function saveFeed(task) {
    return dispatch => {
        axios
            .post(BASE_URL + "/feeds", task)
            .then(function (response) {
                dispatch({type: FEED_SAVED})
            })
            .catch(function (error) {
                throw new SubmissionError({
                    _error: 'Sorry, our server is having a bad day'
                })
            });
    }
}