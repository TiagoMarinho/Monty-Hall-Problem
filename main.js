// todo:
//  move classes to separate files
//  profile performance then set iterations based on that to keep framerate

class Door {
	isSelected = false
	isCar = false
	id = null
	isShown = false

	get isGoat () {
		return !this.isCar
	}
}

const montyHallProblem = (numberOfDoors, switchDoors) => {

	if (numberOfDoors < 3) throw new RangeError(`numberOfDoors cannot be less than 3`)

	const carDoorIndex = Utils.getRandomInt(0, numberOfDoors - 1),
		selectedDoorIndex = Utils.getRandomInt(0, numberOfDoors - 1),
		doors = []

	for (let d = 0; d < numberOfDoors; ++d) {
		const door = new Door()
		door.id = d
		door.isCar = carDoorIndex === d
		door.isSelected = selectedDoorIndex === d
		doors.push(door)
	}

	const showableDoors = doors.filter(item => !item.isSelected && !item.isCar),
		shownDoor = Utils.getRandomItem(showableDoors)

	shownDoor.isShown = true

	const switchableDoors = doors.filter(item => !item.isSelected && !item.isShown),
		newDoor = Utils.getRandomItem(switchableDoors),
		oldDoor = doors[selectedDoorIndex]

	if (switchDoors && newDoor.isCar)
		return true
	if (!switchDoors && oldDoor.isCar)
		return true

	return false
}

const plot = (numberOfDoors, iterations) => {
	const data = {
		switching: {
			tries: 0,
			successes: 0
		},
		staying: {
			tries: 0,
			successes: 0
		}
	}

	const switchingElem = document.getElementById(`switching`),
		stayingElem = document.getElementById(`staying`),
		totalsElem = document.getElementById(`stats`)

	const loop = _ => {
		for (let i = 0; i < iterations; ++i) {
			++data.switching.tries
			data.switching.successes += montyHallProblem(numberOfDoors, true)

			++data.staying.tries
			data.staying.successes += montyHallProblem(numberOfDoors, false)
		}

		const percentageSwitching = 100 / data.switching.tries * data.switching.successes,
			percentageStaying = 100 / data.staying.tries * data.staying.successes

		switchingElem.style.height = `${percentageSwitching}%`
		stayingElem.style.height = `${percentageStaying}%`

		switchingElem.innerHTML = `Switching<br/>${percentageSwitching.toFixed(4)}%<br/>`
		const switchingInfoElem = document.createElement(`p`)
		switchingInfoElem.innerHTML = `${data.switching.successes} successes<br/>out of<br/>${data.switching.tries} tries`
		switchingElem.append(switchingInfoElem)

		stayingElem.innerHTML = `Staying<br/>${percentageStaying.toFixed(4)}%`
		const stayingInfoElem = document.createElement(`p`)
		stayingInfoElem.innerHTML = `${data.staying.successes} successes<br/>out of<br/>${data.staying.tries} tries`
		stayingElem.append(stayingInfoElem)

		const total = data.switching.tries + data.staying.tries
		totalsElem.innerHTML = `tests performed: ${total}`

		// following code has not been optimized against repetition and magic numbers
		if (percentageSwitching < 25)
			switchingElem.style.background = `#d63b5d`
		else if (percentageSwitching < 50)
			switchingElem.style.background = `#c4a62f`
		else if (percentageSwitching < 75)
			switchingElem.style.background = `#3bd68e`
		else if (percentageSwitching >= 75)
			switchingElem.style.background = `#3bd6bc`

		if (percentageStaying < 25)
			stayingElem.style.background = `#d63b5d`
		else if (percentageStaying < 50)
			stayingElem.style.background = `#c4a62f`
		else if (percentageStaying < 75)
			stayingElem.style.background = `#3bd68e`
		else if (percentageStaying >= 75)
			stayingElem.style.background = `#3bd6bc`

		requestAnimationFrame(loop)
	}
	//setInterval(_=>{loop()}, 200)
	loop()
}

const main = _ => {
	const numberOfDoors = 3,
		iterations = 1//0000

	plot(numberOfDoors, iterations)
}

main()