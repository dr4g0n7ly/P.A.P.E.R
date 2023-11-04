import React, { useState } from 'react';

function FastAPI() {

    const [inputText, setInputText] = useState('');
    const [processedText, setProcessedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const ngrok_url = 'https://5fe2-34-23-254-59.ngrok-free.app'

    const handleTextChange = (e) => {
        setInputText(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleProcessText = async () => {
        setLoading(true);

        const response = await fetch(ngrok_url+'/process-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ text: inputText }),
        });

        if (response.ok) {
            const data = await response.json();
            setProcessedText(data.reversed_text);
        }

        setLoading(false);

    };

    const handleUploadFile = async () => {
        if (selectedFile) {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await fetch(ngrok_url+'/upload-pdf', {
                method: 'POST',
                body: formData,
          });
            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully');
                setUploadStatus(data.message); // Set the message from the API response
                setInputText(data.extracted_text)
            }
            else {
                console.error('File upload failed');
                setUploadStatus('File upload failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="FastAPI">
            <h1>Text Processing and PDF Upload</h1>

            <h2>Upload a PDF File</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <br />
            <button onClick={handleUploadFile} disabled={loading}>
                Upload PDF
            </button>
            <h2>Upload Status:</h2>
            <p>{uploadStatus}</p>

            <br />
            <br />

            <h2>Reverse text</h2>
            <textarea value={inputText} onChange={handleTextChange} placeholder="Enter text here"/>
            <br />
            <button onClick={handleProcessText} disabled={loading}>
                Process Text
            </button>
            <br />
            {loading && <p>Loading...</p>}
            {processedText && (
                <div>
                    <h2>Processed Text:</h2>
                    <div>{processedText}</div>
                </div>
            )}
        </div>
    );
}

export default FastAPI;
