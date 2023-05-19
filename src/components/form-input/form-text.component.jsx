import './form-input.style.scss';

const FormText = ({label, ...otherProps}) =>{

    return(
        <div className="group">
            <textarea 
                className="form-input" 
                { ...otherProps }
            />
            {label && (
                <label className=
                    {`${
                        otherProps.value.length ? 'shrink':''
                    } form-input-label`}
                >
                {label}
                </label>
               
            )}
        </div>
    );

}

export default FormText;