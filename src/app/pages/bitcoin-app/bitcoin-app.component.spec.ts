import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinAppComponent } from './bitcoin-app.component';

describe('BitcoinAppComponent', () => {
  let component: BitcoinAppComponent;
  let fixture: ComponentFixture<BitcoinAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
