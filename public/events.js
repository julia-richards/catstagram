window.addEventListener("DOMContentLoaded", async (event) => {
	const response = await fetch("/kitten/image");
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".cat-pic").src = json.src;
	} catch (error) {
		document.querySelector(".error").innerHTML = json.message;
	}
});

document.getElementById("new-pic").addEventListener("click", async (event) => {
	document.querySelector(".loader").innerHTML = "LOADING...";
	const response = await fetch("/kitten/image");
	document.querySelector(".loader").innerHTML = "";
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".cat-pic").src = json.src;
	} catch (error) {
		document.querySelector(".error").innerHTML = json.message;
	}
});
