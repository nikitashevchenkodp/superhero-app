import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './form.scss'
import useMarvelService from '../../services/marvel-service'
import { useState } from 'react/cjs/react.development'
import { useHistory } from 'react-router-dom'

const Form = () => {
    const {loading, getCharacterByName} = useMarvelService();
    const [error, setError] = useState('')
    const [name, setName] = useState(null)

    const getCharSubmit = (values) => {
        setError('')
        const {name} = values;
        getCharacterByName(name)
            .then(res => {
                setName(res.name)
            })
            .catch(() => setError('There is no such char'))

    }

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(2,"Min length is 2 chars")
                    .required("Is required")
        }),
        onSubmit:(values) => getCharSubmit(values)
    })


  return (
    <form className='form' onSubmit={formik.handleSubmit}>
        <div className='form__text'>Or find a character by name:</div>
        <div className='input__block'>
            <input 
                className='input' 
                type = 'text' 
                name = 'name'
                value={formik.values.name}
                {...formik.getFieldProps('name')}/>
            <button className='button button__main'>
                <div className="inner">Find</div>
            </button>
            {(formik.errors.name || error) ?
                         <div className='error'>{formik.errors.name || error}</div> :
                                 (!error && <Success id = {name} name = {formik.values.name} disabled = {loading}/>)}
        </div>
    </form>
  )
}

const Success = ({id, name, disabled}) => {

    const history = useHistory()

    return (
        <div className='success'>
            <div>
                There is link to {name} 
            </div>
            <button
                className='button button__main btn-success'
                onClick={() => history.push(`/characters/${id}`)}
                disabled = {disabled}
                >
                <div className="inner">To Page</div>
            </button>
        </div>
    )
}

export default Form