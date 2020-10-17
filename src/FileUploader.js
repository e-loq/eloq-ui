import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function FileUploader(props) {
    const [url, setURL] = useState("data/CustomerCenter1 1.e57");
    const classes = useStyles();

    const upload = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file_path: url })
        }
        fetch("http://localhost:5000/upload", requestOptions)
    }

    return (
        <div className={classes.root}>
            <TextField id="standard-basic" value={url} label="Relative File Path" onChange={(e) => setURL(e.target.value)} />
            <Button variant="contained" color="primary" onClick={() => upload()}>Upload</Button>
        </div>
    )
}