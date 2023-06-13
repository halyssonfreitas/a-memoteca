import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoataoCarregarMaisComponent } from './botao-carregar-mais.component';

describe('BoataoCarregarMaisComponent', () => {
  let component: BoataoCarregarMaisComponent;
  let fixture: ComponentFixture<BoataoCarregarMaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoataoCarregarMaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoataoCarregarMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
