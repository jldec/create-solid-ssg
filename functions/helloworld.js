// https://developers.cloudflare.com/pages/functions/get-started/#create-a-function
// https://developers.cloudflare.com/pages/functions/api-reference/#eventcontext
// https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties
export function onRequest(context) {
return new Response(`Hello from ${context.request.cf.city || context.request.cf.country}!
The date is ${new Date().toDateString()}
The time is ${new Date().toLocaleTimeString()}`);
}
