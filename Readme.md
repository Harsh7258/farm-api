1. data.json --> file to add data in form of json  to the api.
2. modules folder for exporting function.
3. repalceTemplates.js --> to export function (module.exports) used ES6 cant be used because it is in modules folder.
4. require('./modules/replaceTemplates') --> to import the function (not in ES6).
5. npm init --> for package.json file.
6. npm i nodemon --> repalce node with nodemon to run the server. [nodemon] restarting due to changes...
[nodemon] starting `node index.js`.
devDependency to run file and by saving it run without stoping the server.
7. scripts {
    "start" : 'nodemon index.js',
} 
to start the server with this.
{npm start} --> in the command line to trigger the start script in the json file.
8. slugify --> creates slugs which are the last part of the links instead of ?id=0... 
9. package-lock.json --> keeps the packages data used in the project.