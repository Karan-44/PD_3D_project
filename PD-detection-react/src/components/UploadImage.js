import React, { Component} from 'react';
import axios from 'axios';
import '../css/UploadImage.css'
import cloudImage from '../images/cloud-upload.png'
import CircularProgress from '@mui/material/CircularProgress';

class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            image:"",
            imagename:"",
            imageFile:"",
            response:"",
            loading:false,
        };
    }


    componentDidMount(){

    }
    setImage = (event) =>{
        // this.setState({image:event.target.files[0]})

        if(event.target.files[0].type==='image/png'|| event.target.files[0].type==='image/jpg' || event.target.files[0].type==='image/jpeg'){
            this.setState({image: URL.createObjectURL(event.target.files[0]),
                imagename: event.target.files[0].name,
                imageFile:event.target.files[0]
                });
        }else{
            alert("Upload valid image file");
            return false;
        }

        // this.setState({image: URL.createObjectURL(event.target.files[0]),
        // imagename: event.target.files[0].name
        // });

        // console.log(event);

    }

    handleFileUpload = () =>{
        document.getElementById('fileUpload').click();
    }

    handleSubmit = event =>{
        this.setState({loading:true});
        event.preventDefault()
        const formData = new FormData()
        formData.append("myfile",this.state.imageFile)
        axios
        .post(
            "http://127.0.0.1:8000/PDDetection/getImage/",
            formData,
            {
                headers:{
                    "content-type": "multipart/form-data"
                }
            })
        .then(res=>{console.log(res);this.setState({loading:false,response:res.data.result})})
    }

    goBack = () =>{
        this.setState({image:"",imagename:"",imageFile:"",response:""});
    }


    render() {
        
        let Box;
        if(this.state.image==""){
            Box=<div>
                <div className='uploadBox'>
                    <div>
                        <img src={cloudImage}  />
                        <p>in jpeg,png,jpgs</p>
                    </div>
                </div>
                {/* <input type="file" onChange={this.setImage} className='choosefilebutton' /> */}
                <input type="file" id='fileUpload' onChange={this.setImage} style={{display:"none"}} />
                <input type="button" onClick={this.handleFileUpload} value="Click here to upload" className='buttons'  />
            </div>
        }else{
            Box=
                <>
                    <div>
                        <div className='uploadedBox'>
                            <img src= {this.state.image} />
                        </div>
                        
                        <div className='imagename'>
                            <p>Image Name : {this.state.imagename}</p>
                        </div>

                        <div>
                            <input type="button" onClick={this.goBack} value="Back" className='buttons' />
                            <input type="submit" onClick={this.handleSubmit} className='buttons' />
                        </div> 
                    </div>
                    
                </>
                
        }

        return (
            <>

            <div>
                <div className="container-fluid sticky-top bg-white shadow-sm">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                            <a href="/" className="navbar-brand">
                                <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>Health Care</h1>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <a href="/" className="nav-item nav-link active">Home</a>
                                    <a href="/about" className="nav-item nav-link">About</a>
                                    <a href="contact.html" className="nav-item nav-link">Contact</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <div className='title'>
                    <h1>Brain Tumour Detection</h1>
            </div>
            <div className='uploadImage' >
                <form className='uploadImageForm'>
                    {/* <label>Select Images</label>
                    <input type="file" onChange={this.setImage} />
                    { this.state.image && <img src= {this.state.image} alt="upload-image" /> }
                    <input type="submit" onClick={this.handleSubmit} /> */}

                    <h1>Upload your image</h1>
                    {Box}         
                    
                </form>
                
            </div>
            {   this.state.loading==true?
                <>
                    <div style= {{width:"100%",display:"flex",justifyContent:"center"}}>
                        <CircularProgress />
                    </div>
                    <p style={{fontSize:"1.7rem",textAlign:"center"}}>Please wait till your result is being processed</p>
                </>:""
            }
            {
    
                this.state.response!=""?
                <p style={{textAlign:"center",fontSize:"2rem"}}>
                    {this.state.response}
                </p>:
                ""
            }

            </>
        );
    }
}

export default UploadImage;