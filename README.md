# P.A.P.E.R
## PDF Analyser and Personalized Education Resource

P.A.P.E.R aims to offer several compelling advantages to modern education such as adaptive learning, individualized instructions, instant feedback, streamlined content, etc. by utilizing context injection into the Quantised Llama2 Model. The following architecture outlines the application.

![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/7ac5de62-0ad3-4ac2-a4ff-df57d0b21db6)



### Text Extraction
The uploaded PDF must extract the text to perform context injection.  P.A.P.E.R uses PyPDF, a PDF to text library that makes up for accuracy losses with much faster extraction speeds.

### Large Language Model
 P.A.P.E.R uses Llama 2 8-bit quantised large language model hosted on HuggingFace to generate inferences and is accessed through AutoGPTQ. Though quantised models have lower accuracies, Llama2 quantised has a significantly lower inference time and has a 71% reduction in model size. To further reduce inference time the model is run on Google Colab’s T4 GPUs.

### Context Injection
The extracted text is split into paragraphs of equal size as well as equal overlap. The mpnet-base-v2 sentence transformer model is used to perform semantic search over the extracted text and then inject the top k most appropriate paragraphs into the prompt as context.

### API Endpoints
As the model is inferenced on Google Colab instead of local machines, ngrok is used to tunnel the Google Colab notebook into a public URL through which FastAPI endpoints can be fetched and posted

### Frontend
The front-end for the application is designed using Figma and built using the ReactJS framework. The FastAPI endpoints will be fetched and posted through the React components for fast client-side rendering.

![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/15574679-4bc6-4a30-a093-782cb9f8e602)
![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/20a719e0-3776-4589-aebe-108a9d676985)
![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/33f2ba2e-d4d8-4108-b9be-416250931cdd)


