import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriesMenuComponent } from './laboratories-menu.component';

describe('LaboratoriesMenuComponent', () => {
  let component: LaboratoriesMenuComponent;
  let fixture: ComponentFixture<LaboratoriesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoriesMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaboratoriesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
