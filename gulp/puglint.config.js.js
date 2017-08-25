// PUGLINT CONFIG
const puglintConfig = {
    disallowDuplicateAttributes: true,
    disallowMultipleLineBreaks: true,
    disallowSpacesInsideAttributeBrackets: true,
    requireLowerCaseAttributes: true,
    requireLowerCaseTags: true,
    requireSpaceAfterCodeOperator: true,
    requireSpecificAttributes: [
        {
            img: ['alt']
        }
    ],
    validateAttributeQuoteMarks: '\"',
    validateDivTags: true,
};


module.exports = puglintConfig;
