var o = document;
function sw(ids){
	for (i=0;i<=7;i++) {
		o.getElementById('li_'+i).style.color='white'
		o.getElementById('div_'+i).style.display = "none"
	}
		o.getElementById('li_'+ids).style.color = 'red'
		o.getElementById('div_'+ids).style.display = "block"
}
