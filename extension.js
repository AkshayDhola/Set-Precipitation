"use strict";

const vscode = require('vscode');
const fs = require('fs');

const path = require('path');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    if (!vscode.workspace.workspaceFolders) {
        return;
    }
    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    const disposable = vscode.commands.registerCommand('extension.setRain', function() {
        try {
            const currentWorkspaceRoot = vscode.workspace.rootPath;
            const path = ['config', 'controllers', 'designs', 'middlewares', 'models', 'public', 'routes', 'utils', 'views'];
            const pathfiles = ['.env', '.gitignore', 'readme.md', 'app.js'];
            const public_inside = ['images', 'javascripts', 'stylesheets'];
            const config_setup = ['development.json', 'mongoose-connection.js']
            const config_basic = ['{ \n"MONGODB_URI":"mongodb://127.0.0.1:27017"\n}', 'const mongoose = require("mongoose") \nconst config = require("config") \nmongoose\n .connect(`${config.get("MONGODB_URI")}/PROJECT-NAME`) \n .then(function(){ \n    console.log("connectd")\n}) \n.catch(function(err){ \n console.log(err) \n}); \nmodule.exports = mongoose.connection;']
            const routes_setup = ['index.js', 'usersRouter.js'];
            const routes_basic = ["var express = require('express'); \nvar router = express.Router(); \nrouter.get('/', function(req, res, next) { \nres.render('index', { title: 'Express' }); \n}); \nmodule.exports = router;", "var express = require('express'); \nvar router = express.Router(); \nrouter.get('/', function(req, res, next) { \nres.send('respond with a resource'); \n}); \nmodule.exports = router;"]
            const views_basic = '<!DOCTYPE html> \n<html lang="en"> \n<head> \n<meta charset="UTF-8"> \n<meta name="viewport" content="width=device-width, initial-scale=1.0"> \n<script src="https://cdn.tailwindcss.com"></script> \n<title>Document</title> \n</head> \n<body> \n\n</body> \n</html>';
            const app_basic = 'const express = require("express"); \nconst app = express(); \nconst cookieParser = require("cookie-parser"); \nconst path = require("path"); \nconst expressSession = require("express-session"); \n\nrequire("dotenv").config(); \n\nconst usersRouter = require("./routes/usersRouter"); \nconst indexRouter = require("./routes/index"); \n\nconst db = require("./config/mongoose-connection"); \n\napp.use(express.json()); \napp.use(express.urlencoded({ extended: true })); \napp.use(cookieParser()); \napp.use( \nexpressSession({ \nresave: false, \nsaveUninitialized: false, \nsecret: process.env.EXPRESS_SESSION_SECRET, \n}) \n); \napp.use(express.static(path.join(__dirname, "public"))); \napp.set("view engine", "ejs"); \napp.use("/", indexRouter); \napp.use("/users", usersRouter); \n\napp.listen(3000);'

            path.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/${e}`)
                    }
                })
            });
            public_inside.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/public/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/public/${e}`)
                    }
                })
            });
            pathfiles.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/${e}`, (err) => {
                    if (err) {
                        if (e === 'app.js')
                            fs.promises.writeFile(`${currentWorkspaceRoot}/${e}`, `${app_basic}`)
                        else if (e === '.gitignore')
                            fs.promises.writeFile(`${currentWorkspaceRoot}/${e}`, 'node_modules \n.env')
                        else
                            fs.promises.writeFile(`${currentWorkspaceRoot}/${e}`, ``);
                    }
                })
            });
            config_setup.map((e, index) => {
                fs.promises.access(`${currentWorkspaceRoot}/config/${e}`, (err) => {
                    if (err) {
                        fs.promises.writeFile(`${currentWorkspaceRoot}/config/${e}`, `${config_basic[index]}`)
                    }
                })
            });
            routes_setup.map((e, index) => {
                fs.promises.access(`${currentWorkspaceRoot}/routes/${e}`, (err) => {
                    if (err) {
                        fs.promises.writeFile(`${currentWorkspaceRoot}/routes/${e}`, `${routes_basic[index]}`)
                    }
                })
            });

            fs.promises.access(`${currentWorkspaceRoot}/views/index.ejs`, (err) => {
                if (err) {
                    fs.promises.writeFile(`${currentWorkspaceRoot}/views/index.ejs`, `${views_basic}`)
                }
            })


            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Run Command');
            terminal.sendText(`npm init -y`);
            const dependenices = ['bcrypt', 'cookie-parser', 'dotenv', 'ejs', 'express', 'express-session', 'jsonwebtoken', 'mongoose']
            dependenices.map(dpn => terminal.sendText(`npm install ${dpn}`))


        } catch (error) {
            vscode.window.showErrorMessage(error)
        }
    });
    const disposables = vscode.commands.registerCommand('extension.setMERN', function() {
        try {
            const currentWorkspaceRoot = vscode.workspace.rootPath;
            const root = ['backend', 'fronted'];
            const path = ['config', 'controllers', 'designs', 'middlewares', 'models', 'public', 'routes', 'utils', 'views'];
            const vitepath = ['public', 'src']
            const vitefiles = ['.eslintrc.cjs', '.gitignore', 'index.html', 'package.json', 'postcss.config.js', 'tailwind.config.js', 'vite.config.js']
            const srcfile = ['App.jsx', 'index.css', 'main.jsx'];
            const src_basic = [`import React from 'react' \n \nfunction App() { \nreturn ( \n<div>App</div> \n) \n} \n \nexport default App`, `@tailwind base; \n@tailwind components; \n@tailwind utilities;`, `import React from 'react' \nimport ReactDOM from 'react-dom/client' \nimport App from './App.jsx' \nimport './index.css' \n \nReactDOM.createRoot(document.getElementById('root')).render( \n<React.StrictMode> \n<App /> \n</React.StrictMode>, \n)`]
            const vite_src = ['assets', 'components', 'context']
            const pathfiles = ['.env', '.gitignore', 'readme.md', 'app.js'];
            const vite_basic = [`module.exports = { \nroot: true, \nenv: { browser: true, es2020: true }, \nextends: [ \n'eslint:recommended', \n'plugin:react/recommended', \n'plugin:react/jsx-runtime', \n'plugin:react-hooks/recommended', \n], \nignorePatterns: ['dist', '.eslintrc.cjs'], \nparserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, \nsettings: { react: { version: '18.2' } }, \nplugins: ['react-refresh'], \nrules: { \n'react/jsx-no-target-blank': 'off', \n'react-refresh/only-export-components': [ \n'warn', \n{ allowConstantExport: true }, \n], \n}, \n}`, ` \nlogs \n*.log \nnpm-debug.log* \nyarn-debug.log* \nyarn-error.log* \npnpm-debug.log* \nlerna-debug.log* \n \nnode_modules \ndist \ndist-ssr \n*.local \n \n.vscode/* \n!.vscode/extensions.json \n.idea \n.DS_Store \n*.suo \n*.ntvs* \n*.njsproj \n*.sln \n*.sw?`, `<!doctype html> \n<html lang="en"> \n<head> \n<meta charset="UTF-8" /> \n<link rel="icon" type="image/svg+xml" href="" /> \n<meta name="viewport" content="width=device-width, initial-scale=1.0" /> \n<title>Vite + React</title> \n</head> \n<body> \n<div id="root"></div> \n<script type="module" src="/src/main.jsx"></script> \n</body> \n</html>`, `{ \n"name": "vites", \n"private": true, \n"version": "0.0.0", \n"type": "module", \n"scripts": { \n"dev": "vite", \n"build": "vite build", \n"lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0", \n"preview": "vite preview" \n}, \n"dependencies": { \n"react": "^18.3.1", \n"react-dom": "^18.3.1" \n}, \n"devDependencies": { \n"@types/react": "^18.3.3", \n"@types/react-dom": "^18.3.0", \n"@vitejs/plugin-react": "^4.3.1", \n"autoprefixer": "^10.4.19", \n"eslint": "^8.57.0", \n"eslint-plugin-react": "^7.34.3", \n"eslint-plugin-react-hooks": "^4.6.2", \n"eslint-plugin-react-refresh": "^0.4.7", \n"postcss": "^8.4.40", \n"tailwindcss": "^3.4.6", \n"vite": "^5.3.4" \n} \n}`, `export default { \nplugins: { \ntailwindcss: {}, \nautoprefixer: {}, \n}, \n}`, `/** @type {import('tailwindcss').Config} */ \nexport default { \ncontent: [ \n"./index.html", \n"./src/**/*.{js,ts,jsx,tsx}", \n], \ntheme: { \nextend: {}, \n}, \nplugins: [], \n}`, `import { defineConfig } from 'vite' \nimport react from '@vitejs/plugin-react' \n \nexport default defineConfig({ \nplugins: [react()], \n})`]
            const public_inside = ['images', 'javascripts', 'stylesheets'];
            const app_basic = 'const express = require("express"); \nconst app = express(); \nconst cookieParser = require("cookie-parser"); \nconst path = require("path"); \nconst expressSession = require("express-session"); \n\nrequire("dotenv").config(); \n\nconst usersRouter = require("./routes/usersRouter"); \nconst indexRouter = require("./routes/index"); \n\nconst db = require("./config/mongoose-connection"); \n\napp.use(express.json()); \napp.use(express.urlencoded({ extended: true })); \napp.use(cookieParser()); \napp.use( \nexpressSession({ \nresave: false, \nsaveUninitialized: false, \nsecret: process.env.EXPRESS_SESSION_SECRET, \n}) \n); \napp.use(express.static(path.join(__dirname, "public"))); \napp.set("view engine", "ejs"); \napp.use("/", indexRouter); \napp.use("/users", usersRouter); \n\napp.listen(3000);'

            root.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/${e}`)
                    }
                })
            });
            path.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/backend/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/backend/${e}`)
                    }
                })
            });
            vitepath.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/fronted/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/fronted/${e}`)
                    }
                })
            });
            vite_src.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/fronted/src/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/fronted/src/${e}`)
                    }
                })
            });
            vitefiles.map((e, index) => {
                fs.promises.access(`${currentWorkspaceRoot}/fronted/${e}`, (err) => {
                    if (err) {
                        fs.promises.writeFile(`${currentWorkspaceRoot}/fronted/${e}`, `${vite_basic[index]}`)
                    }
                })
            });
            srcfile.map((e, index) => {
                fs.promises.access(`${currentWorkspaceRoot}/fronted/src/${e}`, (err) => {
                    if (err) {
                        fs.promises.writeFile(`${currentWorkspaceRoot}/fronted/src/${e}`, `${src_basic[index]}`)
                    }
                })
            });
            public_inside.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/backend/public/${e}`, (err) => {
                    if (err) {
                        fs.promises.mkdir(`${currentWorkspaceRoot}/backend/public/${e}`)
                    }
                })
            });
            pathfiles.map(e => {
                fs.promises.access(`${currentWorkspaceRoot}/backend/${e}`, (err) => {
                    if (err) {
                        if (e === 'app.js')
                            fs.promises.writeFile(`${currentWorkspaceRoot}/backend/${e}`, `${app_basic}`)
                        else if (e === '.gitignore')
                            fs.promises.writeFile(`${currentWorkspaceRoot}/backend/${e}`, 'node_modules \n.env')
                        else
                            fs.promises.writeFile(`${currentWorkspaceRoot}/backend/${e}`, ``);
                    }
                })
            });

            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Run Command');
            terminal.sendText(`cd backend`);
            terminal.sendText(`npm init -y`);
            const dependenices = ['bcrypt', 'cookie-parser', 'ejs', 'express', 'express-session', 'jsonwebtoken', 'mongoose']
            dependenices.map(dpn => terminal.sendText(`npm install ${dpn}`))
            terminal.sendText(`cd ..`);
            terminal.sendText(`cd fronted`);
            terminal.sendText(`npm i`);
            terminal.sendText(`npm install -D tailwindcss postcss autoprefixer`);
            terminal.sendText(`npx tailwindcss init -p`);

        } catch (error) {

        }
    });
    context.subscriptions.push(disposable);
}


module.exports = { activate }