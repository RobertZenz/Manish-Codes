function with_jquery(f) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + f.toString() + ")(jQuery)";
	document.body.appendChild(script);
};

function get_random_date(minDate) {
	var minDateTime = minDate.getTime();
	var todayTime = new Date().getTime();

	var diff = (todayTime - minDateTime);

	var randomDate = new Date();
	randomDate.setTime(minDateTime + (Math.random() * diff));
	
	return randomDate;
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

				var url = make_url(get_random_date(new Date('August 25, 2003'), "http://comics.dp.cx/%Y.%m.%d/Calvin%20and%20Hobbes-%Y.%m.%d.gif"));

				$('#wmd-input')[0].value = get_tagline("Calvin & Hobbes") + "\n\n![This is a simple comic strip...sorry...][1]\n\n  [1]: " + url;
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
