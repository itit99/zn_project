<?php
namespace  app\web\model;

class Spage 
{
	/*
		用户自定义分页方法
		$rcount:记录总数
		$pcount:分页总数
		$page   :当前页码
		$fname:当前文件名
		
	*/
	public static function GetPageList($rcount,$pcount,$page,$fname)
	{
		$pagei = 0;
		$rn = '';
		$max = 3;
		$offset = 2;
		$psize = ceil($rcount / $pcount);
		if($page < 1)
			$page = 1;
		if($page > $psize)
			$page = $psize;
		$fpage = $page - $offset;
		$tpage = $page + $max - $offset - 1;
		if($max > $psize)
		{
			$fpage = 1;
			$tpage = $psize;
		}
		else
		{
			if($fpage < 1)
			{
				$tpage = $page + 1 - $fpage;
				$fpage = 1;
				if (($tpage - $fpage) < $max && ($tpage - $fpage) < $psize)
				{
					$tpage = $max;
				}
			}
			else if ($tpage > $psize)
			{
				$fpage = $page - $max + $tpage;
				$tpage = $psize;
				if (($tpage - $fpage) < $max && ($tpage - $fpage) < $psize)
				{
					$fpage = $psize - $max + 1;
				}
			}
		}
		if ($page > 1)
		{
			$rn .= "<a href=\"".$fname."\">第一页</a>\n";
			$rn .= "<a href=\"".$fname."?page=".($page - 1)."\">上一页</a>\n";
		}
		else
		{
			$rn .= "<a href=\"javascript:void(0)\">第一页</a>\n";
			$rn .= "<a href=\"javascript:void(0)\">上一页</a>\n";
		}
		for ($ipage = $fpage; $ipage <= $tpage; $ipage++)
		{
			if ($ipage != $page)
			{
				$rn .= "<a href=\"".$fname."?page=".$ipage."\">".$ipage."</a>\n";
			}
			else
			{
				$rn .= "<a href=\"javascript:void(0);\" class=\"fixed\">".$ipage."</a>\n";
			}
		}
		if ($page < $psize)
		{
			$rn .= "<a href=\"".$fname."?page=".($page + 1)."\">下一页</a>\n";
			$rn .= "<a href=\"".$fname."?page=".($psize)."\">最后一页</a>\n";
		}
		else
		{
			$rn .= "<a href=\"javascript:void(0)\">下一页</a>\n";
			$rn .= "<a href=\"javascript:void(0)\">最后一页</a>\n";
		}
		
		
		return $rn;
	}
}