import { Component, Inject } from '@angular/core';
import { CounterService } from './shared/services/index';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Counter App';
  countersForm: FormGroup;

  counterTitle = '';
  counters;
  total;

  constructor(
    private counterService: CounterService,
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this.counterAdder();
    this.countersDisplay();
  }

  counterAdder() {
    this.countersForm = this.fb.group({
      title: [null, [Validators.required]],
    });
  }

  newCounter() {
    this.counterService
      .addCounter(this.countersForm.value)
      .subscribe(result => {
        this.counters = result;
        this.counterTitle = '';
      });
  }

  countersDisplay() {
    this.counterService.getCounters().subscribe(result => {
      this.updateCounters(result);
    });
  }

  increase(id) {
    this.counterService.increaseCounter(id).subscribe(result => {
      this.updateCounters(result);
    });
  }

  decrease(id) {
    this.counterService.decreaseCounter(id).subscribe(result => {
      this.updateCounters(result);
    });
  }

  delete(id) {
    this.counterService.deleteCounter(id).subscribe(result => {
      this.updateCounters(result);
    });
  }

  getTotal() {
    this.total = this.counters.reduce((sum, x) => {
      return sum + x.count;
    }, 0);
  }

  updateCounters(result: any) {
    this.counters = result;
    this.getTotal();
  }
}
