module.exports = {
    extends: '@it-incubator/stylelint-config',
    rules: {
        'scss/at-rule-no-unknown': [true,
            {
                ignoreAtRules: ['tailwind'] // позволяет использовать @tailwind
            }
        ]
    }
}