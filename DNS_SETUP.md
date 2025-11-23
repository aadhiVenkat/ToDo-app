# DNS Configuration Guide for taskmaster.app

## GitHub Pages DNS Records

### For Root Domain (taskmaster.app)

Add these 4 A records at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### For WWW Subdomain (www.taskmaster.app)

Add this CNAME record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | aadhivenkat.github.io | 3600 |

## Step-by-Step Instructions by Registrar

### Namecheap
1. Log in to Namecheap
2. Go to Domain List → Manage `taskmaster.app`
3. Click "Advanced DNS" tab
4. Add 4 A Records:
   - Host: @, Value: 185.199.108.153, TTL: Automatic
   - Host: @, Value: 185.199.109.153, TTL: Automatic
   - Host: @, Value: 185.199.110.153, TTL: Automatic
   - Host: @, Value: 185.199.111.153, TTL: Automatic
5. Add 1 CNAME Record:
   - Host: www, Value: aadhivenkat.github.io, TTL: Automatic
6. Save changes

### GoDaddy
1. Log in to GoDaddy
2. Go to My Products → DNS
3. Click "Add" to create records:
   - Add 4 A records for @ pointing to the 4 IPs above
   - Add 1 CNAME record: www → aadhivenkat.github.io
4. Save

### Cloudflare
1. Log in to Cloudflare
2. Select your domain
3. Go to DNS → Records
4. Add A records (set Proxy to "DNS only" - gray cloud):
   - @ → 185.199.108.153
   - @ → 185.199.109.153
   - @ → 185.199.110.153
   - @ → 185.199.111.153
5. Add CNAME:
   - www → aadhivenkat.github.io (DNS only)
6. Save

### Google Domains
1. Log in to Google Domains
2. Click on your domain
3. Go to DNS
4. Add custom resource records:
   - 4 A records for @ with the IPs above
   - 1 CNAME for www → aadhivenkat.github.io

## Verify DNS Propagation

After adding DNS records, wait 10-60 minutes, then check:

- https://dnschecker.org/#A/taskmaster.app
- https://www.whatsmydns.net/#A/taskmaster.app

You should see all 4 IP addresses listed globally.

## After DNS is Configured

1. Go to GitHub: https://github.com/aadhiVenkat/ToDo-app/settings/pages
2. Add custom domain: `taskmaster.app`
3. Wait for green checkmark (DNS verified)
4. Enable "Enforce HTTPS"
5. Done! Your site will be live at https://taskmaster.app

