import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getPostById } from '../../utils/firebase/firebase.utils';


const BlogView= () =>{
    const [blogPost , setBlogPost] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams()
    const editId = searchParams.get("id")

    useEffect(() => {
        (async () => {
            try {
                    const  data  = await getPostById(editId);
                    setBlogPost(data);
                
                
            } catch (error) {
                //console.log(error);
            }
        })();
        
    }, []);


    return(
        <div className="container">
        <div className="title"> {blogPost.title} <small>Author: </small> {blogPost.email}</div>
        <div className="body"> {blogPost.body} </div>
        </div>
        
    )
    
}

export default BlogView;