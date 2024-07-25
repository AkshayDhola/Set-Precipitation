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

    context.subscriptions.push(disposable);
}


module.exports = { activate }