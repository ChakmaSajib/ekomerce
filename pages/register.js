import { ListItem, TextField, Typography, List, Link, Button } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from "next/link"
import axios from 'axios'
import { Store } from '../utils/store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from "notistack"
import { useForm, Controller } from "react-hook-form"



export default function Register() {
    const classes = useStyles()

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const { handleSubmit, control, formState: { errors } } = useForm()

    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')

    const { dispatch, state } = useContext(Store)
    const router = useRouter()
    const { redirect } = router
    const { userInfo } = state

    useEffect(() => {
        if (userInfo) {
            router.push("/")
        }
    }, [])


    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        console.log("submit")
        closeSnackbar()
        if (password != confirmPassword) {
            alert("password does not match")
            return
        }
        try {
            const { data } = await axios.post("/api/users/register", {
                name,
                email,
                password,
            })

            dispatch({ type: "USER_LOGIN", payload: data })
            Cookies.set("userInfo", data)
            router.push(redirect || "/")


        } catch (error) {
            enqueueSnackbar(error.response.data ? error.response.data.message : error.message, { variant: "error" })
        }

    }

    return (
        <Layout title="Register">

            <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Typography variant="h1" component="h1">Register</Typography>
                    </ListItem>
                    <ListItem>
                        <Controller name="name" rules={{ required: true, minLength: 2 }} control={control} render={({ field }) =>
                            <TextField inputProps={{ type: "text" }} label="Name" variant="outlined" id="name" fullWidth {...field} error={errors.name} helperText={errors.name ? errors.name.type === 'minLength' ? "Name length is more than 1" : "Name is required" : ''} ></TextField>
                        }>
                        </Controller>

                    </ListItem>
                    <ListItem>
                        <Controller name="email" rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }} control={control} render={({ field }) =>
                            <TextField inputProps={{ type: "email" }} label="Email" fullWidth variant="outlined" id="email" {...field} error={Boolean(errors.email)} helperText={errors.email ? errors.email.type === "pattern" ? "Email is invaild" : "Email is required" : ""} ></TextField>
                        }>
                        </Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password
                                            ? errors.password.type === 'minLength'
                                                ? 'Password length is more than 5'
                                                : 'Password is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>

                    </ListItem>

                    <ListItem>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword
                                            ? errors.confirmPassword.type === 'minLength'
                                                ? 'Confirm Password length is more than 5'
                                                : 'Confirm  Password is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Button fullWidth variant="contained" type="submit">Register</Button>
                    </ListItem>

                    <ListItem>
                        Already have an account? &nbsp;
                        <NextLink href="/" passHref>
                            <Link>Login</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form >
        </Layout >
    )
}
