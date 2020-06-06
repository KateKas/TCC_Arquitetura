import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAgrupamentosCorrelatosDialogComponent } from './delete-agrupamentos-correlatos-dialog.component';

describe('DeleteAgrupamentosCorrelatosDialogComponent', () => {
  let component: DeleteAgrupamentosCorrelatosDialogComponent;
  let fixture: ComponentFixture<DeleteAgrupamentosCorrelatosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAgrupamentosCorrelatosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAgrupamentosCorrelatosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
