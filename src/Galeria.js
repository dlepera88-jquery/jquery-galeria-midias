/* global $ */

import {Midia} from './Midia'
import {Controle} from "./Controle";

export class Galeria {
    /**
     * Iniciar instância da classe Galeria
     * @param DOM
     * @param tema
     */
    constructor(DOM, tema) {
        this.jDOM = $(DOM);
        this.midias = [];

        this.jDOM.addClass('__jQuery-galeriaMidias ' + tema);
        this.importarMidias();
    }

    /**
     * Adicionar uma nova mídia à galeria
     * @param arquivo
     * @param tipo
     */
    addMidia(arquivo, tipo = 'imagem') {
        this.midias.push(Midia.init(arquivo, tipo));
    }

    /**
     * Todas as mídias da galeria
     * @returns {[]|*[]}
     */
    getMdias() {
        return this.midias;
    }

    /**
     * Obter uma determinada mídia pelo seu respectivo index
     * @param index
     * @returns {null|*}
     */
    getMidiaPorIndex(index) {
        if (!this.midias[index]) {
            return null;
        }

        return this.midias[index];
    }

    /**
     * Retorna a quantidade de mídias que a galeria possui
     * @returns {number}
     */
    getQuantidadeMidias() {
        return this.midias.length;
    }

    /**
     * Iniciar o slideshow
     * @param slideshow
     * @param animacao
     * @param barra_tempo
     */
    iniciarSlideshow(slideshow, animacao, barra_tempo) {
        if (this.getQuantidadeMidias() < 2) {
            return;
        }

        if (barra_tempo) {
            $(document.createElement('div'))
                .addClass('barra-tempo')
                .html('<span style="width:0"></span>')
                .appendTo(this.jDOM);
        } // Fim if

        Controle.iniciarContagemTroca.apply(this.jDOM, [slideshow, animacao]);
    }

    /**
     * Adicionar os controles
     * @param controles
     * @param animacao
     * @param slideshow
     */
    adicionarControles(controles, animacao, slideshow) {
        const $controles = $(document.createElement('div')).addClass('caixa-controles').appendTo(this.jDOM);
        const $botao = $(document.createElement('a')).addClass('controle');
        const evt_data = {$galeria: this.jDOM, tempo: slideshow, animacao: animacao};

        if (controles.indexOf('primeira') > -1) {
            $botao.clone().addClass('-primeira').attr('title', 'Primeira').text('<<')
                .on('click', evt_data,
                    function (evt) {
                        Controle.primeira.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    })
                .appendTo($controles);
        }

        if (controles.indexOf('anterior') > -1) {
            $botao.clone().addClass('-anterior').attr('title', 'Anterior').text('<')
                .on('click', evt_data,
                    function (evt) {
                        Controle.anterior.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    })
                .appendTo($controles);
        }

        if (controles.indexOf('proxima') > -1) {
            $botao.clone().addClass('-proxima').attr('title', 'Próxima').text('>')
                .on('click', evt_data,
                    function (evt) {
                        Controle.proxima.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    })
                .appendTo($controles);
        }

        if (controles.indexOf('ultima') > -1) {
            $botao.clone().addClass('-ultima').attr('title', 'Última').text('>>')
                .on('click', evt_data,
                    function (evt) {
                        Controle.ultima.apply(evt.data.$galeria, [evt.data.tempo, evt.data.animacao]);
                    })
                .appendTo($controles);
        }
    }

    importarMidias() {
        const $midias = this.jDOM.find('figure');
        const quantidade_midias = $midias.length;
        let nome_arquivo;

        for (let i = 0; i < quantidade_midias; i++) {
            nome_arquivo = $($midias[i]).find('img').attr('src');
            this.addMidia(nome_arquivo);
        }
    }
}