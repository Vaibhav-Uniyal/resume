"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/resumes/route";
exports.ids = ["app/api/resumes/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fresumes%2Froute&page=%2Fapi%2Fresumes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresumes%2Froute.ts&appDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fresumes%2Froute&page=%2Fapi%2Fresumes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresumes%2Froute.ts&appDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/node-polyfill-headers */ \"(rsc)/./node_modules/next/dist/server/node-polyfill-headers.js\");\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var C_Users_vidisha_OneDrive_Desktop_r_app_api_resumes_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/resumes/route.ts */ \"(rsc)/./app/api/resumes/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__.RouteKind.APP_ROUTE,\n        page: \"/api/resumes/route\",\n        pathname: \"/api/resumes\",\n        filename: \"route\",\n        bundlePath: \"app/api/resumes/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\vidisha\\\\OneDrive\\\\Desktop\\\\r\\\\app\\\\api\\\\resumes\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_vidisha_OneDrive_Desktop_r_app_api_resumes_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/resumes/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZyZXN1bWVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyZXN1bWVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmVzdW1lcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN2aWRpc2hhJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDdmlkaXNoYSU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDc0Q7QUFDdkM7QUFDbUM7QUFDbEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDaUo7O0FBRWpKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdW1lLWJ1aWxkZXItYXRzLz9mNjc3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm5leHQvZGlzdC9zZXJ2ZXIvbm9kZS1wb2x5ZmlsbC1oZWFkZXJzXCI7XG5pbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFx2aWRpc2hhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcclxcXFxhcHBcXFxcYXBpXFxcXHJlc3VtZXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Jlc3VtZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yZXN1bWVzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9yZXN1bWVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdmlkaXNoYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHJcXFxcYXBwXFxcXGFwaVxcXFxyZXN1bWVzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3Jlc3VtZXMvcm91dGVcIjtcbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fresumes%2Froute&page=%2Fapi%2Fresumes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresumes%2Froute.ts&appDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Please enter an email and password\");\n                }\n                const { db } = await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectToDatabase)();\n                const user = await db.collection(\"users\").findOne({\n                    email: credentials.email\n                });\n                if (!user) {\n                    throw new Error(\"No user found with this email\");\n                }\n                const isPasswordValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_3__.compare)(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid password\");\n                }\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFpQztBQUNpQztBQUNoQjtBQUNmO0FBRTVCLE1BQU1JLGNBQWM7SUFDekJDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTSxFQUFFQyxFQUFFLEVBQUUsR0FBRyxNQUFNWiwrREFBaUJBO2dCQUN0QyxNQUFNYSxPQUFPLE1BQU1ELEdBQUdFLFVBQVUsQ0FBQyxTQUFTQyxPQUFPLENBQUM7b0JBQUVULE9BQU9ELFlBQVlDLEtBQUs7Z0JBQUM7Z0JBRTdFLElBQUksQ0FBQ08sTUFBTTtvQkFDVCxNQUFNLElBQUlGLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1LLGtCQUFrQixNQUFNZixpREFBT0EsQ0FBQ0ksWUFBWUksUUFBUSxFQUFFSSxLQUFLSixRQUFRO2dCQUV6RSxJQUFJLENBQUNPLGlCQUFpQjtvQkFDcEIsTUFBTSxJQUFJTCxNQUFNO2dCQUNsQjtnQkFFQSxPQUFPO29CQUNMTSxJQUFJSixLQUFLSyxHQUFHLENBQUNDLFFBQVE7b0JBQ3JCYixPQUFPTyxLQUFLUCxLQUFLO29CQUNqQkYsTUFBTVMsS0FBS1QsSUFBSTtnQkFDakI7WUFDRjtRQUNGO0tBQ0Q7SUFDRGdCLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWIsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JhLE1BQU1ULEVBQUUsR0FBR0osS0FBS0ksRUFBRTtZQUNwQjtZQUNBLE9BQU9TO1FBQ1Q7UUFDQSxNQUFNTixTQUFRLEVBQUVBLE9BQU8sRUFBRU0sS0FBSyxFQUFFO1lBQzlCLElBQUlOLFFBQVFQLElBQUksRUFBRTtnQkFDaEJPLFFBQVFQLElBQUksQ0FBQ0ksRUFBRSxHQUFHUyxNQUFNVCxFQUFFO1lBQzVCO1lBQ0EsT0FBT0c7UUFDVDtJQUNGO0FBQ0YsRUFBRTtBQUVGLE1BQU1PLFVBQVU3QixnREFBUUEsQ0FBQ0k7QUFDa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN1bWUtYnVpbGRlci1hdHMvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICdAL2xpYi9tb25nb2RiJztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ2JjcnlwdGpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiAnQ3JlZGVudGlhbHMnLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGVudGVyIGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBkYiB9ID0gYXdhaXQgY29ubmVjdFRvRGF0YWJhc2UoKTtcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIuY29sbGVjdGlvbigndXNlcnMnKS5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdXNlciBmb3VuZCB3aXRoIHRoaXMgZW1haWwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG5cclxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhc3N3b3JkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9sb2dpbicsXHJcbiAgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07ICJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJjb25uZWN0VG9EYXRhYmFzZSIsImNvbXBhcmUiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJFcnJvciIsImRiIiwidXNlciIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwiaXNQYXNzd29yZFZhbGlkIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/resumes/route.ts":
/*!**********************************!*\
  !*** ./app/api/resumes/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_models_Resume__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/models/Resume */ \"(rsc)/./app/models/Resume.ts\");\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.email) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { searchParams } = new URL(request.url);\n        const email = searchParams.get(\"email\");\n        if (!email) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Email is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Only allow users to fetch their own resumes\n        if (email !== session.user.email) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const resumes = await _app_models_Resume__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find({\n            userId: email\n        }).sort({\n            createdAt: -1\n        }).select(\"id title role atsScore createdAt\");\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(resumes);\n    } catch (error) {\n        console.error(\"Error fetching resumes:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.email) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const body = await request.json();\n        const { title, role, atsScore, originalResume, optimizedResume, userId } = body;\n        // Validate that the user is saving their own resume\n        if (userId !== session.user.email) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const resume = new _app_models_Resume__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n            userId,\n            title,\n            role,\n            atsScore,\n            originalResume,\n            optimizedResume\n        });\n        await resume.save();\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(resume);\n    } catch (error) {\n        console.error(\"Error saving resume:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Jlc3VtZXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEyQztBQUNFO0FBQ0o7QUFDaUI7QUFFbkQsZUFBZUksSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDRSw2REFBV0E7UUFFbEQsSUFBSSxDQUFDRyxTQUFTQyxNQUFNQyxPQUFPO1lBQ3pCLE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlSLFFBQVFTLEdBQUc7UUFDNUMsTUFBTU4sUUFBUUksYUFBYUcsR0FBRyxDQUFDO1FBRS9CLElBQUksQ0FBQ1AsT0FBTztZQUNWLE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBb0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3pFO1FBRUEsOENBQThDO1FBQzlDLElBQUlILFVBQVVGLFFBQVFDLElBQUksQ0FBQ0MsS0FBSyxFQUFFO1lBQ2hDLE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNSyxVQUFVLE1BQU1kLDBEQUFNQSxDQUFDZSxJQUFJLENBQUM7WUFBRUMsUUFBUVY7UUFBTSxHQUMvQ1csSUFBSSxDQUFDO1lBQUVDLFdBQVcsQ0FBQztRQUFFLEdBQ3JCQyxNQUFNLENBQUM7UUFFVixPQUFPckIsa0ZBQVlBLENBQUNTLElBQUksQ0FBQ087SUFDM0IsRUFBRSxPQUFPTixPQUFPO1FBQ2RZLFFBQVFaLEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU9WLGtGQUFZQSxDQUFDUyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBd0IsR0FDakM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0Y7QUFFTyxlQUFlWSxLQUFLbEIsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDRSw2REFBV0E7UUFFbEQsSUFBSSxDQUFDRyxTQUFTQyxNQUFNQyxPQUFPO1lBQ3pCLE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNYSxPQUFPLE1BQU1uQixRQUFRSSxJQUFJO1FBQy9CLE1BQU0sRUFBRWdCLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxRQUFRLEVBQUVDLGNBQWMsRUFBRUMsZUFBZSxFQUFFWCxNQUFNLEVBQUUsR0FBR007UUFFM0Usb0RBQW9EO1FBQ3BELElBQUlOLFdBQVdaLFFBQVFDLElBQUksQ0FBQ0MsS0FBSyxFQUFFO1lBQ2pDLE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNbUIsU0FBUyxJQUFJNUIsMERBQU1BLENBQUM7WUFDeEJnQjtZQUNBTztZQUNBQztZQUNBQztZQUNBQztZQUNBQztRQUNGO1FBRUEsTUFBTUMsT0FBT0MsSUFBSTtRQUVqQixPQUFPL0Isa0ZBQVlBLENBQUNTLElBQUksQ0FBQ3FCO0lBQzNCLEVBQUUsT0FBT3BCLE9BQU87UUFDZFksUUFBUVosS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT1Ysa0ZBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUF3QixHQUNqQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VtZS1idWlsZGVyLWF0cy8uL2FwcC9hcGkvcmVzdW1lcy9yb3V0ZS50cz9jOWYzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XHJcbmltcG9ydCBSZXN1bWUgZnJvbSAnQC9hcHAvbW9kZWxzL1Jlc3VtZSc7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnLi4vYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgICBcclxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uZW1haWwpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gICAgY29uc3QgZW1haWwgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlbWFpbCcpO1xyXG5cclxuICAgIGlmICghZW1haWwpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFbWFpbCBpcyByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IGFsbG93IHVzZXJzIHRvIGZldGNoIHRoZWlyIG93biByZXN1bWVzXHJcbiAgICBpZiAoZW1haWwgIT09IHNlc3Npb24udXNlci5lbWFpbCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bWVzID0gYXdhaXQgUmVzdW1lLmZpbmQoeyB1c2VySWQ6IGVtYWlsIH0pXHJcbiAgICAgIC5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KVxyXG4gICAgICAuc2VsZWN0KCdpZCB0aXRsZSByb2xlIGF0c1Njb3JlIGNyZWF0ZWRBdCcpO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bWVzKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcmVzdW1lczonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gICAgXHJcbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgIGNvbnN0IHsgdGl0bGUsIHJvbGUsIGF0c1Njb3JlLCBvcmlnaW5hbFJlc3VtZSwgb3B0aW1pemVkUmVzdW1lLCB1c2VySWQgfSA9IGJvZHk7XHJcblxyXG4gICAgLy8gVmFsaWRhdGUgdGhhdCB0aGUgdXNlciBpcyBzYXZpbmcgdGhlaXIgb3duIHJlc3VtZVxyXG4gICAgaWYgKHVzZXJJZCAhPT0gc2Vzc2lvbi51c2VyLmVtYWlsKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VtZSA9IG5ldyBSZXN1bWUoe1xyXG4gICAgICB1c2VySWQsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICByb2xlLFxyXG4gICAgICBhdHNTY29yZSxcclxuICAgICAgb3JpZ2luYWxSZXN1bWUsXHJcbiAgICAgIG9wdGltaXplZFJlc3VtZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHJlc3VtZS5zYXZlKCk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VtZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNhdmluZyByZXN1bWU6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiUmVzdW1lIiwiYXV0aE9wdGlvbnMiLCJHRVQiLCJyZXF1ZXN0Iiwic2Vzc2lvbiIsInVzZXIiLCJlbWFpbCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImdldCIsInJlc3VtZXMiLCJmaW5kIiwidXNlcklkIiwic29ydCIsImNyZWF0ZWRBdCIsInNlbGVjdCIsImNvbnNvbGUiLCJQT1NUIiwiYm9keSIsInRpdGxlIiwicm9sZSIsImF0c1Njb3JlIiwib3JpZ2luYWxSZXN1bWUiLCJvcHRpbWl6ZWRSZXN1bWUiLCJyZXN1bWUiLCJzYXZlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/resumes/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/models/Resume.ts":
/*!******************************!*\
  !*** ./app/models/Resume.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ResumeSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    userId: {\n        type: String,\n        required: true,\n        index: true\n    },\n    originalResume: {\n        type: String,\n        required: true\n    },\n    optimizedResume: {\n        type: String,\n        required: true\n    },\n    atsScore: {\n        type: Number,\n        required: true\n    },\n    suggestions: [\n        {\n            type: String\n        }\n    ],\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Resume || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Resume\", ResumeSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbW9kZWxzL1Jlc3VtZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsZUFBZSxJQUFJRCx3REFBZSxDQUFDO0lBQ3ZDRyxRQUFRO1FBQ05DLE1BQU1DO1FBQ05DLFVBQVU7UUFDVkMsT0FBTztJQUNUO0lBQ0FDLGdCQUFnQjtRQUNkSixNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQUcsaUJBQWlCO1FBQ2ZMLE1BQU1DO1FBQ05DLFVBQVU7SUFDWjtJQUNBSSxVQUFVO1FBQ1JOLE1BQU1PO1FBQ05MLFVBQVU7SUFDWjtJQUNBTSxhQUFhO1FBQUM7WUFDWlIsTUFBTUM7UUFDUjtLQUFFO0lBQ0ZRLFdBQVc7UUFDVFQsTUFBTVU7UUFDTkMsU0FBU0QsS0FBS0UsR0FBRztJQUNuQjtBQUNGO0FBRUEsaUVBQWVoQix3REFBZSxDQUFDa0IsTUFBTSxJQUFJbEIscURBQWMsQ0FBQyxVQUFVQyxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdW1lLWJ1aWxkZXItYXRzLy4vYXBwL21vZGVscy9SZXN1bWUudHM/OGEyOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgUmVzdW1lU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgdXNlcklkOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIGluZGV4OiB0cnVlXHJcbiAgfSxcclxuICBvcmlnaW5hbFJlc3VtZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWVcclxuICB9LFxyXG4gIG9wdGltaXplZFJlc3VtZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWVcclxuICB9LFxyXG4gIGF0c1Njb3JlOiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICByZXF1aXJlZDogdHJ1ZVxyXG4gIH0sXHJcbiAgc3VnZ2VzdGlvbnM6IFt7XHJcbiAgICB0eXBlOiBTdHJpbmdcclxuICB9XSxcclxuICBjcmVhdGVkQXQ6IHtcclxuICAgIHR5cGU6IERhdGUsXHJcbiAgICBkZWZhdWx0OiBEYXRlLm5vd1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuUmVzdW1lIHx8IG1vbmdvb3NlLm1vZGVsKCdSZXN1bWUnLCBSZXN1bWVTY2hlbWEpOyAiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJSZXN1bWVTY2hlbWEiLCJTY2hlbWEiLCJ1c2VySWQiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJpbmRleCIsIm9yaWdpbmFsUmVzdW1lIiwib3B0aW1pemVkUmVzdW1lIiwiYXRzU2NvcmUiLCJOdW1iZXIiLCJzdWdnZXN0aW9ucyIsImNyZWF0ZWRBdCIsIkRhdGUiLCJkZWZhdWx0Iiwibm93IiwibW9kZWxzIiwiUmVzdW1lIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/models/Resume.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Please add your MongoDB URI to .env.local\");\n}\nconst uri = process.env.MONGODB_URI;\nconst options = {};\nlet client;\nlet clientPromise;\nif (true) {\n    // In development mode, use a global variable so that the value\n    // is preserved across module reloads caused by HMR (Hot Module Replacement).\n    if (!global._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {}\nasync function connectToDatabase() {\n    try {\n        const client = await clientPromise;\n        const db = client.db(process.env.MONGODB_DB || \"resumate\");\n        return {\n            client,\n            db\n        };\n    } catch (error) {\n        console.error(\"Error connecting to database:\", error);\n        throw new Error(\"Unable to connect to database. Please check your MongoDB connection string.\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBc0M7QUFFdEMsSUFBSSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLFdBQVcsRUFBRTtJQUM1QixNQUFNLElBQUlDLE1BQU07QUFDbEI7QUFFQSxNQUFNQyxNQUFNSixRQUFRQyxHQUFHLENBQUNDLFdBQVc7QUFDbkMsTUFBTUcsVUFBVSxDQUFDO0FBRWpCLElBQUlDO0FBQ0osSUFBSUM7QUFFSixJQUFJUCxJQUF5QixFQUFlO0lBQzFDLCtEQUErRDtJQUMvRCw2RUFBNkU7SUFDN0UsSUFBSSxDQUFDUSxPQUFPQyxtQkFBbUIsRUFBRTtRQUMvQkgsU0FBUyxJQUFJUCxnREFBV0EsQ0FBQ0ssS0FBS0M7UUFDOUJHLE9BQU9DLG1CQUFtQixHQUFHSCxPQUFPSSxPQUFPO0lBQzdDO0lBQ0FILGdCQUFnQkMsT0FBT0MsbUJBQW1CO0FBQzVDLE9BQU8sRUFJTjtBQUVNLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNTCxTQUFTLE1BQU1DO1FBQ3JCLE1BQU1LLEtBQUtOLE9BQU9NLEVBQUUsQ0FBQ1osUUFBUUMsR0FBRyxDQUFDWSxVQUFVLElBQUk7UUFDL0MsT0FBTztZQUFFUDtZQUFRTTtRQUFHO0lBQ3RCLEVBQUUsT0FBT0UsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsaUNBQWlDQTtRQUMvQyxNQUFNLElBQUlYLE1BQU07SUFDbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VtZS1idWlsZGVyLWF0cy8uL2xpYi9tb25nb2RiLnRzPzA1YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJztcblxuaWYgKCFwcm9jZXNzLmVudi5NT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBhZGQgeW91ciBNb25nb0RCIFVSSSB0byAuZW52LmxvY2FsJyk7XG59XG5cbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG5sZXQgY2xpZW50O1xubGV0IGNsaWVudFByb21pc2U7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAvLyBJbiBkZXZlbG9wbWVudCBtb2RlLCB1c2UgYSBnbG9iYWwgdmFyaWFibGUgc28gdGhhdCB0aGUgdmFsdWVcbiAgLy8gaXMgcHJlc2VydmVkIGFjcm9zcyBtb2R1bGUgcmVsb2FkcyBjYXVzZWQgYnkgSE1SIChIb3QgTW9kdWxlIFJlcGxhY2VtZW50KS5cbiAgaWYgKCFnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSkge1xuICAgIGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmksIG9wdGlvbnMpO1xuICAgIGdsb2JhbC5fbW9uZ29DbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKTtcbiAgfVxuICBjbGllbnRQcm9taXNlID0gZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2U7XG59IGVsc2Uge1xuICAvLyBJbiBwcm9kdWN0aW9uIG1vZGUsIGl0J3MgYmVzdCB0byBub3QgdXNlIGEgZ2xvYmFsIHZhcmlhYmxlLlxuICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcbiAgY2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0VG9EYXRhYmFzZSgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGllbnRQcm9taXNlO1xuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKHByb2Nlc3MuZW52Lk1PTkdPREJfREIgfHwgJ3Jlc3VtYXRlJyk7XG4gICAgcmV0dXJuIHsgY2xpZW50LCBkYiB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvbm5lY3RpbmcgdG8gZGF0YWJhc2U6JywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbm5lY3QgdG8gZGF0YWJhc2UuIFBsZWFzZSBjaGVjayB5b3VyIE1vbmdvREIgY29ubmVjdGlvbiBzdHJpbmcuJyk7XG4gIH1cbn0gIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJ1cmkiLCJvcHRpb25zIiwiY2xpZW50IiwiY2xpZW50UHJvbWlzZSIsImdsb2JhbCIsIl9tb25nb0NsaWVudFByb21pc2UiLCJjb25uZWN0IiwiY29ubmVjdFRvRGF0YWJhc2UiLCJkYiIsIk1PTkdPREJfREIiLCJlcnJvciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fresumes%2Froute&page=%2Fapi%2Fresumes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresumes%2Froute.ts&appDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvidisha%5COneDrive%5CDesktop%5Cr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();