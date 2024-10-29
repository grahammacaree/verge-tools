var eyebrow = [];

function polygonFetch(html, selected) {
	var parser = new DOMParser();
	var eyebrow = [];
	var credit;
	var doc = parser.parseFromString(html, "text/html");
	var hed = doc.querySelector('article .duet--article--lede h1').innerHTML.replace( /(<([^>]+)>)/ig, '');
	var dek = doc.querySelector('article .duet--article--lede h1').parentNode.querySelector('p').innerHTML.replace( /(<([^>]+)>)/ig, '');
	var eyebrows = doc.querySelectorAll('.duet--article--lede div div div ul li a');
	if(doc.querySelector('.duet--article--lede cite')) {
		credit = doc.querySelector('.duet--article--lede cite').innerHTML.replace( /(<([^>]+)>)/ig, '')	
	} else if (doc.querySelector('.duet--ledes--standard-lede-bottom cite')) {
		credit = doc.querySelector('.duet--ledes--standard-lede-bottom cite').innerHTML.replace( /(<([^>]+)>)/ig, '');
	} else {
		credit = "";
	}
	var target = selected.querySelector('.image-container .picture .image img');
	if(doc.querySelector('.duet--layout--entry-image img')) {
		var imageURL = doc.querySelector('.duet--layout--entry-image img').src+"?" + new URLSearchParams({ csk: 1 }).toString();
		var image = createImage(imageURL, target);
	} else {
		selected.querySelector('.image-container .image-inner .picture').classList.add('hidden');
	}
	eyebrows.forEach(item => {
		eyebrow.push(item.innerHTML.replace( /(<([^>]+)>)/ig, ''));
	});
	console.log(eyebrow);
	
	updateDek(dek);	
	updateCredit(credit);
	eyebrow.forEach(addEyebrow => {
		updateEyebrows(addEyebrow, 1);
	});
	selected.querySelector('.input .edit').classList.add('visible');
	selected.querySelector('.image-container').classList.add('visible');
	selected.querySelector('.download').classList.add('visible');
	updateHeader(hed);	
}

function vergeFetch(html, selected) {
	var byline = [];
	var eyebrow = [];
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
	byline.forEach(addByline => {
		updateBylines(addByline, 1);
	});
	eyebrow.forEach(addEyebrow => {
		updateEyebrows(addEyebrow, 1);
	});
	updateHeader(hed);	
	var target = selected.querySelector('.image-container .picture .image img');
	if(doc.querySelector('article .duet--article--lede .duet--article--lede-image img')) {
		var imageURL = doc.querySelector('article .duet--article--lede .duet--article--lede-image img').src;
		var image = createImage(imageURL, target);
	} else {
		selected.querySelector('.image-container .image-inner .picture').classList.add('hidden');
	}
	selected.querySelector('.input .edit').classList.add('visible');
	selected.querySelector('.image-container').classList.add('visible');
	selected.querySelector('.download').classList.add('visible');
}

function updateFields(value, type) {
	switch(type) {
	  case "headline":
	    updateHeader(value);
	    break;
	  case "credit":
	  	updateCredit(value);
	  	break;
	  case "dek":
	  	updateDek(value);
	  	break;
	  case "eyebrow":
	  	updateEyebrows(value, 1);
	  	break
	  case "byline":
	  	updateBylines(value, 1);
	  	break
	  case "date":
	    updateDate(value);
	    break;
	  default:
	    console.log('unknown field type');
	    break;
	}
}

function displayByline(byline) {
	const editTarget = document.querySelector('.tool.active .edit-type-byline ul');
	document.querySelector('.tool.active [data-type="byline"]').value = "Add Byline";
	const outputTarget = document.querySelector('.tool.active .image-container .lockup .byline');
	editTarget.innerHTML = "";
	byline.forEach(item => {
		editTarget.innerHTML += `<li><span class="item">${item}</span><span class="close">+</span></li>`;
	});
	document.querySelectorAll('.tool.active .edit-type-byline li .close').forEach(item => {
		item.addEventListener('click', (event) => {
			var name = item.parentNode.querySelector('.item').innerHTML;
			updateBylines(name, -1);
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

function updateBylines(value, direction) {
	var byline = [];
	document.querySelectorAll('.tool.active .edit-type-byline .item').forEach(item => {
		if(item.innerHTML!= value) {
			byline.push(item.innerHTML);
		}
	});
	if(direction > 0) {
		byline.push(value);
	}
	displayByline(byline);
}

function displayEyebrows(eyebrows) {
	var brand = "verge";
	if(document.querySelector('.tool.active').classList.contains('polygon-scraper')) {
		brand = "polygon;"
	}
	const editTarget = document.querySelector('.tool.active .edit-type-eyebrow ul');
	document.querySelector('.tool.active [data-type="eyebrow"]').value = "Add Eyebrow";
	const outputTarget = document.querySelector('.tool.active .image-container .lockup .eyebrow');
	outputTarget.innerHTML = "";
	editTarget.innerHTML = "";
	eyebrows.forEach((item, index) => {
		editTarget.innerHTML += `<li><span class="item">${item}</span><span class="close">+</span></li>`;
		if (brand == "verge") {
			
			outputTarget.innerHTML += `${item}`;
			if(index < eyebrows.length -1) {
				outputTarget.innerHTML += `<span class="divider">/</span>`;
			}
		}
		if (brand = "polygon") {
			outputTarget.innerHTML += `<span>${item}</span>`;
		}
	});
	document.querySelectorAll('.tool.active .edit-type-eyebrow li .close').forEach(item => {
		item.addEventListener('click', (event) => {
			var name = item.parentNode.querySelector('.item').innerHTML;
			updateEyebrows(name, -1);
		});
	});
}

function updateEyebrows(value, direction) {
	var eyebrow = [];
	document.querySelectorAll('.tool.active .edit-type-eyebrow .item').forEach(item => {
		if(item.innerHTML!= value) {
			eyebrow.push(item.innerHTML);
		}
	});
	if(direction > 0) {
		eyebrow.push(value);
	}
	displayEyebrows(eyebrow);
}

function updateHeader (header) {
	var brand = "verge";
	const lockup = document.querySelector('.tool.active .image-container .lockup');
	const container = document.querySelector('.tool.active .image-inner');
	if(document.querySelector('.tool.active').classList.contains('polygon-scraper')) {
		brand = "polygon";
	}
	const editTarget = document.querySelector('.tool.active [data-type="headline"]');
	const outputTarget = document.querySelector('.tool.active .image-container .lockup .headline');
	editTarget.value = header;
	outputTarget.innerHTML = header;
	if(brand=="polygon") {
		let fontSize = 50;
		outputTarget.style.setProperty('--slider-percent', fontSize);
		while(lockup.getBoundingClientRect().height > container.getBoundingClientRect().height && fontSize > -25) {
			outputTarget.style.setProperty('--slider-percent', fontSize);
			fontSize+= -1;
		}
	}
}

function updateDek (dek) {
	const editTarget = document.querySelector('.tool.active [data-type="dek"]');
	const outputTarget = document.querySelector('.tool.active .image-container .lockup .dek');
	editTarget.value = dek;
	outputTarget.innerHTML = dek;
}

function updateCredit (credit) {
	const editTarget = document.querySelector('.tool.active [data-type="credit"]');
	const outputTarget = document.querySelector('.tool.active .image-container .lockup .credit');
	editTarget.value = credit;
	outputTarget.innerHTML = credit;
}

function updateDate (date) {
	const editTarget = document.querySelector('.tool.active [data-type="date"]');
	const outputTarget = document.querySelector('.tool.active .image-container .lockup .date');
	editTarget.value = date;
	outputTarget.innerHTML = date;
}

window.addEventListener('DOMContentLoaded', (event) => {
	document.querySelectorAll('.url-fetcher').forEach(button => {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			var site = "null";
			var selected = document.querySelector('.tool.active')
			const input = selected.querySelector('.url-container input');
		  	var url = input.value + "?" + new URLSearchParams({ csk: 1 }).toString();
		  	if(url.includes("www.theverge.com")) {
		  		site = "verge";
		  	}
		  	if(url.includes("www.polygon.com")) {
		  		site = "polygon";
		  	}
		  	fetch(url).then(function (response) {
				// The API call was successful!
				return response.text();
			}).then(function (html) {
				// This is the HTML from our response as a text string

				switch(site) {
				  case "verge":
				    vergeFetch(html, selected);
				    break;
				  case "polygon":
				  	polygonFetch(html, selected);
				  	break;
				  default:
				    console.log('unknown site');
				    break;
				}
			}).catch(function (err) {
				// There was an error
				console.warn('Something went wrong.', err);
			});
		});
	});

	//turn on url fetcher if text is in input
	document.querySelectorAll('.url-fetcher').forEach(button => {
		const input = button.closest('.tool').querySelector('.url-container input');
		input.addEventListener('keyup', (event) => {
			if(input.value) {
				button.classList.add('active');
			} else {
				button.classList.remove('active');
			}
		});
	});

	document.querySelectorAll('.font-slider').forEach(slider => {
	  slider.addEventListener('input' , (event) => {
	  	slider.closest('.active.tool').querySelector('.image-container .lockup .headline').style.setProperty('--slider-percent', event.target.value);
	  });
	});

	document.querySelectorAll('.tool input.scraper-update').forEach(input => {
		input.addEventListener('keyup', (event) => {
			if(event.keyCode == 13 && event.target.value.length > 0) {
				updateFields(event.target.value, input.dataset.type);
			}
		});
		input.addEventListener('blur', (event) => {
			if(input.dataset.type != 'byline' && input.dataset.type != 'eyebrow') {
				updateFields(event.target.value, input.dataset.type);
			}
		})
	});
});