export default async function handler(req, res) {
    const GOOGLE_SHEETS_SCRIPT_URL = process.env.GOOGLE_SHEETS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbywkBFnCaI9mXEeh833XTeD8lnqO6rn2Zw9_d9hxvF_nBmVGhy9CM4K-ZMESq7PCZLF/exec";

    // Allow CORS if being called from a different frontend domain (useful for dev)
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

    try {
        if (req.method === 'GET') {
            // Forward query params to Google Apps Script
            const queryParams = new URLSearchParams(req.query).toString();
            const url = `${GOOGLE_SHEETS_SCRIPT_URL}${queryParams ? '?' + queryParams : ''}`;

            const response = await fetch(url);
            const data = await response.text();

            res.status(200).send(data);
        } else if (req.method === 'POST') {
            // Forward body to Google Apps Script
            const response = await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
                method: 'POST',
                // Apps script requires no-cors sometimes, but server-to-server fetch doesn't use mode
                headers: {
                    'Content-Type': 'text/plain', // Apps Script likes text/plain for POST bodies
                },
                body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
            });

            const data = await response.text();
            res.status(200).send(data);
        } else {
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: 'Failed to communicate with the server.' });
    }
}
