import React, { useEffect, useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

function MyTextInput({ label, ...props }) {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

function MyCheckbox({ children, ...props }) {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <>
            <label className="checkbox">
                <input {...field} {...props} type="checkbox" />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);`

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌";
    font-size: 10px;}`

const StyledLabel = styled.label`margin-top: 1rem;`

function MySelect({ label, ...props }) {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
};







//HEREITGOES
const esquemaValidacao = Yup.object({
    nome: Yup.string().max(15, "O campo do nome não deve ser maior que 15 caracteres").required("Insira seu nome").min(5, "O nome deve ser maior que 5 caracteres"),
})

function SignupForm() {
    const [opcao, setOpcao] = useState('')

    function _handleChange(event) {
        setOpcao(event.target.value)
    }

    return (
        <>
            <h1>Inscreva-se!</h1>
            <Formik 
            
            initialValues={{
                nome: "",
            }}
                validationSchema={esquemaValidacao}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    setSubmitting(false);
                }}>
                <Form className='container m-auto'>
                    
                <OutlinedInput className="w-full h-10" label="teste"/>
                </Form>
            </Formik>
        </>
    );
};

export default SignupForm;
