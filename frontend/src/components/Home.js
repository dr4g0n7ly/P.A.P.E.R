import React, { useState } from 'react';
import { SpinnerDiamond } from 'spinners-react';

import './Home.css'
import Nav from '../components/Nav';
import { Icon } from '@iconify/react';

const Home = () => {
    // Hooks and Variables
    var keywordsArray = [];
    const [pdf, setpdf] = useState(null);
    const [name, updatename] = useState('UPLOAD PDF');  
    const [uploaded, isuploaded] = useState(false);
    const [processedText, setProcessedText] = useState('');
    const [fileloading, setFileLoading] = useState(false);
    const [promptloading, setPromptLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [prompt, setPrompt] = useState('');
    const [working, setWorking] = useState(false);
    const [viewKeywords, setViewKeywords] = useState(false);
    const [viewSummary, setViewSummary] = useState(false);
    const [viewQA, setViewQA] = useState(false);
    const [viewChatbot, setViewChatbot] = useState(false);


    // FastAPI URL 
    const ngrok_url = 'https://f8ab-34-132-228-137.ngrok-free.app'

    async function refresh(e) {
        setpdf(null);
        setWorking(false);
        setFileLoading(false);
        updatename('UPLOAD PDF');
        isuploaded(false);
        window.location.replace('/');
    }

    const handleTextChange = (e) => {
        setPrompt(e.target.value);
    };

    // Upload a PDF file
    const handleFileChange = (e) => {
        setFileLoading(false);
        setSelectedFile(e.target.files[0]);
        var file = e.target.files[0];
        setpdf(file);
        updatename(file.name);
        console.log(file.name); console.log(pdf);
        isuploaded(true);
    };

    const handleProcessText = async () => {
        setFileLoading(true);
        const response = await fetch(ngrok_url+'/process-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (response.ok) {
            const data = await response.json();
            setProcessedText(data.reply);
        }
        setFileLoading(false);
    };

    const handleUploadFile = async () => {
        if (selectedFile) {
            setFileLoading(true);
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
                keywordsArray = [...keywordsArray, data.keywords];
                console.log(keywordsArray);
                console.log(data.questions)
            }
            else {
                console.error('File upload failed');
                setUploadStatus('File Upload Failed. Please Try Again.');
            }
            setFileLoading(false);
            // setWorking(true);
            setViewKeywords(true);
        }
    };

    const clickKeywords = () => {
        setViewKeywords(!viewKeywords);
        setViewSummary(false);
        setViewQA(false);
        setViewChatbot(false);
    }
    const clickSummary = () => {
        setViewKeywords(false);
        setViewSummary(!viewSummary);
        setViewQA(false);
        setViewChatbot(false);
    }
    const clickQA = () => {
        setViewKeywords(false);
        setViewSummary(false);
        setViewQA(!viewQA);
        setViewChatbot(false);
    }
    const clickChatbot = () => {
        setViewKeywords(false);
        setViewSummary(false);
        setViewQA(false);
        setViewChatbot(!viewChatbot);
    }

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
                        <button className="uploaded-btn" onClick={handleUploadFile} disabled={fileloading}>Upload {name}</button>
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
                            <a className="reloadlink2" onClick={refresh}>P.A.P.E.R</a>
                        </div>
                        <div>
                            <button className='feature-btn' onClick={clickKeywords}>View Keywords</button>
                            <button className='feature-btn'onClick={clickSummary}>Summarize</button>
                            <button className='feature-btn'onClick={clickQA}>Get Questions</button>
                            <button className='feature-btn'onClick={clickChatbot}>Chatbot</button>
                        </div>
                    </div>
                    {fileloading && 
                        <>
                            <p>{uploadStatus}</p>
                            <div className='spinner'>
                                <SpinnerDiamond/>
                            </div>
                        </>
                    }

                    { !fileloading && viewKeywords && (
                        <>
                            Keywords
                        </>
                    )
                    }

                    { viewSummary && (
                        <>
                            Summary
                        </>
                    )
                    }

                    { viewQA && (
                        <>
                            QA
                        </>
                    )
                    }

                    { viewChatbot && (
                        <>
                            Chatbot
                            <textarea value={prompt} onChange={handleTextChange} placeholder="Enter prompt here"/>
                            <button className="upload-btn" onClick={handleProcessText} disabled={promptloading}>Send prompt</button><br/> <br/>
                            <textarea value={processedText} placeholder="Enter text here"/>

                        </>
                    )
                    }
                    
                    {/* <p>{uploadStatus}</p>

                    <textarea value={prompt} onChange={handleTextChange} placeholder="Enter prompt here"/>
                    <button className="upload-btn" onClick={handleProcessText} disabled={promptloading}>Send prompt</button><br/> <br/>
                    <textarea value={processedText} placeholder="Enter text here"/>

                    <br/>
                    History: */}
                    

                </div>
            </>

        )}

        </>

    )

}

export default Home