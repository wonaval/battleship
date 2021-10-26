/* js-cookie v3.0.0-rc.1 | MIT */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self, function () { var n = e.Cookies, r = e.Cookies = t(); r.noConflict = function () { return e.Cookies = n, r } }()) }(this, function () { "use strict"; function e(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) e[r] = n[r] } return e } var t = { read: function (e) { return e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent) }, write: function (e) { return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent) } }; return function n(r, o) { function i(t, n, i) { if ("undefined" != typeof document) { "number" == typeof (i = e({}, o, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape), n = r.write(n, t); var c = ""; for (var u in i) i[u] && (c += "; " + u, !0 !== i[u] && (c += "=" + i[u].split(";")[0])); return document.cookie = t + "=" + n + c } } return Object.create({ set: i, get: function (e) { if ("undefined" != typeof document && (!arguments.length || e)) { for (var n = document.cookie ? document.cookie.split("; ") : [], o = {}, i = 0; i < n.length; i++) { var c = n[i].split("="), u = c.slice(1).join("="); '"' === u[0] && (u = u.slice(1, -1)); try { var f = t.read(c[0]); if (o[f] = r.read(u, f), e === f) break } catch (e) { } } return e ? o[e] : o } }, remove: function (t, n) { i(t, "", e({}, n, { expires: -1 })) }, withAttributes: function (t) { return n(this.converter, e({}, this.attributes, t)) }, withConverter: function (t) { return n(e({}, this.converter, t), this.attributes) } }, { attributes: { value: Object.freeze(o) }, converter: { value: Object.freeze(r) } }) }(t, { path: "/" }) });

/* Base64Decode@base64.js | https://gist.github.com/chrisveness/e121cffb51481bd1c142 | MIT */
function Base64Decode(r) { if (!/^[a-z0-9+/]+={0,2}$/i.test(r) || r.length % 4 != 0) throw Error("Not base64 string"); for (var t, e, n, o, h, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", i = [], f = 0; f < r.length; f += 4)t = (h = a.indexOf(r.charAt(f)) << 18 | a.indexOf(r.charAt(f + 1)) << 12 | (n = a.indexOf(r.charAt(f + 2))) << 6 | (o = a.indexOf(r.charAt(f + 3)))) >>> 16 & 255, e = h >>> 8 & 255, h = 255 & h, i[f / 4] = String.fromCharCode(t, e, h), 64 == o && (i[f / 4] = String.fromCharCode(t, e)), 64 == n && (i[f / 4] = String.fromCharCode(t)); return r = i.join("") }

window.MyLearning = {};

MyLearning._debug = false; // can be turned off after release
MyLearning._version = null;

MyLearning.cacheVersion = function () {
   // next one will be v2
   this._version = '1.5';
   
   // return cached result
   if (this._version !== null) {
      return this._version;
   }

   this._version = Cookies.get('my_learning.version')

   // fallback to v1.5
   if (typeof this._version === 'undefined' || !this._version) {
      this._version = '1.5';
   }

   return this._version;
}

MyLearning._version_to_base_url_map = {
   '1': 'https://mypage.w3schools.com',
   '1.5': 'https://my-learning.w3schools.com',
   '2': 'https://myl-api-prod.w3schools.com'
}

MyLearning._version_and_name_to_rel_url_map = {
   '1': {
      'api.meta': '/mypage/beta.php',
      'api.meta_for_default': '/mypage/beta_for_default.php',
      'api.exercise.get': '/mypage/get_exercise_obj2.php',
      'api.exercise.set': '/mypage/set_exercise_obj.php',
      'api.quiz.set_score': '/mypage/set_quiz_score2.php'
   },
   '1.5': {
      'api.meta': '/api/meta/',
      'api.meta_for_default': '/api/meta-for-default/',
      'api.exercise.get': '/api/exercise/get/',
      'api.exercise.set': '/api/exercise/set/',
      'api.quiz.set_score': '/api/quiz/set-score/'
   },
   '2': {
      'api.meta': '/api/meta/',
      'api.meta_for_default': '/api/meta-for-default/',
      'api.exercise.get': '/api/exercise/get/',
      'api.exercise.set': '/api/exercise/set/',
      'api.quiz.set_score': '/api/quiz/set-score/'
   }
}

// usage:
// MyLearning.getUrl('api.quiz.set_score') -> https://mypage.w3schools.com/mypage/set_quiz_score2.php
MyLearning.getUrl = function (api_name) {
   this.cacheVersion();

   if (this._debug) {
      if (typeof this._version_to_base_url_map[this._version] === 'undefined') {
         console.warn('MyLearning version is not valid. this._version: ', this._version);

         return '/';
      }

      if (typeof this._version_and_name_to_rel_url_map[this._version][api_name] === 'undefined') {
         console.warn('MyLearning api name is not valid. this._version, api_name: ', this._version, api_name);

         return '/';
      }
   }

   return this._version_to_base_url_map[this._version] + this._version_and_name_to_rel_url_map[this._version][api_name];
}

MyLearning.userAccessTokenIsPresentAndNotExpired = function () {
   // addapted to work in older browsers
   var access_token = Cookies.get('accessToken');

   if (typeof access_token !== 'undefined') {
      try {
         var access_token_payload_chunk = access_token.split('.')[1];
         var access_token_payload_chunk_b64decoded;

         if (typeof atob === 'function') {
            access_token_payload_chunk_b64decoded = atob(access_token_payload_chunk);
         } else {
            access_token_payload_chunk_b64decoded = Base64Decode(access_token_payload_chunk);
         }

         var access_token_payload = JSON.parse(access_token_payload_chunk_b64decoded);

         if (Date.now() < (access_token_payload.exp * 1000)) {
            return true;
         }
      } catch (exc) {
         if (this._debug) {
            console.warn('Failed parsing user`s "accessToken": ', exc);
         }
         
         return false;
      }
   }
   
   return false;
}

MyLearning._user_is_logged_in = null; // cache

MyLearning.userIsLoggedIn = function () {
   // Warning!
   // The access token may be present and not expired yet invalidated in Cognito / signed out
   if (MyLearning._user_is_logged_in === null) { // cache the bool value
      MyLearning._user_is_logged_in = MyLearning.userAccessTokenIsPresentAndNotExpired();
   }

   if (this._debug) {
      console.log('MyLearning.userIsLoggedIn: ', MyLearning._user_is_logged_in);
   }
   
   return MyLearning._user_is_logged_in;
}