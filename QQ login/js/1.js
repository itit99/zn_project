//定义主体对象
var s903 = function(op)
{
	//将op参数赋值给类属性ops
	this.ops = op;
	this.postop = '50px'
	this.posleft = '10px'
	this.config = null;
	this.scale = true;
	this.zoom = true;
}
//扩展主体对象s903方法
s903.prototype = 
{
	def:
	{
		obj:
		{
			hit:'#dl',
			zzc:'#zzc',
			zdl:'#zdl',
			zdll:'.zdl',
			tc:'#tc',
			head:'#head',
			min:'#min',
			max:'#max',
			div:'.div',
			
		},
		max:true,
		min:true,
		shadow:true,
		drag:true,
		
		width:360,
		height:405,
		
		pos:'center',
		tcolor:'#f00',
		tbcolor:'#6393ff',
		text:'亲，请登录英雄联盟账号',
		
	},
	//扩展界面初始化方法
	iniwin:function()
	{
		var o = this;
		o.config = $.extend(o.def,o.ops);
		var w = window.innerWidth;
		var h = window.innerHeight;
//		$('#zdl').css({'left':(w - 360) / 2/*,'top':(h - 405) / 2*/});
		o.postop = (h - 405) / 2 + 'px';
		
		if(o.config.pos == 'center')
			o.posleft = (w - 360) / 2 + 'px';
		else if(o.config.pos == 'right')
			o.posleft = w - 360 - 10 + 'px';
			
			
		console.log(o.config);
		o.openwin();
		o.shutwin();
		o.maxwin();
		o.minwin();
		o.dragwin();
	},
	//扩展打开窗口方法
	openwin:function()
	{
		var o = this;
		
		$(o.config.obj.head)
		.css('background',o.config.tbcolor)
		.next('div')
		.find('h4')
		.css('color',o.config.tcolor)
		.html(o.config.text)
		
		if(!o.config.min)
			$(o.config.obj.min).hide();
		if(!o.config.max)
			$(o.config.obj.max).hide();
		$(o.config.obj.hit).mouseup
		(
			function()
			{
				if(o.config.shadow)
					$(o.config.obj.zdl).addClass('shadow')
				$(o.config.obj.zzc).show().animate
				(
					{
						'opacity':1
					},1000
					
				);
				$(o.config.obj.zdl).show().animate
				(
					{
						'opacity':1
					},1000
				)
				.css
				(
					{
						top:o.postop,
						left:o.posleft,
					}
				)
			}
		)
	},
	//扩展关闭窗口方法
	shutwin:function()
	{
		var o = this;
		$(o.config.obj.tc/*+','+o.config.obj.zzc*/).addClass('cur').click
		(
			function()
			{
				$(o.config.obj.zzc).animate
				(
					{
						'opacity':0
					},1000,
					function()
					{
						$(o.config.obj.zzc).hide();
					}
				);
				$(o.config.obj.zdl).animate
				(
					{
						'opacity':0
					},1000,
					function()
					{
						$(o.config.obj.zdl).hide();
					}
				)
			}
		)
	},
	//扩展最大化窗口方法
	maxwin:function()
	{
		var o = this;
		$(o.config.obj.max)
		.addClass('cur')
		.on
		(
			'click',
			function()
			{
				if(o.zoom)
				{
					$(o.config.obj.zdl).animate
					(
						{
							top:0,
							left:0,
							width:'100%',
							height:'100%',
							
						},
						function()
						{
							o.zoom = false;
							$(o.config.obj.max).html('&#xeb21;');
							$(o.config.obj.min).html('&#xe972;');
							$(o.config.obj.zdll).show();
						}
					)
				}
				else
				{
					$(o.config.obj.zdl).animate
					(
						{
							top:o.postop,
							left:o.posleft,
							width:o.config.width,
							height:o.config.height,
						},
						function()
						{
							o.zoom = true;
							$(o.config.obj.max).html('&#xe751');
							$(o.config.obj.min).html('&#xe972;');
							$(o.config.obj.zdll).show();
							$(o.config.obj.zzc).show();
						}
					)
				}
			}
		)
	},
	//扩展最小化窗口方法
	minwin:function()
	{
		var o = this;
		var t = $(window).height()
		$(o.config.obj.min)
		.addClass('cur')
		.on
		(
			'click',
			function()
			{
				if(o.scale)
				{
					$(o.config.obj.zdl).animate
					(
						{
							top:t - 40 + 'px',
							left:'4px',
							width:o.config.width,
							height:'40px', 
						},
						function()
						{
							o.scale = false;
							$(o.config.obj.min).html('&#xeb1d');
							$(o.config.obj.max).html('&#xe751');
							$(o.config.obj.zdll).hide();
							$(o.config.obj.zzc).hide();
						}
					)
				}
				else
				{
					$(o.config.obj.zdl).animate
					(
						{
							top:o.postop,
							left:o.posleft,
							width:o.config.width,
							height:o.config.height,
						},
						function()
						{
							o.scale = true;
							$(o.config.obj.min).html('&#xe972');
							$(o.config.obj.max).html('&#xe751');
							$(o.config.obj.zdll).show();
							$(o.config.obj.zzc).show();
						}
					)
				}
			}
		)
	},
	//扩展可拖动窗口方法
	dragwin:function()
	{
		var o = this;
		if(o.scale && o.zoom && o.config.drag)
		{
			$(o.config.obj.head).addClass('move')
			.mousedown
			(
				function(x)
				{
					flag = true;
					var ox = x.clientX || x.pageX;//按住时获取坐标x
					var oy = x.clientY || x.pageY;//按住时获取坐标y
					var ot = $(o.config.obj.zdl).offset().top;//上偏移量
					var ol = $(o.config.obj.zdl).offset().left;//左偏移量
					/*o.postop = ot + 'px';
					o.posleft = ol + 'px';*/
					$(document).mousemove
					(
						function(z)
						{
							if(flag && o.scale && o.zoom)
							{
								var bw = $(window).width() - o.config.width;
								var bh = $(window).height() - o.config.height;
								var zx = z.clientX || z.pageX; //鼠标在文档上移动的坐标x
								var zy = z.clientY || z.pageY;//鼠标在文档上移动的坐标y
								
								var lt = zx - ox + ol;
								var tp = zy - oy + ot;
								
								if(tp < 0)
									tp = 0;
								if(tp > bh)
									tp = bh;
								if(lt < 0)
									lt = 0;
								if(lt > bw)
									lt = bw;
								$(o.config.obj.zdl).css
								(
									{
										top:tp + 'px',
										left:lt + 'px'
									}
								)
							}
						}
					).mouseup(
						function()
						{
							flag = false; //鼠标放开就不移动了（逻辑）
						}
					)
				}
			)
		}
	}
}
$.fn.c903 = function(op)
{
	new s903(op).iniwin();
}
