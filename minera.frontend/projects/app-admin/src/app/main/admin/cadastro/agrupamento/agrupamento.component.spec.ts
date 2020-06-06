import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupamentoComponent } from './agrupamento.component';

describe('AgrupamentoComponent', () => {
  let component: AgrupamentoComponent;
  let fixture: ComponentFixture<AgrupamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
