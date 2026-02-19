# M365 Tenant Manager - Setup Guide

## Quick Start (Demo Mode)

The app works immediately without any configuration, using realistic sample data:

```bash
cd m365-tenant-manager
npm install
npm run dev
```

Open http://localhost:5173 to see the dashboard with demo data.

---

## Connecting to Your Microsoft 365 Tenant

To see live data from your tenant, you need to create an App Registration in Microsoft Entra ID.

### Step 1: Create an App Registration

1. Go to [Microsoft Entra admin center](https://entra.microsoft.com)
2. Navigate to **Identity** > **Applications** > **App registrations**
3. Click **New registration**
4. Fill in:
   - **Name**: `M365 Tenant Manager`
   - **Supported account types**: Choose based on your needs:
     - *Single tenant* if managing one organization
     - *Multitenant* if managing multiple organizations
   - **Redirect URI**: Select **Single-page application (SPA)** and enter `http://localhost:5173`
5. Click **Register**
6. Copy the **Application (client) ID** and **Directory (tenant) ID**

### Step 2: Configure API Permissions

In your app registration, go to **API permissions** > **Add a permission** > **Microsoft Graph** > **Delegated permissions** and add:

| Permission | Purpose |
|---|---|
| `User.Read` | Sign in and read user profile |
| `User.Read.All` | Read all users (for user KPIs) |
| `Group.Read.All` | Read all groups (for group KPIs) |
| `Device.Read.All` | Read all devices (for device KPIs) |
| `Application.Read.All` | Read all applications (for app KPIs) |
| `SecurityEvents.Read.All` | Read security alerts |
| `Reports.Read.All` | Read usage reports |
| `Directory.Read.All` | Read directory data |

Click **Grant admin consent** for your organization.

### Step 3: Configure the App

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your values:
   ```
   VITE_MSAL_CLIENT_ID=your-application-client-id
   VITE_MSAL_TENANT_ID=your-directory-tenant-id
   VITE_MSAL_REDIRECT_URI=http://localhost:5173
   ```

3. Start the app:
   ```bash
   npm run dev
   ```

4. You'll be redirected to Microsoft login. Sign in with your admin account.

---

## Using Lokka MCP for AI-Assisted Management

[Lokka](https://github.com/merill/lokka) is an MCP server that lets you use Claude (or other AI assistants) to manage your Microsoft 365 tenant through natural language.

### Setup Lokka with Claude Desktop

Add this to your Claude Desktop MCP configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "Lokka-Microsoft": {
      "command": "npx",
      "args": ["-y", "@merill/lokka"]
    }
  }
}
```

### Using Lokka with Custom App Credentials

If you want to use the same app registration as this dashboard:

```json
{
  "mcpServers": {
    "Lokka-Microsoft": {
      "command": "npx",
      "args": ["-y", "@merill/lokka"],
      "env": {
        "TENANT_ID": "your-tenant-id",
        "CLIENT_ID": "your-client-id",
        "USE_INTERACTIVE": "true"
      }
    }
  }
}
```

### Example Lokka Queries

Once configured, you can ask Claude things like:
- "Show me all users without MFA enabled"
- "List all conditional access policies"
- "What groups have no owner?"
- "Show me the most privileged accounts in my tenant"
- "Create a new security group called 'Project Alpha'"

---

## Architecture

```
This Dashboard (React)          Claude + Lokka (AI Assistant)
       │                                │
       │  MSAL Auth                     │  MCP Protocol
       │                                │
       ▼                                ▼
   Microsoft Graph API ◄──── Same APIs ────► Microsoft Graph API
       │                                │
       ▼                                ▼
   Your Microsoft 365 Tenant(s)
```

Both this dashboard and Lokka connect to the same Microsoft Graph APIs. The dashboard gives you a visual overview; Lokka gives you natural language control through Claude.
