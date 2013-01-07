/*! Backstretch - v2.0.1 - 2012-10-01
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2012 Scott Robbin; Licensed MIT */
(function(e,t,n){"use strict";e.fn.backstretch=function(r,s){return(r===n||r.length===0)&&e.error("No images were supplied for Backstretch"),e(t).scrollTop()===0&&t.scrollTo(0,0),this.each(function(){var t=e(this),n=t.data("backstretch");n&&(s=e.extend(n.options,s),n.destroy(!0)),n=new i(this,r,s),t.data("backstretch",n)})},e.backstretch=function(t,n){return e("body").backstretch(t,n).data("backstretch")},e.expr[":"].backstretch=function(t){return e(t).data("backstretch")!==n},e.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5e3,fade:0};var r={wrap:{left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},img:{position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxWidth:"none",zIndex:-999999}},i=function(n,i,o){this.options=e.extend({},e.fn.backstretch.defaults,o||{}),this.images=e.isArray(i)?i:[i],e.each(this.images,function(){e("<img />")[0].src=this}),this.isBody=n===document.body,this.$container=e(n),this.$wrap=e('<div class="backstretch"></div>').css(r.wrap).appendTo(this.$container),this.$root=this.isBody?s?e(t):e(document):this.$container;if(!this.isBody){var u=this.$container.css("position"),a=this.$container.css("zIndex");this.$container.css({position:u==="static"?"relative":u,zIndex:a==="auto"?0:a,background:"none"}),this.$wrap.css({zIndex:-999998})}this.$wrap.css({position:this.isBody&&s?"fixed":"absolute"}),this.index=0,this.show(this.index),e(t).on("resize.backstretch",e.proxy(this.resize,this)).on("orientationchange.backstretch",e.proxy(function(){this.isBody&&t.pageYOffset===0&&(t.scrollTo(0,1),this.resize())},this))};i.prototype={resize:function(){try{var e={left:0,top:0},n=this.isBody?this.$root.width():this.$root.innerWidth(),r=n,i=this.isBody?t.innerHeight?t.innerHeight:this.$root.height():this.$root.innerHeight(),s=r/this.$img.data("ratio"),o;s>=i?(o=(s-i)/2,this.options.centeredY&&(e.top="-"+o+"px")):(s=i,r=s*this.$img.data("ratio"),o=(r-n)/2,this.options.centeredX&&(e.left="-"+o+"px")),this.$wrap.css({width:n,height:i}).find("img:not(.deleteable)").css({width:r,height:s}).css(e)}catch(u){}return this},show:function(t){if(Math.abs(t)>this.images.length-1)return;this.index=t;var n=this,i=n.$wrap.find("img").addClass("deleteable"),s=e.Event("backstretch.show",{relatedTarget:n.$container[0]});return clearInterval(n.interval),n.$img=e("<img />").css(r.img).bind("load",function(t){var r=this.width||e(t.target).width(),o=this.height||e(t.target).height();e(this).data("ratio",r/o),n.resize(),e(this).fadeIn(n.options.speed||n.options.fade,function(){i.remove(),n.paused||n.cycle(),n.$container.trigger(s)})}).appendTo(n.$wrap),n.$img.attr("src",n.images[t]),n},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(this.index===0?this.images.length-1:this.index-1)},pause:function(){return this.paused=!0,this},resume:function(){return this.paused=!1,this.next(),this},cycle:function(){return this.images.length>1&&(clearInterval(this.interval),this.interval=setInterval(e.proxy(function(){this.paused||this.next()},this),this.options.duration)),this},destroy:function(n){e(t).off("resize.backstretch orientationchange.backstretch"),clearInterval(this.interval),n||this.$wrap.remove(),this.$container.removeData("backstretch")}};var s=function(){var e=navigator.userAgent,n=navigator.platform,r=e.match(/AppleWebKit\/([0-9]+)/),i=!!r&&r[1],s=e.match(/Fennec\/([0-9]+)/),o=!!s&&s[1],u=e.match(/Opera Mobi\/([0-9]+)/),a=!!u&&u[1],f=e.match(/MSIE ([0-9]+)/),l=!!f&&f[1];return!((n.indexOf("iPhone")>-1||n.indexOf("iPad")>-1||n.indexOf("iPod")>-1)&&i&&i<534||t.operamini&&{}.toString.call(t.operamini)==="[object OperaMini]"||u&&a<7458||e.indexOf("Android")>-1&&i&&i<533||o&&o<6||"palmGetResource"in t&&i&&i<534||e.indexOf("MeeGo")>-1&&e.indexOf("NokiaBrowser/8.5.0")>-1||l&&l<=6)}()})(jQuery,window);

/*global jQuery */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    }

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() == 'object' || $this.attr('height') ) ? $this.attr('height') : $this.height(),
            width = $this.attr('width') ? $this.attr('width') : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  }
})( jQuery );


/*! http://responsiveslides.com v1.32 by @viljamis */
(function(d,D,v){d.fn.responsiveSlides=function(h){var b=d.extend({auto:!0,speed:1E3,timeout:4E3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!1,prevText:"Previous",nextText:"Next",maxwidth:"",controls:"",namespace:"rslides",before:function(){},after:function(){}},h);return this.each(function(){v++;var e=d(this),n,p,i,k,l,m=0,f=e.children(),w=f.size(),q=parseFloat(b.speed),x=parseFloat(b.timeout),r=parseFloat(b.maxwidth),c=b.namespace,g=c+v,y=c+"_nav "+g+"_nav",s=c+"_here",j=g+"_on",z=g+"_s",
o=d("<ul class='"+c+"_tabs "+g+"_tabs' />"),A={"float":"left",position:"relative"},E={"float":"none",position:"absolute"},t=function(a){b.before();f.stop().fadeOut(q,function(){d(this).removeClass(j).css(E)}).eq(a).fadeIn(q,function(){d(this).addClass(j).css(A);b.after();m=a})};b.random&&(f.sort(function(){return Math.round(Math.random())-0.5}),e.empty().append(f));f.each(function(a){this.id=z+a});e.addClass(c+" "+g);h&&h.maxwidth&&e.css("max-width",r);f.hide().eq(0).addClass(j).css(A).show();if(1<
f.size()){if(x<q+100)return;if(b.pager){var u=[];f.each(function(a){a=a+1;u=u+("<li><a href='#' class='"+z+a+"'>"+a+"</a></li>")});o.append(u);l=o.find("a");h.controls?d(b.controls).append(o):e.after(o);n=function(a){l.closest("li").removeClass(s).eq(a).addClass(s)}}b.auto&&(p=function(){k=setInterval(function(){f.stop(true,true);var a=m+1<w?m+1:0;b.pager&&n(a);t(a)},x)},p());i=function(){if(b.auto){clearInterval(k);p()}};b.pause&&e.hover(function(){clearInterval(k)},function(){i()});b.pager&&(l.bind("click",
function(a){a.preventDefault();b.pauseControls||i();a=l.index(this);if(!(m===a||d("."+j+":animated").length)){n(a);t(a)}}).eq(0).closest("li").addClass(s),b.pauseControls&&l.hover(function(){clearInterval(k)},function(){i()}));if(b.nav){c="<a href='#' class='"+y+" prev'>"+b.prevText+"</a><a href='#' class='"+y+" next'>"+b.nextText+"</a>";h.controls?d(b.controls).append(c):e.after(c);var c=d("."+g+"_nav"),B=d("."+g+"_nav.prev");c.bind("click",function(a){a.preventDefault();if(!d("."+j+":animated").length){var c=
f.index(d("."+j)),a=c-1,c=c+1<w?m+1:0;t(d(this)[0]===B[0]?a:c);b.pager&&n(d(this)[0]===B[0]?a:c);b.pauseControls||i()}});b.pauseControls&&c.hover(function(){clearInterval(k)},function(){i()})}}if("undefined"===typeof document.body.style.maxWidth&&h.maxwidth){var C=function(){e.css("width","100%");e.width()>r&&e.css("width",r)};C();d(D).bind("resize",function(){C()})}})}})(jQuery,this,0);
/**
 * Isotope v1.4.110721
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2011 David DeSandro / Metafizzy
 */
/*jshint curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, undef: true */
/*global Modernizr: true */
(function(a,b,c){function f(a){var b=document.documentElement.style,c;if(typeof b[a]=="string")return a;a=d(a);for(var f=0,g=e.length;f<g;f++){c=e[f]+a;if(typeof b[c]=="string")return c}}function d(a){return a.charAt(0).toUpperCase()+a.slice(1)}var e="Moz Webkit Khtml O Ms".split(" "),g=f("transform"),h={csstransforms:function(){return!!g},csstransforms3d:function(){var a=!!f("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),g=b('<div id="modernizr" />').appendTo("html");a=g.height()===3,g.remove(),e.remove()}return a},csstransitions:function(){return!!f("transitionProperty")}};if(a.Modernizr)for(var i in h)Modernizr.hasOwnProperty(i)||Modernizr.addTest(i,h[i]);else a.Modernizr=function(){var a={_version:"1.6ish: miniModernizr for Isotope"},c=" ",d,e;for(e in h)d=h[e](),a[e]=d,c+=" "+(d?"":"no-")+e;b("html").addClass(c);return a}();if(Modernizr.csstransforms){var j=Modernizr.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},k=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},h,i={},k;f[c]=d,b.extend(e,f);for(h in e)k=e[h],i[h]=j[h](k);var l=i.translate||"",m=i.scale||"",n=l+m;b.data(a,"isoTransform",e),a.style[g]=n};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){k(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){k(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var l=b.event,m;l.special.smartresize={setup:function(){b(this).bind("resize",l.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",l.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",m&&clearTimeout(m),m=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c){this.element=b(c),this._create(a),this._init()};var n=["overflow","position","width","height"];b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:Modernizr.csstransforms&&!b.browser.opera?{opacity:0,scale:.001}:{opacity:0},visibleStyle:Modernizr.csstransforms&&!b.browser.opera?{opacity:1,scale:1}:{opacity:1},animationEngine:b.browser.opera?"jquery":"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(c){this.options=b.extend({},b.Isotope.settings,c),this.styleQueue=[],this.elemCount=0;var d=this.element[0].style;this.originalStyle={};for(var e=0,f=n.length;e<f;e++){var g=n[e];this.originalStyle[g]=d[g]||null}this.element.css({overflow:"hidden",position:"relative"}),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems();var i=b(document.createElement("div")).prependTo(this.element);this.offset=i.position(),i.remove();var j=this;setTimeout(function(){j.element.addClass(j.options.containerClass)},0),this.options.resizable&&b(a).bind("smartresize.isotope",function(){j.resize()})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0);return c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var e in a)c="_update"+d(e),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,"");switch(a){case"css":case"none":this.isUsingJQueryAnimation=!1;break;case"jquery":this.isUsingJQueryAnimation=!0;break;default:this.isUsingJQueryAnimation=!Modernizr.csstransitions}this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){this.usingTransforms=this.options.transformsEnabled&&Modernizr.csstransforms&&Modernizr.csstransitions&&!this.isUsingJQueryAnimation,this.getPositionStyles=this.usingTransforms?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c);return a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g),c&&d.elemCount++})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order"));return(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b+=this.offset.left,c+=this.offset.top;var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(),b&&b.call(a),this.isLaidOut=!0},_processStyleQueue:function(){var a=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",c=this.options.animationOptions,d=this._isInserting&&this.isUsingJQueryAnimation,e;b.each(this.styleQueue,function(b,f){e=d&&f.$el.hasClass("no-transition")?"css":a,f.$el[e](f.style,c)}),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a,!0);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._processStyleQueue(),delete c._isInserting,b&&b(a)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a),a.remove()},shuffle:function(){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout()},destroy:function(){var c=this.usingTransforms;this.$allAtoms.removeClass(this.options.hiddenClass+" "+this.options.itemClass).each(function(){this.style.position=null,this.style.top=null,this.style.left=null,this.style.opacity=null,c&&(this.style[g]=null)});var d=this.element[0].style;for(var e=0,f=n.length;e<f;e++){var h=n[e];d[h]=this.originalStyle[h]}this.element.unbind(".isotope").removeClass(this.options.containerClass).removeData("isotope"),b(a).unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",e=a?"height":"width",f=a?"rows":"cols",g=this.element[e](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+d(e)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][f]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];this._getSegments(a);return this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=~~(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=~~(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){var b=this.find("img"),c=[],d=this,e=b.length;if(!b.length){a.call(this);return this}b.one("load error",function(){--e===0&&(e=b.length,b.one("load error",function(){--e===0&&a.call(d)}).each(function(){this.src=c.shift()}))}).each(function(){c.push(this.src),this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});return this};var o=function(a){this.console&&console.error(a)};b.fn.isotope=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"isotope");if(!d)o("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){o("no such method '"+a+"' for isotope instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"isotope");c?(c.option(a),c._init()):b.data(this,"isotope",new b.Isotope(a,this))});return this}})(window,jQuery);

// jQuery Easing
jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a+c;return-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){if((a/=d/2)<1)return b/
2*a*a*a+c;return b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a+c;return-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a*a+c;return b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,
a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){if(a==0)return c;if(a==d)return c+b;if((a/=d/2)<1)return b/2*Math.pow(2,10*(a-1))+c;return b/2*(-Math.pow(2,-10*--a)+2)+c},
easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){if((a/=d/2)<1)return-b/2*(Math.sqrt(1-a*a)-1)+c;return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f))+c},easeOutElastic:function(e,
a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);if(a<1)return-0.5*g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+c;return g*Math.pow(2,-10*(a-=1))*Math.sin((a*
d-e)*2*Math.PI/f)*0.5+b+c},easeInBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;if((a/=d/2)<1)return b/2*a*a*(((f*=1.525)+1)*a-f)+c;return b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=
d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){if(a<d/2)return jQuery.easing.easeInBounce(e,a*2,0,b,d)*0.5+c;return jQuery.easing.easeOutBounce(e,a*2-d,0,b,d)*0.5+b*0.5+c}});

/*
|--------------------------------------------------------------------------
| UItoTop jQuery Plugin 1.1
| http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
|--------------------------------------------------------------------------
*/

(function($){
	$.fn.UItoTop = function(options) {

 		var defaults = {
			text: 'To Top',
			min: 200,
			inDelay:600,
			outDelay:400,
  			containerID: 'toTop',
			containerHoverID: 'toTopHover',
			scrollSpeed: 1200,
			easingType: 'linear'
 		};

 		var settings = $.extend(defaults, options);
		var containerIDhash = '#' + settings.containerID;
		var containerHoverIDHash = '#'+settings.containerHoverID;
		
		$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
		$(containerIDhash).hide().click(function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="'+settings.containerHoverID+'"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() { 
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});
					
		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': $(window).scrollTop() + $(window).height() - 50
				});
			}
			if ( sd > settings.min ) 
				$(containerIDhash).fadeIn(settings.inDelay);
			else 
				$(containerIDhash).fadeOut(settings.Outdelay);
		});

};
})(jQuery);

/*! fancyBox v2.0.6 fancyapps.com | fancyapps.com/fancybox/#license */
(function(s,l,d,t){var m=d(s),q=d(l),a=d.fancybox=function(){a.open.apply(this,arguments)},u=!1,k=l.createTouch!==t,o=function(a){return"string"===d.type(a)},n=function(b,c){c&&o(b)&&0<b.indexOf("%")&&(b=a.getViewport()[c]/100*parseInt(b,10));return Math.round(b)+"px"};d.extend(a,{version:"2.0.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:!0,autoResize:!k,autoCenter:!k,fitToView:!0,aspectRatio:!1,topRatio:0.5,fixed:!1,scrolling:"auto",
wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},keys:{next:[13,32,34,39,40],prev:[8,33,37,38],close:[27]},tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"'+
(d.browser.msie?' allowtransparency="true"':"")+"></iframe>",swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<div title="Close" class="fancybox-item fancybox-close"></div>',next:'<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:300,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:300,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",
prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:300,opacity:0.8,css:{cursor:"pointer"},closeClick:!0},title:{type:"float"}}},group:{},opts:{},coming:null,current:null,isOpen:!1,isOpened:!1,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(b,c){a.close(!0);b&&!d.isArray(b)&&(b=b instanceof d?d(b).get():[b]);a.isActive=!0;a.opts=d.extend(!0,{},a.defaults,c);d.isPlainObject(c)&&c.keys!==t&&(a.opts.keys=c.keys?
d.extend({},a.defaults.keys,c.keys):!1);a.group=b;a._start(a.opts.index||0)},cancel:function(){a.coming&&!1===a.trigger("onCancel")||(a.coming=null,a.hideLoading(),a.ajaxLoad&&a.ajaxLoad.abort(),a.ajaxLoad=null,a.imgPreload&&(a.imgPreload.onload=a.imgPreload.onabort=a.imgPreload.onerror=null))},close:function(b){a.cancel();a.current&&!1!==a.trigger("beforeClose")&&(a.unbindEvents(),!a.isOpen||b&&!0===b[0]?(d(".fancybox-wrap").stop().trigger("onReset").remove(),a._afterZoomOut()):(a.isOpen=a.isOpened=
!1,d(".fancybox-item, .fancybox-nav").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.closeMethod]()))},play:function(b){var c=function(){clearTimeout(a.player.timer)},e=function(){c();a.current&&a.player.isActive&&(a.player.timer=setTimeout(a.next,a.current.playSpeed))},f=function(){c();d("body").unbind(".player");a.player.isActive=!1;a.trigger("onPlayEnd")};if(a.player.isActive||b&&!1===b[0])f();else if(a.current&&(a.current.loop||
a.current.index<a.group.length-1))a.player.isActive=!0,d("body").bind({"afterShow.player onUpdate.player":e,"onCancel.player beforeClose.player":f,"beforeLoad.player":c}),e(),a.trigger("onPlayStart")},next:function(){a.current&&a.jumpto(a.current.index+1)},prev:function(){a.current&&a.jumpto(a.current.index-1)},jumpto:function(b){a.current&&(b=parseInt(b,10),1<a.group.length&&a.current.loop&&(b>=a.group.length?b=0:0>b&&(b=a.group.length-1)),a.group[b]!==t&&(a.cancel(),a._start(b)))},reposition:function(b,
c){var e;a.isOpen&&(e=a._getPosition(c),b&&"scroll"===b.type?(delete e.position,a.wrap.stop(!0,!0).animate(e,200)):a.wrap.css(e))},update:function(b){a.isOpen&&(u||setTimeout(function(){var c=a.current,e=!b||b&&"orientationchange"===b.type;if(u&&(u=!1,c)){if(!b||"scroll"!==b.type||e)c.autoSize&&"iframe"!==c.type&&(a.inner.height("auto"),c.height=a.inner.height()),(c.autoResize||e)&&a._setDimension(),c.canGrow&&"iframe"!==c.type&&a.inner.height("auto");(c.autoCenter||e)&&a.reposition(b);a.trigger("onUpdate")}},
200),u=!0)},toggle:function(){a.isOpen&&(a.current.fitToView=!a.current.fitToView,a.update())},hideLoading:function(){q.unbind("keypress.fb");d("#fancybox-loading").remove()},showLoading:function(){a.hideLoading();q.bind("keypress.fb",function(b){27===b.keyCode&&(b.preventDefault(),a.cancel())});d('<div id="fancybox-loading"><div></div></div>').click(a.cancel).appendTo("body")},getViewport:function(){return{x:m.scrollLeft(),y:m.scrollTop(),w:k&&s.innerWidth?s.innerWidth:m.width(),h:k&&s.innerHeight?
s.innerHeight:m.height()}},unbindEvents:function(){a.wrap&&a.wrap.unbind(".fb");q.unbind(".fb");m.unbind(".fb")},bindEvents:function(){var b=a.current,c=b.keys;b&&(m.bind("resize.fb orientationchange.fb"+(b.autoCenter&&!b.fixed?" scroll.fb":""),a.update),c&&q.bind("keydown.fb",function(b){var f;f=b.target||b.srcElement;if(!b.ctrlKey&&!b.altKey&&!b.shiftKey&&!b.metaKey&&(!f||!f.type&&!d(f).is("[contenteditable]")))f=b.keyCode,-1<d.inArray(f,c.close)?(a.close(),b.preventDefault()):-1<d.inArray(f,c.next)?
(a.next(),b.preventDefault()):-1<d.inArray(f,c.prev)&&(a.prev(),b.preventDefault())}),d.fn.mousewheel&&b.mouseWheel&&1<a.group.length&&a.wrap.bind("mousewheel.fb",function(b,c){var d=b.target||null;if(0!==c&&(!d||0===d.clientHeight||d.scrollHeight===d.clientHeight&&d.scrollWidth===d.clientWidth))b.preventDefault(),a[0<c?"prev":"next"]()}))},trigger:function(b,c){var e,f=c||a[-1<d.inArray(b,["onCancel","beforeLoad","afterLoad"])?"coming":"current"];if(f){d.isFunction(f[b])&&(e=f[b].apply(f,Array.prototype.slice.call(arguments,
1)));if(!1===e)return!1;f.helpers&&d.each(f.helpers,function(c,e){if(e&&d.isPlainObject(a.helpers[c])&&d.isFunction(a.helpers[c][b]))a.helpers[c][b](e,f)});d.event.trigger(b+".fb")}},isImage:function(a){return o(a)&&a.match(/\.(jpe?g|gif|png|bmp)((\?|#).*)?$/i)},isSWF:function(a){return o(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(b){var c={},e=a.group[b]||null,f,g,i;if(e&&(e.nodeType||e instanceof d))f=!0,d.metadata&&(c=d(e).metadata());c=d.extend(!0,{},a.opts,{index:b,element:e},d.isPlainObject(e)?
e:c);d.each(["href","title","content","type"],function(b,g){c[g]=a.opts[g]||f&&d(e).attr(g)||c[g]||null});"number"===typeof c.margin&&(c.margin=[c.margin,c.margin,c.margin,c.margin]);c.modal&&d.extend(!0,c,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:!1}}});a.coming=c;if(!1===a.trigger("beforeLoad"))a.coming=null;else{g=c.type;b=c.href||e;g||(f&&(g=d(e).data("fancybox-type"),g||(g=(g=e.className.match(/fancybox\.(\w+)/))?
g[1]:null)),!g&&o(b)&&(a.isImage(b)?g="image":a.isSWF(b)?g="swf":b.match(/^#/)&&(g="inline")),g||(g=f?"inline":"html"),c.type=g);if("inline"===g||"html"===g){if(c.content||(c.content="inline"===g?d(o(b)?b.replace(/.*(?=#[^\s]+$)/,""):b):e),!c.content||!c.content.length)g=null}else b||(g=null);"ajax"===g&&o(b)&&(i=b.split(/\s+/,2),b=i.shift(),c.selector=i.shift());c.href=b;c.group=a.group;c.isDom=f;switch(g){case "image":a._loadImage();break;case "ajax":a._loadAjax();break;case "inline":case "iframe":case "swf":case "html":a._afterLoad();
break;default:a._error("type")}}},_error:function(b){a.hideLoading();d.extend(a.coming,{type:"html",autoSize:!0,minWidth:0,minHeight:0,padding:15,hasError:b,content:a.coming.tpl.error});a._afterLoad()},_loadImage:function(){var b=a.imgPreload=new Image;b.onload=function(){this.onload=this.onerror=null;a.coming.width=this.width;a.coming.height=this.height;a._afterLoad()};b.onerror=function(){this.onload=this.onerror=null;a._error("image")};b.src=a.coming.href;(b.complete===t||!b.complete)&&a.showLoading()},
_loadAjax:function(){a.showLoading();a.ajaxLoad=d.ajax(d.extend({},a.coming.ajax,{url:a.coming.href,error:function(b,c){a.coming&&"abort"!==c?a._error("ajax",b):a.hideLoading()},success:function(b,c){"success"===c&&(a.coming.content=b,a._afterLoad())}}))},_preloadImages:function(){var b=a.group,c=a.current,e=b.length,f,g,i,h=Math.min(c.preload,e-1);if(c.preload&&!(2>b.length))for(i=1;i<=h;i+=1)if(f=b[(c.index+i)%e],g=f.href||d(f).attr("href")||f,"image"===f.type||a.isImage(g))(new Image).src=g},_afterLoad:function(){a.hideLoading();
!a.coming||!1===a.trigger("afterLoad",a.current)?a.coming=!1:(a.isOpened?(d(".fancybox-item, .fancybox-nav").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.prevMethod]()):(d(".fancybox-wrap").stop().trigger("onReset").remove(),a.trigger("afterClose")),a.unbindEvents(),a.isOpen=!1,a.current=a.coming,a.wrap=d(a.current.tpl.wrap).addClass("fancybox-"+(k?"mobile":"desktop")+" fancybox-type-"+a.current.type+" fancybox-tmp "+a.current.wrapCSS).appendTo("body"),
a.skin=d(".fancybox-skin",a.wrap).css("padding",n(a.current.padding)),a.outer=d(".fancybox-outer",a.wrap),a.inner=d(".fancybox-inner",a.wrap),a._setContent())},_setContent:function(){var b=a.current,c=b.content,e=b.type,f=b.minWidth,g=b.minHeight,i=b.maxWidth,h=b.maxHeight;switch(e){case "inline":case "ajax":case "html":b.selector?c=d("<div>").html(c).find(b.selector):c instanceof d&&(c.parent().hasClass("fancybox-inner")&&c.parents(".fancybox-wrap").unbind("onReset"),c=c.show().detach(),d(a.wrap).bind("onReset",
function(){c.appendTo("body").hide()}));b.autoSize&&(f=d('<div class="fancybox-wrap '+a.current.wrapCSS+' fancybox-tmp"></div>').appendTo("body").css({minWidth:n(f,"w"),minHeight:n(g,"h"),maxWidth:n(i,"w"),maxHeight:n(h,"h")}).append(c),b.width=f.width(),b.height=f.height(),f.width(a.current.width),f.height()>b.height&&(f.width(b.width+1),b.width=f.width(),b.height=f.height()),c=f.contents().detach(),f.remove());break;case "image":c=b.tpl.image.replace("{href}",b.href);b.aspectRatio=!0;break;case "swf":c=
b.tpl.swf.replace(/\{width\}/g,b.width).replace(/\{height\}/g,b.height).replace(/\{href\}/g,b.href);break;case "iframe":c=d(b.tpl.iframe.replace("{rnd}",(new Date).getTime())).attr("scrolling",b.scrolling).attr("src",b.href),b.scrolling=k?"scroll":"auto"}if("image"===e||"swf"===e)b.autoSize=!1,b.scrolling="visible";"iframe"===e&&b.autoSize?(a.showLoading(),a._setDimension(),a.inner.css("overflow",b.scrolling),c.bind({onCancel:function(){d(this).unbind();a._afterZoomOut()},load:function(){a.hideLoading();
try{this.contentWindow.document.location&&(a.current.height=d(this).contents().find("body").height())}catch(b){a.current.autoSize=!1}a[a.isOpen?"_afterZoomIn":"_beforeShow"]()}}).appendTo(a.inner)):(a.inner.append(c),a._beforeShow())},_beforeShow:function(){a.coming=null;a.trigger("beforeShow");a._setDimension();a.wrap.hide().removeClass("fancybox-tmp");a.bindEvents();a._preloadImages();a.transitions[a.isOpened?a.current.nextMethod:a.current.openMethod]()},_setDimension:function(){var b=a.wrap,c=
a.inner,e=a.current,f=a.getViewport(),g=e.margin,i=2*e.padding,h=e.width,j=e.height,r=e.maxWidth+i,k=e.maxHeight+i,l=e.minWidth+i,m=e.minHeight+i,p;f.w-=g[1]+g[3];f.h-=g[0]+g[2];o(h)&&0<h.indexOf("%")&&(h=(f.w-i)*parseFloat(h)/100);o(j)&&0<j.indexOf("%")&&(j=(f.h-i)*parseFloat(j)/100);g=h/j;h+=i;j+=i;e.fitToView&&(r=Math.min(f.w,r),k=Math.min(f.h,k));if(e.aspectRatio){if(h>r&&(h=r,j=(h-i)/g+i),j>k&&(j=k,h=(j-i)*g+i),h<l&&(h=l,j=(h-i)/g+i),j<m)j=m,h=(j-i)*g+i}else h=Math.max(l,Math.min(h,r)),j=Math.max(m,
Math.min(j,k));h=Math.round(h);j=Math.round(j);d(b.add(c)).width("auto").height("auto");c.width(h-i).height(j-i);b.width(h);p=b.height();if(h>r||p>k)for(;(h>r||p>k)&&h>l&&p>m;)j-=10,e.aspectRatio?(h=Math.round((j-i)*g+i),h<l&&(h=l,j=(h-i)/g+i)):h-=10,c.width(h-i).height(j-i),b.width(h),p=b.height();e.dim={width:n(h),height:n(p)};e.canGrow=e.autoSize&&j>m&&j<k;e.canShrink=!1;e.canExpand=!1;if(h-i<e.width||j-i<e.height)e.canExpand=!0;else if((h>f.w||p>f.h)&&h>l&&j>m)e.canShrink=!0;a.innerSpace=p-i-
c.height()},_getPosition:function(b){var c=a.current,e=a.getViewport(),f=c.margin,d=a.wrap.width()+f[1]+f[3],i=a.wrap.height()+f[0]+f[2],h={position:"absolute",top:f[0]+e.y,left:f[3]+e.x};c.autoCenter&&c.fixed&&!b&&i<=e.h&&d<=e.w&&(h={position:"fixed",top:f[0],left:f[3]});h.top=n(Math.max(h.top,h.top+(e.h-i)*c.topRatio));h.left=n(Math.max(h.left,h.left+0.5*(e.w-d)));return h},_afterZoomIn:function(){var b=a.current,c=b?b.scrolling:"no";if(b&&(a.isOpen=a.isOpened=!0,a.wrap.addClass("fancybox-opened"),
a.inner.css("overflow","yes"===c?"scroll":"no"===c?"hidden":c),a.trigger("afterShow"),a.update(),(b.closeClick||b.nextClick)&&a.inner.css("cursor","pointer").bind("click.fb",function(c){if(!d(c.target).is("a")&&!d(c.target).parent().is("a"))a[b.closeClick?"close":"next"]()}),b.closeBtn&&d(b.tpl.closeBtn).appendTo(a.skin).bind("click.fb",a.close),b.arrows&&1<a.group.length&&((b.loop||0<b.index)&&d(b.tpl.prev).appendTo(a.outer).bind("click.fb",a.prev),(b.loop||b.index<a.group.length-1)&&d(b.tpl.next).appendTo(a.outer).bind("click.fb",
a.next)),a.opts.autoPlay&&!a.player.isActive))a.opts.autoPlay=!1,a.play()},_afterZoomOut:function(){var b=a.current;a.wrap.trigger("onReset").remove();d.extend(a,{group:{},opts:{},current:null,isActive:!1,isOpened:!1,isOpen:!1,wrap:null,skin:null,outer:null,inner:null});a.trigger("afterClose",b)}});a.transitions={getOrigPosition:function(){var b=a.current,c=b.element,e=b.padding,f=d(b.orig),g={},i=50,h=50;!f.length&&b.isDom&&d(c).is(":visible")&&(f=d(c).find("img:first"),f.length||(f=d(c)));f.length?
(g=f.offset(),f.is("img")&&(i=f.outerWidth(),h=f.outerHeight())):(b=a.getViewport(),g.top=b.y+0.5*(b.h-h),g.left=b.x+0.5*(b.w-i));return g={top:n(g.top-e),left:n(g.left-e),width:n(i+2*e),height:n(h+2*e)}},step:function(b,c){var e=c.prop,d,g;if("width"===e||"height"===e)d=Math.ceil(b-2*a.current.padding),"height"===e&&(g=(b-c.start)/(c.end-c.start),c.start>c.end&&(g=1-g),d-=a.innerSpace*g),a.inner[e](d)},zoomIn:function(){var b=a.wrap,c=a.current,e=c.openEffect,f="elastic"===e,g=d.extend({},c.dim,
a._getPosition(f)),i=d.extend({opacity:1},g);delete i.position;f?(g=this.getOrigPosition(),c.openOpacity&&(g.opacity=0),a.outer.add(a.inner).width("auto").height("auto")):"fade"===e&&(g.opacity=0);b.css(g).show().animate(i,{duration:"none"===e?0:c.openSpeed,easing:c.openEasing,step:f?this.step:null,complete:a._afterZoomIn})},zoomOut:function(){var b=a.wrap,c=a.current,d=c.openEffect,f="elastic"===d,g={opacity:0};f&&("fixed"===b.css("position")&&b.css(a._getPosition(!0)),g=this.getOrigPosition(),c.closeOpacity&&
(g.opacity=0));b.animate(g,{duration:"none"===d?0:c.closeSpeed,easing:c.closeEasing,step:f?this.step:null,complete:a._afterZoomOut})},changeIn:function(){var b=a.wrap,c=a.current,d=c.nextEffect,f="elastic"===d,g=a._getPosition(f),i={opacity:1};g.opacity=0;f&&(g.top=n(parseInt(g.top,10)-200),i.top="+=200px");b.css(g).show().animate(i,{duration:"none"===d?0:c.nextSpeed,easing:c.nextEasing,complete:a._afterZoomIn})},changeOut:function(){var b=a.wrap,c=a.current,e=c.prevEffect,f={opacity:0};b.removeClass("fancybox-opened");
"elastic"===e&&(f.top="+=200px");b.animate(f,{duration:"none"===e?0:c.prevSpeed,easing:c.prevEasing,complete:function(){d(this).trigger("onReset").remove()}})}};a.helpers.overlay={overlay:null,update:function(){var a,c;this.overlay.width("100%").height("100%");d.browser.msie||k?(a=Math.max(l.documentElement.scrollWidth,l.body.scrollWidth),c=Math.max(l.documentElement.offsetWidth,l.body.offsetWidth),a=a<c?m.width():a):a=q.width();this.overlay.width(a).height(q.height())},beforeShow:function(b){this.overlay||
(b=d.extend(!0,{},a.defaults.helpers.overlay,b),this.overlay=d('<div id="fancybox-overlay"></div>').css(b.css).appendTo("body"),b.closeClick&&this.overlay.bind("click.fb",a.close),a.current.fixed&&!k?this.overlay.addClass("overlay-fixed"):(this.update(),this.onUpdate=function(){this.update()}),this.overlay.fadeTo(b.speedIn,b.opacity))},afterClose:function(a){this.overlay&&this.overlay.fadeOut(a.speedOut||0,function(){d(this).remove()});this.overlay=null}};a.helpers.title={beforeShow:function(b){var c;
if(c=a.current.title)c=d('<div class="fancybox-title fancybox-title-'+b.type+'-wrap">'+c+"</div>").appendTo("body"),"float"===b.type&&(c.width(c.width()),c.wrapInner('<span class="child"></span>'),a.current.margin[2]+=Math.abs(parseInt(c.css("margin-bottom"),10))),c.appendTo("over"===b.type?a.inner:"outside"===b.type?a.wrap:a.skin)}};d.fn.fancybox=function(b){var c=d(this),e=this.selector||"",f,g=function(g){var h=this,j=f,k;!g.ctrlKey&&!g.altKey&&!g.shiftKey&&!g.metaKey&&!d(h).is(".fancybox-wrap")&&
(g.preventDefault(),g=b.groupAttr||"data-fancybox-group",k=d(h).attr(g),k||(g="rel",k=h[g]),k&&""!==k&&"nofollow"!==k&&(h=e.length?d(e):c,h=h.filter("["+g+'="'+k+'"]'),j=h.index(this)),b.index=j,a.open(h,b))},b=b||{};f=b.index||0;e?q.undelegate(e,"click.fb-start").delegate(e,"click.fb-start",g):c.unbind("click.fb-start").bind("click.fb-start",g);return this};d(l).ready(function(){a.defaults.fixed=d.support.fixedPosition||!(d.browser.msie&&6>=d.browser.version)&&!k})})(window,document,jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,false);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {
    
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 8,
        opacity: 0.9,
        title: 'title',
        trigger: 'hover'
    };

    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
			    boundTop = $(document).scrollTop() + margin,
			    boundLeft = $(document).scrollLeft() + margin,
			    $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		}
	};
    
})(jQuery);

JQTWEET = {
	
	// Set twitter username, number of tweets & id/class to append tweets
	user: 'beantowndesign',
	numTweets: 3,
	appendTo: '#jstwitter',

	// core function of jqtweet
	loadTweets: function() {
		$.ajax({
			url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: JQTWEET.user,
				include_rts: true,
				count: JQTWEET.numTweets,
				include_entities: true
			},
			success: function(data, textStatus, xhr) {

			 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

				 // append tweets into page
				 for (var i = 0; i < data.length; i++) {
					$(JQTWEET.appendTo).append(
						html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text))
							.replace(/USER/g, data[i].user.screen_name)
							.replace('AGO', JQTWEET.timeAgo(data[i].created_at))
							.replace(/ID/g, data[i].id_str)
					);

				 }					
			}	

		});
		
	}, 
	
		
	/**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		var diff = rightNow - then;

		var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;

		if (isNaN(diff) || diff < 0) {
			return ""; // return blank string if unknown
		}

		if (diff < second * 2) {
			// within 2 seconds
			return "right now";
		}

		if (diff < minute) {
			return Math.floor(diff / second) + " seconds ago";
		}

		if (diff < minute * 2) {
			return "about 1 minute ago";
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + " minutes ago";
		}

		if (diff < hour * 2) {
			return "about 1 hour ago";
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + " hours ago";
		}

		if (diff > day && diff < day * 2) {
			return "yesterday";
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + " days ago";
		}

		else {
			return "over a year ago";
		}
	}, // timeAgo()
    
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } 

	
};

/*
 * jQuery Simple Instagram Fancybox
 * Version: 1.0
 *
 * Author: Chris Rivers
 * http://chrisriversdesign.com
 *
 *
 * Changelog: 
 * Version: 1.0
 *
 */
function cmd(a,b,c){var d="";if(b.mode=="user"){d="https://api.instagram.com/v1/users/"+c+"/media/recent/?callback=?"}else{d="https://api.instagram.com/v1/media/popular?callback=?"}$.getJSON(d,a,function(a){onPhotoLoaded(a,b)})}function onPhotoLoaded(a,b){if(a.meta.code==200){var c=a.data;if(c.length>0){for(var d in c){var e=true;if(b.numberOfImages!=0){var f=parseInt(d)+1;if(f>b.numberOfImages){e=false}}var g=c[d];var h="";var i=b.tags;i=i.split(",");var j=false;if(i[0]){$.each(i,function(a){$.each(g["tags"],function(b){if(i[a]==g["tags"][b]){j=true}})})}else{j=true}if(j==true&&e==true){if(b.captionOn){var k="";if(g.caption){k=g.caption.text}else{k="Instagram Photo"}h='<a class="instagram-photo" id="p'+g.id+'" href="'+g.images.standard_resolution.url+'" title="'+k+" ("+g.likes.count+' Likes)" rel="groupGallery">'}else{h='<a class="instagram-photo" id="p'+g.id+'" href="'+g.images.standard_resolution.url+'" rel="groupGallery">'}var l="None";if(g.tags[0]){l=g.tags[0]}h+='<img src="'+g.images.thumbnail.url+'" width="100%" rel="'+l+'">';h+="</a>";$(h).appendTo(".insta")}}$(".instagram-photo").hide().each(function(a){currentPhoto=$(this);if(b.appearEffect=="slide"){currentPhoto.delay(b.delayInterval*a).slideDown(b.speed)}else if(b.appearEffect=="motion"){currentPhoto.delay(b.delayInterval*a).animate({width:["toggle","swing"],height:["toggle","swing"]},b.speed,function(){})}else{currentPhoto.delay(b.delayInterval*a).fadeIn(b.speed)}})}else{alert("empty")}}else{alert(a.meta.error_message)}}function instagramFetch(a){var b=a.accessToken;var c={access_token:b};if(a.mode=="user"){var d=a.userID;var e=d.split(",");for(var f=0;f<e.length;f++){cmd(c,a,e[f])}}else{cmd(c,a,"No User")}}function startFancybox(){$(".insta a.instagram-photo").live("hover",function(){$(".insta a.instagram-photo").fancybox({nextEffect:"elastic",prevEffect:"elastic",overlayOpacity:.8,overlayColor:"#000000",arrows:true,titlePosition:"outside"});return false})}$.fn.simpleInstagramFancybox=function(a){var b={mode:"popular",accessToken:"3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f",userID:"1138644",speed:700,delayInterval:80,appearEffect:"fade",captionOn:false,tags:"",numberOfImages:0};$.extend(b,a);return this.each(function(){$(document).ready(function(){instagramFetch(b);startFancybox()});$(".instagram-photo").live({mouseenter:function(){var a=$(this);var b=a.height();var c=a.width();a.append('<div class="instagram-hover-cover"></div>');a.find(".instagram-hover-cover").hide().css({height:b,width:c});$(".instagram-hover-cover").hide().fadeTo("fast",.6)},mouseleave:function(){var a=$(this);a.find(".instagram-hover-cover").remove();a.find(".instagram-hover-icon").remove()}})})}


	// Calling the Plugin
	$('.insta').simpleInstagramFancybox({
		captionOn : true,
		mode : 'user',
		accessToken : '3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f', // This a mandatory setting that allows you to specify a user token. Default is 3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f
		userID : '1138644', // Set your instagram user ID, get yours here: http://yvesvanbroekhoven.github.com/get-your-instagram-user-id/
		numberOfImages: 12,
		appearEffect : 'motion' // Allows you to set the effect used to show photos. Options include fade,slide,motion. 
	});
	
		//Form
	var validator = $("#contactform").validate({
		rules: {
			contactname: {
				required: true,
				minlength: 2
			},
			phone: {
				required: true,
				minlength: 10
			},
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true,
				minlength: 2
			},
			message: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			contactname: {
				required: "Please enter your name",
				minlength: jQuery.format("Your name needs to be at least {0} characters")
			},
			email: {
				required: "Please enter a valid email address",
				minlength: "Please enter a valid email address"
			},
			phone: {
				required: "Please enter your phone number",
				minlength: jQuery.format("Enter at least {0} characters")
			},
			subject: {
				required: "You need to enter a subject!",
				minlength: jQuery.format("Enter at least {0} characters")
			},
			message: {
				required: "You need to enter a message!",
				minlength: jQuery.format("Enter at least {0} characters")
			}
		},
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			label.addClass("checked");
		}
	});
	
	
	
	//Accordion
	$('.accordion-header').toggleClass('inactive-header');
		//Open The First Accordion Section When Page Loads
		$('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
		$('.accordion-content').first().slideDown().toggleClass('open-content');
		// The Accordion Effect
		$('.accordion-header').click(function () {
			if($(this).is('.inactive-header')) {
				$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
				$(this).toggleClass('active-header').toggleClass('inactive-header');
				$(this).next().slideToggle().toggleClass('open-content');
			}
		
			else {
				$(this).toggleClass('active-header').toggleClass('inactive-header');
				$(this).next().slideToggle().toggleClass('open-content');
			}
		});
	
		
	
	//Tabs
	$('body').on('click', 'ul.tabs > li > a', function(e) {

    	//Get Location of tab's content
    	var contentLocation = $(this).attr('href');

    	//Let go if not a hashed one
    	if(contentLocation.charAt(0)=="#") {

        	e.preventDefault();

        	//Make Tab Active
        	$(this).parent().siblings().children('a').removeClass('active');
        	$(this).addClass('active');

        	//Show Tab Content & add active class
        	$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');

    	}
	});
	
	
//Flickr Photo Retrive
var numPics = 12;
$.getJSON(
	"http://api.flickr.com/services/feeds/photos_public.gne?id=65195433@N07&en-us&format=json&jsoncallback=?",
	function (data) {
		var textToInsert = '';
		$.each(data.items, function (i, item) {
			if (i == numPics) return false;
			/*the json does not contain links for image thumbnails and large pics, only for medium size pics
			so we need to create the urls for these image sizes (_t.jpg, _b.jpg, _m.jpg specify the image size in the url) 
			*/
			var imgThumb = item.media.m.split('m.jpg')[0] + 't.jpg';
			var imgLarge = item.media.m.split('m.jpg')[0] + 'b.jpg';
			//get and format images
			textToInsert += '<a class="instagram-photo" style="background-color:#fff;" rel="flickr_group" href="' + imgLarge + '" title="' + item.title + '"><img src="' + imgThumb + '" width="100%" height="100%"/></a>';
		});

		//clear contents of div
		$('#flickr_images').empty();
		//add images to div
		$('#flickr_images').append(textToInsert);
		
		//fancybox code to create image gallery
		$("a[rel=flickr_group]").fancybox({
			maxWidth	: 710,
			maxHeight	: 600,
			fitToView	: true,
			width		: '70%',
			height		: '70%',
			autoSize	: true,
			closeClick	: false,
			openEffect	: 'elastic',
			closeEffect	: 'none',
			titleFormat : function (title, currentArray, currentIndex, currentOpts) {
				return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
			}

		});

	}
);

/*
 * jQuery FacebookFeed Plugin
 * Requires jQuery 1.4.2
 * Requires jQuery Templates Plugin 1.0.0pre
 * Author Vladimir Shugaev <vladimir.shugaev@junvo.com>
 * Copyright Vladimir Shugaev <vladimir.shugaev@junvo.com>
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
 /*
(function($){
    $.fn.facebookfeed=function(options){
		var settings={
			id: '', //id of the facebook entity
			template: '<h4>${from.name}</h4><p>${message}</p><p>Read more:&nbsp;<a href="${link}">${name}</a></p>', //template for formatting each feed entry
			query: {},
			access_token: ''
		};
		if (options)
			$.extend(settings, options);
		var container=this;
		var requestURL='https://graph.facebook.com/'+settings.id+'/feed?access_token='+settings.access_token+'&'+$.param(settings.query)+'&callback=?'; //calback=? is required to get JSONP behaviour
		var template=$.template(null, settings.template);

		$.getJSON(requestURL, function(json){
			displayFacebookFeed(json);
			//var messages=$.tmpl(template, json.data).appendTo(container);
		});
		
		return this;
	};
})(jQuery);



function displayFacebookFeed(result) {
	var outputTemplate = "<p><strong><a href=\"{0}\">{1}</a></strong> {2}<br /><small>{3}</small></p>";
	$.each(result.data, function (i, item) {
		var username = item.from.name;
		var pageURL = "http://www.facebook.com/" + item.from.name.replace(/ /g, '');
		var date = $.browser.msie ? item.created_time : dateFormat(item.created_time.replace("+0000", ""), "dddd, mmmm dS, yyyy 'at' h:MM TT");
		var body = item.message;
		if (!body) {
			body = "<a href='" + item.link + "'>" + item.name + "</a><br/>" + item.description;
		}
		//$("#facebook_feed").append(outputTemplate.format(pageURL, username, body, date));
	});
}

$("#facebook_feed").facebookfeed(
	{	id:'100001919044204', 
		template: "<div class='tweet'><h6>${from.name}</h6><p>${message}</p><p>Read more:&nbsp;<a href='${link}'>${name}</a></p></div>",
		access_token:'AAACiOnUMZA14BALHuzNLEoohsJZA2GsvmJ0OWiZA68tzB1dUIEyVdW4ZAGWgFCbjS8O4iZBba4t1vuPbZBiipOw09tHViYO3LHjZBpSE798hsTr11ZAMxvqZA', 
		query:{limit:20}
	}
);

$.ajax({
		url: 'https://graph.facebook.com/100001919044204/feed?limit=5&access_token=AAACiOnUMZA14BALHuzNLEoohsJZA2GsvmJ0OWiZA68tzB1dUIEyVdW4ZAGWgFCbjS8O4iZBba4t1vuPbZBiipOw09tHViYO3LHjZBpSE798hsTr11ZAMxvqZA&callback=?', //Replace with your own access token
		dataType: 'json',
		success: displayFacebookFeed
	});
*/

(function($){$.fn.hoverizr=function(m){var o={'effect':"grayscale",'overlay':"top",'container':"overlayed",'width':"responsive",'height':"auto",'stretch':"no",'speedIn':"slow",'speedOut':"fast"};var m=$.extend(o,m);if($('img').css('maxWidth')!="none"){var p=1;$('img').css('maxWidth',"none")}else{var p=0}this.each(function(){$(this).wrap('<div class="'+m.container+'" />');$(this).parent('.'+m.container+'').css({'position':'relative'});$(this).parent('.'+m.container+'').append('<canvas class="canv"></canvas>');$(this).next('.canv').css({'position':'absolute','top':'0','left':'0','z-index':10});if(m.overlay=="top"){$(this).css({'z-index':-1})}else{$(this).css({'z-index':1});$(this).next('.canv').css({'display':'none'})}var a=$(this).width();var b=$(this).height();$(this).next('.canv').attr({"width":a,"height":b});var c=$(this).next('.canv').get(0);var d=c.getContext("2d");var f=$(this).get(0);d.drawImage(f,0,0);if(m.effect!='noise'&&'blur'){try{try{var g=d.getImageData(0,0,a,b)}catch(e){netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");var g=d.getImageData(0,0,a,b)}}catch(e){throw new Error("unable to access image data: "+e)}var h=g.data}switch(m.effect){case"invert":for(var i=0,n=h.length;i<n;i+=4){h[i]=255-h[i];h[i+1]=255-h[i+1];h[i+2]=255-h[i+2]}break;case"blur":var j,x,y;var k=new Image;k.src=$(this).attr('src');d.globalAlpha=0.0625;for(y=-3;y<3;y+=1){for(x=-3;x<3;x+=1){d.drawImage(k,x,y)}}d.globalAlpha=1;break;default:for(var i=0,n=h.length;i<n;i+=4){var l=h[i]*.3+h[i+1]*.59+h[i+2]*.11;h[i]=l;h[i+1]=l;h[i+2]=l}break}if(m.effect!=("blur"||"noise")){d.putImageData(g,0,0)}if(m.width=="responsive"){$(this).next('.canv').css({'max-width':'100%'});$(this).css({'max-width':'100%'});$(this).parent('.'+m.container+'').css({'width':'100%'})}else if(m.stretch=="no"){$(this).parent('.'+m.container+'').css({'width':m.width,'height':m.height,overflow:"hidden"})}else{$(this).next('.canv').css({'width':m.width,'height':m.height});$(this).css({'width':m.width,'height':m.height});$(this).parent('.'+m.container+'').css({'width':m.width,'height':m.height})}});if(p==1){$('img').css('maxWidth',"100%")}if(m.overlay=="top"){this.parent('.'+m.container+'').hover(function(){$(this).children('.canv').stop(true,true).fadeOut(m.speedOut)},function(){$(this).children('.canv').stop(true,true).fadeIn(m.speedIn)})}else{this.parent('.'+m.container+'').hover(function(){$(this).children('.canv').stop(true,true).fadeIn(m.speedOut)},function(){$(this).children('.canv').stop(true,true).fadeOut(m.speedIn)})}}})(jQuery);