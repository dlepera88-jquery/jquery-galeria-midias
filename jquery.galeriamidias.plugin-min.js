/** @preserve
 * The MIT License (MIT) https://github.com/dlepera88-jquery/jquery-galeria-midias/blob/master/LICENSE
 * Copyright (c) 2017 Diego Lepera http://diegolepera.xyz/
 */
import{Galeria}from"./src/Galeria";void 0===jQuery&&console.warn("[Plugin $.fn.galeriaMidias] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes.");import{Tema}from"./src/Tema";export const galeriaMidias={tema:"galeria4",slideshow:0,barraTempo:!1,controles:null,animacao:{entrada:"fade-in .5s linear",saida:"fade-out .5s linear .2s"},intervalos_troca:{},evt_namespace:"__galeriaMidias",init:function(a,i){this.tema=i.tema||this.tema,this.slideshow=i.slideshow||this.slideshow,this.barraTempo=i.barraTempo||this.barraTempo,this.controles=i.controles||this.controles,this.animacao=i.animacao||this.animacao,this.carregarTema(),a.each((function(){const a=new Galeria(this,Tema.nome);galeriaMidias.slideshow>0&&a.iniciarSlideshow(galeriaMidias.slideshow,galeriaMidias.animacao,galeriaMidias.barraTempo),null!==galeriaMidias.controles&&""!==galeriaMidias.controles&&a.adicionarControles(galeriaMidias.controles,galeriaMidias.animacao,galeriaMidias.slideshow)}))},carregarTema:function(){Tema.init(this.tema),Tema.carregarTema()}};$.fn.galeriaMidias=function(a){const i=$(this);return galeriaMidias.init(i,a),i};