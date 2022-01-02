import React, { useContext } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Link, createTheme, ThemeProvider, CssBaseline, Switch, Badge } from '@mui/material';
import NextLink from "next/link"
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import Cookies from 'js-cookie'

export default function Layout({ title, description, children }) {
    const { state, dispatch } = useContext(Store)

    const { darkMode, cart } = state

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
    const classes = useStyles()

    const darkModeOnChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
        const newDarkMode = !darkMode;
        Cookies.set('darkmode', newDarkMode ? 'ON' : 'OFF')

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
                        <NextLink href="/" passHref>
                            <Link>
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
                                    {
                                        cart.cartItems.length > 0 ?
                                            <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge> : ("Cart")

                                    }

                                </Link>

                            </NextLink>

                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
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
        </div>
    )
}
