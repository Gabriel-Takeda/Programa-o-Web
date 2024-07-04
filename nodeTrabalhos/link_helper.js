// link_helper.js

function createLink(arquivos) {
    return `
        <ul>
            ${arquivos.map(arquivo => `<li><a href="/${arquivo}">${arquivo}</a></li>`).join('')}
        </ul>
    `;
}

module.exports = createLink;
