import './Model.css'
import './Home.css'

import { Icon } from '@iconify/react';

const Model = () => {



    return (

        <div className='modeldiv'>

            <div className='summary'>
                <div className='heading'>Summary</div>
                <p>
                    Data mining is the process of discovering patterns and 
                    relationships in large datasets. It involves the use of 
                    statistical and computational methods to analyze data, 
                    and it is often used in conjunction with machine learning 
                    algorithms. The goal of data mining is to discover patterns
                     and relationships that can be used to make predictions or 
                     gain insights into the data. <br/>Data mining is divided 
                     into several stages, including data preprocessing, data 
                     cleaning, feature selection, modeling, evaluation, and 
                     deployment. During the data preprocessing stage, raw data 
                     is collected and prepared for analysis. This may involve 
                     tasks such as data cleaning, which involves removing or 
                     correcting errors in the data, and feature selection, 
                     which involves selecting the most relevant features from 
                     the data. <br/>During the modeling stage, machine learning 
                     algorithms are used to analyze the data and identify patterns 
                     and relationships. These patterns and relationships can be used 
                     to make predictions or gain insights into the data. The evaluation 
                     stage involves assessing the performance of the model and 
                     determining how well it performs on new data. Finally, the model 
                     can be deployed in a real-world setting, where it can be used to 
                     make predictions or gain insights into the data. <br/>Data mining is 
                     an important tool for businesses and organizations, as it can help 
                     them to make better decisions by providing them with insights into 
                     their data. It is also used in a variety of other applications, 
                     including healthcare, marketing, and security.
                </p>
            </div>

            <div className='terms'>
                <div className='heading'>Terms</div>
                <div className='list'>Data Mining</div>
                <div className='list'>Data Preprocessing</div>
                <div className='list'>Modelling</div>
                <div className='list'>Evaluation</div>
                <div className='list'>Deployment</div>
            </div>

            <div className='questions'>
                <div className='heading'>Questions</div>
                <div className='list'>Which stage of data mining involves removing or correcting errors in the data?</div>
                <div className='list'>What is the process of discovering patterns and relationships in large datasets called?</div>
                <div className='list'>What is the goal of data mining?</div>
                <div className='list'>Which stage of data mining involves removing or correcting errors in the data?</div>
            </div>

            <div className='promptbox'>
                <div className='prompt'>
                    <div className='qtbox'>
                        <input type="text" placeholder='Ask a question..' className='prompttext' />
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Model