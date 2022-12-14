(()=>{"use strict";var e={4065:function(e,t,c){var n=this&&this.__read||function(e,t){var c="function"==typeof Symbol&&e[Symbol.iterator];if(!c)return e;var n,r,o=c.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)a.push(n.value)}catch(e){r={error:e}}finally{try{n&&!n.done&&(c=o.return)&&c.call(o)}finally{if(r)throw r.error}}return a},r=this&&this.__spreadArray||function(e,t,c){if(c||2===arguments.length)for(var n,r=0,o=t.length;r<o;r++)!n&&r in t||(n||(n=Array.prototype.slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||Array.prototype.slice.call(t))};t.__esModule=!0,t.rebindBulkActionsEventListeners=t.addBulkActionListeners=void 0;var o=c(3947),a="[data-bulk-action-checkbox]",d="[data-bulk-action-select-all-checkbox]",i="[data-bulk-action-footer]",l="[data-bulk-action-num-objects]",u="[data-bulk-action-num-objects-in-listing]",s={};function h(e){var t=document.querySelector(".actions [data-dropdown]");null!==t&&(!0===e?t.classList.remove("hidden"):t.classList.add("hidden"))}function f(e){return wagtailConfig.STRINGS.BULK_ACTIONS[wagtailConfig.BULK_ACTION_ITEM_TYPE]?wagtailConfig.STRINGS.BULK_ACTIONS[wagtailConfig.BULK_ACTION_ITEM_TYPE][e]:wagtailConfig.STRINGS.BULK_ACTIONS.ITEM[e]}function v(e){document.querySelectorAll(d).forEach((function(t){t.checked=e.target.checked}));var t=new Event("change");document.querySelectorAll(a).forEach((function(c){c.checked!==e.target.checked&&(c.checked=e.target.checked,e.target.checked?c.dispatchEvent(t):c.classList.remove("show"))})),e.target.checked?h(!1):(h(!0),s.checkedObjects.clear(),document.querySelector(i).classList.add("hidden"))}function y(e){if(e.shiftKey&&s.prevCheckedObject){var t=r([],n(document.querySelectorAll(a)),!1),c=t.findIndex((function(e){return e.dataset.objectId===s.prevCheckedObject})),d=t.findIndex((function(t){return t.dataset.objectId===e.target.dataset.objectId})),i=(c>d?d:c)+1,l=c<=d?d:c;(0,o.range)(i,l).forEach((function(e){var n=new Event("change");t[e].checked=t[c].checked,t[e].dispatchEvent(n)})),s.prevCheckedObject=e.target.dataset.objectId}}function L(e){s.selectAllInListing&&(s.selectAllInListing=!1);var t=s.checkedObjects.size;e.target.checked?s.checkedObjects.add(e.target.dataset.objectId):(document.querySelectorAll(d).forEach((function(e){e.checked=!1})),s.checkedObjects.delete(e.target.dataset.objectId));var c=s.checkedObjects.size;if(0===c?(h(!0),document.querySelector(i).classList.add("hidden"),document.querySelectorAll(a).forEach((function(e){return e.classList.remove("show")}))):1===c&&0===t&&(h(!1),document.querySelectorAll(a).forEach((function(e){e.classList.add("show")})),document.querySelector(i).classList.remove("hidden")),c===s.numObjects?(document.querySelectorAll(d).forEach((function(e){e.checked=!0})),s.shouldShowAllInListingText&&document.querySelector(u).classList.remove("u-hidden")):s.shouldShowAllInListingText&&document.querySelector(u).classList.add("u-hidden"),c>0){var n;n=1===c?f("SINGULAR"):c===s.numObjects?f("ALL").replace("{0}",c):f("PLURAL").replace("{0}",c),document.querySelector(l).textContent=n}s.prevCheckedObject=e.target.dataset.objectId}function S(e){e.preventDefault(),s.selectAllInListing=!0,document.querySelector(l).textContent="".concat(f("ALL_IN_LISTING"),"."),document.querySelector(u).classList.add("u-hidden")}function g(e){e.preventDefault();var t=e.target.getAttribute("href"),c=new URLSearchParams(window.location.search);if(s.selectAllInListing){c.append("id","all");var n=document.querySelector("[data-bulk-action-parent-id]");if(n){var r=n.dataset.bulkActionParentId;c.append("childOf",r)}}else s.checkedObjects.forEach((function(e){c.append("id",e)}));window.location.href="".concat(t,"&").concat(c.toString())}t.addBulkActionListeners=function(){s={checkedObjects:new Set,numObjects:0,selectAllInListing:!1,shouldShowAllInListingText:!0,prevCheckedObject:null};var e=new Event("change");document.querySelectorAll(a).forEach((function(e){s.numObjects+=1,e.addEventListener("change",L),e.addEventListener("click",y)})),document.querySelectorAll(d).forEach((function(e){e.addEventListener("change",v)})),document.querySelectorAll("".concat(i," .bulk-action-btn")).forEach((function(e){return e.addEventListener("click",g)}));var t=document.querySelector(u);t?t.addEventListener("click",S):s.shouldShowAllInListingText=!1,document.querySelectorAll(a).forEach((function(t){t.checked&&t.dispatchEvent(e)}))},t.rebindBulkActionsEventListeners=function(){document.querySelectorAll(d).forEach((function(e){e.checked=!1})),document.querySelector(i).classList.add("hidden"),document.querySelectorAll(d).forEach((function(e){e.removeEventListener("change",v),e.addEventListener("change",v)})),s.checkedObjects.clear(),s.numObjects=0,document.querySelectorAll(a).forEach((function(e){s.numObjects+=1,e.addEventListener("change",L)}))}},3947:function(e,t){var c=this&&this.__read||function(e,t){var c="function"==typeof Symbol&&e[Symbol.iterator];if(!c)return e;var n,r,o=c.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)a.push(n.value)}catch(e){r={error:e}}finally{try{n&&!n.done&&(c=o.return)&&c.call(o)}finally{if(r)throw r.error}}return a},n=this&&this.__spreadArray||function(e,t,c){if(c||2===arguments.length)for(var n,r=0,o=t.length;r<o;r++)!n&&r in t||(n||(n=Array.prototype.slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||Array.prototype.slice.call(t))};t.__esModule=!0,t.range=void 0,t.range=function(e,t){return void 0===e&&(e=0),void 0===t&&(t=0),n([],c(Array(t-e).keys()),!1).map((function(t){return t+e}))}}},t={};function c(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,c),o.exports}(()=>{var e=c(4065);if(document.addEventListener("DOMContentLoaded",e.addBulkActionListeners),window.headerSearch){var t=document.querySelector(window.headerSearch.termInput);t&&t.addEventListener("search-success",e.rebindBulkActionsEventListeners)}})()})();