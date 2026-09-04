import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NextActionsBarSurface } from '../models';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'app-next-actions-bar',
  template: `
    <section class="surface">
      <header class="surface-header">
        <p class="surface-kicker">Next Actions</p>
        <h3>Suggested next steps</h3>
      </header>

      @if (!surface().isLoading) {
        <div class="actions">
          @for (action of surface().actions; track action.text + ':' + action.type) {
            <button type="button" (click)="handleAction(action.text)">
              {{ action.text }}
            </button>
          }
        </div>
      } @else {
        <div class="loading-row">
          @for (item of placeholders; track $index) {
            <app-skeleton class="skeleton-action" animate.enter="skeleton-reveal" [style.--reveal-delay]="$index * 140 + 'ms'"></app-skeleton>
          }
        </div>
      }
    </section>
  `,
  styles: [
    `
      .surface-header {
        margin-bottom: 16px;
      }

      .surface-kicker {
        margin: 0 0 6px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.74rem;
        color: #516661;
      }

      h3 {
        margin: 0;
      }

      .actions,
      .loading-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button,
      .skeleton-action {
        border-radius: 999px;
        padding: 10px 14px;
      }

      button {
        appearance: none;
        border: 1px solid rgba(17, 35, 31, 0.12);
        background: rgba(215, 239, 231, 0.8);
        color: #204f46;
        cursor: pointer;
        font: inherit;
      }

      .skeleton-action {
        display: inline-block;
        width: 160px;
        height: 38px;
        box-sizing: border-box;
      }

      .skeleton-reveal { animation: skeleton-reveal 0.4s var(--reveal-delay, 0ms) both ease-out; }
      @keyframes skeleton-reveal { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      @media (prefers-reduced-motion: reduce) { .skeleton-reveal { animation: none; } }
    `,
  ],
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextActionsBarComponent {
  protected readonly placeholders = Array.from({ length: 3 });
  readonly surface = input.required<NextActionsBarSurface>();
  readonly onSelectAction = input<(action: string) => void>(() => {});

  protected handleAction(action: string): void {
    this.onSelectAction()(action);
  }
}
