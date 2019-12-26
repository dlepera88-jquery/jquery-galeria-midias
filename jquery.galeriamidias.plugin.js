/**
 * jquery.galeriamidias.plugin.js
 * @version: v2.0.0
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

/* global $, jQuery */

// Verificar se o jQuery foi inicializado
import {Galeria} from "./src/Galeria";

if (jQuery === undefined) {
    console.warn('[Plugin $.fn.galeriaMidias] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes.');
} // Fim if

import {Tema} from './src/Tema';

/**
 * Gerar a galeria de mídias (imagens e vídeos)
 * @param opcoes
 * @returns {*}
 */
export const galeriaMidias = {
    /**
     * Nome do tema a ser carregado para os elementos da galeria
     * @type {String}
     */
    tema: 'galeria4',

    /**
     * Tempo para troca de uma mídia pra outra. Quando definido como 0 (zero)
     * as mídias não são passadas automaticamente
     * @type number
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
     * a ordem. Se definido como nulo ou uma string fazia, nenhum Controle é
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
    animacao: {entrada: 'fade-in .5s linear', saida: 'fade-out .5s linear .2s'},

    /**
     * Intervalos de troca das fotos.
     * @type {Object}
     */
    intervalos_troca: {},

    /**
     * Namespace utilizado para os eventos da galeria
     * @type {String}
     * @deprecated
     */
    evt_namespace: '__galeriaMidias',

    /**
     * Iniciar a galeria de mídias
     * @param {jQuery} $jGaleria
     * @param {Object} opcoes
     */
    init: function ($jGaleria, opcoes) {
        this.tema = opcoes.tema || this.tema;
        this.slideshow = opcoes.slideshow || this.slideshow;
        this.barraTempo = opcoes.barraTempo || this.barraTempo;
        this.controles = opcoes.controles || this.controles;
        this.animacao = opcoes.animacao || this.animacao;

        this.carregarTema();

        $jGaleria.each(function () {
            const galeria = new Galeria(this, Tema.nome);

            if (galeriaMidias.slideshow > 0) {
                galeria.iniciarSlideshow(
                    galeriaMidias.slideshow,
                    galeriaMidias.animacao,
                    galeriaMidias.barraTempo
                );
            }

            if (galeriaMidias.controles !== null && galeriaMidias.controles !== '') {
                galeria.adicionarControles(
                    galeriaMidias.controles,
                    galeriaMidias.animacao,
                    galeriaMidias.slideshow
                );
            }
        });
    },

    carregarTema: function () {
        // Carregar o arquivo CSS com o tema solicitado
        Tema.init(this.tema);
        Tema.carregarTema();
    }
};

$.fn.galeriaMidias = function (opcoes) {
    const $this = $(this);
    galeriaMidias.init($this, opcoes);
    return $this;
};

