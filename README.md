<p align="center">
  <a href="" rel="noopener">
 <img width=100px height=100px src="./public/icon128.png" alt="Project logo"></a>
</p>

<h3 align="center">jira-chrome-extension</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

<p align="center"> Fast copy of jira commit code and issue list with filters
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [CORS Trick](#cors)
- [Getting Started](#getting_started)
- [Local Running](#local-dev)
- [Demo](#demo)
- [Built Using](#built_using)
- [Known Issues](#bug)


## 🧐 About <a name = "about"></a>

This project aims to bring Jira closer to the user, particularly by making it easier to copy commit code associated with issues. All of this is also accomplished with filters on labels and issue status.
The project is written in react and tailwind and is available only for google chrome.
It uses jira api directly from frontend without a backend.

## ♦️ CORS Trick <a name = "cors"></a>
Since jira endpoint are blcoked by cors of the browser but i don't want to host or build any backend i used two different ways to get rid of this error.
If you want to develop the exetension locally there is a simple proxy to run that mirror the call to jira and respond to the browser. On the extension i listen to all the request from the jira endpoint (you can see them under manifest.js in host permission) and rewrite the header allowing request from *

## 🏁 Getting Started <a name = "getting_started"></a>

You can download the extension on google chrome web store at:

After that compile settings section on the extension and start working!

## 🔧 Local Running for dev <a name = "local-dev"></a>

Before start react youn need to start local proxy that simply unlock cors browser check

```
node localproxy.js
```

and then run react

```
npm run start
```


## 🎈 Demo <a name="demo"></a>


https://github.com/ruggero95/jira-issue-chrome-extension/assets/9202746/0ee2a7d7-b703-482e-a464-d4eace51c729



## ⛏️ Built Using <a name = "built_using"></a>

- [Tailwind](https://tailwindcss.com/) - utility first CSS framework
- [React](https://react.dev/) - The library for building web components
- [Typescript](https://vuejs.org/) - Javascript with types


## ✍️ Authors <a name = "authors"></a>

- [@ruggero95](https://github.com/ruggero95) - Idea & Initial work

## 🐛 Known Issues <a name = "bug"></a>

- Reset button does not retrigger rerender of user select but reset filter from local storage
- typings of context are bad
- Initial Setup guide

