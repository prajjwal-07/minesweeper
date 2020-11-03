var mode="num";
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let n=10;
  let squares=[];
  let cnt=20;
  

  function createBoard(){
	  const arr=[];
	  var i=0;
	  while(i<n*n)
	  {
		  if(i<cnt)
		  {
			  arr.push('bomb');
		  }
		  else
	      {
			  arr.push('valid');
		  }
		  i++;
	  }
	  arr.sort(()=>Math.random()-0.5);
	  //console.log(arr);
	  

	  for(var i=0;i<n*n;i++)
	  {
		  
		  const square=document.createElement('div');
		  square.setAttribute('id',i);
		  square.classList.add(arr[i]);
		  grid.appendChild(square);
		  squares.push(square);
		  //console.log(squares[i]);
		  square.addEventListener('click',function(e)
		  {
			if(mode=="num"){
				if(!square.firstChild)
				click(square);
			}  
			else{
				toggle_flag(square);

			}
		  })
		  
	  }
	  for(var it=0;it<n*n;it++)
      {
	  var total=0;
	  var xcord=Math.floor(it/n);
	  var ycord=it%n;
	  if(squares[it].classList.contains('valid'))
	  {
		  //console.log(ycord);
		  for(var i=-1;i<2;i++)
		  {
			  for( var j=-1;j<2;j++)
			  {
				  var x=xcord+i;
				  var y=ycord+j;
				  
				  if(x>=0&&y>=0&&x<n&&y<n&&squares[x*n+y].classList.contains('bomb'))
				  {
					  total++;
				  }
			  }
		  }
		  squares[it].setAttribute('data',total);
		  //console.log(squares[it]);
	  }
		

  }

  }
 
  createBoard();
   
   
  function click(square)
  {   let curr_id=square.id; 
      if(square.classList.contains('checked'))
		  return;
	  
	  if(square.classList.contains('bomb'))
	  {
		  square.style.backgroundColor="red";
		  displaybomb();
		  alert('GAME OVER!!,Click on New Game.');
		  
	  }
	  else
	  {
		  var total=square.getAttribute('data');
		  if(total!=0)
		  {
			  square.classList.add('checked');
			  square.innerHTML=total;
			  return;
		  }
		  else
		  expand(square,curr_id);
	  }
  }
  
  
  function expand(square,curr_id)
  {
	  
	  square.classList.add('checked');
	  
	  var xcord=Math.floor(curr_id/n);
	  var ycord=curr_id%n;
	  for(var i=-1;i<2;i++)
	  {
		  for(var j=-1;j<2;j++)
		  {
			  var x=xcord+i;
			  var y=ycord+j;
			  if(x>=0&&y>=0&&x<n&&y<n)
			  {
				  if(squares[x*n+y].classList.contains('bomb')||squares[x*n+y].classList.contains('checked'))
					  continue;
				  var total=squares[x*n+y].getAttribute('data');
				  if(total!=0)
				  {
					  squares[x*n+y].classList.add('checked');
					  squares[x*n+y].innerHTML=total;
				  }
				  else
				  {
					  expand(squares[x*n+y],x*n+y);
				  }
				  
			  }
		  }
	  }
  }
  function displaybomb()
  {
	  for(var i=0;i<n*n;i++)
	  {
		  if(squares[i].classList.contains('bomb'))
		  {
			  
			  let img=document.createElement('img');
			  img.src='bomb.png';
			  squares[i].appendChild(img);
		  }
	  }
  }
  function toggle_flag(square)
  {
	  if(!square.firstChild){
		  let img=document.createElement("img");
		  img.src="flag.png";
		  square.appendChild(img);
	  }
	  else{
		  square.removeChild(square.firstChild);
	  }
	  
  }
  
  
  
  
  
})
function change_mode(){
	if(mode=="num")
	{
		mode="flag";
		document.getElementById("mode").src="flag.png";
	}
	else
	{
		mode="num";
		document.getElementById("mode").src="num.png";
	}
}