import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupamentoCorrelatosDialogComponent } from './agrupamento-correlatos-dialog.component';

describe('AgrupamentoCorrelatosDialogComponent', () => {
  let component: AgrupamentoCorrelatosDialogComponent;
  let fixture: ComponentFixture<AgrupamentoCorrelatosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupamentoCorrelatosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupamentoCorrelatosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
