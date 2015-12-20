
(function($){

	$(function(){
		var $side_btn_arrow = $('.side__btn--arrow');

		$side_btn_arrow.on('click', function(e) {
			e.preventDefault();
			var $self = $(this);
			var $self_ul = $self.next().next();
			var state = $self_ul.css('display');
			if(state == 'none'){
				$self.html('▼');
				$self_ul.show();
			}else{
				$self.html('▶');
				$self_ul.hide();
			}
		});

		//$('.p_03_01').addClass('side--is-current').parents('ul').show().find('.side__btn--arrow').html('▼');

var $f_main = $('#frame_main'), url;

function load()
{
url = $f_main.attr('src');
console.log(url);
}

$('.language a').on('click', function (e) {
	e.preventDefault();
	url = $f_main.attr('src');
	console.log(url);
	switch($(this).attr('id')) {
		case 'lug-cn':
			// $(this).toggleClass('current');
			$f_main.attr('src',$('#frame_main').attr('src').replace(/^page-en\//,'page\/'));
			break;
		case 'lug-en':
			$('#frame_main').attr('src',$('#frame_main').attr('src').replace(/^page\//,'page-en\/'));
			break;
	}
});

	});

})(jQuery);

