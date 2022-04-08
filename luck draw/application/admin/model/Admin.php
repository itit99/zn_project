<?php
namespace app\admin\model;

class Admin extends \think\Model
{
	public function getSingle($cond = 1)
	{
		return $this->get($cond);
	}
	public function getList()
	{
		
	}
}