// This is where it all goes :)

var imageArray = [1];
var mosaicResizing = false;
var layoutLocked = false;



function imageSelector() {
	document.querySelectorAll('.image-mosaic .upload-image').forEach(item => {
		item.addEventListener('click', (event) => {
			const stepHolder = item.closest('.step-holder');
			//if item is selectable
			if(item.classList.contains('selectable')) {
				//remove selected from all other .upload-image
				stepHolder.querySelectorAll('.upload-image').forEach(item => {
					item.classList.remove('selected');
				});
				//add selected to item
				item.classList.add('selected');
				//find .button.splitter.horizontal
				const horizontal = stepHolder.querySelector('.button.splitter[data-type="horizontal"]');
				if(item.offsetWidth > 75) {
					horizontal.classList.remove('faded');
				}
				const vertical = stepHolder.querySelector('.button.splitter[data-type="vertical"]');
				if(item.offsetHeight > 75) {
					vertical.classList.remove('faded');
				}
				//if item parentnode is .split-wrapper 
				if(item.parentNode.classList.contains('split-wrapper')) {
					//remove faded from button.merge
					stepHolder.querySelector('.button.merge').classList.remove('faded');
					
				}
				selectImage(item);
			}
		});
	});
}

function lockLayout() {
	layoutLocked = true;
		//find all upload images and add class draggable
	document.querySelectorAll('.image-mosaic .upload-image').forEach(item => {
		item.classList.add('draggable');
	});
	//delete all resize nodes
	document.querySelectorAll('.image-mosaic .resize').forEach(item => {
		item.parentNode.removeChild(item);
	}); 

	const step = "step-2";
	const stepHolder = document.querySelector('.image-mosaic .step-holder');
		//remove all other step-selected classes
	for(i=1; i<=6; i++) {
		stepHolder.classList.remove(`step-${i}-selected`);
	}
	stepHolder.querySelectorAll('.step-selector').forEach(selector => {
		selector.classList.remove('selected');
	});
	stepHolder.querySelector(`.step-selector[data-step="${step}"]`).classList.add('selected');
	//add step-selected class to stepHolder
	stepHolder.classList.add(step+'-selected');
	//reset download button if it has class 'downloaded
	stepHolder.querySelectorAll('.download').forEach(item => {
		item.classList.remove('downloaded');
		item.innerHTML= "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
		item.removeAttribute('href');
		item.removeAttribute('download');
	});
	document.querySelector('.image-mosaic .step-selector[data-step="step-2"]').classList.add('active');
	document.querySelector('.image-mosaic .step-selector[data-step="step-3"]').classList.add('active');
	//remove all highlight
	document.querySelectorAll('.image-mosaic .split-wrapper').forEach(item => {
		item.classList.remove('highlight');
	});
	document.querySelectorAll('.image-mosaic .draggable').forEach(item => {
		//when user starts dragging add class dragging
		item.addEventListener('dragstart', (event) => {
			item.classList.add('dragging');
		});
		//when user stops dragging remove class dragging
		item.addEventListener('dragend', (event) => {
			item.classList.remove('dragging');
		});
		//when file is dragged and file is image, upload to item.dataset.target
		item.addEventListener('drop', (event) => {
			event.preventDefault();
			const image = event.dataTransfer.files[0];
	
				const target = document.querySelector('#'+item.dataset.target);
				target.addEventListener('load', (event) => {

					target.parentNode.classList.add('uploaded');
					target.parentNode.dataset.zoom = 1;
					updateImages(item.parentNode);
					target.parentNode.classList.add('pannable');
					addPanning();
					//remove scale transform from target.parentNode
					target.parentNode.style.setProperty('transform', '');
					target.style.setProperty('transform', '');
				});
				target.src = `${URL.createObjectURL(image)}`;
				

			//remove classes dragging and draggable
			item.classList.remove('dragging');
			item.classList.remove('draggable');
			const stepHolder = item.closest('.step-holder');
			const uploadImages = stepHolder.querySelectorAll('.upload-image');
			if(uploadImages.length == stepHolder.querySelectorAll('.inner-container.uploaded').length) {
				//add class 'active' to .step-selector[data-step="step-3"]
				stepHolder.querySelector('.step-selector[data-step="step-3"]').classList.add('selected');
				for(i=1; i<=6; i++) {
					stepHolder.classList.remove(`step-${i}-selected`);
				}

				stepHolder.querySelectorAll('.step-selector').forEach(selector => {
					selector.classList.remove('selected');
				});
				//add step-selected class to stepHolder
				stepHolder.classList.add('step-3-selected');
			}
		});
	});
}

function updatePositioning() {
	const gap = document.querySelector('.image-mosaic .gap-slider').value/10;
	const padding = document.querySelector('.image-mosaic .padding-slider').value/10;
	document.querySelectorAll('.image-mosaic .image-container .element').forEach(item => {

		const container = item.parentNode;
		var siblings = container.querySelectorAll(':scope > .element');
		item.style.setProperty('top', '');
		item.style.setProperty('bottom', '');
		item.style.setProperty('left', '');
		item.style.setProperty('right', '');
		if(siblings.length > 1) {
			var resizeDirection = container.classList.contains('horizontal') ? "horizontal" : "vertical";
			if(resizeDirection == "horizontal") {
				if(item == siblings[0]) {
					item.style.inset = `0 calc(100% - ${(container.dataset.x)*100}% + ${gap}rem) 0 0`;
				} else {
					item.style.inset = `0 0 0 calc(100% - ${(1-container.dataset.x)*100}% + ${gap}rem)`;
				}
			} else {
				if(item == siblings[0]) {
					item.style.inset = `0 0 calc(100% - ${(container.dataset.y)*100}% + ${gap}rem) 0`;
				} else {
					item.style.inset = `calc(100% - ${(1-container.dataset.y)*100}% + ${gap}rem) 0 0 0`;
				}
			}
		}
		//if item parent is .image-container
		if(item.parentNode.classList.contains('image-container')) {
			//set padding
			item.style.setProperty('inset', `${padding}rem`);
		}

		var min = Math.min(item.offsetWidth, item.offsetHeight)/2;
		if(item.classList.contains('top-left')) {
			item.style.setProperty(`border-top-left-radius`, `${min}px`);
		} else {
			item.style.setProperty(`border-top-left-radius`, `0px`);
		}
		if(item.classList.contains('top-right')) {
			item.style.setProperty(`border-top-right-radius`, `${min}px`);
		} else {
			item.style.setProperty(`border-top-right-radius`, `0px`);
		}
		if(item.classList.contains('bottom-left')) {
			item.style.setProperty(`border-bottom-left-radius`, `${min}px`);
		} else {
			item.style.setProperty(`border-bottom-left-radius`, `0px`);
		}
		if(item.classList.contains('bottom-right')) {
			item.style.setProperty(`border-bottom-right-radius`, `${min}px`);
		} else {
			item.style.setProperty(`border-bottom-right-radius`, `0px`);
		}
		if(item.classList.contains('selectable')) {
			item.addEventListener('click', (event) => {
				const stepHolder = item.closest('.step-holder');
				selectImage(item);
			});
		}
		
		updateImages(document.querySelector('.image-mosaic'));
	});
	

}

function createTemplate(container, form) {
	//clone container's immediate children

	const template = container.cloneNode(true);
	
	const templateHolder = document.querySelector('.image-mosaic .template-holder');
	//append template to templateHolder
	templateHolder.innerHTML = "";
	templateHolder.appendChild(template);
	templateHolder.querySelectorAll('img').forEach(item => {
		item.src = "/images/placeholder.png";
	});
	templateHolder.querySelector('.background-container').parentNode.removeChild(templateHolder.querySelector('.background-container'));
	//remove all selected, pannable and draggable classnames
	templateHolder.querySelectorAll('.selected').forEach(item => {
		item.classList.remove('selected');
	});
	templateHolder.querySelectorAll('.pannable').forEach(item => {
		item.classList.remove('pannable');
	});
	templateHolder.querySelectorAll('.highlight').forEach(item => {
		item.classList.remove('highlight');
	});
	templateHolder.querySelectorAll('.draggable').forEach(item => {
		item.classList.remove('draggable');
	});
	//remove all inline transforms
	templateHolder.querySelectorAll('*').forEach(item => {
		item.style.setProperty('transform', '');
	});
	//remove all resize elements
	templateHolder.querySelectorAll('.resize').forEach(item => {
		item.parentNode.removeChild(item);
	});
	//set all data-zooms to 1
	templateHolder.querySelectorAll('.inner-container').forEach(item => {
		item.dataset.zoom = 1;
	});

	//convert html of template holder to string and encode
	const templateString = encodeURIComponent(templateHolder.innerHTML);
	//encode templateString to make shorter
	const encodedTemplate = btoa(templateString);
	//set form code input to encodedTemplate
	form.querySelector('#string').value = encodedTemplate;
}

function decodeTemplate(string, container) {
	//take encoded string and rebuild html
	const decodedTemplate = atob(string);
	//decode html
	const decodedHTML = decodeURIComponent(decodedTemplate);
	//create html element
	const template = document.createElement('div');
	template.innerHTML = decodedHTML;
	//append template to container
	container.innerHTML = "";
	container.appendChild(template);
	//find image-container class and remove id
	container.querySelector('.image-container').removeAttribute('id');
	//remove image-container class, add template-display class
	container.querySelector('.image-container').classList.add('template-display');
	container.querySelector('.template-display').classList.remove('image-container');
}

function loadTemplate(template, target) {
	var html = "<div class='background-container'></div>";
	if(template.querySelector('.template-display').classList.contains('cutout')) {
		target.classList.add('cutout');
	} else {
		target.classList.remove('cutout');
	}
	//get all first children
	//console.log(template);
	template.querySelectorAll('.template-display > .element').forEach(item => {
		console.log(item);
		html += item.outerHTML;
	});
	target.innerHTML = html;
	imageSelector();
	lockLayout();
}

function selectImage(item) {
	const stepHolder = item.closest('.step-holder');
	if(item.classList.contains('selectable')) {
		//remove selected from all other .upload-image
		stepHolder.querySelectorAll('.upload-image').forEach(item => {
			item.classList.remove('selected');
		});
		item.classList.add('selected');
		//set zoom slider value to inner-container.dataset.zoom
		const zoomSlider = stepHolder.querySelector('.zoom-slider');
		zoomSlider.value = (item.querySelector('.inner-container').dataset.zoom - 1) * 100;
		if(layoutLocked == false) {
			//find .button.splitter.horizontal
			const horizontal = stepHolder.querySelector('.button.splitter[data-type="horizontal"]');
			if(item.offsetWidth > 75) {
				horizontal.classList.remove('faded');
			} else {
				horizontal.classList.add('faded');
			}
			const vertical = stepHolder.querySelector('.button.splitter[data-type="vertical"]');
			if(item.offsetHeight > 75) {
				vertical.classList.remove('faded');
			} else {
				vertical.classList.add('faded');
			}

			//get all corner buttons and remove faded
			stepHolder.querySelectorAll('.button.corners').forEach(corner => {
				corner.classList.remove('faded');
				//check if item has corner classes
				if(corner.classList.contains('top-left')) {
					if(item.classList.contains('top-left')) {
						corner.classList.add('active');
					} else {
						corner.classList.remove('active');
					}
				}
				if(corner.classList.contains('top-right')) {
					if(item.classList.contains('top-right')) {
						corner.classList.add('active');
					} else {
						corner.classList.remove('active');
					}
				}
				if(corner.classList.contains('bottom-left')) {
					if(item.classList.contains('bottom-left')) {
						corner.classList.add('active');
					} else {
						corner.classList.remove('active');
					}
				}
				if(corner.classList.contains('bottom-right')) {
					if(item.classList.contains('bottom-right')) {
						corner.classList.add('active');
					} else {
						corner.classList.remove('active');
					}
				}
			});
			//if item parentnode is .split-wrapper 
			if(item.parentNode.classList.contains('split-wrapper')) {
				//remove faded from button.merge
				stepHolder.querySelector('.button.merge').classList.remove('faded');
				//add highlight class to item.parentNode
				stepHolder.querySelectorAll('.split-wrapper').forEach(item => {
					item.classList.remove('highlight');
				});
				item.parentNode.classList.add('highlight');

				//delete all resize elements
				stepHolder.querySelectorAll('.resize').forEach(item => {
					item.parentNode.removeChild(item);
				});
				//create resize element
				createResize(item);
				//traverse through dom until parent is .image-mosaic
				var parent = item.parentNode;
				while(parent != document.querySelector('.image-mosaic .image-container')) {
					item = parent;
					parent = item.parentNode;
					if(item.parentNode.classList.contains('split-wrapper')) {
						createResize(item);
					}
				}
			} else {
				stepHolder.querySelector('.button.merge').classList.add('faded');
				//remove highlight class from all .split-wrapper
				stepHolder.querySelectorAll('.split-wrapper').forEach(item => {
					item.classList.remove('highlight');
				});
			}
		}
	}
}

function createResize(item) {
	const resize = document.createElement('div');
	resize.classList.add('resize');
	//add input to resize
	const input = document.createElement('input');
	input.type = "text";
	input.value = "50";
	resize.appendChild(input);

	//add resize to item parent
	item.parentNode.appendChild(resize);
	//if item parent has dataset x, set resize resize.style.left = `calc(${dataset.x*100}%)`
	if(item.parentNode.dataset.x) {
		resize.style.left = `calc(${item.parentNode.dataset.x*100}%)`;
		input.value = Math.round(item.parentNode.dataset.x*100);
	}
	//if item parent has dataset y, set resize resize.style.top = `calc(${dataset.y*100}%)`
	if(item.parentNode.dataset.y) {
		resize.style.top = `calc(${item.parentNode.dataset.y*100}%)`;
		input.value = Math.round(item.parentNode.dataset.y*100);
	}

	//resize eventlisteners
	resize.addEventListener('mousedown', (event) => {
		//if event.target is not input
		if(event.target.tagName != "INPUT") {
			mosaicResizing = true;
		} else {
			mosaicResizing = false;
		}
	});
	resize.addEventListener('mouseup', (event) => {
		mosaicResizing = false;
	});

	resize.addEventListener('mouseout', (event) => {
		mosaicResizing = false;
	});
	resize.addEventListener('mousemove', (event) => {
		var resizeTarget = resize.parentNode;
		var resizeDirection;
		if(mosaicResizing) {
			//if resizeTarget has horizontal class, resize horizontally
			if(resizeTarget.classList.contains('horizontal')) {
				resizeDirection = "horizontal";
				var xPosition = (event.clientX - resizeTarget.getBoundingClientRect().left)/resizeTarget.offsetWidth;
				resizeTarget.dataset.x = xPosition;
				resize.querySelector('input').value = Math.round(xPosition*100);
				//move resize element
				resize.style.left = `calc(${xPosition*100}%)`;
			} else {
				resizeDirection = "vertical";
				var yPosition = (event.clientY - resizeTarget.getBoundingClientRect().top)/resizeTarget.offsetHeight;
				resizeTarget.dataset.y = yPosition;
				resize.querySelector('input').value = Math.round(yPosition*100);
				resize.style.top = `calc(${yPosition*100}%)`;
			}
			updatePositioning();
			updateImages(document.querySelector('.image-mosaic'));
		}
	});
	resize.querySelector('input').addEventListener('change', (event) => {
		var resizeTarget = resize.parentNode;
		var resizeDirection;
		if(resizeTarget.classList.contains('horizontal')) {
			resizeDirection = "horizontal";
			var xPosition = event.target.value/100;
			resizeTarget.dataset.x = xPosition;
			resize.style.left = `calc(${xPosition*100}%)`;
		} else {
			resizeDirection = "vertical";
			var yPosition = event.target.value/100;
			resizeTarget.dataset.y = yPosition;
			resize.style.top = `calc(${yPosition*100}%)`;
		}
		updatePositioning();
		updateImages(document.querySelector('.image-mosaic'));
	});
}

function updateImages(container) {
	container.querySelectorAll('.inner-container.uploaded').forEach(item => {
		//get aspect ratio of item
		const itemAspectRatio = item.offsetWidth/item.offsetHeight;
		const image = item.querySelector('img');
		//get aspect ratio of image

		const imageAspectRatio = image.naturalWidth/image.naturalHeight;
		if(imageAspectRatio <= itemAspectRatio) {
			item.classList.remove('horizontal');
			item.classList.add('vertical');
		} else {
			item.classList.remove('vertical');
			item.classList.add('horizontal');
		}
		checkImageBounds(image, item);
	});
}


window.addEventListener('DOMContentLoaded', (event) => {

	const form = document.querySelector('.image-mosaic form');

	//add click event listener for .tool-select, take from data-tool and run selectTool

	document.querySelectorAll('.image-mosaic .padding-slider').forEach(item => {
		item.addEventListener('change', (event) => {
			updatePositioning();
		});
	});

	document.querySelectorAll('.image-mosaic .gap-slider').forEach(item => {
		item.addEventListener('change', (event) => {
			updatePositioning();
			if(item.value == 0) {
				item.closest('.step-holder').querySelector('.image-container').classList.add('borders');
			} else {
				item.closest('.step-holder').querySelector('.image-container').classList.remove('borders');
			}
		});
	});

	document.querySelectorAll('.image-mosaic .templates .template').forEach(item => {
		decodeTemplate(item.dataset.template, item);
	});

	//add click event listener for .step-select, take form data-step and add step-#-selected to closest .step-holder
	document.querySelectorAll('.image-mosaic .step-selector').forEach(item => {
		item.addEventListener('click', (event) => {
			const step = item.dataset.step;
			const stepHolder = item.closest('.step-holder');
			//remove all other step-selected classes
			for(i=1; i<=6; i++) {
				stepHolder.classList.remove(`step-${i}-selected`);
			}
			stepHolder.querySelectorAll('.step-selector').forEach(selector => {
				selector.classList.remove('selected');
			});
			stepHolder.querySelector(`.step-selector[data-step="${item.dataset.step}"]`).classList.add('selected');
			//add step-selected class to stepHolder
			stepHolder.classList.add(step+'-selected');
			//reset download button if it has class 'downloaded
			stepHolder.querySelectorAll('.download').forEach(item => {
				item.classList.remove('downloaded');
				item.innerHTML= "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
				item.removeAttribute('href');
				item.removeAttribute('download');
			});
			if(step !="step-1") {
				//remove all highlight
				layoutLocked = true;
				document.querySelectorAll('.image-mosaic .split-wrapper').forEach(item => {
					item.classList.remove('highlight');
				});
				//delete all querySelector resize
				document.querySelectorAll('.resize').forEach(item => {
					item.parentNode.removeChild(item);
				});
			} else {
				layoutLocked = false;
			}
			if(step =="step-2") {
				document.querySelectorAll('.image-mosaic .upload-image').forEach(item => {
					//if img doesn't have source, add draggable to item
					if(!item.querySelector('.inner-container').classList.contains('uploaded')) {
						item.classList.add('draggable');
					}
				});
				document.querySelectorAll('.image-mosaic .draggable').forEach(item => {
					//when user starts dragging add class dragging
					item.addEventListener('dragstart', (event) => {
						item.classList.add('dragging');
					});
					//when user stops dragging remove class dragging
					item.addEventListener('dragend', (event) => {
						item.classList.remove('dragging');
					});
					//when file is dragged and file is image, upload to item.dataset.target
					item.addEventListener('drop', (event) => {
						event.preventDefault();
						const image = event.dataTransfer.files[0];

							const target = document.querySelector('#'+item.dataset.target);
							target.addEventListener('load', (event) => {
								target.parentNode.classList.add('uploaded');
								updateImages(item.parentNode);
								target.parentNode.dataset.zoom = 1;
								target.parentNode.classList.add('pannable');
								addPanning();
								//remove scale transform from target.parentNode
								target.parentNode.style.setProperty('transform', '');
								target.style.setProperty('transform', '');
							});
							target.src = `${URL.createObjectURL(image)}`;
							

						//remove classes dragging and draggable
						item.classList.remove('dragging');
						item.classList.remove('draggable');
						//get number of .upload-image in stepholder
						const stepHolder = item.closest('.step-holder');
						const uploadImages = stepHolder.querySelectorAll('.upload-image');
						//if all uploadImages have class uploaded
						if(uploadImages.length == stepHolder.querySelectorAll('.upload-image.uploaded').length) {
							//add class 'active' to .step-selector[data-step="step-3"]
							stepHolder.querySelector('.step-selector[data-step="step-3"]').classList.add('selected');
							for(i=1; i<=6; i++) {
								stepHolder.classList.remove(`step-${i}-selected`);
							}

							stepHolder.querySelectorAll('.step-selector').forEach(selector => {
								selector.classList.remove('selected');
							});
							//add step-selected class to stepHolder
							stepHolder.classList.add('step-3-selected');
						}
					});
				});
			} else {
			    //remove all draggable
				document.querySelectorAll('.image-mosaic .upload-image').forEach(item => {
					item.classList.remove('draggable');
				});
			}
		});
	});

	document.querySelector('.image-mosaic .lock').addEventListener('click', (event) => {
		//set layoutlocked to true
		lockLayout();
	});


	document.querySelectorAll('.image-mosaic .image-change').forEach(item => {
		const stepHolder = item.closest('.step-holder');
		item.addEventListener('change', (event) => {
			var target = stepHolder.querySelector('.upload-image.selected img');
			if(!target && stepHolder.querySelectorAll('.upload-image').length == 1) {
				target = stepHolder.querySelector('.upload-image img');
			}
			if(target) {
				const image = item.files[0];
				
					
					//if 'draggable' in target parent tree, remove it
					if(target.closest('.draggable')) {
						target.closest('.draggable').classList.remove('draggable');
					}							
					target.addEventListener('load', (event) => {
						
						target.parentNode.classList.add('uploaded');
						target.parentNode.dataset.zoom = 1;
						updateImages(item.parentNode);

						
						//remove scale transform from target.parentNode
						target.parentNode.style.setProperty('transform', '');
						target.parentNode.classList.add('pannable');
						addPanning();
						target.style.setProperty('transform', '');
					});
					target.src = `${URL.createObjectURL(image)}`;

				//if item has a data-step attached, switch .step-holder class to appropriate step
				if(item.dataset.step) {
					
					//remove all other step-selected classes
					
					//add .active to .step-selector with data-step matching item.dataset.step
					stepHolder.querySelectorAll('.step-selector').forEach(selector => {
						if(selector.dataset.step == item.dataset.step) {
							if(!selector.classList.contains('active')) {
								selector.classList.add('active');
								for(i=1; i<=6; i++) {
									stepHolder.classList.remove(`step-${i}-selected`);
								}
								stepHolder.querySelectorAll('.step-selector').forEach(selector => {
									selector.classList.remove('selected');
								});
								console.log(selector.dataset.step);
								stepHolder.querySelector(`.step-selector[data-step="${selector.dataset.step}"]`).classList.add('selected');
								//add step-selected class to stepHolder
								stepHolder.classList.add(item.dataset.step+'-selected');
							}
						}
					});
				}
			}
			
		});
		updateImages(document.querySelector('.image-mosaic'));
	});

	imageSelector();

	document.querySelectorAll('.image-mosaic .button.merge').forEach(item => {
		item.addEventListener('click', (event) => {
			const stepHolder = item.closest('.step-holder');
			var image = stepHolder.querySelector('.upload-image.selected');
			var target;
			if(image) {
				target = image.parentNode;
			}
			if(!image && stepHolder.querySelectorAll('.split-wrapper').length == 1) {
				target = stepHolder.querySelector('.split-wrapper');
			}
			if(target) {
				if(target.classList.contains("split-wrapper")) {
					var top, bottom, left, right;
					//get target top, bottom, left, right relative to parent
					top = target.offsetTop;
					bottom = target.parentNode.offsetHeight - target.offsetHeight - top;
					left = target.offsetLeft;
					right = target.parentNode.offsetWidth - target.offsetWidth - left;
					var baseImage;
					baseImage = stepHolder.querySelector('.upload-image.selected');
	
					if(!baseImage) {
						baseImage = target.querySelectorAll('.upload-image')[0];
					}

					const clone = baseImage.cloneNode(true);
					//console.log(clone);
					//delete item and add a clone of baseImage in its place
					//get position of target among siblings
					const siblings = target.parentNode.querySelectorAll('.element');
					var position;
					for(i=0; i<siblings.length; i++) {
						if(siblings[i] == target) {
							position = i;
						}
					}
					//append clone at target's position
					target.parentNode.insertBefore(clone, target.parentNode.childNodes[position]);
					target.parentNode.removeChild(target);
					if(clone.parentNode.classList.contains('split-wrapper')) {
						clone.style.top = top+"px";
						clone.style.bottom = bottom+"px";
						clone.style.left = left+"px";
						clone.style.right = right+"px";
					} else {
						//remove inline inset from clone
						clone.style.setProperty('top', '');
						clone.style.setProperty('bottom', '');
						clone.style.setProperty('left', '');
						clone.style.setProperty('right', '');
					}
					var img = target.querySelector('img');
					//get aspect ratio of image
					const imageAspectRatio = img.naturalWidth/img.naturalHeight;
					clone.dataset.listeners = false;
					clone.addEventListener('click', (event) => {
						stepHolder.querySelectorAll('.upload-image').forEach(item => {
							item.classList.remove('selected');

						});
						clone.classList.add('selected');
						//find .button.splitter.horizontal
						const horizontal = stepHolder.querySelector('.button.splitter[data-type="horizontal"]');
						if(clone.offsetWidth > 75) {
							horizontal.classList.remove('faded');
						}
						const vertical = stepHolder.querySelector('.button.splitter[data-type="vertical"]');
						if(clone.offsetHeight > 75) {
							vertical.classList.remove('faded');
						}
						//if item parentnode is .split-wrapper 
						if(clone.parentNode.classList.contains('split-wrapper')) {
							//remove faded from button.merge
							stepHolder.querySelector('.button.merge').classList.remove('faded');
							stepHolder.querySelectorAll('.split-wrapper').forEach(item => {
								item.classList.remove('highlight');
							});
							item.parentNode.classList.add('highlight');

						}
						selectImage(clone);					
					});
					if(stepHolder.querySelectorAll(".split-wrapper").length == 0) {
						item.classList.add('faded');
					}
					//remove transform from clone image
					console.log(clone.querySelector('img'));
					
					updatePositioning();
					addPanning();
					const cloneAspectRatio = clone.offsetWidth/clone.offsetHeight;
					//if cloneAspectRatio > imageAspectRatio
					if(imageAspectRatio <= cloneAspectRatio) {
						clone.querySelector('.inner-container').classList.remove('horizontal');
						clone.querySelector('.inner-container').classList.add('vertical');
					} else {
						clone.querySelector('.inner-container').classList.remove('vertical');
						clone.querySelector('.inner-container').classList.add('horizontal');
					}
					//remove transform from clone img
					clone.querySelector('img').style.setProperty('transform', '');
					

				} else {
					//add faded to button merge
					item.classList.add('faded');
				}
			} else {
				item.classList.add('faded');
			}
		});
	});

	document.querySelectorAll('.image-mosaic .button.splitter').forEach(item => {
		item.addEventListener('click', (event) => {
			//get type of split from dataset.type

			const type = item.dataset.type;
			var length;

			const stepHolder = item.closest('.step-holder');
			var target = stepHolder.querySelector('.upload-image.selected');
			if(!target && stepHolder.querySelectorAll('.upload-image').length == 1) {
				target = stepHolder.querySelector('.upload-image');
			}
			if(target) {
				
				var top, bottom, left, right;
				//get target top, bottom, left, right relative to parent
				top = target.offsetTop;
				bottom = target.parentNode.offsetHeight - target.offsetHeight - top;
				left = target.offsetLeft;
				right = target.parentNode.offsetWidth - target.offsetWidth - left;
				//create wrapper around target
				const wrapper = document.createElement('div');
				wrapper.classList.add('split-wrapper');

				wrapper.classList.add('element');
				//apply top, bottom, left, right to wrapper
				//get number of siblings
				const siblings = target.parentNode.querySelectorAll('.element');


				//clone target
				const clone = target.cloneNode(true);
				clone.dataset.listeners = false;
				//add clone to wrapper
				wrapper.appendChild(clone);
				//add wrapper to target parent
				//if first sibling, put wrapper first, else put it last
				if(siblings[0] == target) {
					target.parentNode.insertBefore(wrapper, target.parentNode.childNodes[0]);
					
				} else {
					target.parentNode.appendChild(wrapper);
				}
				var img = target.querySelector('img');
				//get aspect ratio of image
				const imageAspectRatio = img.naturalWidth/img.naturalHeight;

				if(wrapper.parentNode.classList.contains('split-wrapper')) {
					wrapper.style.top = top+"px";
					wrapper.style.bottom = bottom+"px";
					wrapper.style.left = left+"px";
					wrapper.style.right = right+"px";
				}
				//delete target
				target.parentNode.removeChild(target);
				wrapper.classList.add(type);
				//if type is horizontal
				if(type == "horizontal") {
					//wrapper.dataset.x = 50
					wrapper.dataset.x = 0.5;
				} else {
					wrapper.dataset.y = 0.5;
				}
				//create image
				const image = document.createElement('img');
				//set data-zoom to 1
				
				image.src = "/images/placeholder.png";
				//set x to last value of imageArray and add 1
				var x = imageArray[imageArray.length-1]+1;
				imageArray.push(x);
				image.id = `image-mosaic-field-${x}`;
				//add upload-image div to wrapper
				const imageContainer = document.createElement('div');
				imageContainer.classList.add('inner-container');
				imageContainer.dataset.zoom = 1;
				imageContainer.dataset.target = image.id;
				const uploadImage = document.createElement('div');
				uploadImage.classList.add('upload-image');
				uploadImage.classList.add('selectable');
				uploadImage.classList.add('element');
				uploadImage.dataset.target = image.id;
				//add image to upload-image
				imageContainer.appendChild(image);
				uploadImage.appendChild(imageContainer);

				//add uploadImage to wrapper
				wrapper.appendChild(uploadImage);
				target = wrapper.querySelector('.upload-image.selected');
				if(!target) {
					target = wrapper.querySelectorAll('.upload-image')[0];
				}
				if(target.offsetWidth > 75) {
					stepHolder.querySelector('.button.splitter[data-type="horizontal"]').classList.remove("faded");
				} else {
					stepHolder.querySelector('.button.splitter[data-type="horizontal"]').classList.add("faded");
				}
				if(target.offsetHeight > 75) {
					stepHolder.querySelector('.button.splitter[data-type="vertical"]').classList.remove("faded");
				} else {
					stepHolder.querySelector('.button.splitter[data-type="vertical"]').classList.add("faded");
				}
				//if item parentnode is .split-wrapper 
				if(target.parentNode.classList.contains('split-wrapper')) {
					//remove faded from button.merge
					stepHolder.querySelector('.button.merge').classList.remove('faded');
				} else {
					stepHolder.querySelector('.button.merge').classList.add('faded');
				}
				//get aspect ratio of clone
				
				updatePositioning();
				addPanning();
				const cloneAspectRatio = clone.offsetWidth/clone.offsetHeight;
				//if cloneAspectRatio > imageAspectRatio
				if(imageAspectRatio <= cloneAspectRatio) {

					clone.querySelector('.inner-container').classList.remove('horizontal');
					clone.querySelector('.inner-container').classList.add('vertical');
				} else {
					clone.querySelector('.inner-container').classList.remove('vertical');
					clone.querySelector('.inner-container').classList.add('horizontal');
				}
			}

		});

	});

	document.querySelectorAll('.image-mosaic .tabs .select .button').forEach(item => {
		item.addEventListener('click', (event) => {
			const tabs = item.closest('.tabs');
			const select = tabs.querySelector('.select');
			//get target from matching data-hook
			const target = document.querySelector('.image-mosaic [data-hook="'+select.dataset.target+'"]');
			const targetTab = target.querySelector('[data-hook="'+item.dataset.target+'"]');
			//remove active from all other .button
			select.querySelectorAll('.button').forEach(button => {
				button.classList.remove('active');
			});
			//add active to item
			item.classList.add('active');
			//remove active from all other .tab
			target.querySelectorAll('.tab').forEach(tab => {
				tab.classList.remove('active');
			});
			//add active to target
			targetTab.classList.add('active');
		});
	});


	document.querySelectorAll('.image-mosaic .button.corners').forEach(item => {
		item.addEventListener('click', (event) => {
			const stepHolder = item.closest('.step-holder');
			//get corner from classList, top-left etc
			const corner = item.classList[2];

			var target = stepHolder.querySelector('.upload-image.selected');
			if(!target && stepHolder.querySelectorAll('.upload-image').length == 1) {
				target = stepHolder.querySelector('.upload-image');
			}
			if(target) {
				//if item.classList.active
				if(item.classList.contains('active')) {
					item.classList.remove('active');
					target.classList.remove(corner);
					target.style.setProperty(`border-${corner}-radius`, `0px`);
					
				} else {
					item.classList.add('active');
					target.classList.add(corner);
					var min = Math.min(target.offsetWidth, target.offsetHeight)/2;
					target.style.setProperty(`border-${corner}-radius`, `${min}px`);

					
				}
			}
		});
	});


	document.querySelectorAll('.image-mosaic .cutout-box input').forEach(item => {
		item.addEventListener('change', (event) => {
			const stepHolder = item.closest('.step-holder');
			//get corner from classList, top-left etc
			const container = stepHolder.querySelector('.image-container');
			//if item is checked
			if(item.checked) {
				container.classList.add('cutout');
			} else {
				container.classList.remove('cutout');
			}
		});
	});




	document.querySelectorAll('.image-mosaic .background-selector').forEach(item => {
		item.addEventListener('click', (event) => {
			const target = document.querySelector('#'+item.dataset.target);
			var image;
			if(item.querySelectorAll('img').length > 0) {
				image = item.querySelector('img').src;	
			} else {
				image = null;
			}
			const stepHolder = item.closest('.step-holder');
			if(image) {
				target.style.backgroundImage = `url(${image})`;	
			} else {
				target.style.backgroundImage = "";
			}
			//make .step-selector for .step 3 active
			document.querySelectorAll('.image-mosaic .step-selector').forEach(selector => {
				//if selector data-step == step-3, add .active
				if(selector.dataset.step == 'step-4') {
					if(!selector.classList.contains('active')) {
						for(i=1; i<=6; i++) {
							stepHolder.classList.remove(`step-${i}-selected`);
						}
						stepHolder.querySelectorAll('.step-selector').forEach(selector => {
							selector.classList.remove('selected');
						});

						console.log(selector.dataset.step);
						stepHolder.querySelector(`.step-selector[data-step="${selector.dataset.step}"]`).classList.add('selected');
						stepHolder.classList.add('step-4-selected');
						//add active to step-selector 3 and 4
						stepHolder.querySelectorAll('.step-selector').forEach(selector => {
							if(selector.dataset.step == 'step-4') {
								selector.classList.add('active');
							}
						});
					}
				}
			});
			//add .step-3-selected class to .image-mosaic .step-holder
			
			
		});
	});

	document.querySelectorAll('.image-mosaic .filter-selector').forEach(item => {
		item.addEventListener('click', (event) => {
			const target = document.querySelector('#'+item.dataset.target);
			const filter = item.dataset.color;
			const remove = item.parentNode.dataset.classes.split(" ");
			
			const stepHolder = item.closest('.step-holder');
			//add class filter to target, remove all other filter classes
			target.classList.remove(...remove);
			target.classList.add(filter);
			
			//make .step-selector for .step 4 active

			document.querySelectorAll('.image-mosaic .step-selector').forEach(selector => {
				//if selector data-step == step-4, add .active
				if(selector.dataset.step == 'step-5') {
					if(!selector.classList.contains('active')) {
						for(i=1; i<=6; i++) {
							stepHolder.classList.remove(`step-${i}-selected`);
						}
						stepHolder.querySelectorAll('.step-selector').forEach(selector => {
							selector.classList.remove('selected');
						});

						console.log(selector.dataset.step);
						stepHolder.querySelector(`.step-selector[data-step="${selector.dataset.step}"]`).classList.add('selected');
						stepHolder.classList.add('step-5-selected');
						//add active to step-selector 3 and 4
						stepHolder.querySelectorAll('.step-selector').forEach(selector => {
							if(selector.dataset.step == 'step-5' || selector.dataset.step == 'step-6') {
								selector.classList.add('active');
							}
						});
					}
				}

			});
			document.querySelectorAll('.image-mosaic .upload-image').forEach(item => {
					//add pannable to .inner-container
				item.querySelector('img').parentNode.classList.add('pannable');
			});
			addPanning();
		});
	});

	document.querySelectorAll('.image-mosaic .zoom-slider').forEach(slider => {
		slider.addEventListener('input', (event) => {
			const stepHolder = slider.closest('.step-holder');
			var target = stepHolder.querySelector('.upload-image.selected .inner-container');
			if(!target && stepHolder.querySelectorAll('.upload-image').length == 1) {
				target = stepHolder.querySelector('.upload-image .inner-container');
			}
			if(target) {
				var transform = target.style.transform;

				target.style.setProperty('transform', `scale(${event.target.value/100+1})`);
				//set zoom value to data-zoom
				target.dataset.zoom =event.target.value/100+1;
				checkImageBounds(target.querySelector('img'), target);
				const stepHolder = target.closest('.step-holder');
				//reset download button if it has class 'downloaded
				stepHolder.querySelectorAll('.download').forEach(item => {
					item.classList.remove('downloaded');
					item.innerHTML= "Finaliz<span>e</span><span>ing </span><span>.</span><span>.</span><span>.</span>";
					item.removeAttribute('href');
					item.removeAttribute('download');
				});
			}
		});
	});

	const spreadsheetId = '18rx-_14Tkls0zbzCrxC7csF-VDlnQfy2Sxl-9ZGGTAI'
	const parser = new PublicGoogleSheetsParser();
	parser.parse(spreadsheetId).then((items) => {
	  const templates = document.querySelector(".image-mosaic .tab.templates");
	  //for each item extract values from json, create div and add them as dataset attributes, then append to templates
	  items.forEach(item => {
	  	const template = document.createElement('div');
	  	template.classList.add('template');
	  	template.dataset.string = item.string;
	  	template.dataset.name = item.name;
	  	templates.appendChild(template);
	  	decodeTemplate(item.string, template);
	  	template.addEventListener('click', (event) => {
		  	const target = document.querySelector('.image-mosaic .image-container');
			loadTemplate(template, target);
		});
	  });
	});


	form.addEventListener("submit", function(e) {
		createTemplate(document.querySelector('.image-mosaic .image-container'), form);
	    e.preventDefault();
	    form.parentNode.classList.add('submitting');
	    if(form.querySelector('button').classList.contains('active')) {

		    const templates = document.querySelector(".image-mosaic .tab.templates");
	       	const template = document.createElement('div');
	       	template.classList.add('template');
	       	template.dataset.string = form.querySelector('input[name="string"]').value;
	       	template.dataset.name = form.querySelector('input[name="name"]').value;
	       	templates.appendChild(template);
	       	decodeTemplate(template.dataset.string, template);
	       	template.addEventListener('click', (event) => {
	       		const target = document.querySelector('.image-mosaic .image-container');
	       		loadTemplate(template, target);
	       	});
	      const data = new FormData(form);
	      const action = e.target.action;
	      fetch(action, {
	        method: 'POST',
	        body: data,
	      })
	      .then(() => {
	        console.log("Form submitted.");

	      })
	    }
	 });
	
	
});