import { toPng } from 'html-to-image';

var node = document.querySelector('capture');
var name = "verge_download.png";
var link = document.querySelector('a.download');

const convertToImage = (node, link, name) => {
  toPng(node, { pixelRatio: 3})
  .then(function (dataUrl) {
  	console.log(name);
  	console.log(link);
	  link.download = name;
	  link.classList.remove('downloading');
	  link.classList.add('downloaded');
	  link.href = dataUrl;
	  link.target = "_blank";
	  link.innerHTML = "download";
	  var animationHolder = node.closest('.animation-holder');
	  if(animationHolder) {
		  animationHolder.classList.remove('active');
		}
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
}

window.convertToImage = convertToImage;