# P.A.P.E.R

### 1.1 Text Extraction
The uploaded PDF must extract the text to perform context injection.  P.A.P.E.R uses PyPDF, a PDF to text library that makes up for accuracy losses with much faster extraction speeds.

### Large Language Model
 P.A.P.E.R uses Llama 2 8-bit quantised large language model hosted on HuggingFace to generate inferences and is accessed through AutoGPTQ. Though quantised models have lower accuracies, Llama2 quantised has a significantly lower inference time and has a 71% reduction in model size. To further reduce inference time the model is run on Google Colab’s T4 GPUs.

### Context Injection
The extracted text is split into paragraphs of equal size as well as equal overlap. The mpnet-base-v2 sentence transformer model is used to perform semantic search over the extracted text and then inject the top k most appropriate paragraphs into the prompt as context.

### API Endpoints
As the model is inferenced on Google Colab instead of local machines, ngrok is used to tunnel the Google Colab notebook into a public URL through which FastAPI endpoints can be fetched and posted

### Frontend
The front-end for the application is designed using Figma and built using the ReactJS framework. The FastAPI endpoints will be fetched and posted through the React components for fast client-side rendering.

![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/7f37d434-3e4b-4272-9345-f1da0bb21c17)
![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/8c3319b9-8698-49d0-a549-1df7c0ab6f44)
![image](https://github.com/dr4g0n7ly/P.A.P.E.R/assets/82759046/c7ed254e-9670-42bc-aac8-3e8fc612455a)
