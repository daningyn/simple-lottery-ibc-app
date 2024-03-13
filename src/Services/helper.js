const explorerURL = ({
    txSignature,
    baseExplorerUrl
}) => {
    let baseUrl;
    //
    if (txSignature) baseUrl = `${baseExplorerUrl}/tx/${txSignature}`;
    else return "[unknown]";
    const url = new URL(baseUrl);
    return url.toString() + "\n";
}

module.exports = {
    explorerURL
}