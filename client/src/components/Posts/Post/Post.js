import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost } from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles;
    const dispatch = useDispatch();
    return(
        
        <Card className={classes.card}>
            {/* console.log({post.selectedFile}) */}
            {/* <img width={350} height={200} src={post.selectedFile}/> */}
            <img className="media" width={350} height={200} src={post.selectedFile} alt={post.title} />
            {/* below line is not displaying image */}
            <CardMedia className={classes.media} image={post.selectedFile}  title={post.title}  />
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.creator}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.overlay2}>
                <Button style={{color: 'black'}} 
                        size="large" 
                        onClick={() => setCurrentId(post._id) } >
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)} </Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom>{post.title} </Typography>

            <CardContent>
                <Typography variant="h5" gutterBottom>{post.message} </Typography>
            </CardContent>

            <CardActions className={classes.CardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like
                    {post.likeCount}
                </Button>

                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id)) }>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;