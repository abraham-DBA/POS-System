# Clerk Authentication Integration - Setup Guide

## Overview
This project now has Clerk authentication integrated. Users must sign in before accessing the POS system dashboard.

## Setup Steps

### 1. Install Clerk Dependencies
```bash
npm install @clerk/nextjs
```

### 2. Create Clerk Account and Get API Keys
1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application
4. Go to **API Keys** section
5. Copy your:
   - `NEXT_PUBLIC_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 3. Configure Environment Variables
Update your `.env.local` file with your Clerk keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 4. Run the Application
```bash
npm run dev
```

## How It Works

### Authentication Flow
1. **First-time users** → Redirected to `/sign-in` page
2. **Sign-up option** → Available on login page with link to `/sign-up`
3. **After authentication** → Redirected to dashboard `/`
4. **Protected routes** → All dashboard routes require authentication

### Protected Routes
The following routes require authentication (defined in `middleware.ts`):
- `/` - Overview/Dashboard
- `/clients` - Clients management
- `/products` - Products management
- `/sales` - Sales tracking
- `/overview` - Dashboard overview
- `/categories` - Product categories
- `/reports` - Reports page
- `/suppliers` - Suppliers management
- `/expenses` - Expenses tracking
- `/debtors` - Debtors management

### Public Routes
- `/(auth)/sign-in` - Sign in page
- `/(auth)/sign-up` - Sign up page

## Components

### Files Created/Modified

**New Files:**
- `middleware.ts` - Protects routes using Clerk middleware
- `.env.local` - Environment variables (ADD YOUR KEYS HERE)
- `app/(auth)/layout.jsx` - Layout for auth pages (no sidebar/header)
- `app/(auth)/sign-in/page.jsx` - Sign-in page with theme support
- `app/(auth)/sign-up/page.jsx` - Sign-up page with theme support

**Modified Files:**
- `app/layout.js` - Added ClerkProvider wrapper
- `app/components/Header.jsx` - Added UserButton with profile/sign-out

## Features

✅ **Dark/Light Mode Support** - Auth pages adapt to theme preference
✅ **Clerk UserButton** - Shows user profile, settings, and sign-out
✅ **Automatic Redirect** - Unauthenticated users sent to sign-in
✅ **Route Protection** - Middleware secures all dashboard routes
✅ **Responsive Design** - Works on mobile, tablet, and desktop

## Testing

### Test Sign-In Flow
1. Start the app: `npm run dev`
2. Visit `http://localhost:3000`
3. You'll be redirected to `/sign-in`
4. Create a test account or sign in

### Test Sign-Out
1. Click the avatar/profile icon in the header
2. Select "Sign out"
3. You'll be redirected to sign-in page

### Test Sign-Up
1. On the sign-in page, click "Create account"
2. Fill in registration details
3. Create account
4. Automatically redirected to dashboard

## Customization

### Change Redirect URLs
Edit `app/layout.js` to change where users go after sign-in/up:
```javascript
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/overview  // Change destination
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/overview  // Change destination
```

### Customize Auth Pages
Modify `app/(auth)/sign-in/page.jsx` and `app/(auth)/sign-up/page.jsx` to:
- Change styling
- Add custom branding
- Add additional fields
- Modify appearance config

### Add More Protected Routes
Edit `middleware.ts` and add routes to `isProtectedRoute`:
```javascript
const isProtectedRoute = createRouteMatcher([
  "/",
  "/your-new-route(.*)",  // Add new routes here
  "/another-route(.*)",
]);
```

## Troubleshooting

### "isDark is not defined" Error
- Ensure ClerkProvider wraps the entire app in `app/layout.js`
- Make sure ThemeProvider is inside ClerkProvider

### Sign-in page not showing
- Check that environment variables are set correctly
- Verify `.env.local` file exists in project root
- Restart dev server after adding env variables

### User not redirecting after sign-in
- Check `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` in `.env.local`
- Ensure routes are protected in `middleware.ts`

### Clerk UI not styled correctly
- Verify theme variables in `appearance` config
- Check that dark/light mode is detecting correctly
- Clear browser cache and restart dev server

## Security Notes

🔒 **Keep `CLERK_SECRET_KEY` private** - Never commit to version control
🔒 **Use `.env.local`** - Environment variables stored locally, not in repo
🔒 **Middleware protection** - Routes are protected server-side
🔒 **Session management** - Clerk handles secure sessions automatically

## Next Steps

1. ✅ Add Clerk API keys to `.env.local`
2. ✅ Run `npm install @clerk/nextjs`
3. ✅ Start dev server: `npm run dev`
4. ✅ Test sign-in/sign-up flow
5. ✅ Customize auth pages as needed

## Support

- **Clerk Docs**: https://clerk.com/docs
- **Clerk Support**: https://support.clerk.com
- **Clerk Community**: https://discord.gg/b5rXrQ6hqX
