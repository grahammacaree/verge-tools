const decoderDivs = ['x', 'square', 'filled', 'slash'];
const column_alignments = ['even', 'between', 'around'];

function generateDecoderCols() {
	const colContainer = document.querySelector('.decoder-image-generator .small');
	//generate between 1 and 3 columns
	colContainer.innerHTML = "";
	for(let i = 0; i < 3; i++) {
		var col = document.createElement('div');
		col.classList.add('col');
		colContainer.appendChild(col);
	}
	document.querySelectorAll('.decoder-image-generator .small .col').forEach(column => {
		console.log('adding');
		//create random number of divs between 0 and 4
		const numberOfDivs = Math.floor(Math.random() * 5);
		col.innerHTML = "";
		for(let i = 0; i < numberOfDivs; i++) {
			const div = document.createElement('div');
			//randomly assign class from decoder_divs array
			div.classList.add(decoderDivs[Math.floor(Math.random() * decoderDivs.length)]);
			div.classList.add('column');
			column.appendChild(div);
		}
		//add random class from column_alignments array to col
		column.classList.add(column_alignments[Math.floor(Math.random() * column_alignments.length)]);
		//add random vertical transform from -2 to + 2rem to column
		column.style.setProperty('transform', `translate(0,${Math.random() * 4 - 2}rem)`);
	});
}

window.addEventListener('DOMContentLoaded', (event) => {
	const decoderImage = document.querySelector('.decoder-image-generator .image-container .picture .image .image-holder img');
	const invert = document.querySelector('.decoder-image-generator .image-container .picture .image .invert-holder img');
	decoderImage.addEventListener('load', (event) => {
		invert.src = decoderImage.src;
		invert.classList.add('loaded');
		generateDecoderCols();
	});

	document.querySelector('.decoder-image-generator .regen').addEventListener('click', (event) => {
		generateDecoderCols();
	});
});