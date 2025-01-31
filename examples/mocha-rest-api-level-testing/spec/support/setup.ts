import { configure } from '@serenity-js/core';

configure({
    crew: [
        // '@serenity-js/core:StreamReporter',
        [ '@serenity-js/console-reporter', { theme: 'auto' } ],
        [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
        [ '@serenity-js/serenity-bdd', { specDirectory: 'spec' } ],
    ],
});

