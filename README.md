# document-analysis

Involves a word application which fetches data from an url and filters out top 10 words on basis of count. Next gets the detail of those top 10 words including synonym, part of speech and meaning from another 3rd party API.


## Steps to set up and Run the Application

### Installation and Running
1. You need to have **node.js** , **npm** installed on your machine. Once installed, you can check the versions using the below commands

```sh
node -v // using v14.17.0
npm -v
```

2. Next, run below commands:
```sh
npm i
```
3. To see the result:
```sh
node controllers/RunWordAnalysis.js

```
