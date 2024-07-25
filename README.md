# Setup Extension for Visual Studio Code

## Overview

The Setup is a Visual Studio Code extension developed by Akshay Harendrabhai Dhola. Designed to streamline the process of setting up a backend development environment within the Visual Studio Code (VSCode) editor. This extension provides a comprehensive solution to help developers quickly configure their backend projects, saving time and reducing the hassle of manual setup.

## Features

- Automatically generates `config`,`controllers`,`design`,`middlewares`,`views`,`public`,`utils` folders.
- Generates `.env`, `.gitignore`, `readme.md` files.
- Install the dependenices like `bcrypt`, `cookie-parser`, `dotenv`, `ejs`, `express`, `express-session`, `jsonwebtoken`, `mongoose`.
- Setup the mongoose connection at `mondodb://127.0.0.1:27017` uri.
- Provide routes.
- Setup the ejs pages with "tailwind css".
- Express setup
- Config the MERN files

## Installation

To install the Setup extension, follow these steps:

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the sidebar or pressing `Ctrl+Shift+X`.
3. Search for "Config WebDev".
4. Click on the Install button next to the extension in the search results.

## Commands

The extension provides a command to manually trigger the folders and files.

- Command ID: `extension.setRain`
- Command ID: `extension.setMERN`

## Run

- Go to show and run command view by pressing `Ctrl+Shift+P`.
- Select `config backend files` for Backend.
- Select `config mern files` for MERN.



