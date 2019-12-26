/* global $ */

export const Tema = {
    nome: null,
    caminho_arquivo: null,

    init: function (tema) {
        if (typeof tema === 'object') {
            this.nome = tema.nome;
            this.caminho_arquivo = tema.caminho_arquivo;

            return;
        }

        this.nome = tema;
        this.caminho_arquivo = this.defineSrcPadrao() + '/temas/' + tema + '/css/galeriamidias.tema.css';
    },

    defineSrcPadrao: function () {
        // Dessa forma, retorna o src relativo
        let script_src = $('script[src*="jquery.galeriamidias.plugin"]').attr('src');
        return script_src.substring(0, script_src.lastIndexOf('/')) || '.';
    },

    carregarTema: function () {
        const arquivo_css = this.caminho_arquivo;
        const $arquivos_css_carregados = $('link[rel="stylesheet"]');

        // Verificar se esse mesmo arquivo já não foi carregado.
        // @fixme: Quando é utilizado ajax para carregar o plugin, o tema pode ser carregado várias
        // vezes, duplicando as folhas de estilo no HTML final.
        if ($arquivos_css_carregados.filter('[href="' + arquivo_css + '"]').length < 1) {
            $.get(arquivo_css, function () {
                const $link = $(document.createElement('link')).attr({
                    rel: 'stylesheet',
                    media: 'all',
                    href: arquivo_css
                });

                if ($arquivos_css_carregados.length > 0) {
                    $link.insertAfter($arquivos_css_carregados.last());
                } else {
                    $link.appendTo($('head'));
                } // Fim if
            }).fail(function () {
                console.warn('Não foi possível carregar o arquivo %s.', arquivo_css);
            });
        }
    }
};

