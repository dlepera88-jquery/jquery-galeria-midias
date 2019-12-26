/**
 * Mídias da galeria
 * @type {{tipo: string, arquivo: null}}
 */
export const Midia = {
    /**
     * Tipo de mídia
     * imagem|video
     */
    tipo: 'imagem',

    /**
     * Caminho do arquivo da mídia
     */
    arquivo: null,

    /**
     * Iniciar o objeto Midia
     * @param arquivo
     * @param tipo
     */
    init: function (arquivo, tipo = 'imagem') {
        this.arquivo = arquivo;
        this.tipo = tipo;
    }
};