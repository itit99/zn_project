<?php
namespace app\admin\controller;

class Login extends \think\Controller
{
	public function index()
	{
		return $this->fetch();
	}
	//创建登录操作方法
	public function login
	(
		\think\Request $rst
	)
	{
		$tmp=[];
		
		$admin = new \app\admin\model\Admin(); 
		//接收用户名及密码参数
		$user = $rst->param('user');
		$pwd = $rst->param('pwd');
		
		//构造模型查询条件
		$data =
		[
			'user'=>$user,
			'pwd'=>md5($pwd)
		];
		
		//调用模型查询方法
		$result = $admin->getSingle($data);
		
		if(empty($result))
		{
			$tmp = 
			[
				'code' => 300,
				'msg' => '用户名或密码不正确!'
			];
		}
		else
		{
			$tmp = 
			[
				'code' => 200,
				'msg' => '用户登录成功，正在跳转..'
			];
		}
		return $tmp;
	}
}