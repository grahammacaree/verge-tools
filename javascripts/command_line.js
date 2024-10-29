const commandLineColors = ['#d6f31f', '#5200ff', '#f9f9f9'];

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


window.addEventListener('DOMContentLoaded', (event) => {
	document.querySelectorAll('.command-line-image-generator .image-container img').forEach(image => {
		image.addEventListener('load', (event) => {
			commandLineBoxes();
		})
	})
	document.querySelector('.command-line-image-generator .regen').addEventListener('click', (event) => {
		commandLineBoxes();
	});
});