import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    naming: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    history: {
        marginTop: theme.spacing(8)
    },
    delete: {
        display: 'flex',
        justifyContent: 'end',
        marginTop: theme.spacing(4)
    },
    modifyButton: {
        marginRight: theme.spacing(1)
    },
    stats: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexWrap: 'wrap',
    },
    statsItem: {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.light,
        borderRadius: '5px',
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    }
}));

export default useStyles;
