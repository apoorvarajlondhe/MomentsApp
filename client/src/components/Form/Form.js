import React, { useState, useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import useStyles from './styles';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";

//import { render } from "react-dom";

//get current id


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({creator: '', title: '', message:'', tags:'', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles;
    const dispatch = useDispatch();
        
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){

            dispatch(updatePost(currentId, postData));
        } else{

            dispatch(createPost(postData));
        }
        clear();
    }
    

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message:'', tags:'', selectedFile: ''});
    }

    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const file_reader = new FileReader()
    //         file_reader.readAsDataURL(file)

    //         file_reader.onload = () => {
    //             // console.log(file_reader.result);
    //             setPostData({ ...postData, selectedFile: file_reader.result})
    //         }

    //         file_reader.onerror = (error) => {
    //             console.log(error);
    //         }
    //     })
    // }



    return(
        <Paper className={classes.paper}>
            


            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Moment</Typography>
            <TextField name="creator" variant="outlined" label="Creator"  fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value})}/>
            <TextField name="title" variant="outlined" label="Title"  fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags"  fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value})}/>
            <div className={classes.fileInput}>
                <FileBase64  type="file" 
                    multiple={false} 
                    onDone={({base64}) => setPostData({ ...postData, selectedFile:  base64 })} 
                />
            </div>
            {/* <Input
                type='file' 
                onChange = {(e) => { 
                    const file = e.target.files[0]
                    convertBase64(file)
                }}
            /> */}
            
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form> 
            
            {/* <img width={350} height={200} src={postData.selectedFile}/> */}
        </Paper>
    );
}

export default Form;