(function($) {



var $event = $.event,
	$special,
	resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 150
};


function moveLeft( ele, offset, timeOffset ) {

	var winWidth = $(window).width();
	var objectWidth = 0;
	var elementTar = ele;


	objectWidth = elementTar.width();
	objectWidth = objectWidth;
	objectWidth += offset;
	var leftValue = winWidth - objectWidth + "px";
	elementTar.velocity({
		left: leftValue},
			{
			delay: timeOffset
			}
		);
}

(function($){


	//* This is an extension of Stephen Fairbanks' simple progress bar that allows you to create multiple progress bars. Don't know if this is the most elegant way to do it but it works.     */
	function moveProgressBar() {

		//Create arrays to hold the wrapper divs and progress-bar divs respectively
		var progressWrap = [];
		var progressBar = [];
     var windowWidth = $( window ).width();
    var responsive = ( windowWidth > 450 ) ? false : true;

		$('.progress-wrap').each(function(){
			//adds each div with the class to the progressWrap array
			progressWrap.push(this);

		});

		$(".progress-bar").each(function(){
			//adds each div with the class to the progressBar array
			progressBar.push(this);
		});
// Loop through each div in the progressWrap array
		for ( var i = 0; i < progressWrap.length; i++) {
// Find percentage based on the element's data attribute
			var getPercent = ($(progressWrap[i]).data('progress-percent') / 100);
      
      // If the viewport width is small enough then measure the element's height
      if (responsive) { var getProgressWrapDimension = $(progressWrap[i]).height();
   // Otherwise measure the element's width
} else { 
			var getProgressWrapDimension = $(progressWrap[i]).width();
      }
      
      // math === profit
			var progressTotal = getPercent * getProgressWrapDimension;

			var animationLength = 500;
			// Assign value to left

     
      if ( responsive === false ) {

        $(progressBar[i]).stop().velocity({
				left: progressTotal,
        top: 0  
			}, { duration: animationLength, delay: 1500, easing: "swing"});
      } else {
     progressTotal =  -Math.abs(progressTotal);
        $(progressBar[i]).stop().velocity({
				top: progressTotal,
        left: 0
			}, { duration: animationLength, delay: 1500, easing: "swing" });
        
      }   
		}
      
	}
	// on page load...
	$(document).ready(moveProgressBar());
	// on browser resize...
	$(window).bind("debouncedresize", function() {
    $('.progress-bar').css({'top': '0', 'left' : '0'});
		moveProgressBar();

	});



})(jQuery);


//Type out text to screen
// (function($) {
// var showText = function (target, message, index, interval) {   
  
  
//   if (index < message.length) {
  	
//     $(target).append(message[index++]);

//     setTimeout(function () { showText(target, message, index, interval); }, interval);
//   }
// }

// $(document).ready(showText('.full-width-header', 'Skills at a glance.', 0, 0));

// })(jQuery);


// Display Contact $('.card') 


// (function($){
// 	// var $('.card') = $('.$('.card')');
	

// moveLeft($('.card'), 0, 3500);

// $(window).bind("debouncedresize", function(){

// 	moveLeft($('.card'), 0, 0);

// 	});
// 	var mySequence = [
   
//     { e: $('.card'), p: { zIndex: 1 }, o: { duration: 0 } },

//     { e: $('.card'),
//       p: 'transition.perspectiveRightIn',
//       o: { duration: 900, sequenceQueue: false } 
//   	}
// ];

// 	$('.trigger').click( function() {
		
// 		var display = $('.card').css('display');
		

// 	if ( display === 'none' ) { 

// 		$.Velocity.RunSequence(mySequence);	

// 	} else {
// 		$('.card').hide();
// 		$('.card').velocity({opacity: 0},  100);
// 		}

// 	});
		
// })(jQuery);



//Menu Animation

(function($){

	
	var burger = $('.hamburglar'),
        isClosed = false;
	var count = false;
	var overlay = $('.overlay');
	var links = $('.menu-list');
	var toggler = $('.toggler');
 



    var menuControl = function() {
    	



		if ($(window).width() <= 700) {
			
		    	//Display the nav and hamburger -> X
		    if (isClosed === true) {
			var topOffset = 80 + $(document).scrollTop();
		        burger.removeClass('is-closed');
		        burger.addClass('is-open');
		    overlay.velocity({top: topOffset});

		    overlay
		      .velocity('fadeIn', 300);

		    links
		      .velocity({ 
		        opacity: 0.7,
		      
		      }, 500);
		        isClosed = false;
		      } 	else {
			//Hide the nav and X -> hamburger
		      	  burger.removeClass('is-open');
		        burger.addClass('is-closed');
						
		        links
		      	.velocity({ 
		        opacity: 0.4,
		      	});

		    	overlay
		      	.velocity('fadeOut', {
		        duration: 200,

		      	});
		        isClosed = true;
		      }

		} else {
			
			overlay.velocity('fadeIn', {
				duration: 200,
				opacity: 0.7
				});
			links
		      .velocity({ 
		        opacity: 0.7,
		      
		      }, 500);
			
			
			}
	};
        
$(document).ready(menuControl());    
//Menu Navigation 
$(window).bind("debouncedresize", function() {
menuControl();
});

function slide( from, to, toggleMenu ) {

var clickable = $('.menu-list ' + from);
var destination = $( to  + from );

count = true;
clickable.click(function(){
	if ($(window).width() <= 700 && toggleMenu) {
		menuControl();
	
	overlay
      .velocity('stop')
      .velocity('fadeOut', {
        duration: 500
      }
      );
	}
	destination
	.velocity("scroll", {queue: false
      }, {
	 duration: 500, easing: "spring", offset: -590 
	});

	

});

}

toggler.click(function(){

	menuControl();
});
	


slide('.first-example', '.portfolio-section', true );
slide('.second-example', '.portfolio-section', true );
slide('.third-example', '.portfolio-section', true );

slide('.white-theme', '.flex-page-container', true );
slide('.green-theme', '.flex-page-container', true );
slide('.orange-theme', '.flex-page-container', true);
slide('.blue-theme', '.flex-page-container', true);
slide('.purple-theme', '.flex-page-container', true);


moveLeft( toggler, 0, 0);
// toggler.velocity('fadeIn', {delay: 4000, duration: 1900});
$(window).bind('debouncedresize',  function() {
	moveLeft( toggler, 0, 500);
});



}(jQuery));




	$('.menu-item').click(function(e) {
		e.preventDefault();

		$('.menu-item.active').removeClass('active');	
		$(this).addClass('active');
	});



function isSafari() {
    return /^((?!chrome).)*safari/i.test(navigator.userAgent);
} var safari = isSafari();

if (safari !== false ) {
		
		function loadCSS(filename){ 

       	var file = document.createElement("link");
      	file.setAttribute("rel", "stylesheet");
       	file.setAttribute("type", "text/css");
    	   file.setAttribute("href", filename);

       if (typeof file !== "undefined")
          document.getElementsByTagName("head")[0].appendChild(file);
    }

    loadCSS("wp-content/themes/bootstrap/safariStyle.css");
} 




}(jQuery));


(function ($) {

function deselect(e) {
  $('.extra-text').slideFadeToggle(function() {
    e.removeClass('selected');
  });    
}

$(function() {
  $('#trigger-text').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));               
    } else {
      $(this).addClass('selected');
      $('.extra-text').slideFadeToggle();
    }
    return false;
  });

  $('.close').on('click', function() {
    deselect($('#trigger-text'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
};
}(jQuery));

