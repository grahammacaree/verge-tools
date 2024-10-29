// This is where it all goes :)

var throughGate = false;

document.documentElement.classList.remove('no-js');

function switchTool(tool) {
	if(throughGate) {
		document.querySelector('article .release-notes').classList.remove('active');
		document.querySelector('article .tools').classList.remove('hide');
		document.querySelector('main header').classList.remove('hide');
		document.querySelector('.tool.active').classList.remove('active');
		document.querySelector('.tool.'+tool).classList.add('active');
		document.querySelector('.text-container.active').classList.remove('active');
		document.querySelector('.text-container.'+tool).classList.add('active');
		if(document.querySelector('.left-column .active')) {
			document.querySelector('.left-column .active').classList.remove('active');
		}
		document.querySelector('.left-column [data-tool="'+tool+'"]').classList.add('active');
	}
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
	if(throughGate) {
		link.classList.add('downloading');
		convertToImage(id, link, name);
	}
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

function highlightImage(item) {
	item.closest('.tool').querySelectorAll('.selectable.image-selected').forEach(selected => {
		selected.classList.remove('image-selected');
	});
	item.classList.add('image-selected');
	var zoomLevel = item.querySelector('[data-zoom]').dataset.zoom;
	var brightLevel = item.querySelector('[data-brightness]').dataset.brightness;
	var contrastLevel = item.querySelector('[data-contrast]').dataset.contrast;
	if(zoomLevel) {
		const zoomSlider = item.closest('.tool').querySelector('.zoom-slider input');
		zoomSlider.value = 100*(zoomLevel-1);
	}
	if(brightLevel) {
		const brightSlider = item.closest('.tool').querySelector('.brightness-slider input');
		brightSlider.value = brightLevel;
	}
	if(contrastLevel) {
		const contrastSlider = item.closest('.tool').querySelector('.contrast-slider input');
		contrastSlider.value = contrastLevel;
	}
}

function addImage(image, toolType, activeTool, dragging = false, dragItem = false) {
	if(!activeTool.classList.contains('image-mosaic')) {
		var target;
		if(toolType == "svg") {
			target = activeTool.querySelector('.image svg image');
			target.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', `${URL.createObjectURL(image)}`);
			const imageCheck = new Image();
			imageCheck.src = `${URL.createObjectURL(image)}`;
			imageCheck.onload = function() {
				//get aspect ratio
				const aspectRatio = imageCheck.width/imageCheck.height;
				var height = Math.min(500, imageCheck.height);
				var width = Math.min(750, imageCheck.width);
				if(aspectRatio > 1.5) {
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
				target.closest('.image-container').style.setProperty('aspect-ratio', `${aspectRatio}`);
				//find .lockup
				target.closest('.lockup').style.setProperty('aspect-ratio', `${aspectRatio}`);
				delete imageCheck;
			}
		} else {
			target = activeTool.querySelector('.image img');
			if(activeTool.querySelectorAll('.image img').length > 1 && dragging == false) {
				var found = false;
				activeTool.querySelectorAll('.image img').forEach(image => {
					if(!image.classList.contains("loaded") && image.closest('.image-container').checkVisibility() == true && found == false) {
						target = image;
						found = true;
					}
				});
			}
			if(activeTool.querySelectorAll('.image-selected img').length > 0) {
				target = activeTool.querySelector('.image-selected img');
			}
			if(dragging == true) {
				target = dragItem;
			}
			target.src = `${URL.createObjectURL(image)}`;

			if(target.closest('.image-container').classList.contains('selectable')) {
				highlightImage(target.closest('.image-container'));
			}
		}
	}
}

function basicImageLoad(image) {
	const drag = image.closest(".draggable");
	if(drag) {
		drag.classList.remove('draggable');
		drag.classList.remove('dragging');
	}
	if(document.querySelectorAll('.tool.active').length != 1) {
		//console.log('no active tool');
		return;
	}
	const activeTool = document.querySelector('.tool.active');
	activeTool.querySelectorAll('.options').forEach((option) => {
		if(!option.classList.contains('visible')) {
			option.classList.add('visible');
		}
	});
	if(activeTool.querySelectorAll('.image-aspect').length > 0) {
		var aspect = activeTool.querySelector('.image-aspect');
		aspect.style.aspectRatio = `${image.naturalWidth}/${image.naturalHeight}`;
		if(image.naturalWidth > image.naturalHeight) {
			aspect.style.maxWidth = "750px";
		} else {
			aspect.style.maxWidth = "500px";
		}
	}
	image.classList.add('loaded');
}

function addPanning() {
	if(document.querySelectorAll('.tool.active').length != 1) {
		//console.log('no active tool');
		return;
	}
	const activeTool = document.querySelector('.tool.active');
	//get data-tool-name
	var toolType = "image";
	if(activeTool.querySelectorAll('.image svg image').length > 0) {
		toolType = "svg";
	}
	activeTool.querySelectorAll('.pannable').forEach(item => {
		var panning = false;
		//initX and Y
		var initX = 0;
		var initY = 0;
		if(!toolType == "svg") {
			 if(!item.querySelector('img').classList.contains('loaded')) {
			 	return;
			 }
		}
		if(item.dataset.listeners != true) {
			//turn on panning on mousedown
			item.addEventListener('mousedown', (event) => {
				event.preventDefault();
				console.log(item);
				var active = true;
				var selectable = Boolean(item.closest('.selectable'));
				if(selectable) {
					if(!Boolean(item.closest('.image-selected')) && !Boolean(item.closest('.selected'))) {
						active = false;
					}
				}
				if(active) {
					if(parseFloat(item.dataset.zoom) > 1 || item.classList.contains('always-pan')) {
						panning = true;
						initX = event.clientX;
						initY = event.clientY;
					} else {
						const target = event.target;
						const rect = target.getBoundingClientRect();
						const x = event.clientX - rect.left;
	    			const y = event.clientY - rect.top;
						var image = item.querySelector('img');
						var position = image.style.objectPosition.split(' ');
						var xPos, yPos;
						if(position.length > 1) {
							xPos = parseFloat(position[0])/100;
							yPos = parseFloat(position[1])/100;
						} else {
							xPos = 0.5;
							yPos = 0.5;
						}
						if(image.naturalWidth/image.naturalHeight > item.offsetWidth/item.offsetHeight) {
							var width = image.naturalWidth * item.offsetHeight/image.naturalHeight;
							xPos = xPos + (x - item.offsetWidth/2)/width;
							xPos = Math.max(xPos, 0);
							xPos = Math.min(xPos, 1);
						} else {
							var height = image.naturalHeight * item.offsetWidth/image.naturalWidth;
							yPos =(yPos + (y - item.offsetHeight/2)/Height);
							yPos = Math.max(yPos, 0);
							yPos = Math.min(yPos, 1);
						}
						image.style.objectPosition = `${xPos * 100}% ${yPos * 100}%`;
						
					}
				}
			});
			//turn off panning on mouseup
			item.addEventListener('mouseup', (event) => {
				if(panning == true) {
					event.preventDefault();
					panning = false;
					checkImageBounds(item, item.parentNode);
				}
			});
			item.addEventListener('mouseout', (event) => {
				if(panning == true) {
					event.preventDefault();
					panning = false;
					checkImageBounds(item, item.parentNode);
				}
			});
			//pan inside parent element on mousemove
			item.addEventListener('mousemove', (event) => {
				event.preventDefault();
				//console.log('attempting to pan');
				if(panning == true && item.classList.contains('pannable')) {

					if(parseFloat(item.dataset.zoom) > 1 || item.classList.contains('always-pan')) {
						//follow mousemove with transform
						console.log('pan working');
						var transform = item.style.transform;
						translateImage(item, [(event.clientX-initX)/((item.dataset.zoom+1)/2), (event.clientY-initY)/((item.dataset.zoom+1)/2)]);
						//set initX and Y to current mouse position
						initX = event.clientX;
						initY = event.clientY;
					}
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
	const contRect = container.getBoundingClientRect();
	var fix = false;
	var x = 0;
	var y = 0;
	if(rect.top > contRect.top) {
		y = contRect.top - rect.top;
		fix = true;
	}
	if(rect.left > contRect.left) {
		x = contRect.left - rect.left;
		//console.log(rect, contRect);
		fix = true;
	}
	if(rect.right < contRect.right) {
		x = contRect.right - rect.right;
		fix = true;
	}
	if(rect.bottom < contRect.bottom) {
		y = contRect.bottom - rect.bottom;
		fix = true;
	}
	if(fix) {
		translateImage(image, [x, y]);
	}
}

function updateFilters(target) {
	const brightness = target.dataset.brightness;
	const contrast = target.dataset.contrast;
	target.style.setProperty('filter', `brightness(${brightness}%) contrast(${contrast}%)`);
}

window.addEventListener('DOMContentLoaded', (event) => {

	document.querySelectorAll('.image-change').forEach(item => {
		item.addEventListener('change', (event) => {
			if(document.querySelectorAll('.tool.active').length != 1) {
				return;
			}
			const activeTool = document.querySelector('.tool.active');
			var toolType = "image";
			if(activeTool.querySelectorAll('.image svg image').length > 0) {
				toolType = "svg";
			}
			const image = item.files[0];
			if(isImage(item, image)) {
				addImage(image, toolType, activeTool);
			}
		});
	});

	//when paste occurs, check active tool for .image-container. upload image to first .image-container found
	document.addEventListener('paste', (event) => {
		//check which tool is active
		if(document.querySelectorAll('.tool.active').length != 1) {
			return;
		}
		const activeTool = document.querySelector('.tool.active');
		//get data-tool-name
		var toolType = "image";
		if(activeTool.querySelectorAll('.image svg image').length > 0) {
			toolType = "svg";
		}
		const items = (event.clipboardData  || event.originalEvent.clipboardData).items;
		for (index in items) {
			const item = items[index];
			if (item.kind === 'file') {
				const image = item.getAsFile();
				addImage(image, toolType, activeTool);
			}
		}
	});

	document.addEventListener("dragover", function(event) {
  	event.preventDefault();
	});

	document.querySelectorAll('.draggable').forEach(item => {
		item.addEventListener('dragover', (event) => {
			if(item.classList.contains('draggable')) {
				event.target.classList.add('dragging');
			}
		});
		item.addEventListener('dragleave', (event) => {
			if(item.classList.contains('draggable')) {
				event.target.classList.remove('dragging');
			}
		})
		item.addEventListener('drop', (event) => {
			if(item.classList.contains('draggable')) {
				event.preventDefault();
				const activeTool = document.querySelector('.tool.active');
				var toolType = "image";
				if(activeTool.querySelectorAll('.image svg image').length > 0) {
					toolType = "svg";
				}
				const image = event.dataTransfer.files[0];
				addImage(image, toolType, activeTool, true, item.querySelector('img'));
			}
		})
		item.querySelectorAll('img').forEach((image) => {
			image.addEventListener('load', (event) => {
				basicImageLoad(image);
			});
		});
		item.querySelectorAll('svg image').forEach((image) => {
			if(image.classList.contains('load')) {
				image.addEventListener('load', (event) => {
					basicImageLoad(image);
				});
			}
		});
	})

	document.querySelectorAll('.tool .image-container img').forEach((image) => {
		image.addEventListener('load', (event) => {
			image.classList.add('loaded');
		})
	});

	document.querySelectorAll('.pannable img').forEach((image) => {
		image.addEventListener('load', (event) => {
			addPanning();
		})
	});

	document.querySelectorAll('svg.pannable image').forEach((image) => {
		image.addEventListener('load', (event) => {
			addPanning();
		})
	});

	document.querySelectorAll('.zoom-slider').forEach(slider => {
		slider.addEventListener('input', (event) => {
			var target;
			//if [data-adjustment='${slider.dataset.target}'].length > 1, pick the active one
			if(document.querySelectorAll(`[data-adjustment='${slider.dataset.target}']`).length > 1) {
				target = document.querySelector(`.image-container.active [data-adjustment='${slider.dataset.target}']`);
			} else {
				target = document.querySelector(`[data-adjustment='${slider.dataset.target}']`);
			}
			if(slider.closest('.tool').querySelectorAll('.image-selected').length > 0) {
				target = slider.closest('.tool').querySelector(`.image-selected [data-adjustment='${slider.dataset.target}']`);
			}
			if(target) {
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
			}
		});
	});

	document.querySelectorAll('.brightness-slider').forEach(slider => {
		input = slider.querySelector('input');
		input.addEventListener('input', (event) => {
			var target;
			if(document.querySelectorAll(`[data-adjustment='${slider.querySelector('input').dataset.target}']`).length > 1) {
				target = document.querySelector(`.image-container.active [data-adjustment='${slider.querySelector('input').dataset.target}']`);
			} else {
				target = document.querySelector(`[data-adjustment='${slider.dataset.target}']`);
			}

			if(slider.closest('.tool').querySelectorAll('.image-selected').length > 0) {
				target = slider.closest('.tool').querySelector(`.image-selected [data-adjustment='${slider.dataset.target}']`);
			}
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

			if(slider.closest('.tool').querySelectorAll('.image-selected').length > 0) {
				target = slider.closest('.tool').querySelector(`.image-selected [data-adjustment='${slider.dataset.target}']`);
			}
			const contrast = parseInt(event.target.value);
			target.dataset.contrast = contrast;
			updateFilters(target);
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

	document.querySelectorAll('.tool-selector li').forEach(button => {
		button.addEventListener('click', (event) => {
			switchTool(button.dataset.tool);
		});
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
				if(toggle.querySelectorAll(".inner").length > 0) {
					group.querySelectorAll(".toggle .inner.selected").forEach(selected => {
						selected.classList.remove('selected');
					});
					//add selected to this one
					toggle.querySelector('.inner').classList.add('selected');
				} else {
					group.querySelectorAll(".toggle.selected").forEach(selected => {
						selected.classList.remove('selected');
					});
					//add selected to this one
					toggle.classList.add('selected');
				}
			});
		});
	});

	document.querySelectorAll('.check-toggle').forEach(toggle => {
		const target = document.querySelector(`.${toggle.dataset.target}`);
		var applyClass = toggle.dataset.class;
		//if checkbox is checked, add class to target
		toggle.addEventListener('change', (event) => {
			//if checkbox is checked, add class to target
			if(event.target.checked) {
				target.classList.add(applyClass);
			} else {
				target.classList.remove(applyClass);
			}
		});
	});

	document.querySelectorAll('.tool:not(.image-mosaic) .selectable').forEach(item => {
		item.addEventListener('click', (event) => {
			highlightImage(item);
		})
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
				tool.querySelectorAll('.capture .image-selected').forEach((selected) => {
					selected.classList.remove('image-selected');
				});
				const target = tool.querySelector('.capture');
				capture(target, event.target, name);
			});
		});
	});

	function stringToHash(string) {
    return string.split('').reduce((hash, char) => {
        return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
    }, 0);
	}

	document.querySelector('#password-button').addEventListener('click', (event) => {
		const input = document.querySelector('#password-input');
		if(stringToHash(input.value+"grahamwashere") == -1047751711) {
			removeGate('verge');

		}
		if(stringToHash(input.value+"grahamwashere") == -26573789574) {
			removeGate('polygon');
		}
	})

	document.querySelector('#password-input').addEventListener('keyup', (event) => {
		const input = document.querySelector('#password-input');
		if(stringToHash(input.value+"grahamwashere") == -1047751711 && event.keyCode == 13) {
			removeGate('verge');
		}
		if(stringToHash(input.value+"grahamwashere") == -26573789574 && event.keyCode == 13) {
			removeGate('polygon');
		}
	})

	if (localStorage.getItem("vergetools") === "-1047751711") {
		removeGate('verge');
	}
	if (localStorage.getItem("vergetools") === "-26573789574") {
		removeGate('polygon');
	}


	function removeGate(brand) {
		throughGate = true;
		document.querySelector('.gate').classList.remove('active');
		var root = document.querySelector(':root');
		console.log(brand);
		if(brand == "verge") {
			localStorage.setItem("vergetools", -1047751711);
			root.style.setProperty('--brand-color', '#6600FF');
			root.style.setProperty('--hed-font', 'Poly Sans,Helvetica,Arial,sans-serif');
			root.style.setProperty('--text-font', 'FK Roman Standard,Georgia,serif');
			root.style.setProperty('--spec-font', 'Poly Sans Mono, Courier New, Courier, monospace');
		}
		if(brand == "polygon") {
			localStorage.setItem("vergetools", -26573789574);	
			root.style.setProperty('--brand-color', '#E90C59');
			root.style.setProperty('--hed-font', 'Montserrat, sans-serif');

			root.style.setProperty('--spec-font', 'IBM Plex Sans, sans-serif');
			root.style.setProperty('--text-font', 'Georgia,serif');
			console.log(root.style);
		}
		document.querySelector('.flex-container').classList.add(brand);
	}

	document.querySelector(".gate .close").addEventListener('click', function() {
		const gate = document.querySelector('.gate');
		gate.classList.remove('verge');
		gate.classList.remove('polygon');
		gate.classList.add('brand');
	});

	document.querySelectorAll(".gate .brand-item").forEach((button) => {
		button.addEventListener('click', function(e) {
			var gate = document.querySelector('.gate');
			gate.classList.remove('brand');
			if(button.classList.contains('verge-brand')) {
				gate.classList.add('verge');
				
			}
			if(button.classList.contains('polygon-brand')) {
				gate.classList.add('polygon');
			}
			gate.querySelector('input').focus();
		});
	})

	document.querySelector('.left-column .inner .switch').addEventListener('click', function() {
		const container = document.querySelector('.flex-container');
		const gate = document.querySelector('.gate');
		gate.querySelector('input').value = '';
		gate.classList.remove('verge');
		gate.classList.remove('polygon');
		gate.classList.add('brand');
		gate.classList.add('active');
		container.classList.remove('verge');		
		container.classList.remove('polygon');		
	});

	document.querySelector('.left-column .rn').addEventListener('click', function() {
		const notes = document.querySelector('article .release-notes');
		notes.classList.add('active');
		const header = document.querySelector('main header');
		header.classList.add('hide');
		const tools = document.querySelector('article .tools');
		tools.classList.add('hide');
		document.querySelectorAll('.left-column .tool-selector .active').forEach(item => {
			item.classList.remove('active');
		})
	})

});