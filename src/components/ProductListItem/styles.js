import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        borderColor: theme.palette.primary.light,
        margin: theme.spacing(1),
    },
    item: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderColor: theme.palette.secondary.light,
        width: '250px'
    }
}));

export default useStyles;
