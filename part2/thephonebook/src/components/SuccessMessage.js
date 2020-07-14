import React from "react";

const SuccessMessagePrompt = (props) => {
    const errStyles = {
        color: "green",
        backgroundColor: "#D3D3D3",
        width: "80vw",
        margin: "1rem auto",
        border: "1px solid green",
        
    }
    
    return (
    <div style={errStyles}>
        <p style={{margin: ".4rem"}}>{props.message}</p>
    </div>
    )
}

export default SuccessMessagePrompt;