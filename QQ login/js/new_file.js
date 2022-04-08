$('#wrap').mousedown//定义鼠标按键按下事件
(
	function(x)
	{
		flag = true;//逻辑值 为了后期鼠标松开时 就停止移动
		var ox = x.clientX || x.pageX;//按住时获取坐标x
		var oy = x.clientY || x.pageY;//按住时获取坐标y
		var ot = $('#wrap').offset().top;//上偏移量
		var ol = $('#wrap').offset().left;//左偏移量
		$(document).mousemove
		(
			function(z)
			{
				if(flag)
				{
					var bw = $(window).width() - $('#wrap').width();//多余宽度空间
					var bh = $(window).height() - $('#wrap').height();//多余高度空间
					var zx = z.clientX || z.pageX; //鼠标在文档上移动的坐标x
					var zy = z.clientY || z.pageY;//鼠标在文档上移动的坐标y
					var lt = zx - ox + ol; //移动坐标-点击坐标+容器距离=鼠标移动多少
					var tp = zy - oy + ot;
					if(tp < 0)//不能超出屏幕
						tp = 0;
					if(tp > bh)
						tp = bh;
					if(lt < 0)
						lt = 0;
					if(lt > bw)
						lt = bw;
					$('#wrap').css
					(
						{
							top:tp + 'px',
							left:lt + 'px',
							transform:'translateX(0px)'
						}
					)
				}
			}
		).mouseup//定义鼠标按键放开事件
		(
			function()
			{
				flag = false;
			}
		)
	}
)
$('button').click
(
	function()
	{
		$('#wrap').slideDown().show()
	}
)