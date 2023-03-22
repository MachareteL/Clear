import React, { useEffect, useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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

const esquemaValidacao = Yup.object({
    nome: Yup.string().max(15, "O campo do nome não deve ser maior que 15 caracteres").required("Insira seu nome").min(5, "O nome deve ser maior que 5 caracteres"),
    lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    email: Yup.string().email("Invalid email addresss`").required("Required"),
    acceptedTerms: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
    jobType: Yup.string().oneOf(["designer", "development", "product", "other"], "Invalid Job Type").required("Required")
})
// specify the set of valid values for job type
// @see http://bit.ly/yup-mixed-oneOf


function SignupForm() {
    const [opcao, setOpcao] = useState('')

    function _handleChange(event) {
        setOpcao(event.target.value)
    }

    return (
        <>
            <h1>Subscribe!</h1>
            <Formik initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                acceptedTerms: false, // added for our checkbox
                jobType: "" // added for our select
            }}
                validationSchema={esquemaValidacao}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    setSubmitting(false);
                }}>
                <Form>
                    <MyTextInput
                        label="Nome"
                        name="nome"
                        type="text"
                        placeholder="Jane"
                    />
                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <FormControl fullWidth>

                        <InputLabel id='opcao'>Teste</InputLabel>
                        <Select labelId="opcao" label="opcao" name="opcao" value={opcao} onChange={_handleChange}>
                            <MenuItem value="">Selecione uma opcao</MenuItem>
                            <MenuItem value="opcao 1">Opção 1</MenuItem>
                            <MenuItem value="opcao 2">Opção 2</MenuItem>
                            <MenuItem value="opcao 3">Opção 3</MenuItem>
                            <MenuItem value="opcao 4">Opção 4</MenuItem>
                        </Select>
                    </FormControl>
                    <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default SignupForm;
