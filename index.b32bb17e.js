!function(){function t(t){return t&&t.__esModule?t.default:t}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,u=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof n&&n&&n.Object===Object&&n,l="object"==typeof self&&self&&self.Object===Object&&self,f=a||l||Function("return this")(),s=Object.prototype.toString,p=Math.max,d=Math.min,y=function(){return f.Date.now()};function v(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==s.call(t)}(t))return NaN;if(v(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=v(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var n=r.test(t);return n||u.test(t)?c(t.slice(2),n?2:8):o.test(t)?NaN:+t}e=function(t,e,n){var i,o,r,u,c,a,l=0,f=!1,s=!1,m=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(e){var n=i,r=o;return i=o=void 0,l=e,u=t.apply(r,n)}function h(t){return l=t,c=setTimeout($,e),f?b(t):u}function j(t){var n=t-a;return void 0===a||n>=e||n<0||s&&t-l>=r}function $(){var t=y();if(j(t))return T(t);c=setTimeout($,function(t){var n=e-(t-a);return s?d(n,r-(t-l)):n}(t))}function T(t){return c=void 0,m&&i?b(t):(i=o=void 0,u)}function w(){var t=y(),n=j(t);if(i=arguments,o=this,a=t,n){if(void 0===c)return h(a);if(s)return c=setTimeout($,e),b(a)}return void 0===c&&(c=setTimeout($,e)),u}return e=g(e)||0,v(n)&&(f=!!n.leading,r=(s="maxWait"in n)?p(g(n.maxWait)||0,e):r,m="trailing"in n?!!n.trailing:m),w.cancel=function(){void 0!==c&&clearTimeout(c),l=0,i=a=o=c=void 0},w.flush=function(){return void 0===c?u:T(y())},w};const m=document.getElementById("search-box"),b=document.querySelector(".country-list");b.style.display="flex",b.style.flexDirection="column";const h=document.querySelector(".country-info");m.addEventListener("input",t(e)((function(t){t.preventDefault();const e=t.target.value;fetch(`https://restcountries.com/v3.1/name/${e}`).then((t=>t.json())).then((t=>{!function(t){const{official:e}=t.name,{population:n,capital:i,languages:o}=t,{svg:r}=t.flags,u=Object.values(o).join(",");!function(t){const{svg:e,official:n,capital:i,population:o,languagesValue:r}=t,u=`<ul>\n    <li class="contry-item"><img src="${e}" alt="" width="40" height="30"></li>\n    <li class="contry-item">${n}</li>\n    <li class="contry-item">Capita: ${i}</li>\n    <li class="contry-item">Population: ${o}</li>\n    <li class="contry-item">Languages: ${r}</li></ul>`;h.insertAdjacentHTML("beforeend",u)}({svg:r,official:e,capital:i,population:n,languagesValue:u})}(t[0])})).catch((t=>{console.log(t)}))}),300))}();
//# sourceMappingURL=index.b32bb17e.js.map
