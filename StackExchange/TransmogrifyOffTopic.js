function with_jquery(f) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + f.toString() + ")(jQuery)";
	document.body.appendChild(script);
};

function get_dp_comic_post(comicName, comicUrlPart) {
	return get_tagline(comicName) +
		"\n\n![This is a simple comic strip...sorry...][1]\n\n  [1]: " +
		make_url(get_random_date(new Date("August 25, 2003")), "http://comics.dp.cx/%Y.%m.%d/" + comicUrlPart + "-%Y.%m.%d.gif");
}

function get_random_date(minDate) {
	var minDateTime = minDate.getTime();
	var todayTime = new Date().getTime();

	var diff = (todayTime - minDateTime);

	var randomDate = new Date();
	randomDate.setTime(minDateTime + (Math.random() * diff));
	
	return randomDate;
}

function get_random_dp_comic_post() {
	// Should those comics have a different start date,
	// extract it into this array here.
	
	// The URL-Part is here because I *think* some of
	// the names are wrong.
	comics = [
		["Calvin & Hobbes", "Calvin%20and%20Hobbes"],
		["Garfield", "Garfield"],
		["Get Fuzzy", "Get%20Fuzzy"],
		["UserFriendly", "User%20Friendly"],
		["Penny Arcade", "Penny%20Arcade"],
		["Little Gamers", "Little%20Gamers"],
		["Redmeat", "Redmeat"],
		["Heathcliff", "Heathcliff"],
		["Speed Bump", "Speed%20Bump"],
		["Hi and Lois", "Hi%20and%20Lois"],
		["General Protection Fault", "General%20Protection%20Fault"],
		["MegaTokyo", "MegaTokyo"],
		["Stone Soup", "Stone%20Soup"],
		["Sinfest", "Sinfest"],
		["Non Sequitur", "Non%20Sequitur"],
		["Wizard of Id", "Wizard%20of%20Id"],
		["Doonesbury", "Doonesbury"],
		["Off the Mark", "Off%20the%20Mark"],
		["Ctrl+Alt+Del", "Ctrl%2BAlt%2BDel"],
		["Better%20Half", "Better%20Half"],
		["Cornered", "Cornered"],
		["Big Top", "Big%20Top"],
		["Mostly Business", "Mostly%20Business"],
		["Ziggy", "Ziggy"],
		["Jump Start", "Jump%20Start"],
		["Arlo", "Arlo%20%26%20Jones"],
		["Big Nate", "Big%20Nate"],
		["The Duplex", "The%20Duplex"],
		["Frank & Ernest", "Frank%20%26%20Ernest"],
		["Monty", "Monty"],
		["Pickles", "Pickles"],
		["Real Life Adventures", "Real%20Life%20Adventures"],
		["Reality Check", "Reality%20Check"],
		["Working Daze", "Working%20Daze"],
		["Goats", "Goats"],
		["Questionable Content", "Questionable%20Content"],
		["Pearls Before Swine", "Pearls%20Before%20Swine"],
		["The Order of the Stick", "The%20Order%20of%20the%20Stick"],
		["Least I Could Do", "Least%20I%20Could%20Do"],
		["PHD Comics", "PHD%20Comics"],
		["F-Minus", "F-Minus"]
	];
	
	randomComic = comics[Math.floor(Math.random() * comics.length)];
	return get_dp_comic_post(randomComic[0], randomComic[1]);
}

function get_tagline(comicName) {
	taglines = [
		"I'm completely clueless. Please accept this ${comic} strip as a gesture of shame and apology.",
		"This is a great question - I'm completely dumbfounded as to what its solution is. But I do have a ${comic} strip!",
		"I have no idea. But here's a ${comic} strip to help console you.",
		"I have no idea. However, legend has it that reading ${comic} strips will increase your problem solving ability so maybe that can help you.",
		"I'm so glad you asked me that, but I have no clue how to solve it. Have a ${comic} strip instead!",
		"That's a fascinating problem, but I really have no idea how to solve it. Have this great ${comic} strip instead!",
		"Hmm, you seem to be in the wrong place for this question. Fortunately, I have something which may help you:",
		"Isn't programming fun? I'll tell you what else is fun. ${comic}!"
	];
	
	return taglines[Math.floor(Math.random() * taglines.length)].replace("${comic}", comicName);
}

function make_url(randomDate, url) {
	url = url.replace(/%y/g, randomDate.getFullYear().toString().substring(2));
	url = url.replace(/%Y/g, randomDate.getFullYear());
	url = url.replace(/%m/g, pad(randomDate.getMonth()));
	url = url.replace(/%d/g, pad(randomDate.getDay()));

	return url;
}

function pad(number) {
	if (number < 10) {
		return "0" + number;
	}
	return number;
}
				
with_jquery(function ($) {
	$('document').ready(function () {

		if ($('.question .post-menu a[id^="close-question"]').length > 0 && $('.question .post-menu a[id^="close-question"]')[0].innerHTML.indexOf("reopen") == -1) {
			window.qid = $('.question').attr('data-questionid');
			$('<span class="lsep">|</span>').appendTo('.question .post-menu');
			$('.question .post-menu a:last').clone().attr("id", "close-offtopic").attr("title", "Answer with a Calvin and Hobbes strip, along with a closevote.").appendTo('.question .post-menu');
			$('.question .post-menu a:last')[0].innerHTML = "transmogrify";
			$('.question .post-menu a:last').on("click", function (event) {
				$('.question .post-menu a[id^="close-question"]')[0].click();

				$('#wmd-input')[0].value = get_random_dp_comic_post();
				$('#communitymode').click();
				$('#question a.vote-down-off:not(.vote-down-on)').click();
				StackExchange.MarkdownEditor.refreshAllPreviews();
			});
		}
	});

	window.waitUntilExists = function (wbid, wfn) {
		if ($("#" + wbid).length == 0) {
			window.waitFunc = function () {
				waitUntilExists(wbid, wfn)
			};
			setTimeout(waitFunc, 20);
		} else {
			wfn();
		}
	}

});
