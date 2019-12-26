export const Animacao = {
    /**
     * Definição da animação em formato CSS (style)
     * @param animacao
     * @returns {number}
     */
    getTempo: function (animacao) {
        let total = 0;

        animacao.match(/[0-9.]+s/g).forEach(function (valor) {
            total += parseFloat(valor);
        });

        return total * 1000;
    }
}