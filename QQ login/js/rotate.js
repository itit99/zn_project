var Rotate = function(op)
{
	this.op = op;
	this.cfg = null;
	this.timer = null;
}
Rotate.prototype = 
{
	def:
	{
		len:9,
		nx:0,
		ny:0,
		rx:-15,
		ry:0,
		speed:30,
		img:''
	},
	init:function()
	{
		var o = this;
		o.cfg = $.extend(o.def,o.op);
		var deg = 360 / o.cfg.len;
		for (var i=1;i<=o.cfg.len;i++) {
			$('<img src="img'+o.cfg.img+'/'+i+'.jpg" />')
			.attr('ondragstart','return false')
			.attr('style','transform:rotateY(' + i * deg + 'deg) translateZ(300px)')
			.appendTo($('#rotate'))
		}
		$('<div id="pl"></div>').appendTo($('#rotate'))
		o.rotate();
	},
	rotate:function()
	{
		var o = this;
		$(document).mousedown
		(
			function(md)
			{
				var dx = md.clientX || md.pageX;
				var dy = md.clientY || md.pageY;
				$(this).on
				(
					'mousemove',
					function(mm)
					{
						clearInterval(o.timer);
						var mx = mm.clientX || mm.pageX;
						var my = mm.clientY || mm.pageY;
					
						/*计算两次坐标的距离*/
						o.cfg.nx = mx - dx;
						o.cfg.ny = my - dy;
					
						o.cfg.rx -= o.cfg.ny * 0.1;
						o.cfg.ry += o.cfg.nx * 0.1; 
								
						$('#rotate').css
						(
							{
								'transform':'perspective(800px) rotateX('+o.cfg.rx+'deg) rotateY('+o.cfg.ry+'deg)'
							}
						)
						dx = mx;
						dy = my;
					}
			
				)
			}           
		).mouseup
		(
			function()
			{
				$(this).off('mousemove');
				o.timer = setInterval
				(
					function()
					{
						o.cfg.nx *= 0.95;/*缩短距离*/
						o.cfg.ny *= 0.95;
						if(Math.abs(o.cfg.nx) < 1 && Math.abs(o.cfg.ny) < 1)
							clearInterval(o.timer)
						o.cfg.rx -= o.cfg.ny * 0.09;/*能让它慢慢的停下来*/
						o.cfg.ry += o.cfg.nx * 0.09;
						$('#rotate').css
						(
							{
								'transform':'perspective(800px) rotateX('+o.cfg.rx+'deg) rotateY('+o.cfg.ry+'deg)'
							}
						)
					},
					o.cfg.speed
				)
			}
		)
	}
}
$.fn.rotate = function(op)
{
	new Rotate(op).init();
}
