import React, { useState } from 'react';

import './Home.css'
import Nav from '../components/Nav';
import { Icon } from '@iconify/react';

const Home = () => {

    const [pdf, setpdf] = useState(null);
    const [name, updatename] = useState('UPLOAD PDF');  
    const [uploaded, isuploaded] = useState(false);
    const [inputText, setInputText] = useState('');
    const [processedText, setProcessedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [prompt, setPrompt] = useState('');
    const [working, setWorking] = useState(false);

    const ngrok_url = 'https://f878-34-168-63-91.ngrok-free.app'

    async function refresh(e) {
        setpdf(null);
        setWorking(false);
        setLoading(false);
        updatename('UPLOAD PDF');
        isuploaded(false);
        window.location.replace('/');
    }

    const handleTextChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleFileChange = (e) => {
        setLoading(false);
        setSelectedFile(e.target.files[0]);
        var file = e.target.files[0];
        setpdf(file);
        updatename(file.name);
        console.log(file.name); console.log(pdf);
        isuploaded(true);
    };

    const handleProcessText = async () => {
        setLoading(true);
        // setProcessedText('processing');
        const response = await fetch(ngrok_url+'/process-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (response.ok) {
            const data = await response.json();
            setProcessedText(data.reply);
        }

        setLoading(false);

    };

    const handleUploadFile = async () => {
        if (selectedFile) {
            setLoading(true);
            setWorking(true);
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await fetch(ngrok_url+'/upload-pdf', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log('File Uploaded Successfully');
                setUploadStatus(data.message); // Set the message from the API response
                setInputText(data.extracted_text)
            }
            else {
                console.error('File upload failed');
                setUploadStatus('File Upload Failed. Please Try Again.');
            }
            setLoading(false);
            setWorking(false);
        }
    };

    return (

        <>

        {!working && (

        <div className="homebody">

            <Nav />
            
            <p style={{fontSize: 40, fontWeight: 900}}>
                PDF Analyzer and Personalized Education Resource
            </p>
            {!uploaded && (<p style={{fontSize: 'x-large', fontWeight: 800}}>
                P.A.P.E.R simplifies the reading process by providing
                precise summaries, extracting vital terms, generating
                thought-provoking questions, and even offering instant
                answers to your queries. It's your one-stop solution for
                efficient document interaction. It tailors content to
                your unique preferences, allowing you to track your
                progress, collaborate with peers, and access resources on
                 the go.
            </p>)}
            

            {!uploaded && (<>
                <br/><br/>
                <input type="file" id='fileinput' accept=".pdf" onChange={handleFileChange} style={{display: 'none'}} />
                <div className='upload-div'>
                    <div className='upload-button'>
                        <div className='uploadicon'>
                            <Icon className='uploadicon' icon="fluent:document-pdf-20-regular"/>
                        </div>
                        <label htmlFor='fileinput' className='upload-txt'>{name}</label>
                    </div>
                </div>
                <br/><br/>
                <p style={{fontSize: 'x-large', fontWeight: 800, marginBottom: 55}}>
                upload chapter-wise PDFs for best results <br/>
                PDF splitter: <a
                                className='link' 
                                href='https://www.ilovepdf.com/split_pdf' 
                                target='_blank' 
                                rel="noreferrer">
                                https://www.ilovepdf.com/split_pdf
                            </a>
                </p>
            </>)}

            {uploaded && (<>
                <br/><br/>
                <div className='upload-div'>
                    <div className='upload-button'>
                        <div className='uploadicon'>
                            <Icon className='uploadicon' icon="fluent:document-pdf-20-regular"/>
                        </div>
                        <button className="uploaded-btn" onClick={handleUploadFile} disabled={loading}>Upload {name}</button>
                    </div>
                </div>
                <br />
                {/* <button onClick={handleProcessText} disabled={loading}>
                    Process Text
                </button> */}
                <br />
            </>)}
            
            {uploaded && (
                <>
                    <input type="file" id='fileuploaded' accept=".pdf" onChange={handleFileChange} style={{display: 'none'}} />
                    <label htmlFor='fileuploaded' className='uploaded-txt'>Wrong PDF? Replace it.</label>
                </>
            )}

        </div>

        )}

        {working && (

            <>
                <div className="new-body">
                    <div className="new-nav">
                        <div className="new-brand">
                            <a className="reloadlink" onClick={refresh}>P.A.P.E.R</a>
                        </div>
                        <div>
                            <button>Summarize</button>
                            <button>View imp terms</button>
                            <button>Get questions</button>
                            <button>Ask your own questions</button>
                        </div>
                    </div>
                    {loading && <p>Loading...</p>}
                    <p>{uploadStatus}</p>

                    <textarea value={prompt} onChange={handleTextChange} placeholder="Enter prompt here"/>
                    <button className="upload-btn" onClick={handleProcessText} disabled={loading}>Send prompt</button><br/> <br/>
                    <textarea value={processedText} placeholder="Enter text here"/>

                    <br/>
                    History:
                    

                </div>
            </>

        )}

        </>

    )

}

export default Home