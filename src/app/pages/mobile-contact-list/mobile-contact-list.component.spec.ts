import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileContactListComponent } from './mobile-contact-list.component';

describe('MobileContactListComponent', () => {
  let component: MobileContactListComponent;
  let fixture: ComponentFixture<MobileContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
