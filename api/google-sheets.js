const https = require('https');
const url = require('url');

module.exports = async function handler(req, res) {
    const GOOGLE_SHEETS_SCRIPT_URL = process.env.GOOGLE_SHEETS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbywkBFnCaI9mXEeh833XTeD8lnqO6rn2Zw9_d9hxvF_nBmVGhy9CM4K-ZMESq7PCZLF/exec";

    // Allow CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Helper to make HTTPS requests and follow redirects automatically (since Google Apps Script always redirects)
    const makeRequest = (targetUrl, method, bodyStr) => {
        return new Promise((resolve, reject) => {
            const parsedUrl = url.parse(targetUrl);
            const options = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.path,
                method: method,
                headers: {}
            };

            if (method === 'POST') {
                options.headers['Content-Type'] = 'text/plain';
                options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
            }

            const request = https.request(options, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    // Follow redirect. If it was a POST, standard 302/303 behavior is to change to GET and drop the body.
                    const redirectMethod = (method === 'POST' || response.statusCode === 303) ? 'GET' : method;
                    const redirectBody = redirectMethod === 'GET' ? null : bodyStr;
                    return makeRequest(response.headers.location, redirectMethod, redirectBody).then(resolve).catch(reject);
                }

                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    resolve({ statusCode: response.statusCode, data: data });
                });
            });

            request.on('error', (e) => {
                reject(e);
            });

            if (method === 'POST' && bodyStr) {
                request.write(bodyStr);
            }
            request.end();
        });
    };

    try {
        if (req.method === 'GET') {
            const queryParams = new URLSearchParams(req.query).toString();
            const targetUrl = `${GOOGLE_SHEETS_SCRIPT_URL}${queryParams ? '?' + queryParams : ''}`;
            
            const result = await makeRequest(targetUrl, 'GET', null);
            res.status(result.statusCode).send(result.data);

        } else if (req.method === 'POST') {
            const bodyStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
            
            const result = await makeRequest(GOOGLE_SHEETS_SCRIPT_URL, 'POST', bodyStr);
            res.status(result.statusCode).send(result.data);

        } else {
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: 'Failed to communicate with the server.', details: error.message });
    }
}
