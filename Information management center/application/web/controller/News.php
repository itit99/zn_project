<?php
namespace app\web\controller;

class news extends \think\Controller
{
	private $p;
	//创建控制器初始化方法
	public function _initialize()
	{
		$this->p['rst'] = \think\Request::Instance();
		$this->p['cat'] = new \app\web\model\Catalog();
		$this->p['new'] = new \app\web\model\News();
		
		//读取自定义配置文件intro
		$this->p['cfg'] = \think\Config::get('intro');
	}
	//创建控制器默认方法
	public function index()
	{
		$cid =0;
		if(!empty($this->p['rst']->param('cid')))
			$cid = $this->p['rst']->param('cid');
		
		$data = $this->p['new']->getNewsPaginate($cid);
		
		$n1 = $this->p['new']->getNewsList(9);
		$n2 = $this->p['new']->getNewsList(10,$len=10);
		
		$this->assign
		(
			'catalog',
			[
				'pro' => $this->p['cat']->getCatalogByType(),
				'news' => $this->p['cat']->getCatalogByType('news'),
				'example' => $this->p['cat']->getCatalogByType('example')
			]
		);
		
		$t= $data->toArray();
		
		$this->assign('newslist',$data);
		
		//自定义分页
		$this->assign('pagex',\app\web\model\Spage::GetPageList($t['total'],$t['per_page'],$t['current_page'],'/index.php/web/news/index'));
		
		//使用系统分页
		$this->assign('page',$data->render());
		$this->assign('config',$this->p['cfg']);
		
		
		$this->assign('news',['n1'=>$n1,'n2'=>$n2]);
		return $this->fetch();
	}
	public function detail()
	{
		//接收ID参数
		$id = $this->p['rst']->param('id');
		$this->assign
		(
			'catalog',
			[
				'pro' => $this->p['cat']->getCatalogByType(),
				'news' => $this->p['cat']->getCatalogByType('news'),
				'example' => $this->p['cat']->getCatalogByType('example')
			]
		);
		$this->assign('news',$this->p['new']->getNewsDetail($id));
		//$this->assign('config',$this->p['cfg']);
		return $this->fetch();
	}
}