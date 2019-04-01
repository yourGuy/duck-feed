import React, { Component } from "react";
import _ from "lodash";
import { connect } from 'react-redux'
import {saveFeed, showForm} from '../actions'
import {Field, reduxForm, formValueSelector} from "redux-form";
import { Button, Row, Container, FormGroup } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const mapStateToProps = (state) => {
    const duckFeedAppState = state.duckFeedApp;
    return {
        showForm: duckFeedAppState.showForm,
        showThankYouMessage: duckFeedAppState.showThankYouMessage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleShowForm: () => dispatch(showForm()),
        handleSaveFeed: (values) => dispatch(saveFeed(values))
    }
}
export default class DuckFeedContainer extends Component {
    render() {
        const {handleSaveFeed, handleShowForm, showThankYouMessage, showForm}= this.props
        return <Container>
            <Row >
                <h3>Welcome to happy duck feed survey </h3>
                <p>Please help us make the world a better place for ducks by providing a few details about you duck feeds</p>
            </Row>
            <Row>
                {showForm ?
                    <FeedForm onSubmit={handleSaveFeed}/>
                    :
                    <div><Button color={'success'} onClick={handleShowForm}>Log a duck feed</Button></div>
                }
            </Row>
            <Row>
                {showThankYouMessage && <p>Thank you for your submission !</p>}
            </Row>
        </Container>
    }
}

DuckFeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DuckFeedContainer);

const renderField = ({input, label, type, placeholder, meta: { touched, error, warning }}) => (
     <FormGroup >
        <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder} className={'form-control' + (touched && error ? " border-danger" : "")} />
            {touched && (error && <span className={'text-danger'}>{error}</span>) }
     </FormGroup>
)

const TimePicker = ({input, label, type, placeholder, meta: {touched, error, warning}, ...custom}) => (
    <div className={'form-group'}>
        <FormControl style={{minWidth: '190px'}}>
            <TextField
                id="feedTime"
                {...input}
                {...custom}
                label="Feed Time"
                type="time"
                defaultValue="07:30"
                onChange={input.onChange}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: 'text-dark'
                    },
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            {renderFromHelper({touched, error})}
        </FormControl>
    </div>
)
const renderSelectField = ({input, label, meta: { touched, error }, children, ...custom}) => (
    <div className={'form-group'} >
        <FormControl style={{minWidth: '190px'}}>
            <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
            <Select
                {...input}
                onChange={input.onChange}
                children={children}
                {...custom}
                inputProps={{
                    name: input.name,
                    id: 'scheduale-controlled-open-select',
                }}
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    </div>
)
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText className={'text-danger'}>{error}</FormHelperText>
    }
}
const formFieldValidator = {
    integer: (value) => isNaN(parseInt(value)) ? 'Must be a number' : undefined,
    required: (value) => _.isEmpty(value) ?  'Required': undefined
}

const formNormalizer = {
    'digits': value =>  value.replace(/\D/g,'')
}

class FeedForm extends React.Component {
    render() {
        const {isScheduale, onSubmit, handleSubmit, error} = this.props
        return <div>
            {error && <span className={'text-danger'}>{error}</span>}
            <Field
                name={'feedTime'}
                label={'Feed Time'}
                type="text"
                component={TimePicker}
                validate={formFieldValidator.required}
            />
            <Field
                name={'feedType'}
                label={'Feed Type'}
                type="text"
                placeholder={'Bread'}
                component={renderField}
                validate={formFieldValidator.required}
            />
            <Field
                name={'feedLocation'}
                label={'Feed Location'}
                placeholder={'City, State, Country'}
                type="text"
                component={renderField}
                validate={formFieldValidator.required}
            />
            <Field
                name={'feedQuantity'}
                label={'Amount of food in grams'}
                type="text"
                component={renderField}
                validate={[formFieldValidator.integer, formFieldValidator.integer]}
                placeholder={'500'}
                normalize={formNormalizer.decimal}
            />
            <Field
                name={'duckQuantity'}
                label={'Amount of ducks feed'}
                type="text"
                component={renderField}
                validate={[formFieldValidator.integer, formFieldValidator.integer]}
                placeholder={'25'}
                normalize={formNormalizer.digits}
            />
            <Field
                name={'isScheduale'}
                label={'Is it a recurring feed'}
                type="checkbox"
                component={renderField}
            />
            {isScheduale &&
            <Field
                name="scheduale"
                component={renderSelectField}
                label="What is the scheduale"
                >
                <option value="onceAMonth" >Once a month </option>
                <option value="biWeek" >Bi weekly </option>
                <option value="onceAWeek" >Once a week </option>
                <option value="twiceAWeek" >2 days a week </option>
                <option value="threeAWeek" >3 days a week </option>
                <option value="fourAWeek" >4 days a week </option>
                <option value="fiveAWeek" >5 days a week </option>
                <option value="sixAWeek" >6 days a week </option>
                <option value="everyDay" >Every Day</option>
                <option value="twiceDay" >Twice a Day</option>
                <option value="other" >Other</option>
                </Field>
            }
            <Button color={'success'} onClick={handleSubmit(onSubmit)}>Feed the ducks</Button>
        </div>
    }
}
FeedForm = reduxForm({
    form: 'feedForm'
})(FeedForm)

const selector = formValueSelector('feedForm')
FeedForm = connect(state => {
    const isScheduale = selector(state, 'isScheduale')
    return {
        isScheduale
    }
})(FeedForm)