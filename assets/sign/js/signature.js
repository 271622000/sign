/*!
* signature.js by @robertwen
* Copyright 2013 Tencent, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/

define(function(require, exports, module){
	var $ = require('jquery');
	var bootstrap = require('bootstrap')
	var currentThemes =  require('./themes');
	$(function(){
		/**
		 * 列表模板
		 * @type {Array}
		 */
		var ITEM_HTML = [
			'<div style="text-align: center">',
			'	<p>',
			'		<canvas id="%sign_canvas%" width="%width%" height="%height%" style="border:1px solid rgba(0,0,0,0.2);"></canvas>',
			'	</p>',
			'	<p>',
			'		<a class="btn btn-small btn-success" canvas_id="%sign_canvas%" download="%id%.png" target="_blank">保存 [%name%]</a>',
			'	</p>',
			'</div>'].join("");
		//获取当前的主题配置
		/**
		 * 绘制主题列表页面
		 */
		var drawPage = function() {
			var html = [];
			for (var k in currentThemes) {
				var _item = ITEM_HTML.replace(/%id%/g, k)
					.replace(/%sign_canvas%/g, k + "_canvas")
					.replace(/%name%/g, currentThemes[k].name)
					.replace(/%width%/g, currentThemes[k].width)
					.replace(/%height%/g, currentThemes[k].height);

				html.push(_item);
			}
			$("#theme_list").html(html);
			//渲染所有页面上的签名档
			renderAllSign();
		}

		var renderAllSign = function() {
			for (var k in currentThemes) {
				renderSign(k);
			}
		}

		/**
		 * 渲染签名档
		 * @param {String} themeId 主题id
		 */
		var renderSign = function renderSign(themeId) {
			// console.log("render:" + themeId);
			var canvas = document.getElementById(themeId + "_canvas");
			var context = canvas.getContext("2d");

			var img = new Image();

			//背景图片加载完成，开始填充canvas
			img.onload = function() {
				(drawSign.bind(this))(context, currentThemes[themeId]);
			}
			//初始化背景图片
			img.src = currentThemes[themeId].bg;
		}

		/**
		 * 绘制签名档
		 * @param  {context} ctx   画布的内容区
		 * @param  {Object} theme 主题配置
		 */
		var drawSign = function(ctx, theme) {
			theme._text = theme._text || {};

			//绘制背景图片
			ctx.drawImage(this, 0, 0);

			//绘制名称
			fillText(ctx, $("#rtx_input").val(), theme, "name");

			//绘制团队名称
			//var w = ctx.measureText(name).width;
			fillText(ctx, "[" + $("#group_input").val() + "]", theme, "group");

			//绘制电话号码
			fillText(ctx, "0755-86013388-" + $("#phone_input").val(), theme, "phone");

			//绘制手机号码
			fillText(ctx, "86-" + $("#mobile_input").val(), theme, "mobile");
		}

		/**
		 * 填充文字
		 * @param  {context} ctx    canvas context 2d 内容
		 * @param  {string} text   填充文字
		 * @param  {Object} theme  主题
		 * @param  {string} textId 文本id
		 */
		var fillText = function(ctx, text, theme, textId) {
			var format = theme.textStyle[textId];
			var x = fixPosition(ctx, theme, format.x, "x"),
				y = fixPosition(ctx, theme, format.y, "y");

			//setup font style
			ctx.font = format.font;

			//fill color
			ctx.fillStyle = format.color;

			//fill text
			ctx.fillText(text, x, y);

			theme._text[textId] = text;
		}
		
		var fixPosition = function(ctx, theme, value, pos) {
			if (typeof value == "number") {
				return value;
			} else {
				
				var _v = value.replace(/\%([^%]+)\%/g, function() {
					var textId = arguments[1];
					//setup font style
					ctx.font = theme.textStyle[textId].font;
					var _m = ctx.measureText(theme._text[textId]);
					return (pos == "x" ? _m.width : _m.height);
				});
				return eval(_v);
			}
		}


		var init = function(){
			//绑定输入框的键盘事件
			$("#theme_config input").on("keyup", renderAllSign);
			//绑定主题列表的全局单击事件
			$("#theme_list").on("click", function(e) {
				var target = e.target;
				var canvasId = target.getAttribute("canvas_id");
				//判断对象是否是按钮
				if (canvasId) {
					var canvas = document.getElementById(canvasId);
					target.href = (canvas.toDataURL("image/png"));
				}
			});
			drawPage();
		}

		init();
	});
});