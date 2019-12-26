/* global $ */

import {galeriaMidias} from "../jquery.galeriamidias.plugin";
import {Animacao} from './Animacao';

/**
 * Controles da galeria
 * @type {{iniciarContagemTroca: Controle.iniciarContagemTroca, trocarMidia: Controle.trocarMidia, proxima: Controle.proxima, anterior: Controle.anterior, primeira: Controle.primeira, ultima: Controle.ultima}}
 */
export const Controle = {
    iniciarContagemTroca: function (tempo, animacao) {
        if (tempo > 0) {
            const $this = $(this);
            const id = $this.attr('id') || this.index;

            clearTimeout(galeriaMidias.intervalos_troca[id]);
            galeriaMidias.intervalos_troca[id] = setTimeout(function () {
                Controle.proxima.apply($this, [tempo, animacao]);
            }, tempo);

            $this.find('> .barra-tempo > span').stop().css('width', 0).animate({
                width: '100%'
            }, tempo);
        } // Fim if
    },

    /**
     * Trocar a visualização da mídia atual por outra
     * @param $atual
     * @param $nova
     * @param animacao
     * @returns {null}
     */
    trocarMidia: function ($atual, $nova, animacao) {
        const conf_animacao = typeof animacao;

        if (conf_animacao === 'string' || conf_animacao === 'object') {
            let animacao_entrada;
            let animacao_saida;
            let tempo_saida;

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
            tempo_saida = Animacao.getTempo(animacao_saida);
            setTimeout(function () {
                $atual.css({
                    '-webkit-animation': '',
                    animation: '',
                    display: 'none'
                });
            }, tempo_saida);

            return null;
        } // Fim if

        $atual.css('display', 'none');
        $nova.css('display', 'block');
    },

    /**
     * Mostrar a próxima mídia da galeria
     * @param tempo_troca
     * @param animacao
     */
    proxima: function (tempo_troca, animacao) {
        const $midias = this.find('figure, video');
        const $atual = $midias.filter(':visible');
        const qtde_midias = $midias.length - 1;
        const index_atual = $atual.index();
        let index_proxima = 0;

        if (index_atual < qtde_midias) {
            index_proxima = index_atual + 1;
        } // Fim if

        Controle.trocarMidia.apply(this, [$atual, $midias.eq(index_proxima), animacao]);
        Controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
    },

    /**
     * Mostrar a mídia anterior da galeria
     * @param tempo_troca
     * @param animacao
     */
    anterior: function (tempo_troca, animacao) {
        const $midias = this.find('figure, video');
        const $atual = $midias.filter(':visible');
        const index_atual = $atual.index();
        let index_anterior = index_atual > 0 ? index_atual - 1 : $midias.length - 1;

        Controle.trocarMidia($atual, $midias.eq(index_anterior), animacao);
        Controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
    },

    /**
     * Mostrar a primeira mídia da galeria
     * @param tempo_troca
     * @param animacao
     */
    primeira: function (tempo_troca, animacao) {
        const $midias = this.find('figure, video');
        const $atual = $midias.filter(':visible');

        Controle.trocarMidia($atual, $midias.eq(0), animacao);
        Controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
    },

    /**
     * Mostrar a última mídia da galeria
     * @param tempo_troca
     * @param animacao
     */
    ultima: function (tempo_troca, animacao) {
        const $midias = this.find('figure, video');
        const $atual = $midias.filter(':visible');
        const ultima_midia = $midias.length - 1;

        Controle.trocarMidia($atual, $midias.eq(ultima_midia), animacao);
        Controle.iniciarContagemTroca.apply(this, [tempo_troca, animacao]);
    }
};