import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '1000vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: 'center'
    },
    containerTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    title: {
        marginLeft: theme.spacing(2)
    },
    form: {
        marginTop: theme.spacing(2)
    },
    submit: {
        width: 200
    },
    goBack: {
        marginRight: theme.spacing(2)
    },
    buttonSuccess: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        maxWidth: 54,
    },
    fabProgress: {
        color: theme.palette.success.main,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },buttonSave :{
        justifyContent: 'center',
        marginLeft: 'end'
    }
}));