import React, { useState } from 'react';
import axios from 'axios';
import './mycss.css'; // Add all the CSS styles here
import { useRef,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
function Price() {
    const [apiKey, setApiKey] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    const generateApiKey = () => {
        axios.post('/generate-api-key')
            .then(response => {
                setApiKey(response.data.api_key);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const overviewRef = useRef(null);
    const authenticationRef = useRef(null);
    const endpointsRef = useRef(null);
    const tutorialRef = useRef(null);
    const codeexamplesRef = useRef(null);
    const pricingRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const [isMobile, setIsMobile] = useState(false);
    const [isLargeDevice, setIsLargeDevice] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsLargeDevice(width > 1024);
        };

        // Check device type on initial render
        checkDeviceType();

        // Add event listener to check on window resize
        window.addEventListener('resize', checkDeviceType);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    return (
        <div>
            <header>
                <h1>Book Generator API</h1>
            </header>
             <nav>
            {isMobile && (
                <button onClick={toggleDarkMode} aria-label="Toggle dark mode">
                    {darkMode ? (
                        <FontAwesomeIcon icon={faMoon} />
                    ) : (
                        <FontAwesomeIcon icon={faSun} />
                    )}
                </button>
            )}
            <ul>
                <li><a onClick={() => scrollToSection(overviewRef)}>Overview</a></li>
                <li><a onClick={() => scrollToSection(authenticationRef)}>Authentication</a></li>
                <li><a onClick={() => scrollToSection(endpointsRef)}>Endpoints</a></li>
                <li><a onClick={() => scrollToSection(tutorialRef)}>Tutorial</a></li>
                <li><a onClick={() => scrollToSection(codeexamplesRef)}>Code Examples</a></li>
                <li><a onClick={() => scrollToSection(pricingRef)}>Pricing</a></li>
                {isLargeDevice && (
                    <li onClick={toggleDarkMode} aria-label="Toggle dark mode">
                        {darkMode ? (
                            <FontAwesomeIcon icon={faMoon} />
                        ) : (
                            <FontAwesomeIcon icon={faSun} />
                        )}
                    </li>
                )}
            </ul>
        </nav>
            <main>
                <section id="overview"  ref={overviewRef}>
                    <h2>Overview</h2>
                    <p>The Book Generator API allows you to generate books on various topics using different language models. This documentation provides details on how to use the API, including authentication, available endpoints, and code examples.</p>
                </section>

                <section id="authentication" ref={authenticationRef}>
                    <h2>Authentication</h2>
                    <p>To use the API, you need to include your API key in the header of each request:</p>
                    <pre><code>X-API-Key: YOUR_API_KEY</code></pre>
                    <p>To generate an API key, use the button below:</p>
                    <button
                     onClick={generateApiKey}
                    >
                        Generate API Key</button>
                    <div id="apiKeyDisplay">
                        {
                        apiKey ? 
                        `Your API Key: 
                        ${apiKey}` : null}
                    </div>
                </section>

                <section id="endpoints" ref={endpointsRef}>
                    <h2>Endpoints</h2>
                    <h3>Generate Book</h3>
                    <p><span className="http-method">POST</span> <span className="endpoint">/api/generate-book</span></p>
                    <h4>Request Body</h4>
                    <table className="parameter-table">
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>api</td>
                                <td>string</td>
                                <td>The API provider to use. Options: "openai" or "together"</td>
                            </tr>
                            <tr>
                                <td>model</td>
                                <td>string</td>
                                <td>The specific model to use (e.g., "gpt-3.5-turbo", "gpt-4", "llama-2-70b")</td>
                            </tr>
                            <tr>
                                <td>topic</td>
                                <td>string</td>
                                <td>The main topic or theme of the book</td>
                            </tr>
                            <tr>
                                <td>language</td>
                                <td>string</td>
                                <td>The language in which the book should be generated</td>
                            </tr>
                            <tr>
                                <td>word_count</td>
                                <td>integer</td>
                                <td>The approximate number of words for the generated book</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>Response</h4>
                    <pre><code>{
    `{
    "message": "Book generation started",
    "status": "processing",
    "job_id": "unique-job-identifier"
}`}</code></pre>
                </section>

                <section id="tutorial" ref={tutorialRef}>
                    <h2>Tutorial</h2>
                    <h3>Step 1: Obtain an API Key</h3>
                    <p>Generate an API key using the button in the Authentication section above.</p>

                    <h3>Step 2: Make a Request</h3>
                    <p>Use your preferred programming language or tool to make a POST request to the /api/generate-book endpoint. Include your API key in the header and the required parameters in the request body.</p>

                    <h3>Step 3: Handle the Response</h3>
                    <p>The API will return a response with a job ID. You can use this ID to check the status of your book generation job.</p>

                    <h3>Step 4: Retrieve the Generated Book</h3>
                    <p>Once the job is complete, you can retrieve the generated book using the job ID (endpoint to be implemented).</p>
                </section>

                <section id="code-examples" ref={codeexamplesRef}>
                    <h2>Code Examples</h2>
                    <h3>Python</h3>
                    <pre><code>{
`import requests

API_KEY = "your_api_key_here"
API_ENDPOINT = "https://tryBookAI.com/api/generate-book"

headers = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY
}

data = {
    "api": "openai",
    "model": "gpt-3.5-turbo",
    "topic": "The Future of Artificial Intelligence",
    "language": "English",
    "word_count": 5000
}

response = requests.post(API_ENDPOINT, json=data, headers=headers)

if response.status_code == 200:
    result = response.json()
    print(f"Book generation started. Job ID: {result['job_id']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
`}</code></pre>

                    <h3>JavaScript (Node.js)</h3>
                    <pre><code>{
`const axios = require('axios');

const API_KEY = 'your_api_key_here';
const API_ENDPOINT = 'https://tryBookAI.com/api/generate-book';

const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
};

const data = {
    api: 'openai',
    model: 'gpt-3.5-turbo',
    topic: 'The Future of Artificial Intelligence',
    language: 'English',
    word_count: 5000
};

axios.post(API_ENDPOINT, data, { headers })
    .then(response => {
        console.log(\`Book generation started. Job ID: \${response.data.job_id}\`);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
`}</code></pre>
                </section>

                <section id="pricing" ref={pricingRef}>
                    <h2>API Pricing</h2>
                    <p>Our API pricing is based on the model used and the number of tokens processed. Here's a breakdown of the costs:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>API</th>
                                <th>Model</th>
                                <th>Price per 1K tokens</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>OpenAI</td>
                                <td>GPT-3.5</td>
                                <td>$0.002</td>
                            </tr>
                            <tr>
                                <td>OpenAI</td>
                                <td>GPT-4</td>
                                <td>$0.03</td>
                            </tr>
                            <tr>
                                <td>Together AI</td>
                                <td>Llama-2-70b</td>
                                <td>$0.0008</td>
                            </tr>
                            <tr>
                                <td>Together AI</td>
                                <td>Llama-2-13b</td>
                                <td>$0.0006</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Token Estimation</h3>
                    <p>On average, 1 token is approximately 4 characters or 0.75 words. For precise pricing, we recommend using our token calculator tool.</p>
                    <h3>Billing</h3>
                    <p>You will only be charged for the tokens used in generating the book. The API tracks token usage and bills accordingly. Detailed usage reports are available in your account dashboard.</p>
                </section>
            </main>
        </div>
    );
}

export default Price;