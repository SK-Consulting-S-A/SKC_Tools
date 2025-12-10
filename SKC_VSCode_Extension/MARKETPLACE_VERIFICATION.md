# Visual Studio Marketplace Verified Publisher Badge

## Overview

To get a **verified badge** (blue checkmark) next to your publisher name on the Visual Studio Marketplace, you need to verify your domain ownership.

## Requirements

1. **Publisher Account:**
   - Must have at least one extension published on Visual Studio Marketplace
   - Extension must have been published for **at least 6 months**

2. **Domain Requirements:**
   - Domain must be registered for **at least 6 months**
   - You must have control over the domain's DNS settings
   - Domain must support HTTPS
   - Domain must respond with HTTP 200 to a HEAD request
   - **Subdomains are NOT eligible** (e.g., `subdomain.example.com` won't work)

## Step-by-Step Process

### Step 1: Access Publisher Management

1. Go to: https://marketplace.visualstudio.com/manage/publishers
2. Sign in with your Microsoft account
3. Select your publisher (e.g., "skc")

### Step 2: Add Domain for Verification

1. In the publisher management page, go to the **Details** tab
2. Find the **Verified domain** section
3. Enter your eligible domain (e.g., `skc.com` or `yourcompany.com`)
4. Click **Save**

### Step 3: Verify Domain via DNS

1. You'll receive instructions to add a **TXT record** to your domain's DNS
2. Add the TXT record to your domain's DNS configuration:
   - **Type:** TXT
   - **Name:** @ (or root domain)
   - **Value:** (The verification string provided by Microsoft)
   - **TTL:** 3600 (or default)

3. Wait for DNS propagation (can take a few minutes to 48 hours)

4. Return to the publisher management page and click **Verify**

### Step 4: Review Process

1. After DNS verification, the Marketplace team will review your request
2. Review typically takes **up to 5 business days**
3. You'll be notified once verification is complete

### Step 5: Verified Badge

- Once verified, a **blue checkmark** will appear next to your publisher name
- This badge appears on:
  - Your publisher profile page
  - All your extension listings
  - Search results

## Important Notes

### Maintaining Verified Status

- **Don't change your publisher display name** - this will revoke the verified badge
- Maintain compliance with Marketplace Terms of Use
- Keep a positive reputation (good ratings, no policy violations)

### Current Status for Your Extension

- Your extension (`skc-extension-app`) was just published (v0.0.3)
- You'll need to wait **6 months** from the initial publication date before you can apply for verification
- Start date: [Date when you first published]

### Timeline

- **Now:** Extension published ✅
- **6 months later:** Eligible to apply for verification
- **After application:** Up to 5 business days for review
- **Total:** ~6 months + 5 days minimum

## Alternative: Microsoft AI Cloud Partner Program

If you want verification sooner, you can also:

1. Join the **Microsoft AI Cloud Partner Program (CPP)**
2. Get a Partner One ID (MPN ID)
3. Associate it with your Microsoft Entra tenant
4. This may provide additional verification options

However, the domain verification method above is the standard way for Visual Studio Marketplace.

## Resources

- **Publisher Management:** https://marketplace.visualstudio.com/manage/publishers
- **VS Code Extension Publishing:** https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Marketplace Terms:** https://marketplace.visualstudio.com/terms

## Next Steps

1. ✅ Your extension is published
2. ⏳ Wait 6 months from publication date
3. 📋 Prepare domain verification (ensure you have DNS access)
4. 🔍 Apply for verification when eligible
5. ✅ Get verified badge!

---

**Note:** The verified badge enhances trust and credibility, but focus on maintaining quality extensions and good user ratings in the meantime!

