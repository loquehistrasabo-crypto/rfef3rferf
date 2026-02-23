# Quick Deploy Guide

## Step 1: Deploy to Vercel

### Option A: Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to folder
cd r34-cdn

# Deploy
vercel

# Follow prompts, then you'll get a URL like:
# https://r34-cdn-xxxxx.vercel.app
```

### Option B: Vercel Dashboard

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Click "Import Git Repository"
5. Upload the `r34-cdn` folder
6. Click "Deploy"
7. Wait for deployment
8. Copy your URL (e.g., `https://r34-cdn-xxxxx.vercel.app`)

## Step 2: Test Your CDN

Visit in browser:
```
https://your-cdn.vercel.app/
```

You should see:
```json
{
  "name": "Rule34 CDN Proxy",
  "status": "online",
  ...
}
```

## Step 3: Configure Bot

Open `rule34_bot_cdn.py` and update:

```python
# Change this line:
CDN_PROXY = None

# To this (with your Vercel URL):
CDN_PROXY = "https://your-cdn.vercel.app/proxy?url="
```

## Step 4: Run Bot

```bash
python rule34_bot_cdn.py
```

## Done!

Videos will now embed inline in Discord, just like Lawliet! 🎉

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `cdn.yourdomain.com`)
4. Update DNS as instructed
5. Update bot: `CDN_PROXY = "https://cdn.yourdomain.com/proxy?url="`

## Troubleshooting

**CDN not working?**
- Check the URL is correct
- Make sure it ends with `/proxy?url=`
- Test CDN directly in browser first

**Videos not embedding?**
- Discord may cache old embeds
- Try in a different channel
- Check CDN is returning correct Content-Type

**Vercel deployment failed?**
- Make sure all files are in the r34-cdn folder
- Check vercel.json is present
- Check requirements.txt is present
