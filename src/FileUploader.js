import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function FileUploader(props) {
    const [url, setURL] = useState("data/CustomerCenter1 1.e57");
    const [imgData, setImgData] = useState();
    const [jsonData, setJsonData] = useState();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const upload = () => {
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file_path: url })
        }
        fetch("http://localhost:5000/upload", requestOptions)
            .then(resp => resp.json())
            .then(resp => {
                setImgData(resp["img"]);
                setJsonData(resp["json"]);
            })
            .then(() => setLoading(false));
    }

    const downloadJson = () => {
        const element = document.createElement("a");
        const file = new Blob([jsonData], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "output.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    function onChange(a, b, c) {
        console.log(a, b, c);
      }
      
      const contentStyle = {
        height: '500px',
        color: '#fff',
        lineHeight: '500px',
        textAlign: 'center',
        background: '#364d79',
      };

    return (
        <Container>
            <div className={classes.root}>
                <div className={classes.content}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <TextField id="standard-basic" value={url} label="Relative File Path" onChange={(e) => setURL(e.target.value)} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" onClick={() => upload()}>Upload</Button>
                        </Grid>
                        <Grid item xs={2}>
                            {jsonData && <Button variant="contained" color="primary" onClick={() => downloadJson()}>Download JSON</Button>}
                        </Grid>
                        <Grid item xs={12}>
                            {imgData && <Carousel dotPosition={"top"} afterChange={onChange} arrows>
                                { imgData.map(imgSample => {
                                    return <div>
                                        <img src={`data:image/jpeg;base64,${imgSample}`} style={contentStyle} />
                                    </div>
                                })}
                            </Carousel>}
                        </Grid>
                    </Grid>
                    {loading && <CircularProgress />}
                </div>
            </div>
        </Container>
    )
}