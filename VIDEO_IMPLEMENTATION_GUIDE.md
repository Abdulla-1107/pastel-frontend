# Video Implementation Guide

## Overview
This project now includes full video support with a custom `VideoPlayer` component that provides a premium viewing experience with custom controls.

## Adding Videos to Your Project

### 1. Local Videos (Recommended for smaller files)

**Step 1:** Place your video files in the `public/videos/` folder
```
public/
  videos/
    product-showcase.mp4
    behind-the-scenes.mp4
    testimonial.mp4
```

**Step 2:** Reference them using absolute paths
```jsx
<VideoPlayer 
  src="/videos/product-showcase.mp4"
  poster="/images/video-thumbnail.jpg"
  title="Product Showcase"
/>
```

**Supported Formats:**
- MP4 (recommended - best browser support)
- WebM (good for web optimization)

**File Naming Best Practices:**
- Use lowercase letters only
- Use hyphens instead of spaces
- Keep names descriptive
- Examples: `product-showcase.mp4`, `customer-testimonial.mp4`

### 2. External Video Hosting (Recommended for large files)

For videos larger than 50MB, consider using external hosting:

#### YouTube Embed
```jsx
<div className="aspect-video">
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="rounded-lg"
  />
</div>
```

#### Vimeo Embed
```jsx
<div className="aspect-video">
  <iframe
    src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
    width="100%"
    height="100%"
    frameBorder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowFullScreen
    className="rounded-lg"
  />
</div>
```

## VideoPlayer Component Usage

### Basic Usage
```jsx
import VideoPlayer from '@/components/VideoPlayer';

<VideoPlayer 
  src="/videos/your-video.mp4"
  poster="/images/thumbnail.jpg"
  title="Your Video Title"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Path to video file |
| `poster` | string | optional | Thumbnail image shown before play |
| `title` | string | optional | Video title shown in controls |
| `className` | string | optional | Additional CSS classes |
| `autoPlay` | boolean | false | Auto-play on load |
| `loop` | boolean | false | Loop video |

### Advanced Examples

**Auto-play with loop:**
```jsx
<VideoPlayer 
  src="/videos/background.mp4"
  autoPlay
  loop
  className="w-full h-screen object-cover"
/>
```

**Product video with controls:**
```jsx
<VideoPlayer 
  src="/videos/product-demo.mp4"
  poster="/images/product-thumbnail.jpg"
  title="Product Demonstration"
  className="aspect-video max-w-4xl mx-auto"
/>
```

## Where Videos Are Used

### 1. Home Page
Location: `src/pages/Home.tsx`
- Video showcase section with full controls
- Displays company introduction or product overview

### 2. Product Detail Page
Location: `src/pages/ProductDetail.tsx`
- Tabs switch between product image and video
- Shows product-specific videos when available
- Products with videos have `video` property in their data

### 3. Adding Videos to Products

Edit the product data in `src/pages/ProductDetail.tsx`:

```jsx
const products = {
  'product-id': {
    id: 'product-id',
    name: 'Product Name',
    description: 'Product Description',
    price: 200000,
    image: '/images/product.jpg',
    video: '/videos/product-demo.mp4', // Add this line
    features: [...]
  }
}
```

## Performance Optimization

### Video Size Recommendations
- **Product videos:** 10-30 seconds, 5-15MB
- **Hero/Showcase videos:** 30-60 seconds, 15-30MB
- **Background videos:** 10-20 seconds (looped), 5-10MB

### Compression Tips
1. Use H.264 codec for MP4
2. Target bitrate: 1-3 Mbps for 1080p
3. Use tools like HandBrake or FFmpeg for compression
4. Create multiple resolutions if needed (1080p, 720p, 480p)

### FFmpeg Compression Example
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

## Troubleshooting

### Video not playing
- Ensure file path is correct (absolute path starting with `/`)
- Check file format (MP4 is most compatible)
- Verify file exists in `public/videos/`
- Check browser console for errors

### Video loads slowly
- Compress video file
- Consider using external hosting (YouTube, Vimeo)
- Use poster image for better perceived performance

### Autoplay not working
- Modern browsers block autoplay with sound
- Set `muted` prop for autoplay to work
- User interaction is required for audio playback

## Best Practices

1. **Always provide a poster image** for better loading experience
2. **Keep videos under 30MB** for local hosting
3. **Use descriptive titles** for accessibility
4. **Test on mobile devices** as video performance varies
5. **Provide fallback content** for older browsers
6. **Optimize videos** before uploading
7. **Use external hosting** for large video libraries

## Mobile Considerations

- Videos are fully responsive
- Controls adapt to touch interfaces
- Consider file size for mobile data usage
- Test autoplay behavior on mobile browsers

## Deployment Notes

### Vercel Deployment
- Videos in `public/` folder are automatically deployed
- No special configuration needed
- Keep total video size reasonable for build time
- Consider CDN for large video files

### Alternative Hosting
For production apps with many videos, consider:
- AWS S3 + CloudFront
- Cloudinary
- Bunny CDN
- YouTube/Vimeo for public content

## Future Enhancements

Potential features to add:
- Video upload admin interface
- Progress bar and seek controls
- Playback speed controls
- Picture-in-picture mode
- Keyboard shortcuts
- Caption/subtitle support
- Multiple video quality options
