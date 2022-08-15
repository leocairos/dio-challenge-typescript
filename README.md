# DIO Design Challenge - Practical Introduction to Typescript

The purpose of this repository is to respond to the proposed typescript challenges:

* [Challenge 1](./challenge/challenge1.js) - Convert to Typescript without causing errors

* [Challenge 2](./challenge/challenge2.js) - Improve code using Typescript

* [Challenge 3](./challenge/challenge3.js) - Identify and correct errors, with Typescript, for correct code functioning.

* [Challenge 4](./challenge/challenge4.js) - Movie Organizer with Typescript


<br/>

## Challenge solution 💡
<hr/>

To solve the challenge a new Node project with Typescript was started:

* Start a new Typescript project:
  
  ```shell
  $ mkdir challenge-typescript
  $ cd challenge-typescript
  $ npm init -y
  $ npm install typescript --save-dev
  $ npx tsc --init
  ```

* Edit tsconfig.json

  ```JSON
  {
    "compilerOptions": {
      "target": "es2016",
      "module": "commonjs",
      "rootDir": "./solution",
      "outDir": "./build",
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "skipLibCheck": true
    }
  }
  ```

* Create file each challenge and resolve:
  
  ```shell
  $ mkdir solution
  $ cd solution
  $ touch challenge1.ts
  $ touch challenge2.ts
  $ touch challenge3.ts
  $ touch challenge4.ts
  ```

* Test solution by run:

  ```shell
  $ npx tsc 
  ```
<br/>

**For challenge 4:**

  * Install dotenv and types:
  
    ```shell
    $ npm i dotenv
    $ npm i --save-dev @types/node
    ```
  
  * Create .env file by .env.example

    * Require follow the documentation to generate an API key https://developers.themoviedb.org/3/getting-started/introduction

<br/>

## Final solution 🏁
<hr/>

Final solutions available at:

* [X] [Solution 1](./solution/challenge1.ts) - ./solution/challenge1.ts

* [X] [Solution 2](./solution/challenge2.ts) - ./solution/challenge2.ts

* [X] [Solution 3](./solution/challenge3.ts) - ./solution/challenge3.ts

* [X] [Solution 4](./solution/challenge4.ts) - ./solution/challenge4.ts

<br/>

## License 📄
<hr/>

Code released under the [MIT License](./LICENSE).

Make by [Leonardo Cairo](https://www.linkedin.com/in/leocairos/)!
