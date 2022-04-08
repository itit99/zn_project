<?php
namespace app\web\model;

class Single extends \think\Model
{
	public function getDataByType($type = 'intro')
	{
		//创建根据参数获取字段方法
		$data = $this->get(['type' => $type]);
		
		return $data;
	}
}