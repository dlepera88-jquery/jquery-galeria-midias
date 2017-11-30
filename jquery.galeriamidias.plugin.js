/**
 * jquery.galeriamidias.plugin.js
 * @version: v1.17.11
 * @author: Diego Lepera
 *
 * Created by Diego Lepera on 2017-11-28. Please report any bug at
 * https://github.com/dlepera88-jquery/jquery-galeria-midias/issues
 *
 * The MIT License (MIT)
 * Copyright (c) 2017 Diego Lepera http://diegolepera.xyz/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** @preserve
 * The MIT License (MIT) https://github.com/dlepera88-jquery/jquery-galeria-midias/blob/master/LICENSE
 * Copyright (c) 2017 Diego Lepera http://diegolepera.xyz/
 */

 // Verificar se o jQuery foi inicializado
 if (jQuery === undefined) {
     console.warn('[Plugin $.fn.galeriaMidias] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes.');
 } // Fim if

 (function ($) {
     var fArquivos = {
        __DIR__: function () {
            // Dessa forma, retorna o src relativo
            var script_src = $('script[src*="jquery-galeria-midias"]').attr('src');
            return script_src.substring(0, script_src.lastIndexOf('/')) || '.';
        },

        /**
         * Carregar o tema solicitado pelo desenvolvedor
         * @param  {String} tema Nome do tema
         * @return {Void}
         */
        carregarTema: function (tema) {
            // Carregar o arquivo CSS com o tema solicitado
            var css_tema = fArquivos.__DIR__() + '/temas/' + tema + '/css/galeriamidias.tema.css';
            $.get(css_tema, function () {
                var $link = $(document.createElement('link')).attr({
                    rel:    'stylesheet',
                    media:  'all',
                    href:   css_tema
                });

                if ($('link[rel="stylesheet"]').length > 0) {
                    $link.insertAfter($('link[rel="stylesheet"]').last());
                } else {
                    $link.appendTo($('head'));
                } // Fim if
            }).fail(function () {
                console.warn('Não foi possível carregar o arquivo %s.', css_tema);
            });
        } // Fim function carregarTema
    };

    var diversos = {
        /**
         * Calcula o tempo total de uma determinada animação
         * @param  {String} animacao Configurações da animação
         * @return {Int} Retorna o tempo total da animação em milessegundos
         */
        obterTempoAnimacao: function (animacao) {
            var total = 0;

            animacao.match(/[0-9\.]+s/g).forEach(function (valor) {
                total += parseFloat(valor);
            });

            return total * 1000;
        }
    };

    /**
     * Controles da galeria
     * @type {Object}
     */
    var controle = {
        iniciarContagemTroca: function (tempo, animacao) {
            if (tempo > 0) {
                var $this = this;

                clearTimeout($.fn.galeriaMidias.intervalos[this.index()]);
                $.fn.galeriaMidias.intervalos[this.index()] = setTimeout(function () {
                    controle.proxima.apply($this, [tempo, animacao]);
                }, tempo);

                this.find('> .barra-tempo > span').stop().css('width', 0).animate({
                    width: '100%'
                }, tempo);
            } // Fim if
        },

        trocarMidia: function ($atual, $nova, animacao) {
            var conf_animacao = typeof animacao;

            if (conf_animacao === 'string' || conf_animacao === 'object') {
                var animacao_entrada, animacao_saida, tempo_saida;

                if (conf_animacao === 'string') {
                    animacao_entrada = animacao_saida = animacao;
                } else {
                    animacao_entrada = animacao.entrada;
                    animacao_saida = animacao.saida;
                } // Fim if ... else

                // Mostrar a nova mídia
                $nova.css({
                    '-webkit-animation': animacao_entrada,
                    animation: animacao_entrada,
                    display: 'block'
                });

                // Ocultar a mídia atual
                $atual.css({
                    '-webkit-animation': animacao_saida,
                    animation: animacao_saida
                });

                // Tirar a animação de saída
                tempo_saida = diversos.obterTempoAnimacao(animacao_saida);
                setTimeout(function() { $atual.css({
                    '-webkit-animation': '',
                    animation: '',
                    display: 'none'
                }); }, tempo_saida);

                return null;
            } // Fim if

            $atual.css('display', 'none');
            $nova.css('display', 'block');
        },

        proxima: function (tempo_troca, animacao) {
            var $midias = this.find('figure, video'),
                $atual = $midias.filter(':visible'),
                qtde_midias = $midias.length - 1,
                index_atual = $atual.index(),
                index_prox = 0;

            if (index_atual < qtde_midias) {
                index_prox = index_atual + 1;
            } // Fim if

            controle.trocarMidia.apply(this, [$atual, $midias.eq(index_prox), animacao]);
            controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
        },

        anterior: function (tempo_troca, animacao) {
            var $midias = this.find('figure, video'),
                $atual = $midias.filter(':visible'),
                qtde_midias = $midias.length - 1,
                index_atual = $atual.index(),
                index_aterior = qtde_midias;

            if (index_atual > 0) {
                index_aterior = index_atual - 1;
            } // Fim if

            controle.trocarMidia($atual, $midias.eq(index_aterior), animacao);
            controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
        },

        primeira: function (tempo_troca, animacao) {
            var $midias = this.find('figure, video'),
                $atual = $midias.filter(':visible');

            controle.trocarMidia($atual, $midias.eq(0), animacao);
            controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
        },

        ultima: function (tempo_troca, animacao) {
            var $midias = this.find('figure, video'),
                $atual = $midias.filter(':visible'),
                ultima_midia = $midias.length - 1;

            controle.trocarMidia($atual, $midias.eq(ultima_midia), animacao);
            controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
        }
    };

     /**
     * Gerar a galeria de mídias (imagens e vídeos)
     * @return {Object.jQuery} A instância jQuery com os elementos atualizados
     */
    $.fn.galeriaMidias = function (opcoes) {
        opcoes = $.extend(true, $.fn.galeriaMidias.opcoesPadrao, opcoes);

        // Carregar o arquivo CSS com o tema solicitado
        fArquivos.carregarTema(opcoes.tema);

        /**
         * Quantidade de fotos a serem incluídas na galeria
         * @type {Number}
         */
        // var qtde_midias = opcoes.midias.length;

        return this.each(function () {
            var $this = $(this);

            /*
             * Adicionar a classe e o nome do tema para carregar a aparência correta
             */
            $this.addClass('__jQuery-galeriaMidias ' + opcoes.tema);
            
            // Habilitar o slideshow
            if (opcoes.slideshow > 0) {
                if (opcoes.barraTempo) {
                    $(document.createElement('div')).addClass('barra-tempo').html('<span style="width:0"></span>').appendTo($this);
                } // Fim if

                controle.iniciarContagemTroca.apply($this, [opcoes.slideshow, opcoes.animacao]);
            } // Fim if

            // Adicionar os controles
            if (opcoes.controles !== null && opcoes.controles !== '') {
                var $controles = $(document.createElement('div')).addClass('caixa-controles').appendTo($this),
                    $botao = $(document.createElement('a')).addClass('controle'),
                    evt_data = { $galeria: $this, tempo: opcoes.slideshow, animacao: opcoes.animacao };

                if (opcoes.controles.indexOf('primeira') > -1) {
                    $botao.clone().addClass('-primeira').attr('title', 'Primeira').text('<<').on('click.' + $.fn.galeriaMidias.evt_ns, evt_data, function (evt) {
                        controle.primeira.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    }).appendTo($controles);
                } // Fim if

                if (opcoes.controles.indexOf('anterior') > -1) {
                    $botao.clone().addClass('-anterior').attr('title', 'Anterior').text('<').on('click.' + $.fn.galeriaMidias.evt_ns, evt_data, function (evt) {
                        controle.anterior.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    }).appendTo($controles);
                } // Fim if

                if (opcoes.controles.indexOf('proxima') > -1) {
                    $botao.clone().addClass('-proxima').attr('title', 'Próxima').text('>').on('click.' + $.fn.galeriaMidias.evt_ns, evt_data, function (evt) {
                        controle.proxima.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    }).appendTo($controles);
                } // Fim if

                if (opcoes.controles.indexOf('ultima') > -1) {
                    $botao.clone().addClass('-ultima').attr('title', 'Última').text('>>').on('click.' + $.fn.galeriaMidias.evt_ns, evt_data, function (evt) {
                        controle.ultima.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    }).appendTo($controles);
                } // Fim if
            } // Fim if

            return $this;
        });
    };

    /**
     * Namespace dos eventos aplicados pelo plugin
     * @type {String}
     */
    $.fn.galeriaMidias.evt_ns = '__galeriaMidias';

    /**
     * Array para armazenar os intervalos de troca
     * @type {Array}
     */
    $.fn.galeriaMidias.intervalos = [];

    /**
     * Opções padrão para o funcionamento do plugin
     * @type {Object}
     */
    $.fn.galeriaMidias.opcoesPadrao = {
        /**
         * Nome do tema a ser carregado para os elementos da galeria
         * @type {String}
         */
        tema: 'galeria4',

        /**
         * Tempo para troca de uma mídia pra outra. Quando definido como 0 (zero)
         * as mídias não são passadas automaticamente
         * @type {Int}
         */
        slideshow: 0,

        /**
         * Exibe uma barra de tempo para troca da mídia. Só tem efeito se o slideshow
         * estiver ativo
         * @type {Boolean}
         */
        barraTempo: false,

        /**
         * Controles a serem adicionados na galeria. Informe o nome dos controles
         * separados por vírgula: 'anterior, proxima, primeira, ultima'. Não importa
         * a ordem. Se definido como nulo ou uma string fazia, nenhum controle é
         * adicionado
         * @type {String}
         */
        controles: null,

        /**
         * Animação (CSS3) utilizada para fazer a troca das mídias. Pode ser informada
         * uma única animação em formato de string 'nome-da-animacao tempo' ou
         * um objeto especificando uma animação para entrada e outra para saída
         * { entrada: 'nome-da-animacao tempo', saida: 'nome-da-animacao tempo' }
         * @type {Object|String}
         */
        animacao: { entrada: 'fade-in .5s linear', saida: 'fade-out .5s linear .2s' }
    };
 })(jQuery);
