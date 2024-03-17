function getSlicesNames(slices) {
    return Object.keys(slices).join(' | ');
}

module.exports = getSlicesNames;
