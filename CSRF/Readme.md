# **Cross Site Request Forgery(CSRF)**

1. **What is CSRF ?**

	**CSRF** Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they’re currently authenticated. With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker’s choosing. If the victim is a normal user, a successful CSRF attack can force the user to perform state changing requests like transferring funds, changing their email address, and so forth. If the victim is an administrative account, CSRF can compromise the entire web application.
	
	[source owasp](https://owasp.org/www-community/attacks/csrf)

   **What is CSRF in Bug_Bounty_Bootcamp_The_Guide_to_Finding_and_Reporting_Web_Vulnerabilities book ?**
CSRF attacks specifically target state-changing requests, like sending tweets and modifying user settings, instead of requests that reveal sensitive user info. This is because attackers won’t be able to read the response to the forged requests sent during a CSRF attack. Let’s get into how this attack works.

2. **How CSRF attack work ?**

	 most modern web applications authenticate
their users and manage user sessions by using session cookies. When you first log in to a website, the web server establishes a new session: it sends your browser a session cookie associated with the session, and this cookie proves your identity to the server. Your browser stores the session cookies associated
with that website and sends them along with every subsequent request you send to the site. This all happens automatically, without the user’s involvement.
For example, when you log into Twitter, the Twitter server sends your browser the session cookie via an HTTP response header called Set-Cookie:
`Set-Cookie : session_cookie=Your_Twitter_Cookie_Token`
Your browser receives the session cookie, stores it, and sends it along
via the Cookie HTTP request header in every one of your requests to Twitter So when you open link from Twitter , the request not need any authentication 

3. **How Exploit CSRF vulnerability ?**
	 - create HTML Form in file
	 - upload this code for any server to get a link for this file 
	 - send link for victim . 
4. **Hunting for CSRF**
	 1. Spot State-Changing Actions
		 State-changing requests on email.example.com
		 
		-  Change password: email.example.com/password_change
			POST request
			Request parameters: new_password
			
		- Send email: email.example.com/send_email
			POST request
			Request parameters: draft_id, recipient_id
			
		- Delete email: email.example.com/delete_email
			POST request
			Request parameters: email_id
	2. Look for a Lack of CSRF Protections
		Now visit these endpoints to test them for CSRFs. First, open up Burp Suite and start intercepting all the requests to your target site in the Proxy tab , Search about any CSRF Protections 
		Like : 
		CSRF-Token 
		Referer-Header
		and try bypass it ..!
   3. Confirm this vulnerability 
	   After you’ve found a potentially vulnerable endpoint, you’ll need to confirm the vulnerability. You can do this by crafting a malicious HTML form that imitates the request sent by the legitimate site.
Craft an HTML page like this in your text editor. Make sure to save it with an .html extension! This way, your computer will open the file with a browser by default:

5. **Bypassing CSRF Protection**
	Modern websites are becoming more secure. These days, when you examine requests that deal with sensitive actions, they’ll often have some form of CSRF protection.
	- Try Exploit Clickjacking
	- Change the Request Method
	- Bypass CSRF Tokens Stored on the Server 
		-  If the site implements CSRF protection via tokens, here are a few more things that you can try.
		-  try deleting the token parameter or sending a blank token parameter 
	- Bypass CSRF Referer Header Check
		- remove the referer header. Like sending a blank
token, sometimes all you need to do to bypass a referer check is to not send a referer at all. To remove the referer header, add a <meta> tag to the page hosting your request form:
`<meta name="referrer" content="no-referrer">`

6. Some idea from writ-up 
   



 


