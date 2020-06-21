import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        borderColor: theme.palette.secondary.light,
        margin: theme.spacing(1)
    },
    item: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderColor: theme.palette.primary.light
    }
}));

export default useStyles;
