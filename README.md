# Getting Started 

1. Install JSON Server:

  npm install -g json-server

2. After instalation you need started JSON Server. In first terminal you insert command:

  json-server --watch db.json

(for check start server you can go to http://localhost:3000/books/1, you'll get 
    {
      "bookTitle": "sdg",
      "authorName": "sdg",
      "category": "category-2",
      "ISBN": "sdgsdg",
      "id": 1
    }
)

3. Then you need start application, for this you insert comand in second terminal:

   npm run start

 4.  After this comand you have a question:

"? Something is already running on port 3000.

Would you like to run the app on another port instead? » (Y/n)"

  Your action pres:

    "Y" -> Enter
5. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

