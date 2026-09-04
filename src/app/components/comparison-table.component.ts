import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatAudPrice } from '../formatting';
import { ComparisonTableSurface } from '../models';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'app-comparison-table',
  template: `
    <section class="surface">
      <header class="surface-header">
        <p class="surface-kicker">Comparison Table</p>
        <h3>{{ surface().heading }}</h3>
      </header>

      @if (surface().isLoading) {
        <div class="loading-table" role="status" aria-label="Loading comparison">
          <div class="comparison-skeleton-grid">
            <app-skeleton class="skeleton-line skeleton-table-label" animate.enter="skeleton-reveal" style="--reveal-delay: 100ms"></app-skeleton>
            @for (item of skeletonColumns; track $index) {
              <app-skeleton class="skeleton-line skeleton-table-heading" animate.enter="skeleton-reveal" [style.--reveal-delay]="200 + $index * 120 + 'ms'"></app-skeleton>
            }
            @for (row of skeletonRows; track $index; let rowIndex = $index) {
              <app-skeleton class="skeleton-line skeleton-table-label" animate.enter="skeleton-reveal" [style.--reveal-delay]="550 + rowIndex * 180 + 'ms'"></app-skeleton>
              @for (column of skeletonColumns; track $index) {
                <app-skeleton animate.enter="skeleton-reveal" [class.skeleton-table-image]="rowIndex === 0" [class.skeleton-line]="rowIndex !== 0" [class.skeleton-table-value]="rowIndex !== 0" [style.--reveal-delay]="620 + rowIndex * 180 + $index * 70 + 'ms'"></app-skeleton>
              }
            }
          </div>
        </div>
      } @else {
        <div class="comparison-grid" [style.grid-template-columns]="gridColumns()">
          <div class="comparison-cell comparison-corner"></div>
          @for (product of surface().products; track product.ec_product_id) {
            <div class="comparison-cell comparison-head">
              @if (product.ec_image) {
                <img
                  class="comparison-image"
                  [src]="product.ec_image"
                  [alt]="product.ec_name"
                  loading="lazy"
                  decoding="async"
                />
              }
              <span class="comparison-brand">{{ product.ec_brand }}</span>
              <strong>{{ product.ec_name }}</strong>
            </div>
          }

          @for (attribute of surface().attributes; track attribute) {
            <div class="comparison-cell comparison-label">{{ formatLabel(attribute) }}</div>
            @for (product of surface().products; track product.ec_product_id) {
              <div class="comparison-cell">{{ product[attribute] || '—' }}</div>
            }
          }

          <div class="comparison-cell comparison-label">Price</div>
          @for (product of surface().products; track product.ec_product_id) {
            <div class="comparison-cell comparison-price">
              {{ formatPrice(product.ec_promo_price ?? product.ec_price) }}
            </div>
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

      .comparison-grid {
        display: grid;
        gap: 0;
        border: 1px solid rgba(17, 35, 31, 0.1);
        border-radius: 18px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.6);
      }

      .comparison-cell {
        padding: 12px 14px;
        border-right: 1px solid rgba(17, 35, 31, 0.08);
        border-bottom: 1px solid rgba(17, 35, 31, 0.08);
        line-height: 1.45;
        font-size: 0.94rem;
      }

      .comparison-cell:last-child {
        border-right: none;
      }

      .comparison-head {
        padding: 14px;
        background: rgba(246, 242, 232, 0.85);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }

      .comparison-image {
        width: 100%;
        max-width: 180px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 14px;
        margin-bottom: 8px;
        background: rgba(232, 222, 209, 0.4);
      }

      .comparison-brand {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #516661;
      }

      .comparison-head strong {
        font-size: 1rem;
        line-height: 1.3;
      }

      .comparison-corner {
        background: rgba(246, 242, 232, 0.85);
      }

      .comparison-label {
        background: rgba(246, 242, 232, 0.55);
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #516661;
        font-weight: 600;
      }

      .comparison-price {
        font-weight: 600;
        color: #204f46;
      }

      .loading-table {
        overflow-x: auto;
        border-radius: 18px;
        border: 1px solid rgba(17, 35, 31, 0.1);
        background: rgba(255, 255, 255, 0.6);
        padding: 1px;
      }

      .comparison-skeleton-grid { display: grid; grid-template-columns: minmax(120px, auto) repeat(3, minmax(140px, 1fr)); min-width: 580px; }
      .comparison-skeleton-grid app-skeleton { margin: 12px 14px; }
      .skeleton-line { height: 14px; }
      .skeleton-table-label { width: 70%; }
      .skeleton-table-heading { width: 75%; }
      .skeleton-table-value { width: 60%; }
      .skeleton-table-image { width: 80%; height: 88px; border-radius: 14px; }
      .skeleton-reveal { animation: skeleton-reveal 0.4s var(--reveal-delay, 0ms) both ease-out; }

      @keyframes skeleton-reveal { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      @media (prefers-reduced-motion: reduce) { .skeleton-reveal { animation: none; } }
    `,
  ],
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableComponent {
  protected readonly skeletonColumns = Array.from({ length: 3 });
  protected readonly skeletonRows = Array.from({ length: 5 });
  readonly surface = input.required<ComparisonTableSurface>();

  protected readonly gridColumns = computed(
    () => `minmax(120px, auto) repeat(${this.surface().products.length}, minmax(0, 1fr))`,
  );

  protected formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }

  protected formatPrice(value: number): string {
    return formatAudPrice(value);
  }
}
