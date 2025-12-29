import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  rateLimitInfo = {
    remaining: 9500,
    total: 10000,
    resetTime: '24 hours'
  };

  get percentageUsed(): number {
    return ((this.rateLimitInfo.total - this.rateLimitInfo.remaining) / this.rateLimitInfo.total) * 100;
  }
}
