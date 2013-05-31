/*!
* themes.js by @robertwen
* Copyright 2013 Tencent, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/

define(function(require, exports, module){
	/**
	 * 蓝色主题
	 * @type {Object}
	 */
	var THEME1 = {
		/**
		** 此处如果用img/bule.png图片，在编辑好图片，下载转换时就会报
		** Uncaught Error: SecurityError: DOM Exception 18 错误，求解释啊，求解释
		*/
		//bg: 'img/bule.png',
		bg: 'data:image/png;base64,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',
		width: 503,
		height: 120,
		name: "亮蓝",
		textStyle: {
			name: {
				font: "21px 宋体",
				x: 149,
				y: 34,
				color: "#ffffff"
			},
			group: {
				font: "13px 微软雅黑",
				x: "155 + %name%",
				y: 34,
				color: "#ffc73a"
			},
			phone: {
				font: "13px Arial",
				x: 169,
				y: 73,
				color: "#ffffff"
			},
			mobile: {
				font: "13px Arial",
				x: 352,
				y: 73,
				color: "#ffffff"
			}
		}
	};

	/**
	 * 白色主题
	 * @type {Object}
	 */
	var THEME2 = {
		//bg: 'img/white.png',
		bg: 'data:image/png;base64,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',
		width: 680,
		height: 140,
		name: "纯白",
		textStyle: {
			name: {
				font: "bold 28px 宋体",
				x: 169,
				y: 48,
				color: "#4C4C4C"
			},
			group: {
				font: "16px 微软雅黑",
				x: "175 + %name%",
				y: 48,
				color: "#FF6A00"
			},
			phone: {
				font: "12px Arial",
				x: 188,
				y: 89,
				color: "#666666"
			},
			mobile: {
				font: "12px Arial",
				x: 358,
				y: 89,
				color: "#666666"
			}
		}
	};

	/**
	 * 主题配置
	 * @type {Object}
	 */
	module.exports = {
		"sns_blue": THEME1,
		"sns_white": THEME2
	};
});