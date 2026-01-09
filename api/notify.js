export default async function handler(req, res) {
  // 钉钉 Webhook 地址
  const dingtalkUrl = "https://oapi.dingtalk.com/robot/send?access_token=90c0ca9d5aeb7ecf76029a737fe270adb70e6aefa3d1ab32c290f6d0d46d3702";
  
  // 处理 CORS (如果是 Vercel 环境)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // transfer the request body directly to DingTalk
    const response = await fetch(dingtalkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Vercel Serverless Function will parse JSON body automatically
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}