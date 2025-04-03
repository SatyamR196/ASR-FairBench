# ASR LEADERBOARD
![](/public/Github_logo.png)


### Features

- **Intuitive UI** – A simple, clean, and visually appealing interface
- **Fast Model Auditing** – Submit a model and get audited within minutes.
- **Graphical Insight**s – Results are visualized using box plots and histograms.
- **Leaderboard Publishing** – Publish audited results to a dynamic leaderboard.
- **Advanced Leaderboard Features** – Filter by model name, sort by any column, and export data as CSV or PDF.
- **Optimized Frontend Performance** – Configured the React.js frontend to improve initial load time by 30–50%.
- **Efficient Backend Processing** – Built with Flask and runs on Google Colab, utilizing GPUs for fast LLM inference.
- **Fully Reproducible** – The application can be replicated from the GitHub codebase by following the provided instructions.
- **Future Deployment** – Planned deployment on Hugging Face Spaces for broader accessibility.

### Tech Stack

**Client:** React, Vite, PrimeReact UI, Styled Components, Axios, Recharts, React Router, React-Plotly  

**Server:** Flask, Colab, Ngrok ,Python, PyMongo, Hugging Face Transformers, NumPy, Pandas

## API Reference

#### Welcome message
```http
  GET /
```

#### Run Audit for Huggin Face ASR model

```http
  GET /api?ASR_model=<HF_model_name>
```
Example : 
```
{baseUrl}/api?ASR_model=openai/whisper-medium
```
#### Get leaderboard data
```http
  GET /fetch
```
#### Insert generated leaderboard data to database
```http
  POST /insert
```


## Run Locally
###  <u>Frontend</u> :

Clone the project from GitHub to your local machine.

```bash
  git clone https://github.com/SatyamR196/ASR-FairBench.git
```

Go to the project directory

```bash
  cd ASR-FairBench
```

Install dependencies

```bash
  npm install
```

Start the react app

```bash
  npm run dev
```
On running above instructions sucessfully, following message with website link should should appear in the terminal:    

<img src="/public/CF1.png" alt="Project Logo" width="400">  
Now you can open the link in the web browser, home page will look something like this :  

<!-- <img src="/public/CF_home.png" alt="Project Logo" width="100%"> -->
![](/public/CF_home.png)
<!-- <img src="/public/CF_Leaderboard.png" alt="Project Logo" width="100%"> -->
![](/public/CF_Leaderboard.png)
#####  Congratulations 🤗 ! on sucessfully cloning the frontend, next we will be setting up the backend on google colab

###  <u>Backend</u> :  
- Open the Google Colab notebook using the link below.

Link to Backend Server Collab notebook : <a href="https://colab.research.google.com/drive/1nIA8IyejvuRauvFbOCbpRlN1sEIK01Gh#scrollTo=_bZc5hkTEfWE"> Click here </a>

- Open your google drive, Create a folder named "ASR_Fairness_Dataset" and upload the above colab notebook there.

- You also need to upload the dataset to your google drive. Download the dataset from the link below, name it "asr_fairness_audio" and upload it to the same folder "ASR_Fairness_Dataset" in your google drive. [Dataset Link](https://colab.research.google.com/drive/1T0HkE-pFED7fRjAmnIncxmMTuHZDPv-7)

- Additionally, you can also download the CSV files which contains the results of the ASR models on the dataset. You need to place the folders in the folder "ASR_Fairness_Dataset" in your google drive.  
 [OpenAi Model Result Link](https://drive.google.com/drive/folders/1mWnlz4wIfIYkxOLB8zjfta62Eg9ZaB4P?usp=drive_link)
[Facebook Model Result Link](https://drive.google.com/drive/folders/1-VDnwbLPDrUWdw67x-KUYYQ46PFT5lbd?usp=drive_link)

- finally, you need to download the test.csv file which contains the details about audio dataset like gender,ethnicity,etc. You need to place the folders in the folder "ASR_Fairness_Dataset" in your google drive.  
 [test.csv Link](https://drive.google.com/file/d/1-54UJWB7g9pXB8t5X6wYdBA_KClRIgLf/view?usp=drive_link)

- Now, your drive folder structure should look like this :  
![](/public/Backend4.png)

- Before running the Backend server on colab notebook, make sure to sign up on ngrok and get your auth token and replace it in colab notebook. [Ngok Website](https://dashboard.ngrok.com/get-started/your-authtoken)
![](/public/ngrok_token.png)

```bash
!ngrok config add-authtoken <YOUR NGROK TOKEN>
```

- Now, run the colab notebook. It will ask for permission to access your google drive, allow it.

- After running the notebook, ngok will give you a public url to access the backend server api. Copy the link and paste it in the frontend code, App.jsx , baseUrl.
![](/public/Url_app.png)

**Note :** If you change the name of any the folder, make sure to change the path in the colab notebook as well.

#####  Sucessful 🤗 ! now you can run the application on your local machine

### Feedback & Support

If you have any feedback or need support, feel free to reach out to us:

- **Anand Rai**: [raianand.1991@gmail.com](mailto:raianand.1991@gmail.com)
- **Prof. Animesh Mukherjee**: [animeshm@gmail.com](mailto:animeshm@gmail.com)
- **Satyam Rahangdale**: [satyamrahangdale196@gmail.com](mailto:satyamrahangdale196@gmail.com)
- **Utkarsh Anand**: [ua28012006@gmail.com](mailto:ua28012006@gmail.com)