import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: "#fff",
            marginLeft: 10,
        }

    },
    brand: {
        fontWeight: "bold",
        fontSize: "1.5rem",
    },

    grow: {
        flexGrow: 1,
    },
    main: {
        minHeight: '80vh',
    },

    footer: {
        marginTop: 10,
        textAlign: 'center'
    },

    section: {
        marginTop: 10,
        marginBottom: 10
    },

    form: {
        maxWidth: 800,
        margin: '0 auto'
    },
    navBarButton: {
        color: "#ffffff",
        textTransform: 'initial'
    },
    checkoutWizard: {
        marginTop: 18
    },
    transparentBackground: {
        backgroundColor: "transparent",

    }

})

export default useStyles;