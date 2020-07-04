import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: theme.spacing(8)
    },
    item: {
        flexBasis: 0,
        flex: '1 1 0px'
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        left: 'auto',
        position: 'fixed',
    }

}));

export default useStyles;
