import "babel-polyfill";
import express from "express";
import React from "react";
import ReactDomServer from "react-dom/server";
import { StaticRouter } from "react-router";
import bodyParser from "body-parser";
import App from "./src/app";
import { Switch } from "react-router-dom";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static("build"));

app.get("*", (req, res) => {
  const context = {};

  const content = ReactDomServer.renderToString(<App></App>);

  const html = `
            <html>
                <head></head>
                <body>
                    <div id="root">
                      ${content}
                    </div>
                </body>
            </html>
      `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`App Running ${PORT}`);
});
