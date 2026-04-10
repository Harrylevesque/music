# Music Website Data Template

## Category Object

Each category represents a music genre and appears as a full-screen section.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | `string` | Yes | Unique identifier (kebab-case) | `"electronic"` |
| `title` | `string` | Yes | Display name for the genre | `"Electronic"` |
| `subtext` | `string` | No | Subtitle/description (e.g. age group) | `"Ages 0-2"` |
| `accentColor` | `string` | Yes | Hex color for this category's theme | `"#8b5cf6"` |
| `songs` | `Song[]` | Yes | Array of songs in this category | `[{...}, {...}]` |

---

## Song Object

Each song represents a track that plays with a YouTube video background.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | `string` | Yes | Unique identifier (kebab-case) | `"e1"`, `"song-001"` |
| `videoId` | `string` | Yes | YouTube video ID (11 chars after `v=`) | `"fJ9rUzIMcZQ"` |
| `title` | `string` | No | Song display title | `"Bohemian Rhapsody"` |
| `subtext` | `string` | No | Artist/performer name | `"Queen"` |
| `image` | `string` | No | Album art URL (400x400 recommended) | `"https://..."` |

### Getting the YouTube `videoId`

From a YouTube URL:
- `https://www.youtube.com/watch?v=abc123XYZ` → `abc123XYZ`
- `https://youtu.be/abc123XYZ` → `abc123XYZ`

---

## Example: Full Data Structure

```typescript
interface Song {
  id: string;
  videoId: string;
  title?: string;
  subtext?: string;
  image?: string;
}

interface Category {
  id: string;
  title: string;
  subtext?: string;
  accentColor: string;
  songs: Song[];
}

const categories: Category[] = [
  {
    id: 'electronic',
    title: 'Electronic',
    subtext: 'Ages 10-14',
    accentColor: '#8b5cf6',
    songs: [
      { 
        id: 'e1', 
        videoId: 'fJ9rUzIMcZQ', 
        title: 'Bohemian Rhapsody',
        subtext: 'Queen',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
      },
    ]
  },
  // ... more categories
];
```

---

## Image Guidelines

- **Recommended size**: 400x400px
- **Format**: Unsplash, CDN, or any direct image URL
- **Use case**: Album artwork displayed in song cards/grids
- **Image URL parameters**: `?w=400&h=400&fit=crop` for consistent sizing

---

## Accent Color Palette

| Genre/Theme | Hex Code |
|-------------|----------|
| Purple (Electronic) | `#8b5cf6` |
| Cyan (Classical) | `#06b6d4` |
| Orange (Rock) | `#f97316` |
| Pink (Jazz) | `#ec4899` |

Feel free to customize these to match your brand or category themes.
