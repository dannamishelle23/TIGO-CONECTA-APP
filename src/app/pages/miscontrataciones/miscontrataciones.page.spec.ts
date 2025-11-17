import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscontratacionesPage } from './miscontrataciones.page';

describe('MiscontratacionesPage', () => {
  let component: MiscontratacionesPage;
  let fixture: ComponentFixture<MiscontratacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscontratacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
