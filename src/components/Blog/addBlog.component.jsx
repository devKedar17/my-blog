import { useState, useEffect ,useContext} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {createBlogDocument , getPostById , updateBlogDocument} from '../../utils/firebase/firebase.utils';
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import FormText from "../form-input/form-text.component";
import Button from "../button/button.component";

const defaultFormFields= {
    title: '',
    body:'',
    email:''

};
const AddBlog = () => {
    const { currentUser } = useContext(UserContext);
    const [ formFields , SetFormFields ] = useState(defaultFormFields);
    const { title, body ,email } = formFields;
    
    let [searchParams, setSearchParams] = useSearchParams()
    const editId = searchParams.get("type")
    const navigate = useNavigate();

    
        useEffect(() => {
            if(!currentUser) navigate("/auth");
            (async () => {
                try {
                    if(editId){
                        const  data  = await getPostById(editId);
                        data.id=editId;
                        data.email=currentUser.email;
                        SetFormFields(data);
                    }
                    
                } catch (error) {
                    //console.log(error);
                }
            })();
            
        }, []);

    
       
    
    //getBlogData();
    const resetFormFields = () =>{
        SetFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        formFields.email=currentUser.email;
        const response = await createBlogDocument(formFields);
        resetFormFields();
        navigate("/blog");
    }
    const editBlogPost = async (event) =>{
        event.preventDefault();
        console.log('edit');
        const response = await updateBlogDocument(formFields);
        // setContactMail(response);
        navigate("/blog");
        //resetFormFields();
  
    }
    const handleChange = (event) =>{
        const {name, value } = event.target;
        SetFormFields({ ...formFields, [name]: value});
    };



    return (
        <div className="container">
       
            <span>Write your Blog Here </span>
            <form>
                <FormInput
                    label="Blog Title"
                    type="text" 
                    required 
                    onChange={handleChange}
                    name="title"
                    value={title}
                />
                <FormText
                    label="Blog Body" 
                    type="text" 
                    rows="10"
                    cols="150"
                    required 
                    onChange={handleChange} 
                    name="body" 
                    value={body}
                />
               
                {
                    editId ? (
                        <Button onClick={editBlogPost}>Edit Blogs</Button>
                    ) : (
                        <Button  onClick={handleSubmit} >Add Blog</Button>
                    )
                }
            </form>
            </div>
    );

}

export default AddBlog;