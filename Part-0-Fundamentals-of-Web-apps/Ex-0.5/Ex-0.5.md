sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enters https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Note right of Browser: Browser starts executing JavaScript (single-page app logic)

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json (XHR or Fetch)
    activate Server
    Server-->>Browser: JSON data for notes [{ "content": "Note content", "date": "2023-1-1" }, ... ]
    deactivate Server

    Note right of Browser: Browser dynamically renders notes using the fetched JSON data
