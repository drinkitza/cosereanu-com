# Website Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your website to monitor traffic and visitor behavior.

## Setting Up Google Analytics 4

1. **Create a Google Analytics Account**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Sign in with your Google account
   - Click "Start measuring"
   - Follow the setup process

2. **Create a Property**:
   - Enter a property name (e.g., "cosereanu.com")
   - Select your reporting time zone and currency
   - Click "Next"

3. **Business Information**:
   - Fill in your business information
   - Click "Create"

4. **Data Collection**:
   - Select "Web" as your platform
   - Enter your website URL
   - Name your data stream (e.g., "cosereanu.com web")
   - Click "Create stream"

5. **Get Your Measurement ID**:
   - Once created, you'll see your Measurement ID (it starts with "G-")
   - Copy this ID

6. **Update Your Website Code**:
   - Open `index.html` in your code editor
   - Find the Google Analytics code section
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID
   - Save the file

```html
<!-- Replace G-XXXXXXXXXX with your actual Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TDP8S84X9G"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TDP8S84X9G');
</script>
```

7. **Deploy Your Updated Website**:
   - Push your changes to your Vercel deployment
   - Wait a few minutes for the changes to propagate

## Verifying Installation

1. Visit your website
2. Go to your Google Analytics account
3. Navigate to "Real-time" reports
4. You should see your visit recorded

## Using the Analytics Dashboard

The analytics dashboard on your website provides a simplified view of your website traffic. For more detailed analytics:

1. Log in to your Google Analytics account
2. Navigate to your property
3. Explore the various reports available:
   - Real-time: Current visitors
   - Acquisition: Where visitors come from
   - Engagement: How visitors interact with your site
   - Monetization: Revenue data (if applicable)
   - Demographics: Visitor demographics

## Additional Configuration Options

### Enhanced Measurement

GA4 offers enhanced measurement options that automatically track:
- Page views
- Scrolls
- Outbound clicks
- Site search
- Video engagement
- File downloads

To enable these:
1. Go to your GA4 property
2. Click "Data Streams"
3. Click on your web stream
4. Under "Enhanced Measurement," toggle the features you want to track

### Custom Events

You can track specific user interactions by adding custom events:

```javascript
// Example: Track when someone clicks on a specific link
document.querySelector('#myLink').addEventListener('click', function() {
  gtag('event', 'link_click', {
    'link_id': 'myLink',
    'link_text': 'My Important Link'
  });
});
```

### User ID Tracking

If your site has user authentication, you can implement user ID tracking to better understand user behavior across devices:

```javascript
// Set user ID when a user logs in
gtag('config', 'G-TDP8S84X9G', {
  'user_id': 'USER_ID'
});
```

## Troubleshooting

If you don't see data in your Google Analytics account:
1. Verify your Measurement ID is correctly implemented
2. Check if you have an ad blocker that might be blocking analytics
3. Wait 24-48 hours for data to fully process
4. Use Google's [Tag Assistant](https://tagassistant.google.com/) to verify proper installation

## Privacy Considerations

Make sure your website has a privacy policy that discloses your use of Google Analytics and how you handle user data. Consider implementing a cookie consent banner if you serve users in regions with strict privacy laws (like the EU with GDPR).
