import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearEditarPlanPage } from './crear-editar-plan.page';

describe('CrearEditarPlanPage', () => {
  let component: CrearEditarPlanPage;
  let fixture: ComponentFixture<CrearEditarPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
