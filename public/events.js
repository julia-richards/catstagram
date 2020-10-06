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

async function updateScore(response) {
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".score").innerHTML = json.score;
	} catch (error) {
		document.querySelector(".error").innerHTML = json.message;
	}
}

document.getElementById("upvote").addEventListener("click", async (event) => {
	const response = await fetch("/kitten/upvote", { method: "PATCH" });
	updateScore(response);
});

document.getElementById("downvote").addEventListener("click", async (event) => {
	const response = await fetch("/kitten/downvote", { method: "PATCH" });
	updateScore(response);
});

document.getElementById("submit").addEventListener("click", async (event) => {
	event.preventDefault();
  const form = new FormData(document.querySelector(".comment-form"));
  const comment = form.get("user-comment");
	console.log(comment);
	const response = await fetch("/kitten/comments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({comment})
	});
	const json = await response.json();

	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".comments").innerHTML = json.comments.join('\n');
	} catch (e) {}
});
