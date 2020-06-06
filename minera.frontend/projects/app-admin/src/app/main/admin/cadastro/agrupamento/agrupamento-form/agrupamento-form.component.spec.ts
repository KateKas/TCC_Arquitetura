import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupamentoFormComponent } from './agrupamento-form.component';

describe('AgrupamentoFormComponent', () => {
  let component: AgrupamentoFormComponent;
  let fixture: ComponentFixture<AgrupamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
