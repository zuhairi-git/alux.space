# API Keys Setup

This document explains how to set up the required API keys for the Alux.space project.

## Required API Keys

### Unsplash API

The project uses Unsplash for fetching images. You need to set up an Unsplash API key:

1. Visit [Unsplash Developer Portal](https://unsplash.com/developers) and create an account if you don't have one
2. Create a new application
3. Copy your Access Key
4. Add it to your `.env.local` file as:

```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

## Environment Files

- `.env.local`: Local environment variables (not committed to git)
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables

Note: Files with environment variables should never be committed to your repository. The `.env.local` file is automatically ignored by git.
