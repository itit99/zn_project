//定义动态类,全局手风琴特效
function menu(op)
{
	//给对象属性赋值
	this.click = op.click;
	this.skin = op.skin;
	this.wrap = op.wrap;
	this.init();//调用自身的初始化函数
}

//创建初始化函数,用户自定义扩展
menu.prototype = 
{
	init:function()
	{
		var $ = this;
		//获取点击的HTML元素标签对象
		var click = document.getElementsByTagName(this.click);
		//正则表达式a@163.com
		//循环所有的点击标签对象
		for(var i = 0;i < click.length;i++)
		{
			//给遍历后的每个元素标签对象添加点击事件
			click[i].onclick = function()
			{
				//alert(this.className);
				if(this.className == 'on')
				{		
					var node = $.get(this.nextSibling);
					this.classList.remove('on');
					this.getElementsByTagName($.skin)[0].classList.remove('on');
					node.style.height = '0';
					
				}
				else
				{

					//重新遍历所有的span元素标签
					for(var k = 0; k < click.length;k++)
					{
						//移除所有的span元素的on样式
						click[k].classList.remove('on');
						//移除所有span元素中的i元素的on样式
						click[k].getElementsByTagName($.skin)[0].classList.remove('on');
						//将容器的高度尺寸设置为0'
						$.get(click[k].nextSibling).style.height = '0';
					}
					//获取被点击对象中的样式标签
					this.getElementsByTagName($.skin)[0].classList.add('on');
					this.classList.add('on');
				
					//调用get函数，递归获取当前对象的兄弟节点
					var node = $.get(this.nextSibling);
					node.style.height = '144px';
					$.sub(node);
				}
			}
		}
	},
	//获取被点击对象的兄弟节点,排除空白文本节点
	get:function(node)
	{
	   //判断传递过来的参数节点，有没有兄弟节点，没有，就返回null
		if(!node.nextSibling)
			return node;
		//获取node节点的兄弟节点,赋值给sb
		var sb = node.nextSibling;
		if(sb.nodeType == 1)
			return sb;
		//调用get函数的递归
		return this.get(sb.nextSibling);
	},
	//定义子导航的点击事件和效果
	sub:function(node)
	{
		//获取node参数节点下的所有的a元素标签
		var lnk = node.getElementsByTagName('a');
		
		//给所有的a元素标签添加点击事件
		for(var m = 0;m < lnk.length;m++)
		{
			lnk[m].onclick = function()
			{
				//将所有a标签先全部清除样式on
				for(var n = 0;n < lnk.length;n++)
					lnk[n].classList.remove('on');
				//给点击的a标签添加on样式
				this.classList.add('on');
			}
		}
		
		
	}
}