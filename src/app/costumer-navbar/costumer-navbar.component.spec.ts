import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerNavbarComponent } from './costumer-navbar.component';

describe('CostumerNavbarComponent', () => {
  let component: CostumerNavbarComponent;
  let fixture: ComponentFixture<CostumerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostumerNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostumerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
