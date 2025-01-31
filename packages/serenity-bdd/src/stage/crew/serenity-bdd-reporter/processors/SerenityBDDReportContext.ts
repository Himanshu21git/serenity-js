import type { CorrelationId } from '@serenity-js/core/lib/model';
import type { Path } from '@serenity-js/core/src/io';

import type { SerenityBDD4ReportSchema } from '../serenity-bdd-report-schema';
import type { LinkedTestStep } from './LinkedTestStep';

/**
 * @package
 */
export abstract class SerenityBDDReportContext {

    public readonly report: Partial<SerenityBDD4ReportSchema> = {};
    public readonly steps: Map<string, LinkedTestStep> = new Map();
    public currentActivityId: CorrelationId = undefined;

    constructor(public readonly specDirectory: Path) {
    }

    with(fn: (report: this) => this): this {
        return fn(this);
    }

    build(): SerenityBDD4ReportSchema {

        const eraseDuplicateExceptionReportFromParentSteps = (current: LinkedTestStep) => {
            if (current.parentActivityId) {
                const parent = this.steps.get(current.parentActivityId.value);
                delete parent.step.exception;

                return eraseDuplicateExceptionReportFromParentSteps(parent);
            }
        }

        const testSteps = [];

        this.steps.forEach(current => {
            if (current.parentActivityId) {
                this.steps.get(current.parentActivityId.value).step.children.push(current.step);

                if (current.step.exception) {
                    eraseDuplicateExceptionReportFromParentSteps(current);
                }
            }
            else {
                testSteps.push(current.step);
            }
        });

        return {
            ...this.report,
            testSteps,
        } as SerenityBDD4ReportSchema;
    }
}
