'use strict';

let startTime; // beginning of first touch

const checkpointStart = document.getElementById('checkpoint1');
const checkpointFinal = document.getElementById('checkpointE');
const checkpointPairs = [
	[document.getElementById('checkpointA'), document.getElementById('checkpoint2Fake')],
	[document.getElementById('checkpoint2'), document.getElementById('checkpointBFake')],
	[document.getElementById('checkpointB'), document.getElementById('checkpoint3Fake')],
	[document.getElementById('checkpoint3'), document.getElementById('checkpointCFake')],
	[document.getElementById('checkpointC'), document.getElementById('checkpoint4Fake')],
	[document.getElementById('checkpoint4'), document.getElementById('checkpointDFake')],
	[document.getElementById('checkpointD'), document.getElementById('checkpoint5Fake')],
	[document.getElementById('checkpoint5'), document.getElementById('checkpointEFake')]
];
let phase = -1; // represents which checkpoint is next: -1 = 1, 0 = A, 1 = 2, 2 = B, etc to work nicely with the checkpointPairs array

// 
class point {
	constructor(x, y, t) {
		this.x = x;
		this.y = y;
		this.t = t;
	}
}

// this is an array of arrays of points. I wanted to use the inbuilt TouchList and Touch objects, but I don't want the pain of figuring out how to add a timestamp to each touch
const coords = [];
let touchNumber = -1;

function placePoints(pair) {
	let currentRect
	if (pair == 0) {
		currentRect = checkpointStart.getBoundingClientRect();
	} else {
		checkpointPairs[pair - 1][0].style.display = 'flex';
		currentRect = checkpointPairs[pair - 1][0].getBoundingClientRect(); // this function only works on visible things, so i have to turn on display before i get the rect to make it work; this is stupid
		checkpointPairs[pair - 1][0].style.display = 'none';
	}
	let rectA = new DOMRect(0, 0, 80, 80);
	let rectB = new DOMRect(0, 0, 80, 80);
	do {
		if (window.innerWidth > window.innerHeight) {
			if (pair == 0) { // startpoint
				rectA.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectA.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectB.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectB.x = window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // right
			} else if (currentRect.x < window.innerWidth / 2 && currentRect.y < window.innerHeight / 2) { // top left quadrant
				rectA.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectA.x = window.innerWidth / 2 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectB.y = window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // bottom
				rectB.x = Math.random() > 1/2 ? 10 + Math.random() * (window.innerWidth / 2 - 100) : window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // left or right
			} else if (currentRect.x > window.innerWidth / 2 && currentRect.y < window.innerHeight / 2) { // top right
				rectA.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectA.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectB.y = window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // bottom
				rectB.x = Math.random() > 1/2 ? 10 + Math.random() * (window.innerWidth / 2 - 100) : window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // left or right
			} else if (currentRect.x < window.innerWidth / 2 && currentRect.y > window.innerHeight / 2) { // bottom left
				rectA.y = window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // bottom
				rectA.x = window.innerWidth / 2 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectB.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectB.x = Math.random() > 1/2 ? 10 + Math.random() * (window.innerWidth / 2 - 100) : window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // left or right
			} else if (currentRect.x > window.innerWidth / 2 && currentRect.y > window.innerHeight / 2) { // bottom right
				rectA.y = window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // bottom
				rectA.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectB.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectB.x = Math.random() > 1/2 ? 10 + Math.random() * (window.innerWidth / 2 - 100) : window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // left or right
			} else { // something went wrong
				throw new Error('cannot find current point');
			}
		} else {
			if (pair == 0) { // startpoint
				rectA.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectA.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectB.x = window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectB.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
			} else if (currentRect.x < window.innerWidth / 2 && currentRect.y < window.innerHeight / 2) { // top left quadrant
				rectA.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectA.y = window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // bottom
				rectB.x = window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectB.y = Math.random() > 1/2 ? 10 + Math.random() * (window.innerHeight / 2 - 100) : window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // top or bottom
			} else if (currentRect.x > window.innerWidth / 2 && currentRect.y < window.innerHeight / 2) { // top right
				rectA.x = window.innerWidth / 2 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectA.y = window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // bottom
				rectB.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectB.y = Math.random() > 1/2 ? 10 + Math.random() * (window.innerHeight / 2 - 100) : window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // top or bottom
			} else if (currentRect.x < window.innerWidth / 2 && currentRect.y > window.innerHeight / 2) { // bottom left
				rectA.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectA.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectB.x = window.innerWidth / 2 + 10 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectB.y = Math.random() > 1/2 ? 10 + Math.random() * (window.innerHeight / 2 - 100) : window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // top or bottom
			} else if (currentRect.x > window.innerWidth / 2 && currentRect.y > window.innerHeight / 2) { // bottom right
				rectA.x = window.innerWidth / 2 + Math.random() * (window.innerWidth / 2 - 100); // right
				rectA.y = 10 + Math.random() * (window.innerHeight / 2 - 100); // top
				rectB.x = 10 + Math.random() * (window.innerWidth / 2 - 100); // left
				rectB.y = Math.random() > 1/2 ? 10 + Math.random() * (window.innerHeight / 2 - 100) : window.innerHeight / 2 + 10 + Math.random() * (window.innerHeight / 2 - 100); // top or bottom
			} else { // something went wrong
				throw new Error('cannot find current point');
			}
		}
		
	// debugging
	console.log(
		pair + " distA " + 
		//Math.atan2(currentRect.y - rectA.y, currentRect.x - rectA.x) * 180/Math.PI + " angleB " +
		//Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) * 180/Math.PI + " angleDiff " +
		//Math.abs(Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) * 180/Math.PI - Math.atan2(currentRect.y - rectA.y, currentRect.x - rectA.x) * 180/Math.PI) + " distA " + 
		(Math.sqrt(Math.pow(currentRect.x - rectA.x, 2) + Math.pow(currentRect.y - rectA.y, 2))) + " distB " +
		(Math.sqrt(Math.pow(currentRect.x - rectB.x, 2) + Math.pow(currentRect.y - rectB.y, 2))) + " distAB " +
		(Math.sqrt(Math.pow(rectA.x - rectB.x, 2) + Math.pow(rectA.y - rectB.y, 2)))
	);
	
	} while (
		Math.abs(Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) * 180/Math.PI - Math.atan2(currentRect.y - rectA.y, currentRect.x - rectA.x) * 180/Math.PI) < 15
	)
		// escape if angle of b - pi/6 > angle of a || angle of a > pi/6 + angle of b     in other words, only go on if a and b are pi/6 apart by angle
		/*
		Math.PI + Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) - Math.PI / 6 < 0 ? // if 5pi/6 + angle of b < 0
		Math.PI + Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) + 2 * Math.PI - Math.PI / 6 : // then 5pi/6 + angle of b + 2pi
		Math.PI + Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) - Math.PI / 6 < // else 5pi/6 + angle of b
		Math.PI + Math.atan2(currentRect.y - rectA.y, currentRect.x - rectA.x) && // is less than pi + angle of a AND
		Math.PI + Math.atan2(currentRect.y - rectA.y, currentRect.x - rectA.x) < // pi + angle of a
		(Math.PI + Math.atan2(currentRect.y - rectB.y, currentRect.x - rectB.x) + Math.PI / 6) % 2 * Math.PI) // is less than 7pi/6 + angle of b mod 2pi
		*/
	

	if (pair < checkpointPairs.length) {
		if (Math.random() > 0.5) { // Coin flip whether A or B is next
			checkpointPairs[pair][0].style.left = `${rectA.x}px`;
			checkpointPairs[pair][0].style.top = `${rectA.y}px`;
			checkpointPairs[pair][1].style.left = `${rectB.x}px`;
			checkpointPairs[pair][1].style.top = `${rectB.y}px`;
		} else {
			checkpointPairs[pair][0].style.left = `${rectB.x}px`;
			checkpointPairs[pair][0].style.top = `${rectB.y}px`;
			checkpointPairs[pair][1].style.left = `${rectA.x}px`;
			checkpointPairs[pair][1].style.top = `${rectA.y}px`;
		}
	} else {
		if (Math.random > 0.5) {
			checkpointFinal.style.left = `${rectA.x}px`;
			checkpointFinal.style.top = `${rectA.y}px`;
		} else {
			checkpointFinal.style.left = `${rectA.x}px`;
			checkpointFinal.style.top = `${rectA.y}px`;
		}
	}
}

for (let pair in [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
	placePoints(pair); // this generates the locations of all of the points ahead of time
}

// At the touch start
document.addEventListener("touchstart", e => {
	touchNumber++;
	coords.push([]);
	if (touchNumber == 0) {
		startTime = Date.now(); // if first touch, set startTime
	}

	// add point to coords
    const touch = e.changedTouches[0];
	coords[touchNumber].push(new point(touch.pageX, touch.pageY, Date.now() - startTime));

	// Advance phase if starting on startpoint
	if (document.elementsFromPoint(touch.pageX, touch.pageY).includes(checkpointStart)) {
		phase++;
		checkpointPairs[phase][0].style.display = 'flex';
		checkpointPairs[phase][1].style.display = 'flex';
	} else {
		// TODO: show error message
	}
});

document.addEventListener("touchmove", e => {
	// add point to coords
	const touch = e.changedTouches[0];
	coords[touchNumber].push(new point(touch.pageX, touch.pageY, Date.now() - startTime));

	// Advance phase if on correct point, show error message if not
	if (document.elementsFromPoint(touch.pageX, touch.pageY).includes(phase < checkpointPairs.length ? checkpointPairs[phase][0] : checkpointFinal)) {
		phase++;
		checkpointStart.style.display = 'none';
		if (phase < checkpointPairs.length) {
			checkpointPairs[phase][0].style.display = 'flex';
			checkpointPairs[phase][1].style.display = 'flex';
		} else if (phase == checkpointPairs.length) {
			checkpointFinal.style.display = 'flex'
        } else {
			
		}
		if (phase > 0 && phase - 1 < checkpointPairs.length) {
			checkpointPairs[phase - 1][1].style.display = 'none';
		}
		if (phase > 1 && phase - 2 < checkpointPairs.length) {
			checkpointPairs[phase - 2][0].style.display = 'none';
		}
	} else if (document.elementsFromPoint(touch.pageX, touch.pageY).includes(phase < checkpointPairs.length ? checkpointPairs[phase][1] : null)) {
		// TODO: error thing
	}
});

document.addEventListener("touchend", e => {
	// add point to coords
	const touch = e.changedTouches[0];
	coords[touchNumber].push(new point(touch.pageX, touch.pageY, Date.now()));

	if (document.elementsFromPoint(touch.pageX, touch.pageY).includes(checkpointFinal)) {
		document.getElementById("resultsModal").style.display = 'block';
	}
});

function exportCoords() {
	exportToCsv("coords.csv", coords);
}

function exportPoints() {
	let points = [];
	checkpointStart.style.display = 'flex';
	let startRect = checkpointStart.getBoundingClientRect();
	checkpointStart.style.display = 'none';
	points.push([checkpointStart.id, startRect.x, startRect.y]);
	let rectA;
	let rectB;
	for (let pair in [0, 1, 2, 3, 4, 5, 6, 7]) {
		checkpointPairs[pair][0].style.display = 'flex';
		rectA = checkpointPairs[pair][0].getBoundingClientRect();
		checkpointPairs[pair][0].style.display = 'none';
		points.push([checkpointPairs[pair][0].id, rectA.x, rectA.y]);
		checkpointPairs[pair][1].style.display = 'flex';
		rectB = checkpointPairs[pair][1].getBoundingClientRect();
		checkpointPairs[pair][1].style.display = 'none';
		points.push([checkpointPairs[pair][1].id, rectB.x, rectB.y]);
	}
	let endRect = checkpointFinal.getBoundingClientRect();
	points.push([checkpointFinal.id, endRect.x, endRect.y]);
	exportToCsv("points.csv", points);
}

function exportToCsv(filename, rows) {
	var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function closeModal() {
    document.getElementById("resultsModal").style.display = 'none';
    window.location.reload();
}
