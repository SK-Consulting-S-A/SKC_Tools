# Publisher Verification Guide

## VS Code Marketplace vs AppSource

**VS Code Extensions** → Published to **Visual Studio Marketplace** (marketplace.visualstudio.com)
- No formal "verified publisher" badge
- Publisher identified by publisher ID (e.g., "skc")
- Trust built through quality, ratings, and updates

**Business Applications** → Published to **AppSource** (appsource.microsoft.com)
- Requires verified publisher status
- Shows blue verified badge
- Requires Microsoft AI Cloud Partner Program enrollment

---

## How to Become a Verified Publisher on AppSource

If you plan to publish business applications (Dynamics 365, Power Platform, Office add-ins) to AppSource, follow these steps:

### Step 1: Join Microsoft AI Cloud Partner Program (CPP)

1. **Enroll in CPP:**
   - Visit: https://partner.microsoft.com/
   - Sign up for the Microsoft AI Cloud Partner Program (formerly Microsoft Partner Network)
   - Complete organization verification
   - Obtain your **Partner One ID** (MPN ID)

### Step 2: Register Your Application in Microsoft Entra ID

1. **Use Work/School Account:**
   - Register your app using a Microsoft Entra work or school account
   - Personal Microsoft accounts are NOT eligible

2. **Set Publisher Domain:**
   - Set a publisher domain for your app
   - Domain must match the email domain used during CPP verification
   - Or use a DNS-verified custom domain in your Microsoft Entra tenant

### Step 3: Associate Partner ID with App Registration

1. **Sign in to Azure Portal:**
   - Use an account with MFA enabled
   - Required roles:
     - **Microsoft Entra ID:** Application Administrator or Cloud Application Administrator
     - **Partner Center:** CPP Partner Admin or Account Admin

2. **Navigate to App Registration:**
   - Go to **Azure Active Directory** > **App registrations**
   - Select your application

3. **Add Partner ID:**
   - Go to **Branding & properties** section
   - Click **Add Partner ID to verify publisher**
   - Enter your Partner One ID (MPN ID)
   - Click **Verify and save**

### Step 4: Verify Status

- Once verified, you'll see a blue verified badge in:
  - Microsoft Entra consent prompts
  - AppSource listings
  - Other relevant Microsoft pages

---

## For VS Code Extensions (Your Current Setup)

Since you're publishing VS Code extensions, you don't need AppSource verification. However, to build trust:

1. **Maintain Quality:**
   - Regular updates
   - Bug fixes
   - Feature improvements

2. **Good Documentation:**
   - Clear README
   - Usage examples
   - Configuration guides

3. **User Engagement:**
   - Respond to issues
   - Address feedback
   - Maintain good ratings

4. **Professional Branding:**
   - Clear extension name and description
   - Professional icon/logo
   - Proper categorization

---

## Resources

- **Microsoft AI Cloud Partner Program:** https://partner.microsoft.com/
- **Publisher Verification Documentation:** https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified
- **AppSource Publishing:** https://learn.microsoft.com/en-us/azure/marketplace/overview
- **VS Code Marketplace:** https://marketplace.visualstudio.com/

---

## Notes

- VS Code extensions are published to Visual Studio Marketplace, not AppSource
- AppSource verification is only for business applications (Dynamics 365, Power Platform, Office add-ins)
- Your current extension (SKC Extension App) is correctly published to Visual Studio Marketplace
- No additional verification needed for VS Code extensions beyond standard publisher account setup

