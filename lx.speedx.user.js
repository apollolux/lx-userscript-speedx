// ==UserScript==
// @name         LX::Userscript SpeedX
// @namespace    LX
// @version      0.1
// @updateUrl https://github.com/apollolux/lx-userscript-speedx/lx.speedx.user.js
// @description  More playback speeds in online video players
// @author       LX
// @homepage  https://www.luxatom.com
// @match        https://www.youtube.com/watch?*
// @grant        none
// ==/UserScript==

(function(w,d) {
	'use strict';
	// base id for HTML etc use
	const ID = '__LX-YT-SPEEDX__';
	// convenience vars
	const I = d.getElementById.bind(d);
	const E = d.createElement.bind(d);

	function _style(css) {
		let s = E('style');
		s.dataset['lxId'] = ID + '-style';
		s.type = 'text/css';
		s.textContent = css;
		return s;
	}
	function _speed(v, x) {
		v.playbackRate = x;
	}
	let rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4, 8, 16];
	function _opts(opts, v) {
		let st = `#${ID} {position:absolute; z-index:9999; top:4px; right:240px; color:#fff; display:grid; grid-template-columns:repeat(4, 1fr); column-gap:1em; row-gap:0.5em;}`;
		st += `#${ID}:before {display:block; content:'LX-Speed'; text-transform:uppercase; position:absolute; left:0px; bottom:0px; transform-origin:bottom left; transform:rotate(-90deg);}`;
		st += `#${ID} > * {display:inline-block; vertical-align:middle;}`;
		st += `#${ID} input {display:none;}`;
		st += `#${ID} input+span {display:block; border-left:1em solid rgba(255,255,255,0.1); padding-left:0.5em; padding-right:0.5em;}`;
		st += `#${ID} input:checked+span {border-left-color:#ddf; background:rgba(255,255,255,0.05);}`;
		let css = _style(st);
		let f = E('form');
		f.id = ID;
		let n = 'lx_yt_speedx';
		let chg = function(e) {
			let el = e.target;
			if (el.name === n) {
				if (v) v.playbackRate = el.value;
			}
		};
		for (let opt of opts) {
			let o = E('input');
			o.type = 'radio';
			o.name = n;
			o.value = opt;
			if (v && v.playbackRate == opt) o.checked = true;
			let l = E('label');
			let t = E('span');
			t.textContent = opt;
			l.append(o, t);
			f.append(l);
		}
		f.addEventListener('input', chg);
		setTimeout(function _do() {
			let wr = I('masthead-container');
			if (wr) wr.append(css,f);
			else setTimeout(_do, 500);
		}, 500);
	}
	function _load(ev) {
		//console.log('LX', 'US::speedX', 'readystate', d.readyState);
		if (d.readyState !== 'complete') return;
		setTimeout(() => {
			let vid = d.getElementsByTagName('video');
			if (vid && vid.length) {
				vid = vid[0];
				_opts(rates, vid);
				//console.log('LX', 'YT::speed', 'attached');
			}
			else {
				//console.log('LX', 'YT::speed', 'missing video?');
			}
		}, 1000);
	}
	d.addEventListener('readystatechange', _load);
})(window, document);
