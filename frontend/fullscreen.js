function goFullScreen() {

	document.getElementById('dropdown-button').style.display = 'none';
	document.getElementById('pullup-button').style.display = 'none';
	document.getElementById('chat-area').style.display = 'none';

	var z = document.getElementById('close-fullscreen');
	z.style.position = 'absolute';
	z.style.display = 'block';
	z.style.top = '10';
	z.style.right = '10';
	z.style.height = '40px';
	z.style.width = '40px';

	var x = document.getElementById('text-area');
	x.style.position = 'absolute';
	x.style.top = '0';
	x.style.left = '0';
	x.style.width = '100%';
	x.style.height = '100%';
	x.style.zIndex = '800';

	var q = document.getElementById('chat-preview');
	q.style.display = 'block';

}

function closeFullscreen() {

	document.getElementById('chat-area').style.display = 'block';
	document.getElementById('dropdown-button').style.display = 'none';
	document.getElementById('pullup-button').style.display = 'block';

	var x = document.getElementById('text-area');
	x.style.position = 'relative';
	x.style.width = '100%';
	x.style.height = '100%';
	x.style.zIndex = '1';

	var z = document.getElementById('close-fullscreen');
	z.style.display = 'none';

	var y = document.getElementById('chat-notification');
	y.style.display = 'none';
	y.children[0].innerText = "";

	var q = document.getElementById('chat-preview');
	q.style.display = 'none';

}
