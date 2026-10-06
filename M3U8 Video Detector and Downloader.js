// ==UserScript==
// @name         M3U8 Video Detector and Downloader
// @name:en      M3U8 Video Detector and Downloader
// @version      1.5.9
// @description:en  Automatically detect the m3u8 video of the page and download it completely. Once detected the m3u8 link, it will appear in the upper right corner of the page. Click download to jump to the m3u8 downloader.
// @icon         https://tools.thatwind.com/favicon.png
// @author       -
// @namespace    https://tools.thatwind.com/
// @homepage
// @match        *://*soushitv.com/*
// @match        *://*soushitv.tv/*
// @match        *://*tvsoushi.com/*
// @match        *://247kan.com/*
// @match        *://*59v.net/*
// @match        *://fktv.me/*
// @match        *://huarw.com/*
// @match        *://*xuehuvip.com/*
// @match        *://*ylsp.la/*
// @match        *://*xz8.cc/*
// @match        *://wooyun.tv/*
// @exclude      *://www.diancigaoshou.com/*
// @connect      *
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM.openInTab
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_deleteValue
// @grant        GM.deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_download
// @run-at       document-start
// ==/UserScript==

// inline m3u8 parser to improve performance and longevity
/*! @name m3u8-parser @version 4.7.1 @license Apache-2.0 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("global/window")):"function"==typeof define&&define.amd?define(["exports","global/window"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).m3u8Parser={},t.window)}(this,(function(t,e){"use strict";function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=i(e);var a=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e},s=function(){function t(){this.listeners={}}var e=t.prototype;return e.on=function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)},e.off=function(t,e){if(!this.listeners[t])return!1;var i=this.listeners[t].indexOf(e);return this.listeners[t]=this.listeners[t].slice(0),this.listeners[t].splice(i,1),i>-1},e.trigger=function(t){var e=this.listeners[t];if(e)if(2===arguments.length)for(var i=e.length,r=0;r<i;++r)e[r].call(this,arguments[1]);else for(var a=Array.prototype.slice.call(arguments,1),s=e.length,n=0;n<s;++n)e[n].apply(this,a)},e.dispose=function(){this.listeners={}},e.pipe=function(t){this.on("data",(function(e){t.push(e)}))},t}(),n=function(t){function e(){var e;return(e=t.call(this)||this).buffer="",e}return a(e,t),e.prototype.push=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf("\n");e>-1;e=this.buffer.indexOf("\n"))this.trigger("data",this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)},e}(s);var u=function(t,e,i){return t(i={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&i.path)}},i.exports),i.exports}((function(t){function e(){return t.exports=e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t},e.apply(this,arguments)}t.exports=e})),o=String.fromCharCode(9),g=function(t){var e=/([0-9.]*)?@?([0-9.]*)?/.exec(t||""),i={};return e[1]&&(i.length=parseInt(e[1],10)),e[2]&&(i.offset=parseInt(e[2],10)),i},f=function(t){for(var e,i=t.split(new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')),r={},a=i.length;a--;)""!==i[a]&&((e=/([^=]*)=(.*)/.exec(i[a]).slice(1))[0]=e[0].replace(/^\s+|\s+$/g,""),e[1]=e[1].replace(/^\s+|\s+$/g,""),e[1]=e[1].replace(/^['"](.*)['"]$/g,"$1"),r[e[0]]=e[1]);return r},p=function(t){function e(){var e;return(e=t.call(this)||this).customParsers=[],e.tagMappers=[],e}a(e,t);var i=e.prototype;return i.push=function(t){var e,i,r=this;0!==(t=t.trim()).length&&("#"===t[0]?this.tagMappers.reduce((function(e,i){var r=i(t);return r===t?e:e.concat([r])}),[t]).forEach((function(t){for(var a=0;a<r.customParsers.length;a++)if(r.customParsers[a].call(r,t))return;if(0===t.indexOf("#EXT"))if(t=t.replace("\r",""),e=/^#EXTM3U/.exec(t))r.trigger("data",{type:"tag",tagType:"m3u"});else{if(e=/^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(t))return i={type:"tag",tagType:"inf"},e[1]&&(i.duration=parseFloat(e[1])),e[2]&&(i.title=e[2]),void r.trigger("data",i);if(e=/^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"targetduration"},e[1]&&(i.duration=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-VERSION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"version"},e[1]&&(i.version=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(t))return i={type:"tag",tagType:"media-sequence"},e[1]&&(i.number=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(t))return i={type:"tag",tagType:"discontinuity-sequence"},e[1]&&(i.number=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(t))return i={type:"tag",tagType:"playlist-type"},e[1]&&(i.playlistType=e[1]),void r.trigger("data",i);if(e=/^#EXT-X-BYTERANGE:?(.*)?$/.exec(t))return i=u(g(e[1]),{type:"tag",tagType:"byterange"}),void r.trigger("data",i);if(e=/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(t))return i={type:"tag",tagType:"allow-cache"},e[1]&&(i.allowed=!/NO/.test(e[1])),void r.trigger("data",i);if(e=/^#EXT-X-MAP:?(.*)$/.exec(t)){if(i={type:"tag",tagType:"map"},e[1]){var s=f(e[1]);s.URI&&(i.uri=s.URI),s.BYTERANGE&&(i.byterange=g(s.BYTERANGE))}r.trigger("data",i)}else if(e=/^#EXT-X-STREAM-INF:?(.*)$/.exec(t)){if(i={type:"tag",tagType:"stream-inf"},e[1]){if(i.attributes=f(e[1]),i.attributes.RESOLUTION){var n=i.attributes.RESOLUTION.split("x"),p={};n[0]&&(p.width=parseInt(n[0],10)),n[1]&&(p.height=parseInt(n[1],10)),i.attributes.RESOLUTION=p}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}r.trigger("data",i)}else{if(e=/^#EXT-X-MEDIA:?(.*)$/.exec(t))return i={type:"tag",tagType:"media"},e[1]&&(i.attributes=f(e[1])),void r.trigger("data",i);if(e=/^#EXT-X-ENDLIST/.exec(t))r.trigger("data",{type:"tag",tagType:"endlist"});else if(e=/^#EXT-X-DISCONTINUITY/.exec(t))r.trigger("data",{type:"tag",tagType:"discontinuity"});else{if(e=/^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(t))return i={type:"tag",tagType:"program-date-time"},e[1]&&(i.dateTimeString=e[1],i.dateTimeObject=new Date(e[1])),void r.trigger("data",i);if(e=/^#EXT-X-KEY:?(.*)$/.exec(t))return i={type:"tag",tagType:"key"},e[1]&&(i.attributes=f(e[1]),i.attributes.IV&&("0x"===i.attributes.IV.substring(0,2).toLowerCase()&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),void r.trigger("data",i);if(e=/^#EXT-X-START:?(.*)$/.exec(t))return i={type:"tag",tagType:"start"},e[1]&&(i.attributes=f(e[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),void r.trigger("data",i);if(e=/^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-out-cont"},e[1]?i.data=e[1]:i.data="",void r.trigger("data",i);if(e=/^#EXT-X-CUE-OUT:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-out"},e[1]?i.data=e[1]:i.data="",void r.trigger("data",i);if(e=/^#EXT-X-CUE-IN:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-in"},e[1]?i.data=e[1]:i.data="",void r.trigger("data",i);if((e=/^#EXT-X-SKIP:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"skip"}).attributes=f(e[1]),i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10)),i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(o)),void r.trigger("data",i);if((e=/^#EXT-X-PART:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"part"}).attributes=f(e[1]),["DURATION"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseFloat(i.attributes[t]))})),["INDEPENDENT","GAP"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=/YES/.test(i.attributes[t]))})),i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=g(i.attributes.BYTERANGE)),void r.trigger("data",i);if((e=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"server-control"}).attributes=f(e[1]),["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseFloat(i.attributes[t]))})),["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=/YES/.test(i.attributes[t]))})),void r.trigger("data",i);if((e=/^#EXT-X-PART-INF:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"part-inf"}).attributes=f(e[1]),["PART-TARGET"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseFloat(i.attributes[t]))})),void r.trigger("data",i);if((e=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"preload-hint"}).attributes=f(e[1]),["BYTERANGE-START","BYTERANGE-LENGTH"].forEach((function(t){if(i.attributes.hasOwnProperty(t)){i.attributes[t]=parseInt(i.attributes[t],10);var e="BYTERANGE-LENGTH"===t?"length":"offset";i.attributes.byterange=i.attributes.byterange||{},i.attributes.byterange[e]=i.attributes[t],delete i.attributes[t]}})),void r.trigger("data",i);if((e=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"rendition-report"}).attributes=f(e[1]),["LAST-MSN","LAST-PART"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseInt(i.attributes[t],10))})),void r.trigger("data",i);r.trigger("data",{type:"tag",data:t.slice(4)})}}}else r.trigger("data",{type:"comment",text:t.slice(1)})})):this.trigger("data",{type:"uri",uri:t}))},i.addParser=function(t){var e=this,i=t.expression,r=t.customType,a=t.dataParser,s=t.segment;"function"!=typeof a&&(a=function(t){return t}),this.customParsers.push((function(t){if(i.exec(t))return e.trigger("data",{type:"custom",data:a(t),customType:r,segment:s}),!0}))},i.addTagMapper=function(t){var e=t.expression,i=t.map;this.tagMappers.push((function(t){return e.test(t)?i(t):t}))},e}(s);var c=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};function d(t){for(var e,i=(e=t,r.default.atob?r.default.atob(e):Buffer.from(e,"base64").toString("binary")),a=new Uint8Array(i.length),s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return a}var h=function(t){var e={};return Object.keys(t).forEach((function(i){var r;e[(r=i,r.toLowerCase().replace(/-(\w)/g,(function(t){return t[1].toUpperCase()})))]=t[i]})),e},l=function(t){var e=t.serverControl,i=t.targetDuration,r=t.partTargetDuration;if(e){var a="#EXT-X-SERVER-CONTROL",s="holdBack",n="partHoldBack",u=i&&3*i,o=r&&2*r;i&&!e.hasOwnProperty(s)&&(e[s]=u,this.trigger("info",{message:a+" defaulting HOLD-BACK to targetDuration * 3 ("+u+")."})),u&&e[s]<u&&(this.trigger("warn",{message:a+" clamping HOLD-BACK ("+e[s]+") to targetDuration * 3 ("+u+")"}),e[s]=u),r&&!e.hasOwnProperty(n)&&(e[n]=3*r,this.trigger("info",{message:a+" defaulting PART-HOLD-BACK to partTargetDuration * 3 ("+e[n]+")."})),r&&e[n]<o&&(this.trigger("warn",{message:a+" clamping PART-HOLD-BACK ("+e[n]+") to partTargetDuration * 2 ("+o+")."}),e[n]=o)}},b=function(t){function e(){var e;(e=t.call(this)||this).lineStream=new n,e.parseStream=new p,e.lineStream.pipe(e.parseStream);var i,r,a=c(e),s=[],o={},g=!1,f=function(){},b={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},E=0;e.manifest={allowCache:!0,discontinuityStarts:[],segments:[]};var T=0,m=0;return e.on("end",(function(){o.uri||!o.parts&&!o.preloadHints||(!o.map&&i&&(o.map=i),!o.key&&r&&(o.key=r),o.timeline||"number"!=typeof E||(o.timeline=E),e.manifest.preloadSegment=o)})),e.parseStream.on("data",(function(t){var e,n;({tag:function(){({version:function(){t.version&&(this.manifest.version=t.version)},"allow-cache":function(){this.manifest.allowCache=t.allowed,"allowed"in t||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange:function(){var e={};"length"in t&&(o.byterange=e,e.length=t.length,"offset"in t||(t.offset=T)),"offset"in t&&(o.byterange=e,e.offset=t.offset),T=e.offset+e.length},endlist:function(){this.manifest.endList=!0},inf:function(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),t.duration>0&&(o.duration=t.duration),0===t.duration&&(o.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=s},key:function(){if(t.attributes)if("NONE"!==t.attributes.METHOD)if(t.attributes.URI){if("com.apple.streamingkeydelivery"===t.attributes.KEYFORMAT)return this.manifest.contentProtection=this.manifest.contentProtection||{},void(this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:t.attributes});if("com.microsoft.playready"===t.attributes.KEYFORMAT)return this.manifest.contentProtection=this.manifest.contentProtection||{},void(this.manifest.contentProtection["com.microsoft.playready"]={uri:t.attributes.URI});if("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"===t.attributes.KEYFORMAT){return-1===["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(t.attributes.METHOD)?void this.trigger("warn",{message:"invalid key method provided for Widevine"}):("SAMPLE-AES-CENC"===t.attributes.METHOD&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}),"data:text/plain;base64,"!==t.attributes.URI.substring(0,23)?void this.trigger("warn",{message:"invalid key URI provided for Widevine"}):t.attributes.KEYID&&"0x"===t.attributes.KEYID.substring(0,2)?(this.manifest.contentProtection=this.manifest.contentProtection||{},void(this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:t.attributes.KEYFORMAT,keyId:t.attributes.KEYID.substring(2)},pssh:d(t.attributes.URI.split(",")[1])})):void this.trigger("warn",{message:"invalid key ID provided for Widevine"}))}t.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),r={method:t.attributes.METHOD||"AES-128",uri:t.attributes.URI},void 0!==t.attributes.IV&&(r.iv=t.attributes.IV)}else this.trigger("warn",{message:"ignoring key declaration without URI"});else r=null;else this.trigger("warn",{message:"ignoring key declaration without attribute list"})},"media-sequence":function(){isFinite(t.number)?this.manifest.mediaSequence=t.number:this.trigger("warn",{message:"ignoring invalid media sequence: "+t.number})},"discontinuity-sequence":function(){isFinite(t.number)?(this.manifest.discontinuitySequence=t.number,E=t.number):this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+t.number})},"playlist-type":function(){/VOD|EVENT/.test(t.playlistType)?this.manifest.playlistType=t.playlistType:this.trigger("warn",{message:"ignoring unknown playlist type: "+t.playlist})},map:function(){i={},t.uri&&(i.uri=t.uri),t.byterange&&(i.byterange=t.byterange),r&&(i.key=r)},"stream-inf":function(){this.manifest.playlists=s,this.manifest.mediaGroups=this.manifest.mediaGroups||b,t.attributes?(o.attributes||(o.attributes={}),u(o.attributes,t.attributes)):this.trigger("warn",{message:"ignoring empty stream-inf attributes"})},media:function(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||b,t.attributes&&t.attributes.TYPE&&t.attributes["GROUP-ID"]&&t.attributes.NAME){var i=this.manifest.mediaGroups[t.attributes.TYPE];i[t.attributes["GROUP-ID"]]=i[t.attributes["GROUP-ID"]]||{},e=i[t.attributes["GROUP-ID"]],(n={default:/yes/i.test(t.attributes.DEFAULT)}).default?n.autoselect=!0:n.autoselect=/yes/i.test(t.attributes.AUTOSELECT),t.attributes.LANGUAGE&&(n.language=t.attributes.LANGUAGE),t.attributes.URI&&(n.uri=t.attributes.URI),t.attributes["INSTREAM-ID"]&&(n.instreamId=t.attributes["INSTREAM-ID"]),t.attributes.CHARACTERISTICS&&(n.characteristics=t.attributes.CHARACTERISTICS),t.attributes.FORCED&&(n.forced=/yes/i.test(t.attributes.FORCED)),e[t.attributes.NAME]=n}else this.trigger("warn",{message:"ignoring incomplete or missing media group"})},discontinuity:function(){E+=1,o.discontinuity=!0,this.manifest.discontinuityStarts.push(s.length)},"program-date-time":function(){void 0===this.manifest.dateTimeString&&(this.manifest.dateTimeString=t.dateTimeString,this.manifest.dateTimeObject=t.dateTimeObject),o.dateTimeString=t.dateTimeString,o.dateTimeObject=t.dateTimeObject},targetduration:function(){!isFinite(t.duration)||t.duration<0?this.trigger("warn",{message:"ignoring invalid target duration: "+t.duration}):(this.manifest.targetDuration=t.duration,l.call(this,this.manifest))},start:function(){t.attributes&&!isNaN(t.attributes["TIME-OFFSET"])?this.manifest.start={timeOffset:t.attributes["TIME-OFFSET"],precise:t.attributes.PRECISE}:this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"})},"cue-out":function(){o.cueOut=t.data},"cue-out-cont":function(){o.cueOutCont=t.data},"cue-in":function(){o.cueIn=t.data},skip:function(){this.manifest.skip=h(t.attributes),this.warnOnMissingAttributes_("#EXT-X-SKIP",t.attributes,["SKIPPED-SEGMENTS"])},part:function(){var e=this;g=!0;var i=this.manifest.segments.length,r=h(t.attributes);o.parts=o.parts||[],o.parts.push(r),r.byterange&&(r.byterange.hasOwnProperty("offset")||(r.byterange.offset=m),m=r.byterange.offset+r.byterange.length);var a=o.parts.length-1;this.warnOnMissingAttributes_("#EXT-X-PART #"+a+" for segment #"+i,t.attributes,["URI","DURATION"]),this.manifest.renditionReports&&this.manifest.renditionReports.forEach((function(t,i){t.hasOwnProperty("lastPart")||e.trigger("warn",{message:"#EXT-X-RENDITION-REPORT #"+i+" lacks required attribute(s): LAST-PART"})}))},"server-control":function(){var e=this.manifest.serverControl=h(t.attributes);e.hasOwnProperty("canBlockReload")||(e.canBlockReload=!1,this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})),l.call(this,this.manifest),e.canSkipDateranges&&!e.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint":function(){var e=this.manifest.segments.length,i=h(t.attributes),r=i.type&&"PART"===i.type;o.preloadHints=o.preloadHints||[],o.preloadHints.push(i),i.byterange&&(i.byterange.hasOwnProperty("offset")||(i.byterange.offset=r?m:0,r&&(m=i.byterange.offset+i.byterange.length)));var a=o.preloadHints.length-1;if(this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #"+a+" for segment #"+e,t.attributes,["TYPE","URI"]),i.type)for(var s=0;s<o.preloadHints.length-1;s++){var n=o.preloadHints[s];n.type&&(n.type===i.type&&this.trigger("warn",{message:"#EXT-X-PRELOAD-HINT #"+a+" for segment #"+e+" has the same TYPE "+i.type+" as preload hint #"+s}))}},"rendition-report":function(){var e=h(t.attributes);this.manifest.renditionReports=this.manifest.renditionReports||[],this.manifest.renditionReports.push(e);var i=this.manifest.renditionReports.length-1,r=["LAST-MSN","URI"];g&&r.push("LAST-PART"),this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #"+i,t.attributes,r)},"part-inf":function(){this.manifest.partInf=h(t.attributes),this.warnOnMissingAttributes_("#EXT-X-PART-INF",t.attributes,["PART-TARGET"]),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),l.call(this,this.manifest)}}[t.tagType]||f).call(a)},uri:function(){o.uri=t.uri,s.push(o),this.manifest.targetDuration&&!("duration"in o)&&(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),o.duration=this.manifest.targetDuration),r&&(o.key=r),o.timeline=E,i&&(o.map=i),m=0,o={}},comment:function(){},custom:function(){t.segment?(o.custom=o.custom||{},o.custom[t.customType]=t.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[t.customType]=t.data)}})[t.type].call(a)})),e}a(e,t);var i=e.prototype;return i.warnOnMissingAttributes_=function(t,e,i){var r=[];i.forEach((function(t){e.hasOwnProperty(t)||r.push(t)})),r.length&&this.trigger("warn",{message:t+" lacks required attribute(s): "+r.join(", ")})},i.push=function(t){this.lineStream.push(t)},i.end=function(){this.lineStream.push("\n"),this.trigger("end")},i.addParser=function(t){this.parseStream.addParser(t)},i.addTagMapper=function(t){this.parseStream.addTagMapper(t)},e}(s);t.LineStream=n,t.ParseStream=p,t.Parser=b,Object.defineProperty(t,"__esModule",{value:!0})}));

(function () {
    'use strict';

    if (/(^|\.)247kan\.com$/i.test(location.hostname)) {
        if (window.top === window.self) return;
    } else if (window.top !== window.self) {
        return;
    }

    const mgmapi = {
        addStyle(s) {
            let style = document.createElement("style");
            style.innerHTML = s;
            document.documentElement.appendChild(style);
        },
        async getValue(name, defaultVal) {
            return await ((typeof GM_getValue === "function") ? GM_getValue : GM.getValue)(name, defaultVal);
        },
        async setValue(name, value) {
            return await ((typeof GM_setValue === "function") ? GM_setValue : GM.setValue)(name, value);
        },
        async deleteValue(name) {
            return await ((typeof GM_deleteValue === "function") ? GM_deleteValue : GM.deleteValue)(name);
        },
        openInTab(url, open_in_background = false) {
            return ((typeof GM_openInTab === "function") ? GM_openInTab : GM.openInTab)(url, open_in_background);
        },
        xmlHttpRequest(details) {
            return ((typeof GM_xmlhttpRequest === "function") ? GM_xmlhttpRequest : GM.xmlHttpRequest)(details);
        },
        download(details) {
            return this.openInTab(details.url);
        },
        copyText(text) {
            var copyFrom = document.createElement("textarea");
            copyFrom.textContent = text;
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.blur();
            document.body.removeChild(copyFrom);
        },
        message(text, disappearTime = 5000) {
            const id = "f8243rd238-gm-message-panel";
            let p = document.querySelector(`#${id}`);
            if (!p) {
                p = document.createElement("div");
                p.id = id;
                p.style = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    z-index: 999999999999999;
                `;
                (document.body || document.documentElement).appendChild(p);
            }
            let mdiv = document.createElement("div");
            mdiv.innerText = text;
            mdiv.style = `
                padding: 3px 8px;
                border-radius: 5px;
                background: black;
                box-shadow: #000 1px 2px 5px;
                margin-top: 10px;
                font-size: small;
                color: #fff;
                text-align: right;
            `;
            p.appendChild(mdiv);
            setTimeout(() => {
                p.removeChild(mdiv);
            }, disappearTime);
        }
    };


    if (location.host === "tools.thatwind.com" || location.host === "localhost:3000") {
        mgmapi.addStyle("#userscript-tip{display:none !important;}");

        const _fetch = unsafeWindow.fetch;
        unsafeWindow.fetch = async function (...args) {
            try {
                let response = await _fetch(...args);
                if (response.status !== 200) throw new Error(response.status);
                return response;
            } catch (e) {
                if (args.length == 1) {
                    return await new Promise((resolve, reject) => {
                        let referer = new URLSearchParams(location.hash.slice(1)).get("referer");
                        let headers = {};
                        if (referer) {
                            referer = new URL(referer);
                            headers = {
                                "origin": referer.origin,
                                "referer": referer.href
                            };
                        }
                        mgmapi.xmlHttpRequest({
                            method: "GET",
                            url: args[0],
                            responseType: 'arraybuffer',
                            headers,
                            onload(r) {
                                resolve({
                                    status: r.status,
                                    headers: new Headers(r.responseHeaders.split("\n").filter(n => n).map(s => s.split(/:\s*/)).reduce((all, [a, b]) => { all[a] = b; return all; }, {})),
                                    async text() { return r.responseText; },
                                    async arrayBuffer() { return r.response; }
                                });
                            },
                            onerror() { reject(new Error()); }
                        });
                    });
                } else {
                    throw e;
                }
            }
        }
        return;
    }


    window.addEventListener("message", async (e) => {
        if (e.data === "3j4t9uj349-gm-get-title") {
            let name = `top-title-${Date.now()}`;
            await mgmapi.setValue(name, document.title);
            e.source.postMessage(`3j4t9uj349-gm-top-title-name:${name}`, "*");
        }
    });

    function getTopTitle() {
        return new Promise(resolve => {
            window.addEventListener("message", async function l(e) {
                if (typeof e.data === "string") {
                    if (e.data.startsWith("3j4t9uj349-gm-top-title-name:")) {
                        let name = e.data.slice("3j4t9uj349-gm-top-title-name:".length);
                        await new Promise(r => setTimeout(r, 5));
                        resolve(await mgmapi.getValue(name));
                        mgmapi.deleteValue(name);
                        window.removeEventListener("message", l);
                    }
                }
            });
            window.top.postMessage("3j4t9uj349-gm-get-title", "*");
        });
    }

    {
        if (location.href.match(/^.*?socolive.*?$/)) {
            var sfetch = unsafeWindow.fetch;
            unsafeWindow.fetch = new Proxy(sfetch, {
                apply: function(target, thisArg, args) {
                    let proceed = true;
                    try {
                        if (args[0].indexOf(".flv") != -1) doM3U({ url: args[0], content: args[0] });
                    } catch(ex) { }
                    return proceed
                        ? Reflect.apply(target, thisArg, args)
                        : Promise.resolve(new Response());
                }
            });
        }
        function bytesToText(buf) {
            try {
                if (!buf) return "";
                if (ArrayBuffer.isView(buf)) buf = buf.buffer;
                return new TextDecoder("utf-8").decode(buf);
            } catch (e) {
                return "";
            }
        }

        function getXHRContent(xhr) {
            try {
                if (xhr.responseText) return xhr.responseText;
                if (xhr.response) {
                    if (typeof xhr.response === "string") return xhr.response;
                    if (xhr.response instanceof ArrayBuffer) return bytesToText(xhr.response);
                    if (ArrayBuffer.isView(xhr.response)) return bytesToText(xhr.response.buffer);
                }
            } catch (e) { }
            return "";
        }

        function extractUrlsFromText(text) {
            const urls = [];
            if (!text || typeof text !== "string") return urls;
            const re = /https?:\/\/[^\s"'<>\\]+?(?:\.m3u8|\.m3u)(?:[?#][^\s"'<>\\]*)?/gi;
            let m;
            while ((m = re.exec(text)) !== null) {
                try {
                    const u = new URL(m[0], location.href).href;
                    if (!urls.includes(u)) urls.push(u);
                } catch (e) { }
            }
            return urls;
        }

        function checkUrl(url) {
            try {
                url = new URL(url, location.href);
                const h = url.href.toLowerCase();
                return h.indexOf(".m3u8") != -1 || h.indexOf(".m3u?") != -1 || h.indexOf("/m3u8") != -1;
            } catch (e) {
                return false;
            }
        }

        function checkContent(content) {
            if (!content) return false;
            if (typeof content !== "string") content = bytesToText(content);
            return content.trim().startsWith("#EXTM3U");
        }

        const _r_text = unsafeWindow.Response.prototype.text;
        unsafeWindow.Response.prototype.text = function () {
            const self = this;
            return _r_text.call(this).then((text) => {
                if (checkContent(text)) {
                    doM3U({ url: self.url, content: text });
                } else if (checkUrl(self.url)) {
                    doM3U({ url: self.url });
                }
                return text;
            });
        }

        const _r_ab = unsafeWindow.Response.prototype.arrayBuffer;
        unsafeWindow.Response.prototype.arrayBuffer = function () {
            const self = this;
            return _r_ab.call(this).then((buf) => {
                try {
                    const text = bytesToText(buf);
                    if (checkContent(text)) {
                        doM3U({ url: self.url, content: text });
                    } else if (checkUrl(self.url)) {
                        doM3U({ url: self.url });
                    }
                } catch (e) { }
                return buf;
            });
        }

        function isDetailContext(urlStr) {
            if (location.pathname.includes("/detail/")) return true;
            if (urlStr && (urlStr.includes("/api/videos/") || urlStr.includes("/detail/"))) return true;
            return false;
        }

        const _r_json = unsafeWindow.Response.prototype.json;
        unsafeWindow.Response.prototype.json = function () {
            const self = this;
            return _r_json.call(this).then((data) => {
                try {
                    if (self.url && self.url.includes("/api/process-video-url")) {
                        clearList();
                    }
                    if (!isDetailContext(self.url) && data && typeof data === "object") {
                        const s = JSON.stringify(data);
                        if (s && s.length < 500000) {
                            extractUrlsFromText(s).forEach(u => doM3U({ url: u }));
                        }
                    }
                } catch (e) { }
                return data;
            });
        }

        const _open = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function (...args) {
            this.addEventListener("load", () => {
                try {
                    if (args[1] && String(args[1]).includes("/api/process-video-url")) {
                        clearList();
                    }
                    const content = getXHRContent(this);
                    if (content && checkContent(content)) {
                        doM3U({ url: args[1], content: content });
                    } else if (checkUrl(args[1])) {
                        doM3U({ url: args[1] });
                    } else if (!isDetailContext(args[1]) && content && content.length < 300000 && /^[\s\r\n]*[\[{]/.test(content)) {
                        extractUrlsFromText(content).forEach(u => doM3U({ url: u }));
                    }
                } catch { }
            });
            return _open.apply(this, args);
        }

        function scanDOMForM3U8() {
            if (location.pathname.includes("/detail/")) return;
            try {
                if (!document.body) return;
                const attrSel = ["data-url", "data-src", "data-m3u8", "data-m3u", "data-video", "data-videourl", "data-video-url", "data-playurl", "data-play-url", "data-file", "data-link", "data-value", "data-json", "href", "src"].map(a => `[${a}]`).join(",");
                for (const el of document.querySelectorAll(attrSel)) {
                    for (const attr of el.attributes) {
                        const v = attr.value;
                        if (!v || typeof v !== "string" || v.length > 2000) continue;
                        if (/\.m3u8(?:[?#]|$)|\.m3u(?:[?#]|$)/i.test(v)) {
                            extractUrlsFromText(v).forEach(u => doM3U({ url: u }));
                        }
                    }
                }
                for (const s of document.querySelectorAll("script")) {
                    const t = (s.textContent || "").replace(/\\\//g, "/");
                    if (t && t.length < 100000 && /\.m3u8|\.m3u(?:[?#]|$)|m3u8/i.test(t)) {
                        extractUrlsFromText(t).forEach(u => doM3U({ url: u }));
                    }
                }
                for (const e of performance.getEntriesByType("resource")) {
                    if (e.name && e.name.length < 2000 && /\.m3u8(?:[?#]|$)|\.m3u(?:[?#]|$)/i.test(e.name)) {
                        extractUrlsFromText(e.name).forEach(u => doM3U({ url: u }));
                    }
                }
            } catch (e) { }
        }

        setInterval(scanDOMForM3U8, 1200);
        setInterval(doVideos, 1000);
    }

    const rootDiv = document.createElement("div");
    rootDiv.style = `
        position: fixed;
        z-index: 9999999999999999;
        opacity: 0.95;
    `;
    rootDiv.style.display = "block";
    document.documentElement.appendChild(rootDiv);

    const shadowDOM = rootDiv.attachShadow({ mode: 'open' });
    const wrapper = document.createElement("div");
    shadowDOM.appendChild(wrapper);


    // ==========================================
    // 🌟 THIẾT KẾ LOGO 3D XOAY CHO SCRIPT (GIỐNG 88LIN VIP)
    // ==========================================
    const bar = document.createElement("div");
    bar.style = `text-align: right;`;
    bar.innerHTML = `
        <div class="number-indicator" data-number="0" title="VIP Video Detector (M3U8/MP4)">
            <div class="logo-3d-box">
                <!-- Mặt trước (Front) -->
                <div class="logo-3d-face front">
                    <svg class="logo-icon" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </div>
                <!-- Mặt sau (Back) -->
                <div class="logo-3d-face back">
                    <svg class="logo-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
        </div>
    `;

    wrapper.appendChild(bar);

    // ==========================================
    // 🎨 CSS HIỆU ỨNG 3D XOAY VÀ ÁNH KIM
    // ==========================================
    const style = document.createElement("style");

    style.innerHTML = `
        .number-indicator {
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            margin-bottom: 6px;
            margin-right: 8px;
            cursor: pointer;
            perspective: 800px;
            user-select: none;
        }

        /* Badge số đếm video bắt được */
        .number-indicator::after {
            content: attr(data-number);
            position: absolute;
            top: -4px;
            right: -8px;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%);
            border: 2px solid #ffffff;
            box-shadow: 0 3px 8px rgba(255, 8, 68, 0.45);
            border-radius: 12px;
            padding: 1px 6px;
            min-width: 14px;
            text-align: center;
            line-height: 1.3;
            z-index: 20;
            pointer-events: none;
        }

        /* Khối quay 3D */
        .logo-3d-box {
            width: 44px;
            height: 44px;
            position: relative;
            transform-style: preserve-3d;
            animation: spin3D 4.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            transition: transform 0.3s ease, filter 0.3s ease;
            filter: drop-shadow(0 6px 14px rgba(124, 58, 237, 0.5));
        }

        .number-indicator:hover .logo-3d-box {
            animation-duration: 2s;
            filter: drop-shadow(0 0 18px rgba(0, 223, 216, 0.85));
        }

        /* Hai mặt của logo 3D */
        .logo-3d-face {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            border: 1.5px solid rgba(255, 255, 255, 0.85);
            box-shadow:
                inset 0 0 10px rgba(255, 255, 255, 0.6),
                inset 0 -4px 8px rgba(0, 0, 0, 0.4),
                0 0 12px rgba(138, 43, 226, 0.5);
            overflow: hidden;
        }

        /* Mặt trước: VIP Gradient */
        .logo-3d-face.front {
            background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%);
        }

        /* Mặt sau: Play Gradient */
        .logo-3d-face.back {
            transform: rotateY(180deg);
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%);
        }

        /* Hiệu ứng quét sáng lấp lánh (Shine light) */
        .logo-3d-face::after {
            content: '';
            position: absolute;
            top: -60%;
            left: -60%;
            width: 220%;
            height: 220%;
            background: linear-gradient(
                45deg,
                transparent 40%,
                rgba(255, 255, 255, 0.65) 50%,
                transparent 60%
            );
            animation: shineSweep 3.5s infinite ease-in-out;
        }

        .logo-icon {
            width: 22px;
            height: 22px;
            fill: #ffffff;
            filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45));
            z-index: 2;
        }

        /* Keyframes chuyển động 3D xoay vòng mượt mà */
        @keyframes spin3D {
            0% {
                transform: rotateY(0deg) rotateX(12deg);
            }
            50% {
                transform: rotateY(180deg) rotateX(-12deg);
            }
            100% {
                transform: rotateY(360deg) rotateX(12deg);
            }
        }

        @keyframes shineSweep {
            0% {
                transform: translateX(-100%) translateY(-100%);
            }
            100% {
                transform: translateX(100%) translateY(100%);
            }
        }

        .copy-link:link{
            text-decoration: none;
        }

        .copy-link:hover{
            text-decoration: underline;
        }

        .download-btn:hover{
            text-decoration: underline;
        }
        .download-btn:active{
            opacity: 0.9;
        }

        .m3u8-item{
            color: white;
            margin-bottom: 5px;
            display: flex;
            flex-direction: row;
            align-items: baseline;
            background: rgba(15, 15, 20, 0.92);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            user-select: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        [data-shown="false"] {
            opacity: 0.85;
            zoom: 0.85;
        }

        [data-shown="false"]:hover{
            opacity: 1;
        }

        [data-shown="false"] .m3u8-item{
            display: none;
        }
    `;

    wrapper.appendChild(style);


    const barBtn = bar.querySelector(".number-indicator");

    (async function () {
        let shown = await GM_getValue("shown", true);
        wrapper.setAttribute("data-shown", shown);

        let x = await GM_getValue("x", 10);
        let y = await GM_getValue("y", 10);

        x = Math.min(innerWidth - 50, x);
        y = Math.min(innerHeight - 50, y);

        if (x < 0) x = 0;
        if (y < 0) y = 0;

        rootDiv.style.top = `${y}px`;
        rootDiv.style.right = `${x}px`;

        barBtn.addEventListener("mousedown", e => {
            let startX = e.pageX;
            let startY = e.pageY;
            let moved = false;

            let mousemove = e => {
                let offsetX = e.pageX - startX;
                let offsetY = e.pageY - startY;
                if (moved || (Math.abs(offsetX) + Math.abs(offsetY)) > 5) {
                    moved = true;
                    rootDiv.style.top = `${y + offsetY}px`;
                    rootDiv.style.right = `${x - offsetX}px`;
                }
            };
            let mouseup = e => {
                let offsetX = e.pageX - startX;
                let offsetY = e.pageY - startY;

                if (moved) {
                    x -= offsetX;
                    y += offsetY;
                    mgmapi.setValue("x", x);
                    mgmapi.setValue("y", y);
                } else {
                    shown = !shown;
                    mgmapi.setValue("shown", shown);
                    wrapper.setAttribute("data-shown", shown);
                }

                removeEventListener("mousemove", mousemove);
                removeEventListener("mouseup", mouseup);
            }
            addEventListener("mousemove", mousemove);
            addEventListener("mouseup", mouseup);
        });
    })();

    let count = 0;
    let shownUrls = [];
    const shownItems = {};
    const masterPaths = [];
    const shownPaths = new Set();
    const knownResolutions = new Map();
    const itemDetails = {};
    const onlyShowTimedM3u8 = /(^|\.)fktv\.me$/i.test(location.hostname);

    function clearList() {
        count = 0;
        shownUrls.length = 0;
        masterPaths.length = 0;
        shownPaths.clear();
        knownResolutions.clear();
        for (const k in itemDetails) delete itemDetails[k];
        for (const href in shownItems) {
            const el = shownItems[href];
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
            delete shownItems[href];
        }
        if (typeof bar !== "undefined" && bar && bar.querySelector(".number-indicator")) {
            bar.querySelector(".number-indicator").setAttribute("data-number", "0");
        }
    }

    let lastHref = location.href;
    function checkUrlChange() {
        if (location.href !== lastHref) {
            lastHref = location.href;
            clearList();
        }
    }
    window.addEventListener("popstate", checkUrlChange);
    window.addEventListener("hashchange", checkUrlChange);

    try {
        const originalPushState = unsafeWindow.history.pushState;
        if (originalPushState) {
            unsafeWindow.history.pushState = function (...args) {
                originalPushState.apply(this, args);
                checkUrlChange();
            };
        }
        const originalReplaceState = unsafeWindow.history.replaceState;
        if (originalReplaceState) {
            unsafeWindow.history.replaceState = function (...args) {
                originalReplaceState.apply(this, args);
                checkUrlChange();
            };
        }
    } catch (e) { }

    function unwrapProxyUrl(href) {
        try {
            const u = new URL(href, location.href);
            for (const [k, v] of u.searchParams) {
                if (k.toLowerCase() !== "url" && !/url$/.test(k.toLowerCase())) continue;
                const val = decodeURIComponent(v);
                if (/^https?:\/\//i.test(val) && /\.m3u8(?:[?#]|$)|\.m3u(?:[?#]|$)/i.test(val)) {
                    return val;
                }
            }
        } catch (e) { }
        return href;
    }

    function formatDuration(totalSeconds) {
        if (!totalSeconds || isNaN(totalSeconds) || totalSeconds <= 0) return "未知(unknown)";
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);
        const pad = (n) => (n < 10 ? '0' + n : n);
        return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
    }

    function getResolutionLabel(attributes, urlStr) {
        if (attributes && attributes.RESOLUTION) {
            const h = attributes.RESOLUTION.height;
            const w = attributes.RESOLUTION.width;
            if (h) return `${h}p`;
            if (w) return `${w}p`;
        }
        if (urlStr) {
            try {
                const path = new URL(urlStr, location.href).pathname;
                const match = path.match(/(?:^|[._/-])(2160|1080|720|480|360)p?(?:[._/-]|$)/i);
                if (match) return `${match[1]}p`;
            } catch (e) { }
        }
        return "";
    }

    function setResBadge(itemEl, resText) {
        if (!itemEl || !resText) return;
        let badge = itemEl.querySelector(".res-badge");
        if (badge) {
            badge.textContent = resText;
            badge.style.display = "inline-block";
            if (/1080|2160|4k/i.test(resText)) {
                badge.style.background = "#52c41a";
            } else if (/720|hd/i.test(resText)) {
                badge.style.background = "#1890ff";
            } else {
                badge.style.background = "#fa8c16";
            }
        }
    }

    async function probeSegmentBitrate(segUrl, duration) {
        if (!segUrl || !duration || duration <= 0) return 0;
        try {
            return await new Promise((resolve) => {
                mgmapi.xmlHttpRequest({
                    method: "HEAD",
                    url: segUrl,
                    headers: { "referer": location.href },
                    onload(r) {
                        try {
                            const match = (r.responseHeaders || "").match(/content-length:\s*(\d+)/i);
                            const len = match ? parseInt(match[1], 10) : 0;
                            if (len > 0) {
                                resolve((len * 8) / duration);
                            } else {
                                resolve(0);
                            }
                        } catch (e) { resolve(0); }
                    },
                    onerror() { resolve(0); }
                });
            });
        } catch (e) {
            return 0;
        }
    }

    function getStreamIdFromPath(pathname) {
        const nums = (pathname || "").match(/\d+/g) || [];
        for (const str of nums) {
            const num = parseInt(str, 10);
            if (num >= 100000 && (num < 20200000 || num > 20300000)) {
                return num;
            }
        }
        for (const str of nums) {
            const num = parseInt(str, 10);
            if (num >= 100 && (num < 20200000 || num > 20300000)) {
                return num;
            }
        }
        return 0;
    }

    function updateRelativeResolutions() {
        const groups = {};
        for (const href in itemDetails) {
            const info = itemDetails[href];
            if (!info || !info.durationSec) continue;
            const durKey = Math.round(info.durationSec);
            if (!groups[durKey]) groups[durKey] = [];
            groups[durKey].push(info);
        }

        for (const durKey in groups) {
            const list = groups[durKey];
            if (list.length < 2) continue;

            list.sort((a, b) => {
                const idA = getStreamIdFromPath(a.url.pathname);
                const idB = getStreamIdFromPath(b.url.pathname);
                return idB - idA;
            });

            const presetLabels = ["1080p", "720p", "480p", "360p"];
            list.forEach((info, idx) => {
                if (!info.isExplicitRes) {
                    const assigned = presetLabels[idx] || "SD";
                    info.resLabel = assigned;
                    setResBadge(info.el, assigned);
                }
            });
        }
    }

    function doVideos() {
        for (let v of Array.from(document.querySelectorAll("video"))) {
            if (v.duration && v.src && v.src.startsWith("http") && (!shownUrls.includes(v.src))) {
                const src = v.src;
                shownUrls.push(src);
                showVideo({
                    type: "video",
                    url: new URL(src),
                    duration: formatDuration(v.duration),
                    download() {
                        const details = {
                            url: src,
                            name: (() => {
                                let name = new URL(src).pathname.split("/").slice(-1)[0];
                                if (!/\.\w+$/.test(name)) {
                                    if (name.match(/^\s*$/)) name = Date.now();
                                    name = name + ".mp4";
                                }
                                return name;
                            })(),
                            headers: {
                                origin: location.origin
                            },
                            onerror(e) {
                                mgmapi.openInTab(src);
                            }
                        };
                        mgmapi.download(details);
                    }
                })
            }
        }
    }

    async function tryFetchText(url, timeout = 5000) {
        const withTimeout = (p) => Promise.race([p, new Promise(res => setTimeout(() => res(""), timeout))]);
        try {
            const r = await fetch(url);
            if (r.ok) return await withTimeout(r.text());
        } catch (e) { }
        try {
            return await withTimeout(new Promise((resolve, reject) => {
                mgmapi.xmlHttpRequest({
                    method: "GET",
                    url: url.href,
                    responseType: "text",
                    headers: {
                        "referer": location.href,
                        "origin": location.origin
                    },
                    onload(r) { resolve(r.responseText); },
                    onerror: reject
                });
            }));
        } catch (e) {
            return "";
        }
    }

    function isSubPlaylistOfShownMaster(u) {
        const p = u.pathname;
        return masterPaths.some(mp => {
            const dir = mp.slice(0, mp.lastIndexOf('/') + 1);
            return p !== mp && p.startsWith(dir);
        });
    }

    function pruneSubItems(masterUrl) {
        const dir = masterUrl.pathname.slice(0, masterUrl.pathname.lastIndexOf('/') + 1);
        for (const href in shownItems) {
            if (href === masterUrl.href) continue;
            let p;
            try { p = new URL(href).pathname; } catch (e) { continue; }
            if (p !== masterUrl.pathname && p.startsWith(dir)) {
                const el = shownItems[href];
                if (el && el.parentNode) el.parentNode.removeChild(el);
                delete shownItems[href];
                if (count > 0) count--;
            }
        }
        bar.querySelector(".number-indicator").setAttribute("data-number", count);
    }

    async function playlistHasDuration(url, content, visited = new Set()) {
        try {
            if (!content || !content.trim().startsWith("#EXTM3U")) return false;
            if (visited.has(url.href)) return false;
            visited.add(url.href);

            const parser = new m3u8Parser.Parser();
            parser.push(content);
            parser.end();
            const manifest = parser.manifest;

            if (manifest.segments && manifest.segments.length > 0) {
                return manifest.segments.some((segment) => (segment.duration || 0) > 0);
            }

            if (!manifest.playlists || manifest.playlists.length === 0) return false;

            let bestStream = manifest.playlists[0];
            let maxRes = 0;
            manifest.playlists.forEach((pl) => {
                const h = pl.attributes?.RESOLUTION?.height || 0;
                const bw = pl.attributes?.BANDWIDTH || 0;
                const bestBw = bestStream.attributes?.BANDWIDTH || 0;
                if (h > maxRes || (h === maxRes && bw > bestBw)) {
                    maxRes = h;
                    bestStream = pl;
                }
            });

            if (!bestStream || !bestStream.uri) return false;
            const subContent = await tryFetchText(new URL(bestStream.uri, url.href));
            return await playlistHasDuration(new URL(bestStream.uri, url.href), subContent, visited);
        } catch (e) {
            return false;
        }
    }

    async function doM3U({ url, content }) {
        try {
            url = new URL(url, location.href);
            const uw = unwrapProxyUrl(url.href);
            if (uw !== url.href) url = new URL(uw, url.href);
        } catch (e) {
            return;
        }

        if (isSubPlaylistOfShownMaster(url)) return;
        if (shownPaths.has(url.pathname)) return;
        shownPaths.add(url.pathname);
        if (shownUrls.includes(url.href)) return;

        if (onlyShowTimedM3u8) {
            if (!content) content = await tryFetchText(url);
            if (!await playlistHasDuration(url, content)) return;
        }

        const item = await showVideo({
            type: "m3u8",
            url,
            duration: "…",
            async download() {
                mgmapi.openInTab(
                    `https://tools.thatwind.com/tool/m3u8downloader#${new URLSearchParams({
                        m3u8: url.href,
                        referer: location.href,
                        filename: (await getTopTitle()) || ""
                    })}`
                );
            }
        });

        if (!content) {
            content = await tryFetchText(url);
        }

        if (content && typeof content === "string" && content.trim().startsWith("#EXTM3U")) {
            try {
                const parser = new m3u8Parser.Parser();
                parser.push(content);
                parser.end();
                const manifest = parser.manifest;

                let duration = "未知(unknown)";

                if (manifest.segments && manifest.segments.length > 0) {
                    let totalSec = 0;
                    manifest.segments.forEach((segment) => {
                        totalSec += segment.duration || 0;
                    });
                    duration = formatDuration(totalSec);

                    let resLabel = knownResolutions.get(url.href) || getResolutionLabel(null, url.href);
                    let isExplicitRes = !!resLabel;

                    if (!resLabel && manifest.segments[0]) {
                        try {
                            const segUrl = new URL(manifest.segments[0].uri, url.href).href;
                            const segDur = manifest.segments[0].duration || 10;
                            const bps = await probeSegmentBitrate(segUrl, segDur);
                            if (bps > 0) {
                                itemDetails[url.href].bitrate = bps;
                                if (bps >= 3000000) { resLabel = "1080p"; isExplicitRes = true; }
                                else if (bps >= 1500000) { resLabel = "720p"; isExplicitRes = true; }
                            }
                        } catch (e) { }
                    }

                    itemDetails[url.href] = { url, el: item, durationSec: totalSec, resLabel, isExplicitRes };

                    if (resLabel) {
                        setResBadge(item, resLabel);
                    }

                    updateRelativeResolutions();
                } else if (manifest.playlists && manifest.playlists.length > 0) {
                    if (!masterPaths.includes(url.pathname)) {
                        masterPaths.push(url.pathname);
                        pruneSubItems(url);
                    }

                    let bestStream = manifest.playlists[0];
                    let maxRes = 0;
                    manifest.playlists.forEach((pl) => {
                        const h = pl.attributes?.RESOLUTION?.height || 0;
                        const bw = pl.attributes?.BANDWIDTH || 0;
                        const subUrl = new URL(pl.uri, url.href).href;
                        const plLabel = getResolutionLabel(pl.attributes, pl.uri);
                        if (plLabel) {
                            knownResolutions.set(subUrl, plLabel);
                            if (itemDetails[subUrl] && itemDetails[subUrl].el) {
                                itemDetails[subUrl].resLabel = plLabel;
                                setResBadge(itemDetails[subUrl].el, plLabel);
                            }
                        }
                        if (h > maxRes || (h === maxRes && bw > (bestStream.attributes?.BANDWIDTH || 0))) {
                            maxRes = h;
                            bestStream = pl;
                        }
                    });

                    const bestResText = maxRes ? `${maxRes}p` : "1080p";
                    setResBadge(item, bestResText);

                    if (bestStream && bestStream.uri) {
                        try {
                            const subUrl = new URL(bestStream.uri, url.href);
                            const subContent = await tryFetchText(subUrl);
                            if (subContent && subContent.trim().startsWith("#EXTM3U")) {
                                const subParser = new m3u8Parser.Parser();
                                subParser.push(subContent);
                                subParser.end();
                                if (subParser.manifest.segments && subParser.manifest.segments.length > 0) {
                                    let totalSec = 0;
                                    subParser.manifest.segments.forEach((s) => {
                                        totalSec += s.duration || 0;
                                    });
                                    duration = formatDuration(totalSec);
                                }
                            }
                        } catch (e) { }
                    }

                    if (duration === "未知(unknown)") {
                        duration = `Multi(${manifest.playlists.length})`;
                    }
                }

                const durEl = item && item.querySelector && item.querySelector(".duration-text");
                if (durEl) durEl.textContent = duration;
            } catch (e) { }
        }
    }

    async function showVideo({
        type,
        url,
        duration,
        download
    }) {
        let div = document.createElement("div");
        div.className = "m3u8-item";
        div.setAttribute("data-href", url.href);
        div.innerHTML = `
            <span>${type}</span>
            <span class="res-badge" style="display:none; padding:1px 5px; border-radius:3px; font-weight:bold; margin-left:6px; font-size:11px; color:white;"></span>
            <a class="copy-link" href="${url.href}" title="${url}" style="
                color: white;
                max-width: 200px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-left: 10px;
                cursor:pointer;"
            target="_blank" >${url.pathname}</a>
            <span
                class="duration-text"
                style="
                    margin-left: 10px;
                    flex-grow: 1;
                "
            >${duration}</span>
            <span
                class="download-btn"
                style="
                    margin-left: 10px;
                    cursor: pointer;
            ">⯆</span>
        `;

        div.querySelector(".copy-link").addEventListener("click", () => {
            mgmapi.copyText(url.href);
            mgmapi.message("已复制链接 (link copied)", 2000);
        });

        div.querySelector(".download-btn").addEventListener("click", download);

        rootDiv.style.display = "block";

        count++;

        shownUrls.push(url.href);
        shownItems[url.href] = div;

        bar.querySelector(".number-indicator").setAttribute("data-number", count);

        wrapper.appendChild(div);

        return div;
    }

})();