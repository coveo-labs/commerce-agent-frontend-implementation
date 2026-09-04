import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { formatAudPrice } from '../formatting';
import { ProductResearchCardSurface } from '../models';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'app-product-research-card',
  template: `
    <section class="surface research">
      @if (surface().isLoading) {
        <div class="research-loading" role="status" aria-label="Loading product research">
          <article class="research-product" animate.enter="skeleton-reveal" style="--reveal-delay: 100ms">
            <app-skeleton class="skeleton-research-image"></app-skeleton>
            <app-skeleton class="skeleton-line skeleton-research-product-name"></app-skeleton>
            <app-skeleton class="skeleton-line skeleton-research-price"></app-skeleton>
          </article>
          <article class="research-content">
            <section class="research-summary-card skeleton-research-summary" animate.enter="skeleton-reveal" style="--reveal-delay: 350ms">
              <app-skeleton class="skeleton-research-icon"></app-skeleton>
              <div class="skeleton-research-copy">
                <app-skeleton class="skeleton-line skeleton-research-heading"></app-skeleton>
                <app-skeleton class="skeleton-line skeleton-research-subheading"></app-skeleton>
              </div>
            </section>
            <div class="skeleton-research-lines">
              @for (item of skeletonLines; track $index) {
                <app-skeleton class="skeleton-line skeleton-research-line line-{{ $index + 1 }}" animate.enter="skeleton-reveal" [style.--reveal-delay]="550 + $index * 100 + 'ms'"></app-skeleton>
              }
            </div>
          </article>
        </div>
      } @else {
        <div class="research-grid">
          <article class="research-product">
            @if (surface().product?.ec_image) {
              <img
                class="research-product-image"
                [src]="surface().product?.ec_image"
                [alt]="surface().product?.ec_name"
                loading="lazy"
                decoding="async"
              />
            }
            <div class="research-product-meta">
              <strong>{{ surface().product?.ec_name }}</strong>
              <span class="price">{{ formattedPrice() }}</span>
            </div>
          </article>

          <article class="research-content">
            <section class="research-summary-card">
              <header class="research-summary-header">
                <div class="research-icon" aria-hidden="true">✦</div>
                <div class="research-summary-meta">
                  <h4>AI-Generated Summary</h4>
                  <p>Generated based on product specs</p>
                </div>
              </header>
              <p class="research-summary-text">{{ surface().summary }}</p>
            </section>

            @if (surface().bullets.length > 0) {
              <h5>Key Features</h5>
              <ul class="research-bullets">
                @for (bullet of surface().bullets; track bullet) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            }
          </article>
        </div>
      }
    </section>
  `,
  styles: [
    `
      .research {
        padding: 0;
      }

      .research-grid {
        display: grid;
        grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
        gap: 28px;
        align-items: start;
      }

      @media (max-width: 720px) {
        .research-grid {
          grid-template-columns: 1fr;
        }
      }

      .research-product {
        border: 1px solid rgba(17, 35, 31, 0.1);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.92);
        padding: 14px;
      }

      .research-product-image {
        display: block;
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 14px;
        margin-bottom: 12px;
        background: rgba(232, 222, 209, 0.4);
      }

      .research-product-meta {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .research-product-meta strong {
        font-size: 1rem;
        line-height: 1.3;
      }

      .research-product-meta .price {
        color: #204f46;
        font-weight: 600;
      }

      .research-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .research-summary-card {
        padding: 18px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(32, 79, 70, 0.08), rgba(215, 239, 231, 0.45));
        border: 1px solid rgba(32, 79, 70, 0.18);
      }

      .research-summary-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 12px;
      }

      .research-icon {
        flex-shrink: 0;
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: 12px;
        background: linear-gradient(135deg, #204f46, #2f7363);
        color: white;
        font-size: 1.4rem;
        line-height: 1;
      }

      .research-summary-meta h4 {
        margin: 0 0 2px;
        font-size: 1rem;
        color: #11231f;
      }

      .research-summary-meta p {
        margin: 0;
        font-size: 0.85rem;
        color: #516661;
      }

      .research-summary-text {
        margin: 0;
        line-height: 1.6;
        color: #11231f;
      }

      h5 {
        margin: 8px 0 0;
        padding: 0 18px;
        font-size: 1rem;
      }

      .research-bullets {
        margin: 0;
        padding: 0 0 0 38px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        list-style: none;
      }

      .research-bullets li {
        position: relative;
        line-height: 1.5;
      }

      .research-bullets li::before {
        content: '';
        position: absolute;
        left: -18px;
        top: 0.55em;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #204f46;
      }

      .research-loading {
        display: grid;
        grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
        gap: 28px;
      }

      .skeleton-line { height: 14px; }
      .skeleton-research-image { width: 100%; aspect-ratio: 1 / 1; border-radius: 14px; margin-bottom: 12px; }
      .skeleton-research-product-name { width: 78%; }
      .skeleton-research-price { width: 35%; height: 16px; margin-top: 6px; }
      .skeleton-research-summary { display: flex; align-items: center; gap: 14px; }
      .skeleton-research-icon { flex: 0 0 44px; width: 44px; height: 44px; border-radius: 12px; }
      .skeleton-research-copy { flex: 1; display: grid; gap: 6px; }
      .skeleton-research-heading { width: 52%; }
      .skeleton-research-subheading { width: 38%; height: 12px; }
      .skeleton-research-lines { display: grid; gap: 10px; padding: 0 18px; }
      .skeleton-research-line { height: 12px; }
      .line-1 { width: 96%; } .line-2 { width: 92%; } .line-3 { width: 88%; } .line-4 { width: 82%; } .line-5 { width: 76%; }
      .skeleton-reveal { animation: skeleton-reveal 0.4s var(--reveal-delay, 0ms) both ease-out; }

      @keyframes skeleton-reveal { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      @media (max-width: 720px) { .research-loading { grid-template-columns: 1fr; } }
      @media (prefers-reduced-motion: reduce) { .skeleton-reveal { animation: none; } }
    `,
  ],
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductResearchCardComponent {
  protected readonly skeletonLines = Array.from({ length: 5 });
  readonly surface = input.required<ProductResearchCardSurface>();

  protected formattedPrice(): string {
    const product = this.surface().product;
    if (!product) {
      return '';
    }
    return formatAudPrice(product.ec_promo_price ?? product.ec_price);
  }
}
