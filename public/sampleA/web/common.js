$(function() {

	/* 위,아래 버튼, nav 링크 이동 함수  */
	$('a[href*="#"]:not([href="#"])').click(function(e) {
		var nowHash = this.hash;
		var nextId = $(nowHash).next('div');
		nextId = nextId.length ? nextId[0].id : false;
		//console.log(nowHash +'/'+ nextId);

		if(nowHash == 'firstPage') return false;

		if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')) {
			var target = $(nowHash);
			target = target.length ? target : $('[name=' + nowHash.slice(1) +']');
			if(target.length) {
				if ($('body').hasClass('menu-active')) $('.menu-trigger').click();
				$('html, body').animate({scrollTop: target.offset().top}, 700);
				return false;
			}

			var par = e.target.parentNode;
			if(par.parentNode.className == 'faq_tab'){
				$(".faq_tab > li").removeClass('on');
				$(".faq_list > li").removeClass('on');
				$(par).addClass('on');
				$(".faq_list ."+nowHash.slice(1)).addClass('on');
				return false;
			}else if(par.parentNode.parentNode.parentNode.className == 'faq_list'){
				var click_me = $(par).find('p').css('display');
				if(click_me == 'none') $(".faq_list p").slideUp();
				$(par).find('p').slideToggle();
				return false;
			}
		}
	});

	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
	var navi = false;

	if (!mobile){
		navi = true;
	}
	var addDelay = function() {
		$('body').addClass('is-delay');
		setTimeout(
			function() {
				$('body').removeClass('is-delay');
			}, 0
		);
		$.fn.fullpage.setAllowScrolling(false);
		$('body').addClass('menu-active');
		if(!navi) $.fn.fullpage.setResponsive(false);
	};

	var removeDelay = function() {
		// $('body').addClass('is-delay');
		setTimeout(
			function() {
				// $('body').removeClass('is-delay');
			}, 700
		);
		$.fn.fullpage.setAllowScrolling(true);
		$('body').removeClass('menu-active');
		if(!navi) $.fn.fullpage.setResponsive(true);
	};

	// 화면 풀 사이즈로 자동 리사이즈
	$.fn.fullVideo = function() {
		var $wrapper = this,
		$medias = $wrapper.find('img, video');

		var resizeVideo = function() {
			var winW = $(window).width(),
			winH = $(window).height(),
			winRatio = winW/winH,
			mediaW = winH * 16/8,
			mediaH = winW * 8/16,
			mediaRatio = mediaW / mediaH;

			mediaW = winH * 1200/600;
			mediaH = winW * 600/1200;

			if ( winRatio < mediaRatio ) {
				$(this).css({
					'height' : ((winH-90)/2)+'px'
				});
				$("#slide-menu").css('height',winH+'px');
				$(".page_v8 .sns").css('height',((winH-90)/2)+'px');
			} else {
				$(this).css({
					'height' : ((mediaH-90)/2)+'px'
				});
				$("#slide-menu").css('height',mediaH+'px');
				$(".page_v8 .sns").css('height',((mediaH-90)/2)+'px');
			}
		};

		resizeVideo();

		// resize event
		var resizeTimer;
		$(window).on('resize', function(e) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				resizeVideo();
			}, 250);
		});

		return this;
	};
	$('.page_v7').fullVideo();

	/* 메뉴 애니메이션 */
	$.fn.navAnimation = function() {
		var $target = this,
		$trigger = $('.menu-trigger');
		$trigger.on('click', function() {
			if ( $target.hasClass('menu-active') ) {
				removeDelay();
			} else {
				addDelay();
			}
		});

		$('.vd_filter, .vd_text').on('click', function(){
			if ( $target.hasClass('menu-active') ) {
				removeDelay();
			}
		});
	};
	$('body').navAnimation();

	/* 구글 맵 */
	$.fn.initialize_map = function(){
		var Y_point = 37.5116656;
		var X_point = 127.0349142;
		var zoomLevel = 17;
		var markerTitle = "테스트구글맵";
		var markerMaxWidth = 300;
		var image = '/web/images/gmap_marker_v2_on.png';
		var myLatlng = new google.maps.LatLng(Y_point, X_point);
		var mapOptions = {
			center: myLatlng,
			scrollwheel: false,
			draggable: false,
			zoom: zoomLevel,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById('map_view'), mapOptions);

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			animation: google.maps.Animation.BOUNCE,
			icon: image,
			title: markerTitle
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}
	$('body').initialize_map();

	$('.phone_animation .coin').bind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",  function(){
		var on_state = $('.phone_animation').hasClass('on');
		if(on_state){
			$('.phone_animation .left_circle, .phone_animation .right_circle, .phone_animation .call, .phone_animation .coin').css({
				'-moz-transition':'all 1200ms',
				'-webkit-transition':'all 1200ms',
				'transition':'all 1200ms',
				'-moz-transition-delay':'600ms',
				'-webkit-transition-delay':'600ms',
				'transition-delay':'600ms'
			});

			//on상태에서 종료
			var eventTimer;
			clearTimeout(eventTimer);
			eventTimer = setTimeout(function() {
				$('.phone_animation').removeClass('on');
			}, 600);
		}else{
			$('.phone_animation .left_circle, .phone_animation .right_circle, .phone_animation .call, .phone_animation .coin').attr('style','');

			//off상태에서 시작
			var eventTimer;
			clearTimeout(eventTimer);
			eventTimer = setTimeout(function() {
				$('.page_v3 .call').removeClass('on');
				$('.phone_animation').addClass('on')
			}, 600);
		}
	});

	$('.user .coin').bind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",  function(){
		var on_state = $('.user').hasClass('on');
		if(on_state){
			$('.user .over_deco ul li, .user .under_deco .depth1_circle .circle, .user .under_deco .depth2_circle .circle, .user .under_deco .call').css({
				'-moz-transition':'all 1200ms',
				'-webkit-transition':'all 1200ms',
				'transition':'all 1200ms',
				'-moz-transition-delay':'600ms',
				'-webkit-transition-delay':'600ms',
				'transition-delay':'600ms'
			});

			//on상태에서 종료
			var eventTimer;
			clearTimeout(eventTimer);
			eventTimer = setTimeout(function() {
				$('.user').removeClass('on');
			}, 600);
		}else{
			$('.user .over_deco ul li, .user .under_deco .depth1_circle .circle, .user .under_deco .depth2_circle .circle, .user .under_deco .call').attr('style','');

			//off상태에서 시작
			var eventTimer;
			clearTimeout(eventTimer);
			eventTimer = setTimeout(function() {
				$('.page_v4 .call').removeClass('on');
				$('.user').addClass('on')
			}, 600);
		}
	});

	$('.page_v3 .call, .page_v4 .call').bind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function(){
		var on_state = $(clsName).hasClass('on');
		var clsName = "."+this.className.split(" ")[1];
		if(!on_state){
			$(clsName).addClass('on');
		}
	});

});

function setMovePage(move_no){
	$.fn.fullpage.moveTo(move_no);
	return false;
}

$(document).ready(function(){

	/* 모바일 체크 */
	/*var filter = "win16|win32|win64|mac|macintel",
		navi = true;
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			//모바일임
			navi = false;

			//모바일 페이스북 링크 교체
			var fb_link = 'fb://facewebmodal/f?href=https://www.facebook.com/cashcall01/';
			$('.menu_btn .fb a').attr('href',fb_link);
			$('#slide-menu .ico_facebook a').attr('href',fb_link);
			$('.page_v8 .fb a').attr('href',fb_link);
			$('.wrap_footer .social .facebook a').attr('href',fb_link);
			//모바일 플레이스토어 링크 교체
			var ps_link = 'market://details?id=kr.co.monkid.cashcall';
			$('.menu_btn .ps a').attr('href',ps_link);
			$('#slide-menu .ico_playstore a').attr('href',ps_link);
			$('.page_v8 .ps a').attr('href',ps_link);
			$('.wrap_footer .social .playstore a').attr('href',ps_link);
		}
	}*/
	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
	var navi = false;

	if (mobile){
		// 유저에이전트를 불러와서 OS를 구분합니다.
		var userAgent = navigator.userAgent.toLowerCase();
		if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)){
			currentOS = "ios";
		}else{
			//모바일 페이스북 링크 교체
			var fb_link = 'fb://facewebmodal/f?href=https://www.facebook.com/cashcall01/';
			$('.menu_btn .fb a').attr('href',fb_link);
			$('#slide-menu .ico_facebook a').attr('href',fb_link);
			$('.page_v8 .fb a').attr('href',fb_link);
			$('.wrap_footer .social .facebook a').attr('href',fb_link);
			//모바일 플레이스토어 링크 교체
			var ps_link = 'market://details?id=kr.co.monkid.cashcall';
			$('.menu_btn .ps a').attr('href',ps_link);
			$('#slide-menu .ico_playstore a').attr('href',ps_link);
			$('.page_v8 .ps a').attr('href',ps_link);
			$('.wrap_footer .social .playstore a').attr('href',ps_link);
		}
	}else{
		navi = true;
	}

	$('#slide-menu a').on('click', function() {
		$('body').removeClass('menu-active');
		$.fn.fullpage.setAllowScrolling(true);
		if(!navi){
			$.fn.fullpage.setResponsive(true);
		}
	});

	$('.super_kori').on('click', function() {
		$.fn.fullpage.setScrollingSpeed(3000);
		if(!navi) $.fn.fullpage.setResponsive(false);

		var winH = $(window).height();
		if(winH < 1000){
			var section_num = $(".section").length;
			for(var i=0;i<section_num;i++){
				winH += $(".section:eq("+i+")").outerHeight();
			}
		}
		$('.fp-scrollable').css('overflow','visible');
		$('.fp-scroller').css('overflow','visible');

		var translate3d_min = $("#container").css("transform").split(" ").sort()[0].replace(/\)/g,'').replace(/\,/g,'');
		var translate3d_num = translate3d_min-winH;
		var translate3d_css = 'translate3d(0px, '+translate3d_num+'px, 0px)';
		$('.super_kori').css({
			'-moz-transition-duration':'3000ms',
			'-webkit-transition-duration':'3000ms',
			'transition-duration':'3000ms',
			'-moz-transition-timing-function':'ease',
			'-webkit-transition-timing-function':'ease',
			'transition-timing-function':'ease',
			'-moz-transform':translate3d_css,
			'-webkit-transform':translate3d_css,
			'transform':translate3d_css
		});

		$('.super_kori').addClass('up').animate({'z-index':9999}, 3000, function(){
			$('.fp-scrollable').css('overflow','hidden');
			$('.fp-scroller').css('overflow','hidden');
			$('.super_kori').attr('style','');
			$('.super_kori').removeClass('up');
			if(!navi) $.fn.fullpage.setResponsive(true);
		});
	});

	$('#container').fullpage({
		//anchors: ['firstPage', '1Page', '2Page', '3Page', '4Page', '5Page', '6Page', '7Page', '8Page', 'lastPage'],
		scrollOverflow: true,
		scrollOverflowOptions: {
			click: true
		},
		'navigation': navi,
		'navigationPosition': 'right',
		'onLeave': function(index, nextIndex, direction){
			$.fn.fullpage.setAllowScrolling(true);
			$.fn.fullpage.setScrollingSpeed(1000);
			var winH = $(window).height();
			var event_p2=4, event_p3=5, event_p4=6, event_p5=7, event_p6=10;
			if(nextIndex==1 || nextIndex==5 || nextIndex==6 || nextIndex==9){
				$('#fp-nav').addClass("white");
			}else{
				$('#fp-nav').removeClass("white");
			}

			if(nextIndex > 1){
				if(navi){
					$('.nav_btn_wrap img').attr('src', '/web/images/menu_btn_toggle_on.png')
				}
				$('body').addClass("is-scroll");
				$('.over_line').addClass("on");
			}else{
				if(navi){
					$('.nav_btn_wrap img').attr('src', '/web/images/menu_btn_toggle.png')
				}
				$('body').removeClass("is-scroll");
				$('.over_line').removeClass("on");
			}

			if(navi){
				if(nextIndex == event_p2){
					$('body').addClass("fadein");
					/* 막대들 모션 변화 */
					$(".hero_line, .hero_dot").css("transform", "translate3d(0px, 0px, 0px)");
				}else if(index <= event_p2 && nextIndex > event_p2 && direction == 'down'){
					/* 막대들 모션 변화 */
					var transY = -(winH/2);
					$(".hero_line, .hero_dot").css("transform", "translate3d(0px, "+transY+"px, 0px)");
				}else if(index >= (event_p2-1) && nextIndex < (event_p2-1) && direction == 'up'){
					$('body').removeClass("fadein");
					/* 막대들 모션 변화 */
					var transY = (winH/2);
					$(".hero_line, .hero_dot").css("transform", "translate3d(0px, "+transY+"px, 0px)");
				}
			}else{
				if(nextIndex == event_p2 || nextIndex == 3){
					$('body').addClass("fadein");
					/* 막대들 모션 변화 */
					$(".hero_line, .hero_dot").css("transform", "translate3d(0px, 0px, 0px)");
				}else if(index <= event_p2 && nextIndex > event_p2 && direction == 'down'){
					/* 막대들 모션 변화 */
					var transY = -(winH/2);
					$(".hero_line, .hero_dot").css("transform", "translate3d(0px, "+transY+"px, 0px)");
				}else if(index >= event_p2 && nextIndex < event_p2 && direction == 'up'){
					$('body').removeClass("fadein");
					/* 막대들 모션 변화 */
					var transY = (winH/2);
					$(".hero_line, .hero_dot").css("transform", "translate3d(0px, "+transY+"px, 0px)");
				}
			}

			if(nextIndex == event_p3){
				$('body').addClass("fadein_1");
			}else if(index >= event_p3 && nextIndex < event_p3 && direction == 'up'){
				$('body').removeClass("fadein_1");
			}
			if(nextIndex == event_p4){
				$('body').addClass("fadein_2");
			}else if(index >= event_p4 && nextIndex < event_p4 && direction == 'up'){
				$('body').removeClass("fadein_2");
			}

			if(nextIndex == event_p5){
				$('.user').addClass("on");
			}else if(index >= event_p5 && nextIndex < event_p5 && direction == 'up'){
				$('.user').removeClass("on");
				$('.call').removeClass("on");
			}

			if (index == event_p6 && nextIndex == 1 && direction == 'up'){
				$.fn.fullpage.setScrollingSpeed(3000);
			}
		},
		afterRender: function(){
			$.fn.fullpage.setRecordHistory(false);
			if(!navi) $.fn.fullpage.setResponsive(true);

			$('#fp-nav').addClass("white");

			var winH = $(window).height();
			/* 막대들 모션 변화 */
			var transY = (winH/2);
			$(".hero_line, .hero_dot").css("transform", "translate3d(0px, "+transY+"px, 0px)");
        }
	});


});
