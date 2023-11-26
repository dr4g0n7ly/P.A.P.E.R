import React, { useState, useEffect } from 'react';
import { SpinnerDiamond } from 'spinners-react';

import './Home.css'
import Nav from '../components/Nav';
import { Icon } from '@iconify/react';

const Home = () => {

    // Hooks and Variables
    const [pdf, setpdf] = useState(null);
    const [name, updatename] = useState('UPLOAD PDF');  
    const [uploaded, isuploaded] = useState(false);
    const [processedText, setProcessedText] = useState('');
    const [fileloading, setFileLoading] = useState(false);
    const [promptLoading, setPromptLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [prompt, setPrompt] = useState('');
    const [working, setWorking] = useState(false);
    const [viewKeywords, setViewKeywords] = useState(false);
    const [viewSummary, setViewSummary] = useState(false);
    const [viewQA, setViewQA] = useState(false);
    const [viewChatbot, setViewChatbot] = useState(false);
    const [questions, setQuestions] = useState('');
    const [keywords, setKeywords] = useState([]);
    const kwActive =  viewKeywords ? 'clicked' : 'unclicked';
    const summaryActive =  viewSummary ? 'clicked' : 'unclicked';
    const qaActive =  viewQA ? 'clicked' : 'unclicked';
    const chatActive =  viewChatbot ? 'clicked' : 'unclicked';

    // NGROK URL 
    const ngrok_url = 'https://e1f9-34-141-247-71.ngrok-free.app'

    async function refresh(e) {
        setKeywords([]);
        setpdf(null);
        setWorking(false);
        setFileLoading(false);
        updatename('UPLOAD PDF');
        isuploaded(false);
        window.location.replace('/');
    }

    // User uploads a PDF file
    const handleFileChange = (e) => {
        setFileLoading(false);
        setSelectedFile(e.target.files[0]);
        var file = e.target.files[0];
        setpdf(file);
        updatename(file.name);
        console.log(file.name); console.log(pdf);
        isuploaded(true);
    };

    // save state of keywords variable
    useEffect(() => {
        console.log(keywords);
    }, [keywords]);

    // Communicate with PAPER server
    // Retrieves sample QAs and Keywords
    const handleUploadFile = async () => {
        if (selectedFile) {
            setFileLoading(true);
            setWorking(true);
            const formData = new FormData();
            formData.append('file', selectedFile); // Send PDF to Server
            const response = await fetch(ngrok_url+'/upload-pdf', {
                method: 'POST',
                body: formData,
            });
            // Responses from the server
            if (response.ok) { // Successful communication
                const data = await response.json();
                console.log('File Uploaded Successfully');
                setUploadStatus(data.message); // Status (fail/success) of the API response
                const keywordsArray = data.keywords;
                // Process and save keywords in array
                const newArray = keywordsArray.map((keyword) => keyword);
                setKeywords((prevArray) => [...prevArray, ...newArray]);
                console.log(keywords) // Keywords generated from PDF
                console.log(data.questions) // Sample QAs generated
                // Process QA text to get individual Q-A pairs
                setQuestions(data.questions.replace(/(\d+\.)\s+/g, '\n\n')); 
            }
            else { // Error in communication
                console.error('File upload failed');
                setUploadStatus('File Upload Failed. Please Try Again.');
            }
            setFileLoading(false);
            setViewKeywords(true);
        }
    };

    // Prompts input by the user
    const handleTextChange = (e) => {
        setPrompt(e.target.value);
    };

    // Chatbot servicing
    const handleProcessText = async () => {
        setPromptLoading(true);
        const response = await fetch(ngrok_url+'/process-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ prompt: prompt }), // Send prompts to server
        });
        if (response.ok) { // Successful communication
            const data = await response.json(); // Prompt's reply (answer)
            setProcessedText(data.reply.trim()); // Process reply
        }
        setPromptLoading(false);
    };

    const clickKeywords = () => {
        if (viewKeywords) {}
        else setViewKeywords(!viewKeywords);
        setViewSummary(false);
        setViewQA(false);
        setViewChatbot(false);
    }
    const clickSummary = () => {
        setViewKeywords(false);
        if (viewSummary) {}
        else setViewSummary(!viewSummary);
        setViewQA(false);
        setViewChatbot(false);
    }
    const clickQA = () => {
        setViewKeywords(false);
        setViewSummary(false);
        if (viewQA) {}
        else setViewQA(!viewQA);
        setViewChatbot(false);
    }
    const clickChatbot = () => {
        setViewKeywords(false);
        setViewSummary(false);
        setViewQA(false);
        if (viewChatbot) {}
        else setViewChatbot(!viewChatbot);
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
                            <button className={kwActive} onClick={clickKeywords}>View Keywords</button>
                            <button className={qaActive} onClick={clickQA}>Get Questions</button>
                            <button className={chatActive} onClick={clickChatbot}>Chatbot</button>
                            <button className={summaryActive} onClick={clickSummary}>Summarize</button>
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
                            <div className='feature-title'>Keywords</div>
                            <div className='keyword-div'>
                                {keywords.map((item, index) => (
                                    <div className='word' key={index}>{item}</div>
                                ))}
                            </div>
                        </>
                    )}

                    { viewSummary && (
                        <>
                            <div className='feature-title'>Summary</div>
                        </>
                    )
                    }

                    { viewQA && (
                        <>
                            <div className='feature-title'>
                                Sample Questions and Answers
                            </div>
                            <br/>
                            <pre className='sampleQA'>{questions}</pre>
                            <br/>
                        </>
                    )}

                    { viewChatbot && (
                        <>
                            <div className='feature-title'>Chatbot</div>
                            <div className='prompt-div'>
                                <textarea className='query'
                                    value={prompt} 
                                    onChange={handleTextChange} 
                                    placeholder="Ask a question..."
                                />
                                <button className="upload-btn" onClick={handleProcessText} disabled={promptLoading}> 
                                    Send prompt
                                </button>
                            </div>
                            <br/>
                            { promptLoading && (
                                <p>Generating...</p>
                            )}
                            <textarea className='prompt-ans' value={processedText} placeholder=""/>

                        </>
                    )}

                </div>
            </>

        )}

        </>

    )

}

export default Home