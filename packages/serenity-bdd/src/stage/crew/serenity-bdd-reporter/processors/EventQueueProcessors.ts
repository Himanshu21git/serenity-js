import type { DomainEventQueues } from '@serenity-js/core';
import { SceneStarts } from '@serenity-js/core/lib/events';
import type { Path } from '@serenity-js/core/lib/io';
import type { Artifact, CorrelationId } from '@serenity-js/core/lib/model';
import { Name, TestReport } from '@serenity-js/core/lib/model';
import type { JSONObject } from 'tiny-types';

import type { SerenityBDD4ReportSchema } from '../serenity-bdd-report-schema';
import type { EventQueueProcessor } from './EventQueueProcessor';
import { SceneSequenceEventQueueProcessor } from './scene-sequence';
import { SingleSceneEventQueueProcessor } from './single-scene';

/**
 * @package
 */
export class EventQueueProcessors {

    private readonly singleSceneProcessor: EventQueueProcessor;
    private readonly sceneSequenceProcessor: EventQueueProcessor;

    constructor(specDirectory: Path) {
        this.singleSceneProcessor = new SingleSceneEventQueueProcessor(specDirectory);
        this.sceneSequenceProcessor = new SceneSequenceEventQueueProcessor(specDirectory);
    }

    // todo: move `name` to Artifact and return Artifact[]... and sceneId?
    process(queues: DomainEventQueues): Array<{artifact: Artifact, name: Name, sceneId: CorrelationId }> {
        const results: Array<{artifact: Artifact, name: Name, sceneId: CorrelationId }> = [];

        queues.forEach(queue => {
            const report: SerenityBDD4ReportSchema = queue.first() instanceof SceneStarts
                ? this.singleSceneProcessor.process(queue)
                : this.sceneSequenceProcessor.process(queue)

            results.push({
                name: new Name(report.name),
                artifact: TestReport.fromJSON(report as unknown as JSONObject),
                sceneId: queue.sceneId,
            });
        });

        return results;
    }
}
