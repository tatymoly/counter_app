import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CounterService } from './services/index';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [],
  providers: [CounterService],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SharedModule {}
