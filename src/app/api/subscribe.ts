// pages/api/subscribe.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { phonenumber } = req.body;
  
      if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
      }
  
      try {
        const response = await fetch('YOUR_LAMBDA_FUNCTION_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phonenumber }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return res.status(200).json(data);
        } else {
          return res.status(400).json(data);
        }
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  