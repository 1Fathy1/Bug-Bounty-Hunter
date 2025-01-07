# **Web Application Firewall (WAF)**

1. **What is WAF ?**

	**Web Application Firewall (WAF)** is a security mechanism that monitors, filters, and blocks HTTP/HTTPS traffic to and from a web application. Its primary purpose is to protect web applications from common cyber threats like cross-site scripting (XSS), SQL injection (SQLi), file inclusion attacks, and other types of malicious payloads

2. **How WAF Work ?**

	 **WAFs** operate at the application layer (Layer 7) of the OSI model, which monitoring HTTP/S requests. 
	 
	They are placed in front of a web application to inspect traffic before it reaches the application server. 
	
	WAFs rely on various detection mechanisms, including:
Signature-based Detection: It compares traffic baylod known attack patterns , as \<script> , alert() , onload , .. etc

 3. **What is best WAF Services**
	 - [WAS](https://aws.amazon.com/waf/)
	 - [Cloudflare](https://www.cloudflare.com/application-services/products/waf/)
	 - [AZURE](https://azure.microsoft.com/en-us/products/web-application-firewall)


##  Some Ways to Bypass a WAF

> This article will explain the tools and techniques used by web application penetration testers and security researchers to successfully bypass web application firewall (WAF) protections.

#### 1.  Encoding and Obfuscation 
-  Code obfuscation/encoding techniques play a significant role in cyberattacks, enabling attackers to evade detection and exploit vulnerabilities. Bypassing antivirus , WAF software is a crucial step in these attacks, and obfuscation techniques can render payloads completely undetectable 
		
- To Make Obfuscation  , we encoding for payloads with : 
		1. **Hex encoding**
		2. **Base64 encoding**
		3. **URL encoding**
		[Encoding web site](https://gchq.github.io/CyberChef/)
		
- Example 
  ```SQL	
  -1' union select * from users; -- -	
  ```
		
	Encode the payload in hexadecimal and url:
	```SQL	
  31%2027%2020%2075%206e%2069%206f%206e%2020%2073%2065%206c%2065%2063%2074%2020%202a%2020%2066%2072%206f%206d%2020%2075%2073%2065%2072%2073%203b%2020%202d%202d%2020%202d%2020	
  ```
		
- [see more](https://portswigger.net/web-security/essential-skills/obfuscating-attacks-using-encodings)

#### 2. HTTP Parameter Pollution (HPP)
- HTTP Parameter Pollution tests the applications response to receiving multiple HTTP parameters with the same name; for example, if the parameter username is included in the GET or POST parameters twice.

	```url
       GET /login.php?username=tester&username=<script>alert(1)</script>
	``` 
	- could bypass a WAF if it only inspects the first `password` parameter. The server may still process the second `password` value.

- [see more](https://portswigger.net/web-security/api-testing/server-side-parameter-pollution)

### 3. Case Transformation

- Some WAFs rely on pattern matching based on specific case-sensitive keywords. Attackers can bypass detection by changing the case of the characters in their payload, rendering the WAF unable to recognize the threat.

- **Example**:  
	Instead of:

	`1' SELECT * FROM users WHERE username = 'admin'; `

	An attacker could send:

	`1' SeLeCt * FrOm users WhErE username = 'admin'; `

The WAF might not detect the query as malicious due to its failure to normalize case. This tactic is particularly effective against less sophisticated WAFs that rely on exact pattern matching.

### 4. IP Fragmentation

- IP fragmentation is a technique that takes advantage of how data is transmitted over networks. By breaking up the payload into multiple smaller fragments, attackers can bypass WAFs that fail to reassemble packets before inspection.

	**Example**:  
	Instead of sending a single complete HTTP request, an attacker might break it into multiple IP packets:

	```
	GET /fragments/part1
	GET /fragments/part2

	```

Each fragment contains a portion of the malicious payload. The WAF may inspect each fragment in isolation and fail to identify the full attack, allowing it to pass through once the server reassembles the fragments.


### 5. JSON & XML Payloads

- Modern web applications often use REST APIs services that transmit data in JSON or XML formats. Many WAFs are may not fully inspect the content of JSON or XML payloads.
- Attackers can inject malicious code into these formats
	 ```json
	 {
	    "username": "Tester" , 
	    "password": "<scripp> alert(1) </script>"
	 }
	 ```


### 6. 404 Bypassing

- When a resource on a website doesn’t exist , some WAFs apply less scrutiny. Attackers can exploit this by intentionally targeting non-existent pages, which may lead to reduced security checks by the WAF.
```
  GET /notfountpage?name=<script>alert(1)</script> 
```

- The WAF might ignore the request since the target page does not exist, but the server could still process the payload.