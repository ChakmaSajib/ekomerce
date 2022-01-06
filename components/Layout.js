import React, { useContext, useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Link, createTheme, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem } from '@mui/material';
import NextLink from "next/link"
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';


export default function Layout({ title, description, children }) {
    const { state, dispatch } = useContext(Store)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()
    const { darkMode, cart, userInfo } = state
    const router = useRouter()

    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            h2: {
                fontSize: '1rem',
                fontWeight: 400,
                margin: '1rem 0'
            },

        },

        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000'
            },
            secondary: {
                main: '#208080',
            }
        }
    })


    const darkModeOnChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
        const newDarkMode = !darkMode;
        Cookies.set('darkmode', newDarkMode ? 'ON' : 'OFF')

    }

    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const loginMenuCloseHandler = () => {
        setAnchorEl(null);
        dispatch({ type: "USER_LOGOUT" })
        Cookies.remove("userInfo")
        Cookies.remove("cartItems")
        router.push("/")
    }

    return (
        <div>
            <Head>
                <title>{title ? `${title} - Ekomerce` : 'Ekomerce'}</title>
            </Head>

            {/** To implement custom them in whole app */}
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/** App bar */}
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <NextLink href="/" passHref  >
                            <Link style={{ textDecoration: 'none' }}>
                                <Typography className={classes.brand}>
                                    Ekomers
                                </Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <Switch checked={darkMode} onChange={darkModeOnChangeHandler}></Switch>
                        <div>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    {cart.cartItems && cart.cartItems.length > 0 ? (<Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>) : ("Cart")}
                                </Link>
                            </NextLink>

                            {/** If userInfo exist in cookie then show user name */}
                            {userInfo ?
                                (
                                    <>
                                        <Button className={classes.navBarButton} onClick={loginClickHandler} aria-controls="simple-menu" aria-haspopup='true'>
                                            {userInfo.name}
                                        </Button>

                                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={loginMenuCloseHandler}>
                                            <MenuItem onClick={loginMenuCloseHandler}> Profile </MenuItem>
                                            <MenuItem onClick={loginMenuCloseHandler}> My account </MenuItem>
                                            <MenuItem onClick={loginMenuCloseHandler}> Logout </MenuItem>
                                        </Menu>
                                    </>
                                )
                                :
                                (<NextLink href="/login" passHref>
                                    <Link>Login</Link>
                                </NextLink>
                                )
                            }


                        </div>
                    </Toolbar>
                </AppBar>

                {/** Main Container */}
                <Container className={classes.main}>
                    {children}
                </Container>

                {/** Footer */}

                <footer className={classes.footer}>
                    <Typography> All rights reserved. Next Ekomerce </Typography>
                </footer>
            </ThemeProvider>
        </div >
    )
}
