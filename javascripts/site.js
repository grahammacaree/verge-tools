// This is where it all goes :)



const colors = ['c000000', 'c6600FF', 'cffffff'];
const ratios = ['r16x9', 'r9x16'];
const cmd_ratios = ['r1x1', 'r3x2'];
var eyebrow = [];
var byline = [];
var timestamp;
var backgroundColor ="#000000";
const decoder_divs = ['x', 'square', 'filled', 'slash'];
const column_alignments = ['even', 'between', 'around'];
const commandLineColors = ['#d6f31f', '#5200ff', '#f9f9f9'];

document.documentElement.classList.remove('no-js');

function switchTool(tool) {
	document.querySelector('.tool.active').classList.remove('active');
	document.querySelector('.tool.'+tool).classList.add('active');
	document.querySelector('.text-container.active').classList.remove('active');
	document.querySelector('.text-container.'+tool).classList.add('active');
	if(document.querySelector('.left-column .active')) {
		document.querySelector('.left-column .active').classList.remove('active');
	}
	document.querySelector('.left-column [data-tool="'+tool+'"]').classList.add('active');
}

function updateBylines() {
	const editTarget = document.querySelector('.edit-type-byline ul');
	document.querySelector("#byline").value = "Add Byline";
	const outputTarget = document.querySelector('.image-container .lockup .byline');
	editTarget.innerHTML = "";
	byline.forEach(item => {
		editTarget.innerHTML += `<li><span class="item">${item}</span><span class="close">+</span></li>`;
	});
	document.querySelectorAll('.edit-type-byline li .close').forEach(item => {
		item.addEventListener('click', (event) => {
			var name = item.parentNode.querySelector('.item').innerHTML;
			byline.splice(byline.indexOf(name), 1);
			updateBylines();
		});
	});
	outputTarget.innerHTML = "";
	byline.forEach((item, index) => {
		if(byline.length <= 3) {
			outputTarget.innerHTML += `${item}`;
		}
		if(index < (byline.length -1) && byline.length == 2 ) {
			outputTarget.innerHTML += `<span class="divider"> and </span>`;
		}
		if(byline.length == 3 && index < (byline.length -1)) {
			if(index == byline.length -2) {
				outputTarget.innerHTML += `<span class="divider"> and </span>`;
			} else {
				outputTarget.innerHTML += `<span class="divider">, </span>`;	
			}
		}
		if(byline.length > 3) {
			if(index < 2) {
				outputTarget.innerHTML += `${item}`;
				if(index == 0) {
					outputTarget.innerHTML += `<span class="divider">, </span>`;
				} else {
					outputTarget.innerHTML += `<span class="divider"> and </span>${byline.length - 2} others`;
				}
			}

		}
	});
}

function updateHeader (header) {
	const editTarget = document.querySelector('#headline');
	const outputTarget = document.querySelector('.image-container .lockup .headline');
	editTarget.value = header;
	outputTarget.innerHTML = header;
}

function updateCredit (credit) {
	const editTarget = document.querySelector('#credit');
	const outputTarget = document.querySelector('.image-container .lockup .credit');
	editTarget.value = credit;
	outputTarget.innerHTML = credit;
}

function updateDate (date) {
	const editTarget = document.querySelector('#date');
	const outputTarget = document.querySelector('.image-container .lockup .date');
	editTarget.value = date;
	outputTarget.innerHTML = date;
}

function updateEyebrows() {
	const editTarget = document.querySelector('.edit-type-eyebrow ul');
	document.querySelector("#eyebrow").value = "Add Eyebrow";
	const outputTarget = document.querySelector('.image-container .lockup .eyebrow');
	editTarget.innerHTML = "";
	eyebrow.forEach(item => {
		editTarget.innerHTML += `<li><span class="item">${item}</span><span class="close">+</span></li>`;
	});
	document.querySelectorAll('.edit-type-eyebrow li .close').forEach(item => {
		item.addEventListener('click', (event) => {
			var tag = item.parentNode.querySelector('.item').innerHTML;
			eyebrow.splice(eyebrow.indexOf(tag), 1);
			updateEyebrows();
		});
	});
	//update outputtarget innerHTML with a span between each item
	outputTarget.innerHTML = "";
	eyebrow.forEach((item, index) => {
		outputTarget.innerHTML += `${item}`;
		if(index < eyebrow.length -1) {
			outputTarget.innerHTML += `<span class="divider">/</span>`;
		}
	});
}

const createImage= async(image, target = false)=> {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', {type: blob.type});
  if(target) {
  	target.src = `${URL.createObjectURL(file)}`;
  }
}


const capture = (id, link, name) => {
	link.classList.add('downloading');
	convertToImage(id, link, name);
};

function isImage(item, file) {
	const fileType = file['type'];
	const validImageTypes = ['image/jpeg', 'image/png'];
	if (validImageTypes.includes(fileType)) {
	    return true;
	} else {
		item.value = null;
		return false;
	}
}

function addPanning() {
	document.querySelectorAll('.pannable').forEach(item => {
		var panning = false;
		//initX and Y
		var initX = 0;
		var initY = 0;
		if(item.dataset.listeners != true) {
			//turn on panning on mousedown
			item.addEventListener('mousedown', (event) => {
				panning = true;
				initX = event.clientX;
				initY = event.clientY;
			});
			//turn off panning on mouseup
			item.addEventListener('mouseup', (event) => {
				panning = false;
			});
			item.addEventListener('mouseout', (event) => {
				panning = false;
			});
			//pan inside parent element on mousemove
			item.addEventListener('mousemove', (event) => {
				event.preventDefault();
				if(panning && item.classList.contains('pannable')) {
					//follow mousemove with transform
					var transform = item.style.transform;
					translateImage(item, [event.clientX-initX, event.clientY-initY]);
					//set initX and Y to current mouse position
					initX = event.clientX;
					initY = event.clientY;
					checkImageBounds(item, item.parentNode);
				}
			});
			item.dataset.listeners = true;
		}
	});
}

function translateImage(image, translation) {
	//get current transform of image
	var style = window.getComputedStyle(image);
	//get transform
	var transform = style.getPropertyValue('transform');
	//get zoom values
	var zoom = image.dataset.zoom;
	//get x and y
	var x = 0;
	var y = 0;
	if(transform && transform != "none") {
		//match all translate values in transform
		var numberPattern = /-?\d+\.?\d*/g;
		var values = transform.match( numberPattern );
		x = parseInt(values[4]);
		y = parseInt(values[5]);
	}
	x += translation[0];
	y += translation[1];
	transform = `translate(${x}px, ${y}px) scale(${zoom})`;
	image.style.setProperty('transform', transform);
}

function checkImageBounds(image, container) {
	var zoom = image.dataset.zoom-1;
	//get image center location
	const rect = image.getBoundingClientRect();
	const centerX = rect.left + rect.width/2;
	const centerY = rect.top + rect.height/2;
	//get edges of image by adding/subtracting half width/height and dividing by zoom
	const bottomEdge = centerY+rect.height/2*(1+zoom/2);
	const containerBottom = Math.floor(container.getBoundingClientRect().bottom);
	//console.log(bottomEdge, containerBottom);
	if(bottomEdge < containerBottom) {
		translateImage(image, [0, (containerBottom-bottomEdge)/(1+zoom)]);
		//console.log('bottom triggered');
	}
	const topEdge = centerY - rect.height/2*(1+zoom/2);
	const containerTop = Math.floor(container.getBoundingClientRect().top);
	if(topEdge > containerTop) {
		translateImage(image, [0, (containerTop-topEdge)/(1+zoom)]);
		//console.log('top triggered');
	}
	const leftEdge = centerX - rect.width/2*(1+zoom/2);
	const containerLeft = Math.floor(container.getBoundingClientRect().left);
	if(leftEdge > containerLeft) {
		translateImage(image, [(containerLeft-leftEdge)/(1+zoom), 0]);
		//console.log('left triggered');
	}
	
	const rightEdge = centerX + rect.width/2*(1+zoom/2);
	const containerRight = Math.floor(container.getBoundingClientRect().right);
	if(rightEdge < containerRight) {
		translateImage(image, [(containerRight-rightEdge)/(1+zoom), 0]);
		//console.log('right triggered');
	}
	
}

window.addEventListener('DOMContentLoaded', (event) => {

	document.querySelectorAll('#image').forEach(item => {
		item.addEventListener('change', (event) => {
			const target = document.querySelector('.image-container .picture .image img');
			const image = item.files[0];
			if(isImage(item, image)) {
				target.src = `${URL.createObjectURL(image)}`;
			}
		});
	});

	//whenever an input in class .tool is changed, find the download button associated with that tool and remove the "downloaded" class
	document.querySelectorAll('.tool input').forEach(item => {
		item.addEventListener('change', (event) => {

			const target = item.closest('.tool').querySelector('.download');
			if(target.classList.contains('downloaded')) {
				target.classList.remove('downloaded');
				target.innerHTML = "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
				//remove href and download
				target.removeAttribute('href');
				target.removeAttribute('download');
			}
		});
	});

	document.querySelectorAll('.tool .entry').forEach(item => {
		item.addEventListener('click', (event) => {

			const target = item.closest('.tool').querySelector('.download');
			if(target.classList.contains('downloaded')) {
				target.classList.remove('downloaded');
				target.innerHTML = "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
				//remove href and download
				target.removeAttribute('href');
				target.removeAttribute('download');
			}
		});
	});



	document.querySelectorAll('.url-fetcher').forEach(button => {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			const input = document.querySelector('#url');
			const header = document.querySelector('#headline');
			const subhead = document.querySelector('#dek');
			const imageSelect = document.querySelector('#image');
			var target = document.querySelector('.image-container .picture .image img');
	  	var url = input.value + "?" + new URLSearchParams({ csk: 1 }).toString();
	  	fetch(url).then(function (response) {
				// The API call was successful!
				return response.text();
			}).then(function (html) {
				// This is the HTML from our response as a text string
				byline = [];
				eyebrow = [];
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, "text/html");
				var hed  = doc.querySelector('article .duet--article--lede h1').innerHTML.replace( /(<([^>]+)>)/ig, '');
				if(doc.querySelector('article .duet--article--lede-image cite')) {
					var credit = doc.querySelector('article .duet--article--lede-image cite').innerHTML.replace( /(<([^>]+)>)/ig, '');	
					updateCredit(credit);
				} else {
					updateCredit("");
				}
				if(doc.querySelector('article .duet--article--date-and-comments time')) {
					var time = doc.querySelector('article .duet--article--date-and-comments time').innerHTML;
					time = time.split(',').slice(0,2).join(',');
					updateDate(time.split('>')[1]);
				} else {
					updateDate("")
				}
				
				var bylines = doc.querySelectorAll('article .duet--article--article-byline .font-medium a');
				bylines.forEach(item => {
					byline.push(item.innerHTML.replace( /(<([^>]+)>)/ig, ''));
				});
				var eyebrows = doc.querySelectorAll('article .article-groups a');
				eyebrows.forEach(item => {
					eyebrow.push(item.innerHTML.replace( /(<([^>]+)>)/ig, ''));
				});
				updateEyebrows();
				updateBylines();
				updateHeader(hed);
				//split time by comma and keep first two items
				
				if(doc.querySelector('article .duet--article--lede .duet--article--lede-image img')) {
					var imageURL = doc.querySelector('article .duet--article--lede .duet--article--lede-image img').src;
					var image = createImage(imageURL, target);
					if(!document.querySelector('#background').checked) {
						document.querySelector('.image-container .image-inner .picture').classList.remove('hidden');
						document.querySelector('.edit-type-credit').classList.remove('hidden');
						document.querySelector('.edit-type-image').classList.remove('hidden');
					}
				} else {
					document.querySelector('.image-container .image-inner .picture').classList.add('hidden');
					//document.querySelector('.edit-type-credit').classList.add('hidden');
					//document.querySelector('.edit-type-image').classList.add('hidden');
				}

				document.querySelector('.input .edit').classList.add('visible');
				document.querySelector('.image-container').classList.add('visible');

				document.querySelector('.download').classList.add('visible');
			}).catch(function (err) {
				// There was an error
				console.warn('Something went wrong.', err);
			});
		});
	});

	//turn on url fetcher if text is in input
	document.querySelectorAll('.url-fetcher').forEach(button => {
		const input = document.querySelector('#url');
		input.addEventListener('keyup', (event) => {
			if(input.value) {
				button.classList.add('active');
			} else {
				button.classList.remove('active');
			}
		});
	});

	document.querySelector('input#headline').addEventListener('keyup', (event) => {
		if(event.keyCode == 13 && event.target.value.length > 0) {
			updateHeader(event.target.value);
		}
	});

	document.querySelector('input#headline').addEventListener('blur', (event) => {
		updateHeader(event.target.value);
	});


	document.querySelector('input#credit').addEventListener('keyup', (event) => {
		if(event.keyCode == 13 && event.target.value.length > 0) {
			updateCredit(event.target.value);
		}
	});

	document.querySelector('input#credit').addEventListener('blur', (event) => {
		updateCredit(event.target.value);
	});

	document.querySelector('input#eyebrow').addEventListener('keyup', (event) => {
		//if key is enter add value of input to byline array
		if(event.keyCode == 13 && event.target.value.length > 0) {
			eyebrow.push(event.target.value);
			updateEyebrows();
			event.target.value = "";
		}
	});

	document.querySelector('input#date').addEventListener('keyup', (event) => {
		//if key is enter add value of input to byline array
		if(event.keyCode == 13 && event.target.value.length > 0) {
			updateDate(event.target.value);
		}
	});

	document.querySelector('input#date').addEventListener('blur', (event) => {
		updateDate(event.target.value);
	});

	document.querySelectorAll('.edit-type-eyebrow li span').forEach(item => {
		item.addEventListener('click', (event) => {
			eyebrow.splice(eyebrow.indexOf(item.innerHTML), 1);
			updateEyebrows();
		});
	});

  document.querySelector('input#byline').addEventListener('keyup', (event) => {
		//if key is enter add value of input to byline array
		if(event.keyCode == 13 && event.target.value.length > 0) {
			byline.push(event.target.value);
			updateBylines();
			event.target.value = "";
		}
	});
	
  document.querySelector('#font-slider').addEventListener('input' , (event) => {
  	document.querySelector('.article-scraper .image-container .lockup .headline').style.setProperty('--slider-percent', event.target.value);
  });

	document.querySelectorAll('.color.entry .inner').forEach(button => {
		button.addEventListener('click', (event) => {
			const target = document.querySelector('.bottom');
			if(!button.classList.contains('selected')) {
				document.querySelector('.color.entry .selected').classList.remove('selected');
				button.classList.add('selected');
				target.classList.remove(...colors);
				target.classList.add(button.parentNode.dataset.color)
				backgroundColor = button.parentNode.dataset.color.replace('c', '#');
			}
		});
	})

	document.querySelectorAll('.article-scraper .ratio.entry .inner').forEach(button => {
		button.addEventListener('click', (event) => {
			const target = document.querySelector('.bottom');
			if(!button.classList.contains('selected')) {
				document.querySelector('.ratio.entry .selected').classList.remove('selected');
				button.classList.add('selected');
				target.classList.remove(...ratios);
				target.classList.add(button.parentNode.dataset.ratio)
			}
		});
	})

	document.querySelector('#background').addEventListener('change', (event) => {
		const image = document.querySelector('.article-scraper .image-container .image-inner .picture');
		if(event.target.checked) {
			image.classList.add('hidden');
		} else {
			image.classList.remove('hidden');
		}
	});

	document.querySelectorAll('.tool-selector li').forEach(button => {
		button.addEventListener('click', (event) => {
			switchTool(button.dataset.tool);
		});
	});

	document.querySelector('.edit-label .inner').addEventListener('click', (event) => {
		document.querySelector('.article-scraper .input .edit').classList.toggle('active');
	});

	document.querySelector('.decoder-image-generator #decoder-image').addEventListener('change', (event) => {
		const target = document.querySelector('.decoder-image-generator .image-container .picture .image .image-holder img');
		const inverse = document.querySelector('.decoder-image-generator .image-container .picture .image .invert-holder img');
		const image = document.querySelector('.decoder-image-generator #decoder-image').files[0];
		if(isImage(document.querySelector('.decoder-image-generator #decoder-image'), image)) {
			target.src = `${URL.createObjectURL(image)}`;
			target.addEventListener('load', (event) => {
				smartcrop.crop(target, { width: 100, height: 100 }).then(function(result) {
			  //target.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
			  target.parentNode.dataset.zoom = 1;
				inverse.src = `${URL.createObjectURL(image)}`;
				inverse.parentNode.dataset.zoom = 1;
				//inverse.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
				//checkImageBounds();
			});
		});
		}
		generateDecoderCols();
		document.querySelector('.decoder-image-generator .draggable').classList.remove('draggable');
		document.querySelector('.decoder-image-generator .options').classList.add('visible');
		addPanning();
	});

	document.querySelector('.command-line-image-generator #command-line-image').addEventListener('change', (event) => {
		const target = document.querySelector('.command-line-image-generator .image-container .picture .image .image-holder img');
		const image = document.querySelector('.command-line-image-generator #command-line-image').files[0];
		if(isImage(document.querySelector('.command-line-image-generator #command-line-image'), image)) {
			target.src = `${URL.createObjectURL(image)}`;
			target.addEventListener('load', (event) => {
				smartcrop.crop(target, { width: 100, height: 100 }).then(function(result) {
			  	//target.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
			  	target.parentNode.dataset.zoom = 1;
			});
		});
		}
		commandLineBoxes();
		document.querySelector('.command-line-image-generator .draggable').classList.remove('draggable');
		document.querySelector('.command-line-image-generator .options').classList.add('visible');
		addPanning();
	});

	document.querySelector('.decoder-image-generator .regen').addEventListener('click', (event) => {
		generateDecoderCols();
		const target = event.target.parentNode.parentNode.querySelector('.download');
		target.classList.remove('downloaded');
		target.innerHTML = "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
		//remove href and download
		target.removeAttribute('href');
		target.removeAttribute('download');
	});

	function generateDecoderCols() {
		const col_containter = document.querySelector('.decoder-image-generator .small');
		//generate between 1 and 3 columns
		col_containter.innerHTML = "";
		for(let i = 0; i < 3; i++) {
			var col = document.createElement('div');
			col.classList.add('col');
			col_containter.appendChild(col);
		}
		document.querySelectorAll('.decoder-image-generator .small .col').forEach(column => {
			//create random number of divs between 0 and 4
			const numberOfDivs = Math.floor(Math.random() * 5);
			col.innerHTML = "";
			for(let i = 0; i < numberOfDivs; i++) {
				const div = document.createElement('div');
				//randomly assign class from decoder_divs array
				div.classList.add(decoder_divs[Math.floor(Math.random() * decoder_divs.length)]);
				div.classList.add('column');
				column.appendChild(div);
			}
			//add random class from column_alignments array to col
			column.classList.add(column_alignments[Math.floor(Math.random() * column_alignments.length)]);
			//add random vertical transform from -2 to + 2rem to column
			column.style.setProperty('transform', `translate(0,${Math.random() * 4 - 2}rem)`);
		});
	}

	var draggable = false;
	var startX;
	var startY;
	var startTransform;
	var startInverseTransform;

	document.querySelectorAll('.brightness-slider').forEach(slider => {
		input = slider.querySelector('input');
		input.addEventListener('input', (event) => {
			var target;
			if(document.querySelectorAll(`[data-adjustment='${slider.querySelector('input').dataset.target}']`).length > 1) {
				target = document.querySelector(`.image-container.active [data-adjustment='${slider.querySelector('input').dataset.target}']`);
			} else {
				target = document.querySelector(`[data-adjustment='${slider.dataset.target}']`);
			}
			console.log(slider.dataset.target);
			const brightness = event.target.value;
			target.dataset.brightness = brightness;
			updateFilters(target);
		});
	});

	document.querySelectorAll('.contrast-slider').forEach(slider => {
		input = slider.querySelector('input');
		input.addEventListener('input', (event) => {
			var target;
			if(document.querySelectorAll(`[data-adjustment='${slider.querySelector('input').dataset.target}']`).length > 1) {
				target = document.querySelector(`.image-container.active [data-adjustment='${slider.querySelector('input').dataset.target}']`);
			} else {
				target = document.querySelector(`[data-adjustment='${slider.dataset.target}']`);
			}
			console.log(slider.dataset.target);
			const contrast = parseInt(event.target.value);
			target.dataset.contrast = contrast;
			updateFilters(target);
		});
	});

	function updateFilters(target) {
		const brightness = target.dataset.brightness;
		const contrast = target.dataset.contrast;
		target.style.setProperty('filter', `brightness(${brightness}%) contrast(${contrast}%)`);
	}

	document.querySelectorAll('.zoom-slider').forEach(slider => {
		slider.addEventListener('input', (event) => {

			var target;
			//if [data-adjustment='${slider.dataset.target}'].length > 1, pick the active one
			console.log(document.querySelectorAll(`[data-adjustment='${slider.dataset.target}']`).length);
			if(document.querySelectorAll(`[data-adjustment='${slider.dataset.target}']`).length > 1) {
				target = document.querySelector(`.image-container.active [data-adjustment='${slider.dataset.target}']`);
			} else {
				target = document.querySelector(`[data-adjustment='${slider.dataset.target}']`);
			}
			var zooms = target.querySelectorAll('.zooming');
			zooms.forEach(zoom => {
				var transform = zoom.style.transform;
				//get translate value from transform
				var numberPattern = /-?\d+\.?\d*/g;
				var values = transform.match( numberPattern );
				//set x and y to 0
				var x = 0;
				var y = 0;
				//if values
				if(values) {
				  x=values[0];
				  y=values[1];
				}
				zoom.style.setProperty('transform', `translate(${x}px, ${y}px) scale(${event.target.value/100+1})`);
				zoom.dataset.zoom =event.target.value/100+1;
				checkImageBounds(zoom, zoom.parentNode);
			});
		});
	});

	
	//add 'dragging' class to 'draggable' on drag over
	document.querySelector('.image-container').addEventListener('dragover', (event) => {
		if(event.target.classList.contains('draggable')) {
			event.target.classList.add('dragging');
		}
	});

	//remove 'dragging' class from 'draggable' on drag leave
	document.querySelector('.image-container').addEventListener('dragleave', (event) => {
		if(event.target.classList.contains('draggable')) {
			event.target.classList.remove('dragging');
		}
	});

	document.addEventListener("dragover", function(event) {
  	event.preventDefault();
	});

	//on image drop upload image
	document.querySelector('.decoder-image-generator .image-container').addEventListener('drop', (event) => {
		event.preventDefault();
		if(event.target.classList.contains('draggable')) {
			event.target.classList.remove('dragging');
			const target = document.querySelector('.decoder-image-generator .image-container .picture .image .image-holder img');
			const inverse = document.querySelector('.decoder-image-generator .image-container .picture .image .invert-holder img');
			const image = event.dataTransfer.files[0];
				target.src = `${URL.createObjectURL(image)}`;
				target.addEventListener('load', (event) => {
					smartcrop.crop(target, { width: 100, height: 100 }).then(function(result) {
				  //target.parentNode.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
					target.parentNode.dataset.zoom = 1;
					inverse.src = `${URL.createObjectURL(image)}`;
					inverse.parentNode.dataset.zoom = 1;
					//inverse.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
					//checkImageBounds();
					addPanning();
				});
			});
			generateDecoderCols();
			document.querySelector('.decoder-image-generator .draggable').classList.remove('dragging');
			document.querySelector('.decoder-image-generator .draggable').classList.remove('draggable');
			document.querySelector('.decoder-image-generator .edit').classList.add('selected');
			document.querySelector('.decoder-image-generator .options').classList.add('visible');
		}
	});


function commandLineBoxes() {
	const frames = document.querySelectorAll('.command-line-image-generator .command-line-frame');
	//pick integer between 0 and 3, rotate frame by 90* that many times
	const rotate = Math.floor(Math.random() * 4);
	frames.forEach(frame => {
		frame.querySelector('.command-line-boxes').style.setProperty('transform', `rotate(${rotate*90}deg)`);
		const boxes = frame.querySelectorAll('.command-line-boxes rect');
		//for each box change fill randomly to one of #d6f31f, #5200ff and #f9f9f9
		boxes.forEach(box => {
			box.style.setProperty('fill', commandLineColors[Math.floor(Math.random() * commandLineColors.length)]);
		});
	});
}

//on image drop upload image
document.querySelector('.command-line-image-generator .image-container').addEventListener('drop', (event) => {
	event.preventDefault();
	if(event.target.classList.contains('draggable')) {
		event.target.classList.remove('dragging');
		const target = document.querySelector('.command-line-image-generator .image-container .picture .image .image-holder img');
		const image = event.dataTransfer.files[0];
			target.src = `${URL.createObjectURL(image)}`;
			target.addEventListener('load', (event) => {
				smartcrop.crop(target, { width: 100, height: 100 }).then(function(result) {
			  //target.parentNode.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
				target.parentNode.dataset.zoom = 1;
				
				//inverse.style.setProperty('transform', `translate(-${result.topCrop.x}px, -${result.topCrop.y+50}px)`);
				//checkImageBounds();
				addPanning();
			});
		});
		commandLineBoxes();
		document.querySelector('.command-line-image-generator .draggable').classList.remove('dragging');
		document.querySelector('.command-line-image-generator .draggable').classList.remove('draggable');
		document.querySelector('.command-line-image-generator .edit').classList.add('selected');
		document.querySelector('.command-line-image-generator .options').classList.add('visible');
	}
});

  document.querySelector('.command-line-image-generator .regen').addEventListener('click', (event) => {
		commandLineBoxes();
		const target = event.target.parentNode.parentNode.querySelector('.download');
		target.classList.remove('downloaded');
		target.innerHTML = "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
		//remove href and download
		target.removeAttribute('href');
		target.removeAttribute('download');
	});

  document.querySelectorAll('.command-line-image-generator .ratios .ratio').forEach(ratio => {
		ratio.addEventListener('click', (event) => {
			const target = document.querySelector('.command-line-image-generator .image-container');
			if(!ratio.classList.contains('selected')) {
				document.querySelector('.command-line-image-generator .ratios .selected').classList.remove('selected');
				ratio.querySelector('.inner').classList.add('selected');
				target.classList.remove(...cmd_ratios);
				target.classList.add(ratio.dataset.ratio);
			}
		});
	});

	document.querySelector('.verge-filter-generator #verge-filter').addEventListener('change', (event) => {
		const target = document.querySelector('.verge-filter-generator .image-container .picture .image .image-holder svg image');
		
		const image = event.srcElement.files[0];
		if(isImage(document.querySelector('.verge-filter-generator #verge-filter-image'), image)) {
				//set svg image to image
				target.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', `${URL.createObjectURL(image)}`);
				//create html image with src
				const imageCheck = new Image();
				imageCheck.src = `${URL.createObjectURL(image)}`;
				imageCheck.onload = function() {
					//get aspect ratio
					const aspectRatio = imageCheck.width/imageCheck.height;
					var height = 500;
					var width = 750;
					if(aspectRatio > 1) {
						//get updated height
						height = width/aspectRatio;
					} else {
						//get updated width
						width = height*aspectRatio;
					}
					target.closest('svg').setAttribute('preserveAspectRatio', `xMidYMid meet`);
					//set svg width and height to 100%
					target.closest('svg').setAttribute('width', `${width}`);
					target.closest('svg').setAttribute('height', `${height}`);
					//set svg viewbox to 0 0 width height
					target.closest('svg').setAttribute('viewBox', `0 0 ${width} ${height}`);
					//find image-container, set max-width to width and aspect ratio to height/width
					target.closest('.image-container').style.setProperty('max-width', `${width}px`);
					target.closest('.image-container').style.setProperty('aspect-ratio', `${aspectRatio}`);
					//find .lockup
					target.closest('.lockup').style.setProperty('aspect-ratio', `${aspectRatio}`);
					delete imageCheck;
				}


			}
		document.querySelector('.verge-filter-generator .draggable').classList.remove('dragging');
		document.querySelector('.verge-filter-generator .draggable').classList.remove('draggable');
		document.querySelector('.verge-filter-generator .edit').classList.add('selected');
		document.querySelector('.verge-filter-generator .options').classList.add('visible');
		addPanning();
	});

	document.querySelector('.verge-filter-generator .image-container').addEventListener('drop', (event) => {
		event.preventDefault();
		if(event.target.classList.contains('draggable')) {
			event.target.classList.remove('dragging');
			const target = document.querySelector('.verge-filter-generator .image-container .picture .image .image-holder svg image');
			const image = event.dataTransfer.files[0];
			if(isImage(document.querySelector('.verge-filter-generator #verge-filter-image'), image)) {
				//set svg image to image
				target.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', `${URL.createObjectURL(image)}`);
				//create html image with src
				const imageCheck = new Image();
				imageCheck.src = `${URL.createObjectURL(image)}`;
				imageCheck.onload = function() {
					//get aspect ratio
					const aspectRatio = imageCheck.width/imageCheck.height;
					var height = 500;
					var width = 750;
					if(aspectRatio > 1) {
						//get updated height
						height = width/aspectRatio;
					} else {
						//get updated width
						width = height*aspectRatio;
					}
					target.closest('svg').setAttribute('preserveAspectRatio', `xMidYMid meet`);
					//set svg width and height to 100%
					target.closest('svg').setAttribute('width', `${width}`);
					target.closest('svg').setAttribute('height', `${height}`);
					//set svg viewbox to 0 0 width height
					target.closest('svg').setAttribute('viewBox', `0 0 ${width} ${height}`);
					//find image-container, set max-width to width and aspect ratio to height/width
					target.closest('.image-container').style.setProperty('max-width', `${width}px`);
					target.closest('.image-container').style.setProperty('aspect-ratio', `${aspectRatio}`);
					//find .lockup
					target.closest('.lockup').style.setProperty('aspect-ratio', `${aspectRatio}`);
					delete imageCheck;
				}


			}
			document.querySelector('.verge-filter-generator .draggable').classList.remove('dragging');
			document.querySelector('.verge-filter-generator .draggable').classList.remove('draggable');
			document.querySelector('.verge-filter-generator .edit').classList.add('selected');
			document.querySelector('.verge-filter-generator .options').classList.add('visible');
			addPanning();
		}
	});

	//when paste occurs, check active tool for .image-container. upload image to first .image-container found
	document.addEventListener('paste', (event) => {
		//check which tool is active
		const activeTool = document.querySelector('.tool.active');
		//get data-tool-name
		const toolName = activeTool.dataset.toolName;
		const items = (event.clipboardData  || event.originalEvent.clipboardData).items;
		for (index in items) {
			const item = items[index];
			if (item.kind === 'file') {
				const image = item.getAsFile();
					if(toolName == "verge-filter") {
						const target = document.querySelector('.verge-filter-generator .image-container .picture .image .image-holder svg image');
							console.log('success?')
							if(isImage(document.querySelector('.verge-filter-generator #verge-filter-image'), image)) {
							//set svg image to image
							target.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', `${URL.createObjectURL(image)}`);
							//create html image with src
							const imageCheck = new Image();
							imageCheck.src = `${URL.createObjectURL(image)}`;
							imageCheck.onload = function() {
								//get aspect ratio
								const aspectRatio = imageCheck.width/imageCheck.height;
								var height = 500;
								var width = 750;
								if(aspectRatio > 1) {
									//get updated height
									height = width/aspectRatio;
								} else {
									//get updated width
									width = height*aspectRatio;
								}
								target.closest('svg').setAttribute('preserveAspectRatio', `xMidYMid meet`);
								//set svg width and height to 100%
								target.closest('svg').setAttribute('width', `${width}`);
								target.closest('svg').setAttribute('height', `${height}`);
								//set svg viewbox to 0 0 width height
								target.closest('svg').setAttribute('viewBox', `0 0 ${width} ${height}`);
								//find image-container, set max-width to width and aspect ratio to height/width
								target.closest('.image-container').style.setProperty('max-width', `${width}px`);
								target.closest('.image-container').style.setProperty('aspect-ratio', `${aspectRatio}`);
								//find .lockup
								target.closest('.lockup').style.setProperty('aspect-ratio', `${aspectRatio}`);
								delete imageCheck;
							}


						}
						document.querySelector('.verge-filter-generator .draggable').classList.remove('dragging');
						document.querySelector('.verge-filter-generator .draggable').classList.remove('draggable');
						document.querySelector('.verge-filter-generator .edit').classList.add('selected');
						document.querySelector('.verge-filter-generator .options').classList.add('visible');
						addPanning();
					}
				break;
			}
		}
	});

	document.querySelectorAll(".toggle-group").forEach(group => {
		const target = document.querySelector(`.${group.dataset.target}`);
		var classes = [];
		group.querySelectorAll(".toggle").forEach(toggle => {
			//get classes from data-class
			classes.push(toggle.dataset.class);
		})

		group.querySelectorAll(".toggle").forEach(toggle => {
			//on click get data-class and apply it to target

			toggle.addEventListener('click', (event) => {

				classes.forEach(item => {
					target.classList.remove(item);
				});
				target.classList.add(toggle.dataset.class);
				//remove selected from group.toggle.selected
				group.querySelectorAll(".toggle .inner.selected").forEach(selected => {
					selected.classList.remove('selected');
				});
				//add selected to this one
				toggle.querySelector('.inner').classList.add('selected');
			});
		});
	});

	document.querySelectorAll('.check-toggle').forEach(toggle => {
		const target = document.querySelector(`.${toggle.dataset.target}`);
		var applyClass = toggle.dataset.class;
		//if checkbox is checked, add class to target

		toggle.addEventListener('change', (event) => {
			//if checkbox is checked, add class to target
			console.log('test');
			if(event.target.checked) {
				target.classList.add(applyClass);
			} else {
				target.classList.remove(applyClass);
			}
		});
	});

	document.querySelectorAll('.installer-image-generator .image-container').forEach(container => {
		container.addEventListener('click', (event) => {
			//remove active from all other .installer-image-generator .image-container
			document.querySelectorAll('.installer-image-generator .image-container.active').forEach(container => {
				container.classList.remove('active');
			});
			//add active to this one
			event.target.closest('.image-container').classList.add('active');
		});
	});

	document.querySelectorAll('.installer-image-generator .image-container').forEach(container => {
		container.addEventListener('drop', (event) => {
		event.preventDefault();
		if(event.target.classList.contains('draggable')) {
			event.target.classList.remove('dragging');
			const target = container.querySelector('.picture .image .image-holder img');
			const image = event.dataTransfer.files[0];
			target.src = `${URL.createObjectURL(image)}`;
			target.addEventListener('load', (event) => {
					smartcrop.crop(target, { width: 100, height: 100 }).then(function(result) {
					target.parentNode.dataset.zoom = 1;
					addPanning();
				});
			});
			container.classList.remove('dragging');
			container.classList.remove('draggable');
			document.querySelector('.installer-image-generator .edit').classList.add('selected');
			document.querySelector('.installer-image-generator .options').classList.add('visible');
		}
	});
});

document.querySelector('.installer-image-generator #installer-image').addEventListener('change', (event) => {
		var targetContainer = document.querySelector('.installer-image-generator .image-container.active');
		if(!targetContainer) {
			targetContainer = document.querySelector('.installer-image-generator .image-container');
		}
		const target = targetContainer.querySelector('.picture .image .image-holder img');
		const image = document.querySelector('.installer-image-generator #installer-image').files[0];
		if(isImage(document.querySelector('.installer-image-generator #installer-image'), image)) {
			target.src = `${URL.createObjectURL(image)}`;
			target.addEventListener('load', (event) => {
			smartcrop.crop(target, { width: 100, height: 100 }).then(function(result) {
			  	target.parentNode.dataset.zoom = 1;
			  	addPanning();
			});
		});
		}
		targetContainer.classList.remove('dragging');
		targetContainer.classList.remove('draggable');
		document.querySelector('.installer-image-generator .edit').classList.add('selected');
		document.querySelector('.installer-image-generator .options').classList.add('visible');
		
	});

	var font = new FontFaceObserver('Poly Sans');

	font.load().then(function () {
	  document.querySelectorAll('.download').forEach(item => {
			item.classList.add('active');
			item.addEventListener('click', (event) => {
				var name = item.dataset.fileName;
				//get closest .tool, then find .tool .capture
				if(document.querySelector('.image-container.active')) {
						document.querySelector('.image-container.active').classList.remove('active');
				}	
				const tool = event.target.closest('.tool');
				const target = tool.querySelector('.capture');
				capture(target, event.target, name);
			});
		});
	});



});