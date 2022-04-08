<?php
namespace app\web\model;

class Catalog extends \think\Model
{
	public function getCatalogByType($type = 'products')
	{
		$data = $this->all(['type' => $type]);
		return $data;
	}
}