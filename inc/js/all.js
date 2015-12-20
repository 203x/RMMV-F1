$(function() {
	function get_hash (name) {
		var hash = window.location.hash,hash_reg;
		switch (name) {
		case 'lang':
			hash_reg = hash.match(/!(cn|en)$/);
			if (hash_reg) {
				return hash_reg[1];
			}else{
				return 'cn';
			}
			break;
		case 'url':
			hash_reg = hash.replace(/!(cn|en)$/,'').match(/#(.*)/);
			if (hash_reg) {
				return hash_reg[1];
			}else{
				return 'page/01.html';
			}
			break;
		// default:
			// return
		}
	}

	function get_lang () {
		if (get_hash ('lang') === 'en') {
			return '-en';
		}else{
			return '';
		}
	}

	function get_url () {
		if (get_hash ('lang') === 'cn') {
			return get_hash('url');
		}
		switch (get_hash ('lang')) {
		case 'cn':
			return get_hash('url');
		case 'en':
			return get_hash('url').replace(/^page\//, 'page-en\/');
		// default:
			// return
		}
		
	}

	function load_main () {
		$('.main').load(get_url() + ' .main>', function() {
			$(this).find('a').each(function() {
				$(this).attr('href', 'page/'+$(this).attr('href'));
				$(this).on('click', function(event) {
					event.preventDefault();
					window.location.hash = '#'+$(this).attr('href')+'!'+get_hash('lang');
				});
			});
			$(this).find('img').each(function() {
				var src = $(this).attr('src').replace(/^\.\.\//, '');
				$(this).attr('src', src);
			});
		});
	}

	function load_side (href) {
		$('.side').load(href + ' .side>', function() {
			$(this).find('a').each(function() {
				var temp = $(this).attr('href').replace(/^\.\.\//, '');
				$(this).attr('href', temp);
				$(this).on('click', function(event) {
					event.preventDefault();
					window.location.hash = '#'+$(this).attr('href')+'!'+get_hash('lang');
				});
			});

			var $side_btn_arrow = $('.side__btn--arrow');
			$side_btn_arrow.on('click', function(e) {
				e.preventDefault();
				var $self = $(this);
				var $self_ul = $self.next().next();
				var state = $self_ul.css('display');
				if (state == 'none') {
					$self.html('▼');
					$self_ul.show();
				} else {
					$self.html('▶');
					$self_ul.hide();
				}
			});

		});
	}

	function load_header (href) {
		$('.header').load(href + ' .header>', function () {
			$('.language a').on('click', function(e) {
				e.preventDefault();
				var lang;
				switch ($(this).attr('id')) {
					case 'lug-cn':
						lang = 'cn';
						break;
					case 'lug-en':
						lang = 'en';
						break;
				}
				window.location.hash = '#'+get_hash('url')+'!'+lang;
			});
		});
	}

// Bind an event handler.
$(window).hashchange( function(e) {

  if ( get_hash ('lang') === 'en') {
  	load_header('parts/header-en.html');
  	load_side('parts/side-en.html');
  }else{
  	load_header('parts/header.html');
  	load_side('parts/side.html');
  }
  load_main(get_url ());
  
});

// Manually trigger the event handler.
$(window).hashchange();

});

