<?php
namespace app\web\model;

class News extends \think\Model
{
	public function getNewsList($cid,$len=3)
	{
		//1.使用模型提供的all方法，参数使用闭包函数
		/*
		$data = $this->all
		(
			function($sql)
			{
				$sql->where('cid',$cid)->limit(3)->order('udatetimes','desc');
			}
		);*/
		//2.使用数据库Db提供的select方法
		$data = $this->where('cid',$cid)->limit($len)->order('cdatetime','asc')->select();
		return $data;
	}
	
	//获取新闻分页列表数据
	public function getNewsPaginate($cid,$psize=1)
	{
		
		$data = $this;
		//判断cid是否为0 ,为0表示没有传递cid参数
		
		if($cid != 0)
			$data = $data->where('cid',$cid);
		
		$data = $data->order('cdatetime','desc')->paginate($psize,false,['url' => '/?s=web=/news']);
		
		return $data;
	}
}