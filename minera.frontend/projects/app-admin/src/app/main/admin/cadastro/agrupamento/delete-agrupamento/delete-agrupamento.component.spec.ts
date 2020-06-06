import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAgrupamentoComponent } from './delete-agrupamento.component';

describe('DeleteAgrupamentoComponent', () => {
  let component: DeleteAgrupamentoComponent;
  let fixture: ComponentFixture<DeleteAgrupamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAgrupamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAgrupamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
