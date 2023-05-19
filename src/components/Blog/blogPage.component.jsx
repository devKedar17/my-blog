import { useEffect, useState } from "react";
import { getAllBlogPost , delteBlogPost } from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from 'react-router-dom';
import './blogPage.style.scss';
const BlogPage= () =>{
    const navigate = useNavigate();
    const [blogPost , setBlogPost] = useState([]);
    let counter= 1;

    useEffect( ()=>{
        (async () => {
            try{
                const resultData= await getAllBlogPost();
                const data = resultData.docs.map(post => ({
                    ...post.data(),
                    id:post.id
                }))
                setBlogPost(data);
                console.log('hit');
            }catch(error){
                return false;
            }
        })();
    },[]);

    
   
    const deletePost =async  (e) =>{
        const deleteOperation= await delteBlogPost(e.target.id);
        (async () => {
            try{
                const resultData= await getAllBlogPost();
                const data = resultData.docs.map(post => ({
                    ...post.data(),
                    id:post.id
                }))
                setBlogPost(data);
                console.log('hit');
            }catch(error){
                return false;
            }
        })();
    }
    return(
        <div className="container">
            <div className="action">
                <i className="add_blog"  onClick={() => navigate('/add-blog')}>Add Blog</i>
            </div>
            <div className="blog-data">
            <p className="heading">My Blog Post</p>
                
                {blogPost.map(posts=> (
                    
                    <div key={posts.id}>
                        <div className="title"> {posts.title} <small>Author: </small> {posts.email}</div>
                        <div className="body"> {posts.body} </div>
                        <div className="action">
                        <i className="edit_action" id={posts.id} onClick={() => navigate(`/add-blog/?type=${posts.id}`)}>Edit</i>
                            <i className="delete_action" id={posts.id} onClick= {deletePost}>Delete</i>
                        </div>
                    </div>
                        
                ))}
                   
                </div>
        </div>
        
    ) 
}

export default BlogPage;