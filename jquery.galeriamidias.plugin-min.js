/** @preserve
 * The MIT License (MIT) https://github.com/dlepera88-jquery/jquery-galeria-midias/blob/master/LICENSE
 * Copyright (c) 2017 Diego Lepera http://diegolepera.xyz/
 */
void 0===jQuery&&console.warn("[Plugin $.fn.galeriaMidias] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes."),function($){var a={__DIR__:function(){var a=$('script[src*="jquery-galeria-midias"]').attr("src");return a.substring(0,a.lastIndexOf("/"))||"."},carregarTema:function(i){var e=a.__DIR__()+"/temas/"+i+"/css/galeriamidias.tema.css";$('link[rel="stylesheet"][href="'+e+'"]').length<0&&$.get(e,function(){var a=$(document.createElement("link")).attr({rel:"stylesheet",media:"all",href:e});$('link[rel="stylesheet"]').length>0?a.insertAfter($('link[rel="stylesheet"]').last()):a.appendTo($("head"))}).fail(function(){console.warn("Não foi possível carregar o arquivo %s.",e)})}},i={obterTempoAnimacao:function(a){var i=0;return a.match(/[0-9\.]+s/g).forEach(function(a){i+=parseFloat(a)}),1e3*i}},e={iniciarContagemTroca:function(a,i){if(a>0){var t=this;clearTimeout($.fn.galeriaMidias.intervalos[this.index()]),$.fn.galeriaMidias.intervalos[this.index()]=setTimeout(function(){e.proxima.apply(t,[a,i])},a),this.find("> .barra-tempo > span").stop().css("width",0).animate({width:"100%"},a)}},trocarMidia:function(a,e,t){var n=typeof t;if("string"===n||"object"===n){var r,o,s;return"string"===n?r=o=t:(r=t.entrada,o=t.saida),e.css({"-webkit-animation":r,animation:r,display:"block"}),a.css({"-webkit-animation":o,animation:o}),s=i.obterTempoAnimacao(o),setTimeout(function(){a.css({"-webkit-animation":"",animation:"",display:"none"})},s),null}a.css("display","none"),e.css("display","block")},proxima:function(a,i){var t=this.find("figure, video"),n=t.filter(":visible"),r=t.length-1,o=n.index(),s=0;o<r&&(s=o+1),e.trocarMidia.apply(this,[n,t.eq(s),i]),e.iniciarContagemTroca.apply(this,[a,i])},anterior:function(a,i){var t=this.find("figure, video"),n=t.filter(":visible"),r=t.length-1,o=n.index(),s=r;o>0&&(s=o-1),e.trocarMidia(n,t.eq(s),i),e.iniciarContagemTroca.apply(this,[a,i])},primeira:function(a,i){var t=this.find("figure, video"),n=t.filter(":visible");e.trocarMidia(n,t.eq(0),i),e.iniciarContagemTroca.apply(this,[a,i])},ultima:function(a,i){var t=this.find("figure, video"),n=t.filter(":visible"),r=t.length-1;e.trocarMidia(n,t.eq(r),i),e.iniciarContagemTroca.apply(this,[a,i])}};$.fn.galeriaMidias=function(i){return i=$.extend(!0,$.fn.galeriaMidias.opcoesPadrao,i),a.carregarTema(i.tema),this.each(function(){var a=$(this);if(a.addClass("__jQuery-galeriaMidias "+i.tema),i.slideshow>0&&(i.barraTempo&&$(document.createElement("div")).addClass("barra-tempo").html('<span style="width:0"></span>').appendTo(a),e.iniciarContagemTroca.apply(a,[i.slideshow,i.animacao])),null!==i.controles&&""!==i.controles){var t=$(document.createElement("div")).addClass("caixa-controles").appendTo(a),n=$(document.createElement("a")).addClass("controle"),r={$galeria:a,tempo:i.slideshow,animacao:i.animacao};i.controles.indexOf("primeira")>-1&&n.clone().addClass("-primeira").attr("title","Primeira").text("<<").on("click."+$.fn.galeriaMidias.evt_ns,r,function(a){e.primeira.apply(a.data.$galeria,[a.data.tempo,a.data.animacao])}).appendTo(t),i.controles.indexOf("anterior")>-1&&n.clone().addClass("-anterior").attr("title","Anterior").text("<").on("click."+$.fn.galeriaMidias.evt_ns,r,function(a){e.anterior.apply(a.data.$galeria,[a.data.tempo,a.data.animacao])}).appendTo(t),i.controles.indexOf("proxima")>-1&&n.clone().addClass("-proxima").attr("title","Próxima").text(">").on("click."+$.fn.galeriaMidias.evt_ns,r,function(a){e.proxima.apply(a.data.$galeria,[a.data.tempo,a.data.animacao])}).appendTo(t),i.controles.indexOf("ultima")>-1&&n.clone().addClass("-ultima").attr("title","Última").text(">>").on("click."+$.fn.galeriaMidias.evt_ns,r,function(a){e.ultima.apply(a.data.$galeria,[a.data.tempo,a.data.animacao])}).appendTo(t)}return a})},$.fn.galeriaMidias.evt_ns="__galeriaMidias",$.fn.galeriaMidias.intervalos=[],$.fn.galeriaMidias.opcoesPadrao={tema:"galeria4",slideshow:0,barraTempo:!1,controles:null,animacao:{entrada:"fade-in .5s linear",saida:"fade-out .5s linear .2s"}}}(jQuery);