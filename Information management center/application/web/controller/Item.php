<?php
namespace app\web\controller;

class Item extends \think\Controller
{
	//创建类属性，供Item类内部使用
	private $p;
	
	//创建控制器初始化方法
	public function _initialize()
	{
		$this->p['rst'] = \think\Request::Instance();
		$this->p['single'] = new \app\web\model\Single();
		$this->p['cat']= new \app\web\model\Catalog();
		$this->p['config'] = \think\Config::get('intro');
	}
	//创建公司介绍操作方法
	public function index()
	{
		//接收并传递参数到模型
		$type = $this->p['rst']->param('type');
		
		//调用single模型，并以type作为查询参数
		$data = $this->p['single']->getDataByType($type);
		
		
		

		$this->assign
		(
			'catalog',
			[
				'pro' => $this->p['cat']->getCatalogByType(),
				'news' => $this->p['cat']->getCatalogByType('news'),
				'example' => $this->p['cat']->getCatalogByType('example')
			]
		);
		
		//给模型变量赋值
		$this->assign('single',$data);
		$this->assign('config',$this->p['config']);
		//渲染模型变量，并输出
		return $this->fetch();
	}
}

