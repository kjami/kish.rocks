/* eslint-disable */
/*
	Projection by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	$("#submit").on("click", function (ev) {
		var body = $("#message").val();
		var name = $("#name").val();
		var from = $("#email").val();
		var error = false;
		if (!body || body.trim() == "") {
			error = true;
		}
		if (!name || name.trim() == "") {
			error = true;
		}
		if (!from || from.trim() == "") {
			error = true;
		} else if (!validateEmail(from)) {
			error = true;			
		}
		if (error) {
			alert("Please fill all fields and check if e-mail is in proper format.");
			return;
		}
		from = name + " (" + from + ")";
		$.ajax("https://bmhvy18fyl.execute-api.ap-southeast-1.amazonaws.com/Prod/send-email", {
			method: "POST", 
			data: JSON.stringify({
				body: body,
				subject: "Email from kish.rocks!",
				from: from
			}), 
			beforeSend: function (x) {
				x.setRequestHeader("Content-Type", "application/json")
			}
		}).done(function (opt1) {
			$("#message").val("");
			$("#name").val("");
			$("#email").val("");
			alert("An email has been sent to Kishor. He will respond to you at the earliest possible time.");
		}).fail(function () {
			alert("Oops! There is something wrong. You can alternatively contact me on kishorjami@gmail.com");
		});
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

	// Off-Canvas Navigation.

		// Navigation Panel.
			$(
				'<div id="navPanel">' +
					$('#nav').html() +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left'
				});

		// Fix: Remove transitions on WP<10 (poor/buggy performance).
			if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
				$('#navPanel')
					.css('transition', 'none');

	});

})(jQuery);
