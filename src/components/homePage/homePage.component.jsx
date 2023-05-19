

import { useEffect, useState } from "react";
import Button from "../button/button.component";
import { getAllBlogPost , delteBlogPost } from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from 'react-router-dom';
import './homePage.style.scss';
const Index= () =>{
    const navigate = useNavigate();
    const [blogPost , setBlogPost] = useState([]);
    //const [searchField, setSearchField] = useState('');
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

    const searchFunction = (event)=>{
        const searchField= event.target.value.toLocaleLowerCase();
        console.log(event.target.value);
        const filteredBlog= blogPost.filter((blog)=>{
            return blog.email.toLocaleLowerCase().includes(searchField);
  
        })
        setBlogPost(filteredBlog);

    }

    return(
        <div className="container">
        
            <div className="blog-data">
            <p className="heading">My Blog Post</p>
                <div className="searchbox">
                <input className="search-box" type="search" placeholder="Search Blog" onChange={searchFunction}/>
                </div>
                {blogPost.map(posts=> (
                    
                    <div key={posts.id}>
                        <div className="title"> {posts.title} <small>Author: </small> {posts.email}</div>
                        <div className="body"> {posts.body} 
                        </div>
                        <i className="read_more" id={posts.id} onClick={() => navigate(`/blog-view/?id=${posts.id}`)}>[Read More...]</i>
                    </div>
                        
                ))}
                   
                </div>
        </div>
        
    ) 
}

export default Index;