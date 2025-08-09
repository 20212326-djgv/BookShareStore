module.exports = {
    reporters: [
        'default',
        ['jest-html-reporter', {
            outputPath: './tests/reports/test-report.html',
            includeFailureMsg: true,
        }]
    ]
};