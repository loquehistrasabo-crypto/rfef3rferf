# Rule34 CDN Proxy for Vercel

A serverless media proxy for Rule34 content, deployable on Vercel.

## Features

- Proxies Rule34 media through your own domain
- Serverless (no server maintenance)
- Free hosting on Vercel
- CORS enabled
- Caching headers for performance

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the r34-cdn folder:
```bash
cd r34-cdn
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **r34-cdn** (or your choice)
   - Directory? **./** (current directory)
   - Override settings? **N**

5. Your CDN will be deployed! You'll get a URL like:
   - `https://r34-cdn.vercel.app`
   - Or your custom domain

### Method 2: GitHub + Vercel Dashboard

1. Create a new GitHub repository

2. Push the r34-cdn folder contents to the repo:
```bash
cd r34-cdn
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/r34-cdn.git
git push -u origin main
```

3. Go to [vercel.com](https://vercel.com)

4. Click "Add New Project"

5. Import your GitHub repository

6. Vercel will auto-detect the configuration

7. Click "Deploy"

## Usage

Once deployed, use your CDN URL in the bot:

```
https://your-cdn.vercel.app/proxy?url=<encoded_media_url>
```

### Example:

Original URL:
```
https://wimg.rule34.xxx/images/1234/abcd.mp4
```

Proxied URL:
```
https://your-cdn.vercel.app/proxy?url=https%3A%2F%2Fwimg.rule34.xxx%2Fimages%2F1234%2Fabcd.mp4
```

## Configure Bot

After deployment, update your bot configuration:

```python
# In rule34_bot.py
MEDIA_PROXY = "https://your-cdn.vercel.app/proxy?url="
```

Then the bot will automatically proxy all media through your CDN!

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Use your custom domain in the bot

Example: `https://cdn.yourdomain.com/proxy?url=`

## Testing

Test your CDN with curl:

```bash
curl "https://your-cdn.vercel.app/proxy?url=https%3A%2F%2Fwimg.rule34.xxx%2Fimages%2F1234%2Fabcd.jpg"
```

Or visit in browser:
```
https://your-cdn.vercel.app/proxy?url=https://wimg.rule34.xxx/images/1234/abcd.jpg
```

## Limits

Vercel Free Tier:
- 100GB bandwidth/month
- 10 second function timeout
- Unlimited requests

Should be plenty for a Discord bot!

## Security

- Only allows Rule34 domains
- CORS enabled for Discord
- No authentication needed (public proxy)
- Caching enabled (24 hour cache)

## Troubleshooting

### "Domain not allowed" error
- Make sure the URL contains a Rule34 domain
- Check the ALLOWED_DOMAINS list in api/proxy.py

### Timeout errors
- Large videos may timeout (10 second limit)
- Consider using direct URLs for very large files

### 500 errors
- Check Vercel function logs
- Verify the source URL is accessible

## Support

For issues, check:
- Vercel deployment logs
- Function logs in Vercel dashboard
- Network tab in browser dev tools
