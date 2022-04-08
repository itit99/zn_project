<?php
namespace app\web\controller;

class Index extends \think\Controller
{
	private $p;
	
	public function _initialize()
	{
		$this->p['cat']= new \app\web\model\Catalog();
		$this->p['news']= new \app\web\model\News();
		
		//读取自定义配置文件intro
		$this->p['cfg'] = \think\Config::get('intro');
	}
    public function index()
    {
		$n1 = $this->p['news']->getNewsList(9);
		$n2 = $this->p['news']->getNewsList(10);

		$this->assign
		(
			'catalog',
			[
				'pro' => $this->p['cat']->getCatalogByType(),
				'news' => $this->p['cat']->getCatalogByType('news'),
				'example' => $this->p['cat']->getCatalogByType('example')
			]
		);
		$this->assign('news',['n1'=>$n1,'n2'=>$n2]);
		$this->assign('config',$this->p['cfg']);
        //return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="https://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="ad_bd568ce7058a1091"></think>';
		return $this->fetch();
    }
}
