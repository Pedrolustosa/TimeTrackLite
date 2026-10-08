import { Component, inject } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';
import { TimeCalculatorPageComponent } from './features/time-calculator/components/time-calculator-page/time-calculator-page';

@Component({
  selector: 'app-root',
  imports: [TimeCalculatorPageComponent],
  templateUrl: './app.html',
})
export class App {
  /** Ensures theme tokens are applied on bootstrap. */
  private readonly themeService = inject(ThemeService);
}
