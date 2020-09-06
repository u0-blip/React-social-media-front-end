import { createMuiTheme } from "@material-ui/core/styles";
import { spacing } from '@material-ui/system';

const themeObject = {
    palette: {
        primary: {
            light: "#33c9dc",
            main: "#00bcd4",
            dark: "#008394",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff6333",
            main: "#ff3d00",
            dark: "#b22a00",
            contrastText: "#fff",
        },
    },
    spreadThis: {
        logo_image: {
            height: '100px',
            width: '100px',
            margin: '0px auto 20px auto',
            borderRadius: '50%'
        },
        polaroid: {
            height: '100px',
            backgroundColor: 'white',
            borderRadius: '50%',
            margin: '20px auto 20px auto',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.5)',
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        form: {
            textAlign: 'center'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            margin: '10px auto 10px auto'
        },
        profile_text: {
            margin: '10px 10px 10px 10px'
        },

    }
};

let theme = createMuiTheme(themeObject);

theme.spreadThis.commentThumb = {
    width: theme.spacing(3),
    height: theme.spacing(3),
}

export default theme;
