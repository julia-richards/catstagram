// LOAD CAT PHOTO ONLOAD //
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

// LOAD RANDOM CAT PHOTO ON NEW-PIC CLICK //
document.getElementById("new-pic").addEventListener("click", async (event) => {
	document.querySelector(".error").innerHTML = "";
	document.querySelector(".loader").innerHTML = "LOADING...";
	const response = await fetch("/kitten/image");
	document.querySelector(".loader").innerHTML = "";
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".cat-pic").src = json.src;
	} catch (error) {
		document.querySelector(".cat-pic").src = "json.src";
		document.querySelector(".error").innerHTML = json.message;
	}
});

// INCREMENT LIKES //
async function updateScore(response) {
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".score").innerHTML = json.score;
	} catch (error) {
		document.querySelector(".error").innerHTML = json.message;
	}
}

// DECREMENT LIKES //
document.getElementById("upvote").addEventListener("click", async (event) => {
	const response = await fetch("/kitten/upvote", { method: "PATCH" });
	updateScore(response);
});

document.getElementById("downvote").addEventListener("click", async (event) => {
	const response = await fetch("/kitten/downvote", { method: "PATCH" });
	updateScore(response);
});

// HANDLE COMMENT SUBMISSION EVENT //
document.getElementById("submit").addEventListener("click", async (event) => {
	event.preventDefault();
	const form = new FormData(document.querySelector(".comment-form"));
	const comment = form.get("user-comment");
	const response = await fetch("/kitten/comments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ comment }),
	});
	const json = await response.json();

	try {
		if (!response.ok) throw Error(json);
		const commentBlock = document.querySelector(".comments");

		let comment = json.comments[json.comments.length - 1];
		let currComm = document.createElement("div");
		let delButton = document.createElement("button");
		delButton.setAttribute("class", "delete");
		delButton.innerText = "delete comment";
		currComm.innerHTML = comment + " ";
		currComm.appendChild(delButton);
		commentBlock.appendChild(currComm);
	} catch (e) {
		let comment = document.createElement("p");
		comment.innerHTML = "something bad happened";
		commentBlock.appendChild(comment);
	}
});

// COMMENT DELETION //

document.querySelector(".comments").addEventListener('click', async(event) =>{
    if(event.target.tagName === "BUTTON"){
      console.log(event.target.parentNode.innerText)
      let response = await fetch('/kitten/comments/:id', {
        method: "DELETE",
        // body: JSON.stringify({event.target.parentNode.innerText})
      });
    }
})
